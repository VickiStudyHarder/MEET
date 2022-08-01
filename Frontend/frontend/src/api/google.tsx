import axiosClient from './client'

export const createToken = (token: string, username: string) => {
    const data = JSON.stringify({"token" :token})
    return axiosClient.post(`/google/createToken/${username}`, data)
}