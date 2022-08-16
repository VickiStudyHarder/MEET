export interface IMeeting {
  id?: number;
  meetingStart: string;
  meetingEnd: string;
  summary: string;
  description: string;
  location: string;
  googleCalendarId?: string;
  requestId?: string;
  toDoItem?: IToDoItem[];
  notes?: INotes[];
  meetingAttendee?: IMeetingAttendee[];
  agendas?: IAgenda[];
  recordings?: IRecording[];
}
export interface IToDoItem {
  id?: number;
  title: string;
  dueDate: Date;
  assigneeId: string;
  isCompleted?:boolean;
}
export interface INotes {
  id?: number;
  title: string;
  details: string;
  meetingId?: number;
  creatingUserId?: string;
}
export interface IMeetingAttendee {
  id?: number;
  userId: string;
  attended: boolean;
  googleCalendarId: string;
  meetingId? : number;
  user?: IUser;
}
export interface IMeetingResponse {
  meeting: IMeeting;
}
export interface IAgenda {
  id?: number;
  title: string;
  details: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatar: string;
  role: string;
  rating: number;
  totalMeetings: number;
}

export interface IRecording {
  id?: number;
  url: string;
  description: string;
}
