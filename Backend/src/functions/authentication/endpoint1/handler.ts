import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const endpoint1: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  return formatJSONResponse({
    message: `endpoint1 ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(endpoint1);
