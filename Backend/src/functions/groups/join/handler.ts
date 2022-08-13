import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PrismaClient } from '@prisma/client';

import schema from './schema';

const prisma = new PrismaClient();

const joinGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const groupName = event.body.name as string;
  const userId = event.body.userId as string;

  try {
    const result = await prisma.groupParticipant.create({
      data: {
        userId: userId,
        groupName: groupName,
      },
    });
    return formatJSONResponse({
      status: 200,
      message: 'Success',
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

export const main = middyfy(joinGroup);
