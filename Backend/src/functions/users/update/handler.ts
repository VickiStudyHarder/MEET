import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const db = require('@libs/database');
const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

import schema from './schema';

const update: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
    return formatJSONResponse({
      status: 200,
      message: 'Update users',
      event,
    });
};

export const main = middyfy(update);
