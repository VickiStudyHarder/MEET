import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const db = require('@libs/database');
const { DeleteItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { marshall } = require('@aws-sdk/util-dynamodb');

import schema from './schema';

const remove: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log(event.body);
  console.log(event.pathParameters.id);
  try {
    const { Items } = await db.send(
      new ScanCommand({
        TableName: 'UserTable',
        FilterExpression: 'contains (PK,  :pk)',
        ExpressionAttributeValues: {
          ':pk': { S: `${event.pathParameters.id}` },
        },
      })
    );

    console.log(Items);

    const result = Items.map((item) => {
      return db.send(
        new DeleteItemCommand({
          TableName: 'UserTable',
          Key: {
            PK: item.PK,
            SK: item.SK,
          },
        })
      );
    });
    return formatJSONResponse({
      statusCode: 200,
      message: 'Successfully deleted result',
      body: result,
    });
  } catch (e) {
    console.log({ e });
    return formatJSONResponse({
      statusCode: 500,
      message: `${e.message}`,
      event,
    });
  }
};

export const main = middyfy(remove);
