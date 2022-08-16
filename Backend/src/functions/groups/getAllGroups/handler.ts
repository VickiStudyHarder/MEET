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
    const result = await prisma.group.findMany({
      include: {
        groupParticipant: true,
      },
    });
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
