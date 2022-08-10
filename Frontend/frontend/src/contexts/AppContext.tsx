import React from "react";
import IGroup, { IMeeting, IRecordingItem, IUser } from "../types/types";

const AppContext = React.createContext({
  user: {} as unknown as IUser,
  meetings: [] as unknown as IMeeting,
  groups: [] as unknown as IGroup,
});

const getRecordingByMeetingId = (meetingId: string) => {
  return {
    id : "xxx",
    meetingId : "123",
    title : "title",
    description : "des",
    file : "https://",
  } as IRecordingItem;
};

export default { AppContext };
