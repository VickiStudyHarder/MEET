export interface IMeeting {
  id: number;
  meetingStart: string;
  meetingEnd: string;
  summary: string;
  description: string;
  location: string;
  attendee: string[];
  toDoItem?: IToDoItem[];
  notes?: INotes[];
  attendees?: IMeetingAttendee[];
  agendas?: IAgenda[];
}
export interface IToDoItem {
  id?: number;
  title: string;
  dueDate: Date;
  assigneeId: string;
}
export interface INotes {
  id?: number;
  title: string;
  details: string;
  meetingId: number;
}
export interface IMeetingAttendee {
  id: number;
  userId: string;
  attended: boolean;
}
export interface IMeetingResponse {
  meeting: IMeeting;
}
export interface IAgenda {
  id: number;
  title: string;
  details: string;
}
