import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PrismaClient } from '@prisma/client';

import schema from './schema';

const getById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.user.findUnique({
      where: {
        id: event.pathParameters.id,
      }
    });
    return formatJSONResponse({
      statusCode: 200,
      message: `Successfully retrieved user`,
      body: result,
    });
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: `${e.message}`,
      event,
    });
  }  finally {
    await prisma.$disconnect()
  }
};

export const main = middyfy(getById);
