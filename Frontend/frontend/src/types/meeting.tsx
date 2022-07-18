import { ActionItem, Rating } from "./basic";
import { IUser } from "./user";

export interface IMeeting {
  meetingId: string;
  userId: string;
  participants: string[];
  meetingStart: Date;
  meetingEnd: Date;
  notes: string[];
  ratings: Rating[];
  actionItems: ActionItem[];
}
