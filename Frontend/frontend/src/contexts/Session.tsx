import React, { createContext } from 'react';
import { IMeeting } from '../types/meeting';
import { getMeetingById, createMeeting } from '../api/meeting';

export type ISessionContext = {
  getMeeting: (meetingId: string) => any;
  postMeeting: (meeting: IMeeting) => any;
};

const SessionContext = createContext<ISessionContext>({} as ISessionContext);

export default SessionContext;

const Session = (props: any) => {
  const getMeeting = async (meetingId: string) => {
    const result = await getMeetingById(meetingId);
    return result;
  };

  const postMeeting = async (meeting: IMeeting) => {
    const result = await createMeeting(meeting);
    return result;
  };

  return (
    <SessionContext.Provider value={{ getMeeting, postMeeting }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export { Session, SessionContext };
