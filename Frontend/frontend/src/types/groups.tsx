export interface IParticipant {
  id: number;
  groupName: string;
  userId: string;
}
export interface IStudentGroupCard {
  id: number;
  name: string;
  description: string;
  groupParticipant: IParticipant[];
  userIsParticipant: boolean;
  getAllGroups: any;
}

export interface IMessage {
  id?: number;
  groupId: number;
  message: string;
  timeSent: string;
  userId: string;
}
