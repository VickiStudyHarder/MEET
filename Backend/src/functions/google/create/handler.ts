import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PrismaClient } from '@prisma/client';
import oauth2Client from '@libs/oauth2-client'

import schema from './schema';

const createCalendarEvent: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  const prisma = new PrismaClient();

  console.log(event.body);
  console.log(event.pathParameters.username);
  const { token } = event.body;
  const username = event.pathParameters.username;
  const { tokens } = await oauth2Client.getToken(token);
  console.log(tokens);

  try {
    const result = await prisma.user.update({
      where: {
        id: username,
      },
      data: {
        tokens: {
          upsert: {
            create: {
              refreshToken: tokens.refresh_token,
            },
            update: {
              refreshToken: tokens.refresh_token,
            },
          },
        },
      },
    });
    console.log(result);

    return formatJSONResponse({
      status: 200,
      message: `success`,
      event,
      body: tokens,
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

export const main = middyfy(createCalendarEvent);
