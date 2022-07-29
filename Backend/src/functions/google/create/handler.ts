import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PrismaClient } from '@prisma/client';
const { google } =  require('googleapis')

import schema from './schema';

const createCalendarEvent: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();

  const CREDENTIALS = JSON.parse(process.env.GOOGLE_CREDENTIALS)
  const calendarId = process.env.CALENDAR_ID

  const SCOPES = 'https://www.googleapis.com/auth/calendar';
  const calendar = google.calendar({version : "v3"});

  console.log(CREDENTIALS.type)

  var calendarEvent = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2022-07-29T13:00:00',
      'timeZone': 'Australia/Sydney',
    },
    'end': {
      'dateTime': '2022-07-29T14:00:00',
      'timeZone': 'Australia/Sydney',
    }
  };

  console.log(CREDENTIALS.client_email)
  console.log(CREDENTIALS.private_key)
  
  const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
  )

  try {
    const response = await calendar.events.insert({
      auth,
      calendarId,
      resource: calendarEvent
    })

    return formatJSONResponse({
      status: 200,
      message: ``,
      event,
      body: response
    });
  } catch (e) {
    console.error(e);
    return formatJSONResponse({
      status: 500,
      message: `${e.message}}`,
      event
    });
  }
};

export const main = middyfy(createCalendarEvent);
