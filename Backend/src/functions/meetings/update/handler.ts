import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PrismaClient } from '@prisma/client';
import {
  IMeetingAttendee,
  IMeetingPayload,
  INotes,
  IToDoItem,
  IAgenda,
  IRecording,
} from '../../../types/meeting';

import schema from './schema';

const update: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();
  const meeting: IMeetingPayload = event.body as unknown as IMeetingPayload;
  console.log({meeting});
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
    if (meeting?.toDoItem) {
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
      console.log('1');
      console.log({ res });
      console.log('2');
    }

    console.log('notes');

    if (meeting?.notes) {
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
    console.log(event.body)
    if (meeting?.meetingAttendee) {
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
    if (meeting?.agendas) {
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
    if (meeting?.recordings) {
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

export const main = middyfy(update);
