import { IMeeting } from '../types/meetings';
import axiosClient from './client';

//These have not been tested

export const createMeeting = async (data: IMeeting) => {
  return await axiosClient.post('/meeting', JSON.stringify(data));
};

export const deleteMeeting = async (id: number) => {
  return await axiosClient.delete(`meeting/${id}`);
};

export const updateMeeting = async (
  data: Partial<IMeeting>,
  id: number
) => {
  return await axiosClient.put(`meeting/${id}`, JSON.stringify(data));
};

export const getMeetingById = async (meetingId: number) => {
  const result = await axiosClient.get(`meeting/${meetingId}`);
  return result.data.body
};

export const getMeetingsByUserId = async (userId: string) => {
  try {
    const result = await axiosClient.get(`meeting/${userId}/user`);
    return result.data.body;
  } catch (err) {
    return null;
  }
};

export const deleteNote = async (id: number) => {
  const result = await axiosClient.delete(`note/${id}`);
  return result.data.body
};

export const deleteToDoItem = async (id: number) => {
  const result = await axiosClient.delete(`todo/${id}`);
  return result.data.body
};

export const deleteAgendaItem = async (id: number) => {
  const result = await axiosClient.delete(`agenda/${id}`);
  return result.data.body
};

export const deleteRecordingItem = async (id: number) => {
  const result = await axiosClient.delete(`recording/${id}`);
  return result.data.body
};


