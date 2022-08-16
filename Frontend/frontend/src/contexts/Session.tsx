// import React, { createContext, useState } from 'react';
// import { IMeeting } from '../types/meeting';
// import { getMeetingsByUserId, createMeeting } from '../api/meeting';

// export type ISessionContext = {
//   getMeeting: (meetingId: string) => any;
//   postMeeting: (meeting: IMeeting) => any;
//   userInfo: any;
//   userMeetings: any;
// };

// const SessionContext = createContext<ISessionContext>({} as ISessionContext);

// export default SessionContext;

// const Session = (props: any) => {
//   const [userInfo, setUserInfo] = useState<any>(null)
//   const [userMeetings, setUserMeetings] = useState<any>(null)

//   const getMeeting = async (meetingId: string) => {
//     const result = await getMeetingsByUserId(meetingId);
//     setUserMeetings(result)
//     return result;
//   };

//   const postMeeting = async (meeting: IMeeting) => {
//     const result = await createMeeting(meeting);
//     return result;
//   };

//   useEffect(() => {
//     const reuslt = getMeeting()
//   })

//   return (
//     <SessionContext.Provider value={{ getMeeting, postMeeting, userInfo, userMeetings }}>
//       {props.children}
//     </SessionContext.Provider>
//   );
// };

// export { Session, SessionContext };

const Session = () => {};
export default Session;
