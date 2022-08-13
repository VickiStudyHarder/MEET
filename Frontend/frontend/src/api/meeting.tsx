import axiosClient from './client';

//These have not been tested

export const createMeeting = async (data: any) => {
  return await axiosClient.post('/meeting', JSON.stringify(data));
};

export const deleteMeeting = async (id: string) => {
  return await axiosClient.delete(`meeting/${id}`);
};

export const updateMeeting = async (data: any, id: string) => {
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
