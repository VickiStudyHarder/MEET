import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const db = require('@libs/database');
const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

import schema from './schema';

const endpoint1: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const body = event.body;
    const params = {
      TableName: 'StudentsTable',
      Item: marshall(body || {}),
    };
    const createResult = await db.send(new PutItemCommand(params));
    console.log({ createResult });

    return formatJSONResponse({
      status: 200,
      message: 'Sucessfully created post',
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

export const main = middyfy(endpoint1);
