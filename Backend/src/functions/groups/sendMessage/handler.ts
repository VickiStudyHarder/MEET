import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { PrismaClient } from "@prisma/client";

import schema from "./schema";

interface IMessage {
  id?: number;
  groupId: number;
  message: string;
  timeSent: string;
  userId: string;
}

const prisma = new PrismaClient();

const sendMessage: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const body: IMessage = event.body as unknown as IMessage;

  try {
    const result = await prisma.messageHistory.create({
      data: {
        groupId: body.groupId,
        message: body.message,
        timeSent: body.timeSent,
        userId: body.userId,
      },
    });

    return formatJSONResponse({
      status: 200,
      message: "Success",
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
  }finally {
    await prisma.$disconnect();
  }
};

export const main = middyfy(sendMessage);
