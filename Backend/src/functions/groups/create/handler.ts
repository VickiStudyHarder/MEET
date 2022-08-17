import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { PrismaClient } from "@prisma/client";
import oauth2Client from "@libs/oauth2-client";
import { IMeetingPayload, IMeetingAttendee } from "../../../types/meeting";

import schema from "./schema";
import { google } from "googleapis";

const prisma = new PrismaClient();

interface IGroup {
  name: string;
  description: string;
}

const createGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const group: IGroup = event.body as unknown as IGroup;

  try {
    const result = await prisma.group.create({
      data: {
        name: group.name,
        description: group.description,
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
  } finally {
    await prisma.$disconnect();
  }
};

export const main = middyfy(createGroup);
