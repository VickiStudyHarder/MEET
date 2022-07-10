import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { IMeeting } from '../types/meeting';
import Api from '../utils/Api';

export type IMeetingContext = {
  getMeetingById: (meetingId: string) => any;
  getUpcomingMeetings: (userId: string) => any;
  postMeeting: (meeting: IMeeting) => any;
};

const MeetingContext = createContext<IMeetingContext>({} as IMeetingContext);

export default MeetingContext;

const Meeting = (props: any) => {
  const getMeetingById = async (meetingId: string) => {
    const result = await Api.get(`meeting/${meetingId}`);
    return result;
  };

  const getUpcomingMeetings = async (userId: string) => {
    const result = await Api.get(`meeting/latest/${userId}`);
    return result;
  };

  const postMeeting = async (meeting: IMeeting) => {
    console.log({meeting})
    const result = await Api.post(`meeting`, meeting);
    console.log({result})
    return result;
  };

  return (
    <MeetingContext.Provider
      value={{ getMeetingById, getUpcomingMeetings, postMeeting }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export { Meeting, MeetingContext };
