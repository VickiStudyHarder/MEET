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
  console.log(event.body);
  try {
    const body = event.body;
    console.log({ body });
    console.log(body.role);
    body['PK'] = `${body.role}#${body.awsUserName}`;
    //body['SK'] = 'userInformation';
    const params = {
      TableName: 'UserTable',
      Item: marshall(body || {}),
      ConditionExpression: 'attribute_not_exists(PK)',
    };
    const result = await db.send(new PutItemCommand(params));
    return formatJSONResponse({
      status: 200,
      message: `User successfully created`,
      event,
      body: `${result}`,
    });
  } catch (e) {
    console.error(e);
    return formatJSONResponse({
      status: 500,
      message: `${e.message}`,
    });
  }
};

export const main = middyfy(create);
