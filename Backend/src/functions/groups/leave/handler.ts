import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Prisma, PrismaClient } from '@prisma/client';

import schema from './schema';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

const leaveGroup: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const groupName = event.body.name as string;
  const userId = event.body.userId as string;
  console.log(event.body);

  try {
    const col1 = 'userId';
    const col2 = 'groupName';

    const result = await prisma.$queryRaw(
      Prisma.sql`DELETE FROM \"public\".\"GroupParticipant\" WHERE \"public\".\"GroupParticipant\".\"userId\"=${userId} AND \"public\".\"GroupParticipant\".\"groupName\"=${groupName};`
    );
    console.log(result);
    return formatJSONResponse({
      status: 200,
      message: 'Success',
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

export const main = middyfy(leaveGroup);
