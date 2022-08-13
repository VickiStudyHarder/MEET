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
} from '../../../types/meeting';

import schema from './schema';

const update: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();
  const meeting: IMeetingPayload = event.body as unknown as IMeetingPayload;
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
    await Promise.all(
      meeting.toDoItems.map(async (item: IToDoItem) => {
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

    console.log('notes');
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

    console.log('attendees');
    await Promise.all(
      meeting.attendees.map(async (item: IMeetingAttendee) => {
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

    console.log('attendees');
    await Promise.all(
      meeting.agendas.map(async (item: IAgenda) => {
        return await prisma.meeting.update({
          where: {
            id: Number(event.pathParameters.id),
          },
          data: {
            agendas: {
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

    return formatJSONResponse({
      status: 200,
      message: ``,
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
