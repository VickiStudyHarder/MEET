import axiosClient from './client';

interface Group {
  id?: number;
  name: string;
  description: string;
}

export const createGroup = async (group: Group) => {
  const data = JSON.stringify(group);
  return await axiosClient.post(`/group`, data);
};

export const joinGroup = async (userId: string, name: string) => {
  const data = JSON.stringify({ userId: userId, name: name });
  return await axiosClient.post(`/group/join`, data);
};

export const leaveGroup = async (userId: string, name: string) => {
  const data = JSON.stringify({ userId: userId, name: name });
  return await axiosClient.post(`/group/leave`, data);
};

export const getGroups = async () => {
  const result = await axiosClient.get('/group');
  return result.data.body;
};

export const getGroupById = async (id: number) => {
  return await axiosClient.get(`/group/${id}`);
};
