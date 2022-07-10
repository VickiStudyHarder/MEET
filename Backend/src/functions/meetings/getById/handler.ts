import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const db = require('@libs/database');
const { ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb');

import schema from './schema';

const getById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log(event.pathParameters)
  try {
    const { Items } = await db.send(
      new ScanCommand({
        TableName: 'UserTable',
        FilterExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': { S: `${event.pathParameters.id}` },
        },
      })
    );
    console.log(Items)

    return formatJSONResponse({
      statusCode: 200,
      message: `${event}`,
      body: Items.map((item) => unmarshall(item)),
    });
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: `${e.message}`,
      event,
    });
  }
};

export const main = middyfy(getById);
