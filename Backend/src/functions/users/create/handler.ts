import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import {PrismaClient} from '@prisma/client'

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient()

  try {
    const result = await prisma.user.create({data: event.body}
    )
    return formatJSONResponse({
      status: 200,
      message: `User successfully created`,
      event,
      body: result,
    });
  } catch (e) { 
    console.error(e);
    return formatJSONResponse({
      status: 500,
      message: `${e.message}`,
    })
  } finally {
    await prisma.$disconnect()
  }
};

export const main = middyfy(create);
