import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PrismaClient } from '@prisma/client';

import schema from './schema';

const rateMentor: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();

  const reqRating : number = event.body.rating as unknown as number;
  console.log(event.pathParameters.id)

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: event.pathParameters.id
      }
    })

    console.log('Rating Before', user.rating)

    const totalMeetings = user.totalMeetings + 1;
    const rating = ((user.rating * user.totalMeetings + reqRating)/totalMeetings)

    console.log('Rating after', rating)
    console.log('Total Meetings', totalMeetings)

    const result = await prisma.user.update({
      where: {
        id: event.pathParameters.id,
      },
      data: {
        rating: rating,
        totalMeetings: totalMeetings
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

export const main = middyfy(rateMentor);
