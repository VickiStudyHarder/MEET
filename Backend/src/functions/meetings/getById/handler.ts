import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { PrismaClient } from '@prisma/client';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();
  console.log(event.pathParameters);
  try {
    const result = await prisma.meeting.findUnique({
      where : {
        id: Number(event.pathParameters.id)
      },
      include : {
        notes: true,
        toDoItem: true,
        meetingAttendee: {
          include: {
            user: true
          }
        },
        agendas: true
      }
    })
    return formatJSONResponse({
      statusCode: 200,
      message: `${event}`,
      body: result
    });
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: `${e.message}`,
      event,
    });
  }
};

export const main = middyfy(getById);
