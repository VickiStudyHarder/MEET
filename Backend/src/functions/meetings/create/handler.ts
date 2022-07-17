import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log(event.body)
  try {
    return formatJSONResponse({
      status: 200,
      message: ``,
      event,
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

export const main = middyfy(create);
