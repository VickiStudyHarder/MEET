import { IMessage } from '../types/groups';
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
  return await axiosClient.put(`/group/join`, data);
};

export const leaveGroup = async (userId: string, name: string) => {
  const data = JSON.stringify({ userId: userId, name: name });
  console.log({data})
  return await axiosClient.put(`/group/leave`, data);
};

export const getGroups = async () => {
  const result = await axiosClient.get('/group');
  return result.data.body;
};

export const getGroupById = async (id: number) => {
  const result = await axiosClient.get(`/group/${id}`);
  return result.data.body;
};

export const sendMessage = async(message: IMessage) => {
  const result = await axiosClient.post('/sendMessage', JSON.stringify(message))
  return result.data.body
}