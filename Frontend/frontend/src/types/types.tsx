export interface IMeeting {
  id?: string;
  summary?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  meetingAttendees?: IMeetingAttendee[];
  notes?: INote[];
  toDoItem?: IToDoItem[];
  // recordings?: IRecordingItem[];
}

export interface IMeetingRequest {
  userId?: string;
  meetingId?: string;
  postDate?: Date;
}

export interface IMeetingAttendee {
  id: string;
  meetingId?: string;
  attended: boolean;
  googleCalendarId: string;
}

export interface INote {
  id?: string;
  ownerId?: string;
  meetingId?: string;
  items?: INoteItem[];
}

export interface INoteItem {
  id?: string;
  noteId?: string;
  title?: string;
  content?: string;
}

export interface Agenda {
  id?: string;
  meetingId?: string;
  items?: AgendaItem[];
}

export interface AgendaItem {
  id?: string;
  agendaId?: string;
  title?: string;
  content?: string;
}

export interface IToDoItem {
  id?: string;
  meetingId?: string;
  title: string;
}

export interface IRecordingItem {
  id?: string;
  meetingId?: string;
  title?: string;
  description?: string;
  file?: string;
}
export default interface IGroupAttendee {
  userId: string;
  groupId?: string;
  attended: boolean;
}

export default interface IGroup {
  id?: string;
  ownerId?: string;
  title?: string;
  description?: string;
  attendees?: IGroupAttendee[];
}
export interface IGroupPostItem {
  id?: string;
  ownerId?: string;
  content?: string;
  groupId?: string;
  postDate?: Date;
}

export interface IUser {
  userId: string;
  userName: string;
  // rating: Rating;
  role: string;
  avatar: string;
}
