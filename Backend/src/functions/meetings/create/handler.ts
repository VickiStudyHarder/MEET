import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PrismaClient } from '@prisma/client';
import oauth2Client from '@libs/oauth2-client';
import { IMeetingPayload, IMeetingAttendee } from '../../../types/meeting';
import { v4 as uuidv4 } from 'uuid';

import schema from './schema';
import { google } from 'googleapis';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const meetingPayload: IMeetingPayload =
    event.body as unknown as IMeetingPayload;

  console.log(meetingPayload);

  try {
    const meeting = await prisma.meeting.create({
      data: {
        meetingStart: new Date(meetingPayload.meetingStart),
        meetingEnd: new Date(meetingPayload.meetingEnd),
        summary: meetingPayload.summary,
        description: meetingPayload.description,
        location: meetingPayload.location,
        toDoItem: {
          createMany: {
            data: meetingPayload.toDoItem || null,
          },
        },
        notes: {
          createMany: {
            data: meetingPayload.notes || null,
          },
        },
        meetingAttendee: {
          createMany: {
            data: meetingPayload.meetingAttendee || null,
          },
        },
        agendas: {
          createMany: {
            data: meetingPayload.agendas || null,
          },
        },
        recordings: {
          createMany: {
            data: meetingPayload.recordings || null,
          },
        },
      },
      include: {
        toDoItem: true,
        notes: true,
        meetingAttendee: true,
        agendas: true,
        recordings: true,
      },
    });

    try {
      const result = await addGoogleMeeting(meetingPayload, meeting.id);
    } catch (e) {
      console.error(e);
    }

    return formatJSONResponse({
      status: 200,
      message: ``,
      event,
      body: meeting,
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

const addGoogleMeeting = async (
  meetingPayload: IMeetingPayload,
  meetingId: number
) => {
  const attendees = meetingPayload.meetingAttendee.map(
    (attendee: IMeetingAttendee) => {
      return { email: attendee.userId };
    }
  );

  const attendee = meetingPayload.meetingAttendee[0];

  const token = await prisma.tokens.findUnique({
    where: {
      userId: attendee.userId,
    },
  });

  oauth2Client.setCredentials({ refresh_token: token.refreshToken });
  const calendar = google.calendar('v3');

  const requestId = uuidv4();

  const googleApiResponse = await calendar.events.insert({
    conferenceDataVersion: 1,
    auth: oauth2Client,
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
          requestId: requestId,
        },
      },
    },
  });

  const response = JSON.parse(JSON.stringify(googleApiResponse));

  meetingPayload.meetingAttendee.forEach(async (attendee: IMeetingAttendee) => {
    await prisma.meetingAttendee.updateMany({
      where: {
        userId: attendee.userId,
        meetingId: meetingId,
      },
      data: {
        googleCalendarId: response.data.hangoutLink,
        requestId: requestId,
      },
    });
  });

  console.log(googleApiResponse);
  return googleApiResponse;
};

export const main = middyfy(create);
