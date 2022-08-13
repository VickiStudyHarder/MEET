import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { PrismaClient } from '@prisma/client';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getGroupById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.group.findUnique({
      where: {
        id: Number(event.pathParameters.id),
      },
      include: {
        groupParticipant: {
          include: {
            user: { 
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        messageHistory: true
      },
    });
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

export const main = middyfy(getGroupById);
