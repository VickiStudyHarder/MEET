import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { MeetingAttendee, PrismaClient } from "@prisma/client";
import oauth2Client from "@libs/oauth2-client";

import { google } from "googleapis";

import schema from "./schema";
const prisma = new PrismaClient();

const remove: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const meetingAttendees = await prisma.meetingAttendee.findMany({
      where: {
        meetingId: Number(event.pathParameters.id),
      },
    });

    //console.log({meetingAttendees})

    await deleteGoogleMeeting(
      meetingAttendees,
      Number(event.pathParameters.id)
    );

    const result = await prisma.meeting.delete({
      where: {
        id: Number(event.pathParameters.id),
      },
    });
    return formatJSONResponse({
      status: 200,
      message: ``,
      event,
      body: "",
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

const deleteGoogleMeeting = async (
  meetingAttendees: MeetingAttendee[],
  meetingId: number
) => {
  const meetingData = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
  });

  const result = await Promise.all(
    meetingAttendees.map(async (attendee: MeetingAttendee) => {
      try {
        const token = await prisma.tokens.findUnique({
          where: {
            userId: attendee.userId,
          },
        });

        oauth2Client.setCredentials({ refresh_token: token.refreshToken });
        const calendar = google.calendar("v3");

        return await calendar.events.delete({
          auth: oauth2Client,
          calendarId: "primary",
          eventId: meetingData.requestId,
        });
      } catch (e) {
        console.error(e);
        return;
      }
    })
  );
  return result;
};

export const main = middyfy(remove);
