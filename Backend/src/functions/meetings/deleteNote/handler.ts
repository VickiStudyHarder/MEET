import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { MeetingAttendee, PrismaClient } from '@prisma/client';
import oauth2Client from '@libs/oauth2-client';

import { google } from 'googleapis';

import schema from './schema';
const prisma = new PrismaClient();

const removeNote: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {

    const result = await prisma.notes.delete({
      where: {
        id: Number(event.pathParameters.id),
      }
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

export const main = middyfy(removeNote);
