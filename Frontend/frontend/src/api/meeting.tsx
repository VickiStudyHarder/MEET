import axiosClient from './client';

//These have not been tested

export const createMeeting = async (data: IMeetingPayload) => {
  return await axiosClient.post('/meeting', JSON.stringify(data));
};

export const deleteMeeting = async (id: string) => {
  return await axiosClient.delete(`meeting/${id}`);
};

export const updateMeeting = async (
  data: Partial<IMeetingPayload>,
  id: string
) => {
  return await axiosClient.put(`meeting/${id}`, JSON.stringify(data));
};

export const getMeetingById = async (meetingId: string) => {
  return await axiosClient.get(`meeting/${meetingId}`);
};

export const getMeetingsByUserId = async (userId: string) => {
  try {
    return await axiosClient.get(`meeting/${userId}/user`);
  } catch (err) {
    return null;
  }
};

export interface IMeetingPayload {
  id: number;
  meetingStart: string;
  meetingEnd: string;
  summary: string;
  description: string;
  location: string;
  attendee: string[];
  toDoItems?: IToDoItem[];
  notes?: INotes[];
  attendees?: IMeetingAttendee[];
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
  creatingUserId: string;
}
export interface IMeetingAttendee {
  id: number;
  userId: string;
  attended: boolean;
}
