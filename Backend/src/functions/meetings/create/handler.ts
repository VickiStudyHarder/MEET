import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const db = require('@libs/database');
const { PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

import schema from './schema';

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log(event.body)
  try {
    const body = event.body;
    body["PK"] = body.userId;
    body["SK"] = `m#${body.meetingStart}`
    console.log({body})
    const params = {
          TableName: 'UserTable',
          Item: marshall(body || {}),
      };
    const result = await db.send(new PutItemCommand(params));
    return formatJSONResponse({
      status: 200,
      message: `${result}`,
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
