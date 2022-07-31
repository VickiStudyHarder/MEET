import axiosClient from './client'

//These have not been tested

export const createMeeting = (data: any) => {
    return axiosClient.post('/meeting', JSON.stringify(data))
}

export const deleteMeeting = (id: string) => {
    return axiosClient.delete(`/meeting/${id}`)
}

export const updateMeeting = (data: any, id: string) => {
    return axiosClient.put(`/meeting/${id}`, JSON.stringify(data))
}

export const getMeetingById = (meetingId: string) => {
    return axiosClient.get(`/meeting/${meetingId}`)
}

export const getMeetingByUserId = (userId: string) => {
    return axiosClient.get(`/meeting/${userId}/user`)
}
