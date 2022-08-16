export interface IMeetingPayload {
  meetingStart: string;
  meetingEnd: string;
  id: number;
  startTime: string;
  endTime: string;
  summary: string;
  description: string;
  location: string;
  attendee: string[];
  toDoItem?: IToDoItem[];
  notes?: INotes[];
  meetingAttendee?: IMeetingAttendee[];
  agendas?: IAgenda[];
  recordings?: IRecording[]
}
export interface IToDoItem {
  id: number;
  title: string;
  dueDate: Date;
  assigneeId: string;
  isCompleted?: boolean;
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
  googleCalendarId: string;
}

export interface IAgenda {
  id: number;
  title: string;
  details: string;
}

export interface IRecording {
  id: number;
  url: string;
  description: string;
}

