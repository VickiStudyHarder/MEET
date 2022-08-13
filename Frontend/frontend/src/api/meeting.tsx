import { IMeeting } from '../types/meetings';
import axiosClient from './client';

//These have not been tested

export const createMeeting = async (data: IMeeting) => {
  return await axiosClient.post('/meeting', JSON.stringify(data));
};

export const deleteMeeting = async (id: string) => {
  return await axiosClient.delete(`meeting/${id}`);
};

export const updateMeeting = async (
  data: Partial<IMeeting>,
  id: string
) => {
  return await axiosClient.put(`meeting/${id}`, JSON.stringify(data));
};

export const getMeetingById = async (meetingId: string) => {
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

