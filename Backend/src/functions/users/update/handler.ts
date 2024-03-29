import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { PrismaClient } from "@prisma/client";

import schema from "./schema";

const update: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.user.update({
      where: {
        id: event.pathParameters.id,
      },
      data: event.body,
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
  } finally {
    await prisma.$disconnect();
  }
};

export const main = middyfy(update);
