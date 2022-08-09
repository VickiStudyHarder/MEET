import React, {
  createContext,
} from 'react';
import { IMeeting } from '../types/types';
import { getMeetingById, createMeeting } from '../api/meeting';

export type IMeetingContext = {
  getMeeting: (meetingId: string) => any;
  postMeeting: (meeting: IMeeting) => any;
};

const MeetingContext = createContext<IMeetingContext>({} as IMeetingContext);

export default MeetingContext;

const Meeting = (props: any) => {
  const getMeeting = async (meetingId: string) => {
    const result = await getMeetingById(meetingId);
    return result;
  };

  const postMeeting = async (meeting: IMeeting) => {
    const result = await createMeeting(meeting);
    return result;
  };

  return (
    <MeetingContext.Provider
      value={{ getMeeting, postMeeting }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export { Meeting, MeetingContext };
