import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { PrismaClient } from '@prisma/client';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getByUserId: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();
  console.log(event.pathParameters);
  try {
    const result = await prisma.meetingAttendee.findMany({
      where: {
        userId: event.pathParameters.userId,
      },
      select: {
        meeting: {
          include: {
            notes: true,
            toDoItem: true,
            meetingAttendee: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    console.log(result);
    return formatJSONResponse({
      statusCode: 200,
      message: `${event}`,
      body: result,
    });
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: `${e.message}`,
      event,
    });
  }
};

export const main = middyfy(getByUserId);
