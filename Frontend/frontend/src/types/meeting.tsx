export interface IMeeting {
    userId: string;
    meetingStart: Date;
    meetingEnd: Date;
    participants: string[];
    notes: string[];
    ratings: Rating[];
    actionItems: ActionItem[];
}

export interface Rating {
    value: number;
    comments: string;
}

export interface ActionItem {
    title: string;
    description: string;
    dueDate: Date;
}

