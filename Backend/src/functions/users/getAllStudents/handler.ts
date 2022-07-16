import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
const db = require('@libs/database');
const { ScanCommand } = require('@aws-sdk/client-dynamodb');
const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb');

import schema from './schema';

const getAllStudents: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { Items } = await db.send(
      new ScanCommand({
        TableName: 'UserTable',
        FilterExpression: 'contains (PK, :pk)',
        ExpressionAttributeValues: {
          ':pk': { S: 'student' },
        },
      })
    );
    return formatJSONResponse({
      statusCode: 200,
      message: `${event}`,
      body: Items.map((item) => {
        const result = unmarshall(item);
        delete result.PK;
        delete result.SK;
        return result;
      }),
    });
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: `${e.message}`,
      event,
    });
  }
};

export const main = middyfy(getAllStudents);
