import { Rating } from "./basic";
import { IMeeting } from "./meeting";

export interface IUser {
  userId: string;
  userName: string;
  rating: Rating;
  futureMeeting: FutureMeeting[];
  historyMeeting: HistoryMeeting[];
  
}

export interface FutureMeeting {
  meeting: IMeeting;
}

export interface HistoryMeeting {
  meeting: IMeeting;
  attended: boolean;
}

export interface MeetingRating {
  value: number;
  comments: string;
}
