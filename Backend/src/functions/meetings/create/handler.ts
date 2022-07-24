import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PrismaClient } from '@prisma/client';

import schema from './schema';
export interface IMeetingPayload {
  id: number;
  startTime: string;
  endTime: string;
  googleCalendarId: string;
  attendee: string[];
  toDoItems: IToDoItem[];
  notes: INotes[];
  attendees: IMeetingAttendee[];
}
export interface IToDoItem {
  id: number;
  title: string;
  dueDate: Date;
  assigneeId: string;
}
export interface INotes {
  id: number;
  title: string;
  details: string;
  meetingId: number;
}

export interface IMeetingAttendee {
  id: number;
  userId: string;
  attended: boolean;
}

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const prisma = new PrismaClient();
  const meeting: IMeetingPayload = event.body as unknown as IMeetingPayload;
  try {
    const result = await prisma.meeting.create({
      data: {
        startTime: new Date(meeting.startTime),
        endTime: new Date(meeting.endTime),
        googleCalendarId: meeting.googleCalendarId,
        toDoItem: {
          createMany: {
            data: meeting.toDoItems
          }
        },
        notes : {
          createMany: {
            data: meeting.notes
          }
        },
        meetingAttendee: {
          createMany: {
            data: meeting.attendees
          }
        }
      },
      include : {
        toDoItem: true,
        notes: true,
        meetingAttendee: true
      }
    });
    return formatJSONResponse({
      status: 200,
      message: ``,
      event,
      body: result,
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
