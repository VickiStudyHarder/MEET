import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { PrismaClient } from "@prisma/client";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getByUserId: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();
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
            agendas: true,
            recordings: true,
            meetingAttendee: {
              include: {
                user: true,
              },
            },
          },
        },
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
  } finally {
    await prisma.$disconnect();
  }
};

export const main = middyfy(getByUserId);
