import { Rating } from "./basic";
import { IMeeting } from "./meeting";

export interface IUser {
  userId: string;
  userName: string;
  rating: Rating;
  role: string;
  avatar: string;
}