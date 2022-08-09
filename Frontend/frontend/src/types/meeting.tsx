import { ActionItem, Rating } from "./basic";
import { IUser } from "./user";

export interface IMeeting {
  meetingId: string;
  ownerId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  zoom: string;
  attendees?: IMeetingAttendee[];
  notes?: INote[];
  todos?: IToDoItem[];
}

export interface IMeetingAttendee {
  userId: string;
  meetingId?: number;
  attended: boolean;
}
export interface INote {
  id?: number;
  ownerId?: number;
  meetingId?: number;
  items? : INoteItem[]
}

export interface INoteItem {
  id?: number;
  noteId?: number;
  title?: string;
  content?: string;
}

export interface Agenda{
  id?:number;
  meetingId?:number;
  items?: AgendaItem[]
}

export interface AgendaItem {
  id?:number;
  agendaId?:number;
  title?:string;
  content?:string
}

export interface IToDoItem {
  id?: number;
  meetingId?:number
  title: string;
}