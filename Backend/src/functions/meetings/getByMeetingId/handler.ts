import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getByMeetingId: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  console.log(event.pathParameters);
  try {
    return formatJSONResponse({
      statusCode: 200,
      message: `${event}`,
      body: "",
    });
  } catch (e) {
    return formatJSONResponse({
      statusCode: 500,
      message: `${e.message}`,
      event,
    });
  }
};

export const main = middyfy(getByMeetingId);
