import { ActionItem, Rating } from "./basic";
import { IUser } from "./user";

export interface IMeeting {
  meetingId: string;
  userId: string;
  summary: string;
  description: string;
  location: string;
  meetingStart: Date;
  meetingEnd: Date;
  toDoItems?: IToDoItem[];
  notes?: INotes[];
  attendees?: IMeetingAttendee[];
}

export interface IToDoItem {
  id?: number;
  title: string;
  dueDate: Date;
  assigneeId?: string;
}
export interface INotes {
  id?: number;
  title: string;
  details: string;
  meetingId?: number;
}

export interface IMeetingAttendee {
  id?: number;
  userId: string;
  attended: boolean;
}
