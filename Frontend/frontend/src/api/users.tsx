import axiosClient from "./client";

//These have not been tested

export const createUser = (data: any) => {
  return axiosClient.post("/user", JSON.stringify(data));
};

export const deleteUser = (id: string) => {
  return axiosClient.delete(`/user/${id}`);
};

export const getUser = async (id: string) => {
  const resp = await axiosClient.get(`/user/${id}`);
  console.log(`getUser:${id}`, resp);
  return resp.data.body;
};

export const updateUser = (data: any, id: string) => {
  return axiosClient.put(`/user/${id}`, JSON.stringify(data));
};

export const getMentors = async () => {
  const resp = await axiosClient.get(`/mentors`);
  return resp.data.body;
};

export const getStudents = async () => {
  const resp = await axiosClient.get(`/students`);
  return resp.data.body;
};

export const rateMentor = async (rating: number, id: string) => {
  console.log("Rate Mentor");
  const resp = await axiosClient.put(
    `/rate/${id}`,
    JSON.stringify({ rating: rating })
  );
  return resp.data.body;
};
