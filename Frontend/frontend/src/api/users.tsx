import axiosClient from './client';

//These have not been tested

export const createUser = (data: any) => {
  return axiosClient.post('/user', JSON.stringify(data));
};

export const deleteUser = (id: string) => {
  return axiosClient.delete(`/user/${id}`);
};

export const getUser = (id: string) => {
  return axiosClient.get(`/user/${id}`);
};

export const updateUser = (data: any, id: string) => {
  return axiosClient.put(`/user/${id}`, JSON.stringify(data));
};

export const getMentors = () => {
  return axiosClient.get(`/mentors`);
};

export const getStudents = () => {
  return axiosClient.get(`/students`);
};
