import { ActionItem, Rating } from "./basic";
import { IUser } from "./user";

export interface IMeeting {
  meetingId: string;
  mentor: IUser;
  participants: IUser[];
  meetingStart: Date;
  meetingEnd: Date;
  notes: string[];
  ratings: Rating[];
  actionItems: ActionItem[];
}


export interface 