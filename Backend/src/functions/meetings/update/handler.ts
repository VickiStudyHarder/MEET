import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { MeetingAttendee, PrismaClient } from '@prisma/client';
import {
  IMeetingAttendee,
  IMeetingPayload,
  INotes,
  IToDoItem,
  IAgenda,
  IRecording,
} from '../../../types/meeting';
import oauth2Client from '@libs/oauth2-client';

import { google } from 'googleapis';

import schema from './schema';

const prisma = new PrismaClient();

const update: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const meeting: IMeetingPayload = event.body as unknown as IMeetingPayload;
  //console.log({ meeting });
  try {
    const result = await prisma.meeting.findUnique({
      where: {
        id: Number(event.pathParameters.id),
      },
    });
    if (!result) {
      return formatJSONResponse({
        status: 404,
        message: `User with id ${event.pathParameters.id} not found`,
        event,
        body: result,
      });
    }

    console.log('toDoItems');
    if (meeting?.toDoItem && meeting.toDoItem.length > 0) {
      const res = await Promise.all(
        meeting.toDoItem.map(async (item: IToDoItem) => {
          return await prisma.meeting.update({
            where: {
              id: Number(event.pathParameters.id),
            },
            data: {
              toDoItem: {
                upsert: {
                  create: item,
                  update: item,
                  where: { id: item.id ? item.id : -1 },
                },
              },
            },
          });
        })
      );
    }

    console.log('notes');

    if (meeting?.notes && meeting.notes.length > 0) {
      await Promise.all(
        meeting.notes.map(async (item: INotes) => {
          return await prisma.meeting.update({
            where: {
              id: Number(event.pathParameters.id),
            },
            data: {
              notes: {
                upsert: {
                  where: { id: item.id ? item.id : -1 },
                  create: item,
                  update: item,
                },
              },
            },
          });
        })
      );
    }

    console.log('attendees');
    //console.log(event.body);
    if (meeting?.meetingAttendee && meeting.meetingAttendee.length > 0) {
      await Promise.all(
        meeting.meetingAttendee.map(async (item: IMeetingAttendee) => {
          return await prisma.meeting.update({
            where: {
              id: Number(event.pathParameters.id),
            },
            data: {
              meetingAttendee: {
                upsert: {
                  where: { id: item.id ? item.id : -1 },
                  create: item,
                  update: item,
                },
              },
            },
          });
        })
      );
    }

    console.log('agendas');
    if (meeting?.agendas && meeting.agendas.length > 0) {
      await Promise.all(
        meeting.agendas.map(async (item: IAgenda) => {
          return await prisma.meeting.update({
            where: {
              id: Number(event.pathParameters.id),
            },
            data: {
              agendas: {
                upsert: {
                  where: { id: item?.id ? item.id : -1 },
                  create: item,
                  update: item,
                },
              },
            },
          });
        })
      );
    }

    console.log('recordings');
    if (meeting?.recordings && meeting.recordings.length > 0) {
      const res = await Promise.all(
        meeting.recordings.map(async (item: IRecording) => {
          return await prisma.meeting.update({
            where: {
              id: Number(event.pathParameters.id),
            },
            data: {
              recordings: {
                upsert: {
                  create: item,
                  update: item,
                  where: { id: item.id ? item.id : -1 },
                },
              },
            },
          });
        })
      );
    }

    if (meeting) {
      await prisma.meeting.update({
        where: {
          id: Number(event.pathParameters.id),
        },
        data: {
          meetingStart: meeting.meetingStart,
          meetingEnd: meeting.meetingEnd,
          summary: meeting.summary,
          description: meeting.description
        },
      });
    }

    const meetingAttendees = await prisma.meetingAttendee.findMany({
      where: {
        meetingId: Number(event.pathParameters.id),
      },
    });

    await updateGoogleMeeting(
      meetingAttendees,
      Number(event.pathParameters.id),
      meeting
    );

    return formatJSONResponse({
      status: 200,
      message: `Success`,
      event,
      body: result,
    });
  } catch (e) {
    console.error(e);
    return formatJSONResponse({
      status: 500,
      message: `${e.message}}`,
      event,
    });
  }
};

const updateGoogleMeeting = async (
  meetingAttendees: MeetingAttendee[],
  meetingId: number,
  meetingPayload: IMeetingPayload
) => {
  const meetingData = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
  });

  const result = await Promise.all(
    meetingAttendees.map(async (attendee: MeetingAttendee) => {
      try {
        const token = await prisma.tokens.findUnique({
          where: {
            userId: attendee.userId,
          },
        });

        const attendees = meetingPayload.meetingAttendee.map(
          (attendee: IMeetingAttendee) => {
            return { email: attendee.userId };
          }
        );

        oauth2Client.setCredentials({ refresh_token: token.refreshToken });
        const calendar = google.calendar('v3');

        return await calendar.events.update({
          conferenceDataVersion: 1,
          auth: oauth2Client,
          eventId: meetingData.requestId,
          calendarId: 'primary',
          requestBody: {
            summary: meetingPayload.summary,
            description: meetingPayload.description,
            location: meetingPayload.location,
            start: {
              dateTime: new Date(meetingPayload.meetingStart),
              timeZone: 'Australia/Sydney',
            },
            end: {
              dateTime: new Date(meetingPayload.meetingEnd),
              timeZone: 'Australia/Sydney',
            },
            attendees: attendees,
            conferenceData: {
              createRequest: {
                conferenceSolutionKey: {
                  type: 'hangoutsMeet',
                },
              },
            },
          },
        });
      } catch (e) {
        console.error(e);
        return;
      }
    })
  );
  return result;
};

export const main = middyfy(update);
