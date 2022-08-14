import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../utils/auth/UserPool";
import { useNavigate } from "react-router-dom";
import { array } from "prop-types";
import { IMeeting } from "../types/types";
import { getMentors, getUser } from "../api/users";
import {
  createMeeting,
  getMeetingById,
  getMeetingsByUserId,
  updateMeeting,
} from "../api/meeting";

export type users = "student" | "mentor" | "";

export type IAppContext = {
  authenticate: (Username: string, Password: string) => Promise<void>;
  getSession: () => Promise<unknown>;
  logout: () => void;
  isAuthenticated: boolean;
  email: string;
  password: string;
  courses: string[];
  userType: string;
  error: any;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setCourses: Dispatch<SetStateAction<any>>;
  setUserType: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  isCodeSent: boolean;
  setIsCodeSent: Dispatch<SetStateAction<boolean>>;
  confirmationCode: string;
  setConfirmationCode: Dispatch<SetStateAction<string>>;
  username: string;
  userMeetings: any;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  dateOfBirth: Date | null;
  setDateOfBirth: Dispatch<SetStateAction<Date | null>>;
  setGoogleAuthToken: Dispatch<SetStateAction<string>>;
  googleAuthToken: string;
  selectedMentor: any;
  selectedStudent: any;
  allMentors: any;
  studentBookedMeetings: any;
  mentorAvailableMeetings: any;
  mentorMeetings: any;
  futureMeetings: any;
  meetingRequests: any;
  inMeetingAgenda: any;
  inMeetingNote: any;
  selectedAgenda: any;
  meetingNotes: any;
  selectedNote: any;
  meetingTodos: any;
  meetingRecordings: any;
  selectedRecording: any;
};

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;

const AppContextProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("z3417347@gmail.com");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [courses, setCourses] = useState([]);
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [username, setUsername] = useState("");
  const [userMeetings, setUserMeetings] = useState<any>(null);
  const [googleAuthToken, setGoogleAuthToken] = useState("");

  // exposed vars
  const [selectedMentor, setSelectedMentor] = useState({}); //选中的导师
  const [selectedStudent, setSelectedStudent] = useState({});
  const [allMentors, setAllMentors] = useState([{}]); //导师列表
  const [studentBookedMeetings, setStudentBookedMeetings] = useState([{}]); //学生模式下已被学生预定的当前老师的会议
  const [mentorAvailableMeetings, setMentorAvailableMeetings] = useState([{}]); //学生模式下当前老师的可被预定会议
  const [mentorMeetings, setMentorMeetings] = useState([{}]); //老师模式下自己的meeting

  const [futureMeetings, setFutureMeetings] = useState<any>([{}]); //老师模式下未来的会议
  const [meetingRequests, setMeetingsRequests] = useState<any>([{}]); //老师模式下学生的所有入会请求

  const [inMeetingAgenda, setInMeetingAgenda] = useState<any>({});
  const [inMeetingNote, setInMeetingNote] = useState<any>({});

  const [selectedAgenda, setSeletedAgenda] = useState({});

  const [meetingNotes, setMeetingNotes] = useState<any>([]);
  const [selectedNote, setSelectedNote] = useState<any>({});

  const [meetingTodos, setMeetingTodos] = useState<any>([{}]);

  const [meetingRecordings, setMeetingRecordings] = useState<any>([{}]);
  const [selectedRecording, setSelectedRecording] = useState<any>([{}]);

  // context local vars

  const navigate = useNavigate();

  const getMeeting = async (userId: string) => {
    let resp = await getMeetingsByUserId(userId);
    console.log(`get meeting by user id ${userId}:`, resp);
    if (resp?.data?.statusCode === 200) {
      const data = resp?.data?.body;
      if (data.length > 0) {
        const mapped = data?.map((item: any) => ({
          ...item,
          startable:
            Date.now() / 1000 - Date.parse(item.startTime) / 1000 < 8 * 60
              ? true
              : false,
          startTime: Date.parse(item.startTime),
          endTime: Date.parse(item.endTime),
        }));
        const sorted = mapped?.sort(
          (a: any, b: any) => Number(a.startTime) - Number(b.startTime)
        );
        console.log(`sort meeting by user id ${userId}:`, sorted);
        setUserMeetings(sorted);
      }
    } else {
      console.error(
        "getMeetingsByUserId is invalid on remote",
        resp?.data?.message
      );
    }
  };

  useEffect(() => {
    getMeeting(email);
  }, [email]);

  useEffect(() => {
    setSelectedMentor({
      id: "",
      name: "",
      rating: 5,
      avatar: "",
    });
    setSelectedStudent({
      id: "",
      name: "",
      rating: 5,
      avatar: "",
    });
    setAllMentors([{ id: "", avatar: "", name: "" }]);
    setStudentBookedMeetings([{ id: "", title: "", start: "", end: "" }]);
    setMentorAvailableMeetings([{ id: "", title: "", start: "", end: "" }]);
    setMentorMeetings([{ id: "", title: "", start: "", end: "" }]);
    setFutureMeetings([
      {
        id: "",
        start: "",
        end: "",
        date: { day: "01", month: "DEC", year: "2022" },
        title: "name 1",
        time: "12:00 - 13:00",
      },
    ]);
    setMeetingsRequests([
      {
        requestId: "",
        meetingId: "",
        userId: "",
        avatar: "",
        usreName: "",
        courseName: "",
        title: "",
        rating: 5,
        meetingTime: "",
      },
    ]);
    setMeetingTodos([
      {
        meetingId: "",
        option: {
          show: true,
          showAdd: true,
        },
        title: "meeting 1",
        task: [
          {
            name: "to do item",
            isCompleted: false,
            isDeleted: false,
            isEditing: false,
          },
          {
            name: "to do item",
            isCompleted: false,
            isDeleted: false,
            isEditing: false,
          },
          {
            name: "to do item",
            isCompleted: false,
            isDeleted: false,
            isEditing: false,
          },
          {
            name: "to do item",
            isCompleted: false,
            isDeleted: false,
            isEditing: false,
          },
        ],
      },
      {
        meetingId: "",
        option: {
          show: true,
          showAdd: true,
        },
        title: "meeting 2",
        task: [
          {
            name: "to do item",
            isCompleted: false,
            isDeleted: false,
            isEditing: false,
          },
          {
            name: "to do item",
            isCompleted: false,
            isDeleted: false,
            isEditing: false,
          },
          {
            name: "to do item",
            isCompleted: false,
            isDeleted: false,
            isEditing: false,
          },
        ],
      },
    ]);
    setInMeetingAgenda({
      meetingId: "",
      agenda: [
        { itemId: "", title: "", content: "" },
        { itemId: "", title: "", content: "" },
      ],
    });
    setInMeetingNote({
      meetingId: "",
      note: [{ itemId: "", title: "", content: "" }],
    });
    setMeetingNotes([
      { meetingId: "", userId: "", avatar: "", title: "", description: "" },
    ]);
    setSelectedNote({
      meetingId: "",
      note: [{ id: "", title: "", content: "" }],
    });
    setMeetingRecordings([
      {
        meetingId: "",
        recording: [
          { id: "", title: "", cover: "", file: "" },
          { id: "", title: "", cover: "", file: "" },
        ],
      },
    ]);
    getFutureMeetings("z3417347@gmail.com");
    getAllMentors();
  }, []);

  const getFutureMeetings = async (userId: string) => {
    const resp = await getMeetingsByUserId(userId);
    if (resp?.status === 200) {
      let meetings = resp?.data?.body;
      meetings = meetings.map((item: any) => ({
        id: item.id,
        startTime: Date.parse(item.startTime),
        endTime: Date.parse(item.endTime),
        title: item.title,
        description: item.description,
      }));
      meetings = meetings.sort((a: any, b: any) => {
        return a.startTime > b.startTime;
      });
      setFutureMeetings(meetings);
    } else {
      console.error(resp?.data);
    }
  };

  const getAllMentors = async () => {
    const resp = await getMentors();
    if (resp?.status === 200) {
      let mentors = resp?.data?.body;
      mentors = mentors.map((item: any) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        rating: item.rating,
      }));
      setAllMentors(mentors);
    } else {
      console.error(resp?.data);
    }
  };

  const getSelectedMentor = async (mentorId: string) => {
    const resp = await getUser(mentorId);
    if (resp?.status === 200) {
      let mentor = resp?.data?.body;
      mentor = {
        id: mentor.id,
        firstName: mentor.firstName,
        lastName: mentor.lastName,
        rating: mentor.rating,
      };
      setSelectedMentor(mentor);
    } else {
      console.error(resp?.data);
    }
  };

  const getSelectedStudent = async (studentId: string) => {
    const resp = await getUser(studentId);
    if (resp?.status === 200) {
      let student = resp?.data?.body;
      student = {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        rating: student.rating,
      };
      setSelectedStudent(student);
    } else {
      console.error(resp?.data);
    }
  };

  const getStudentBookedMeetings = async (studentId: string) => {
    const resp = await getMeetingsByUserId(studentId);
    if (resp?.status === 200) {
      let meetings = resp?.data?.body;
      meetings = meetings.map((x: any) => ({
        id: x.id,
        startTime: Date.parse(x.startTime),
        endTime: Date.parse(x.endTime),
        title: x.title,
        description: x.description,
      }));
      meetings = meetings.filter((x: any) => {
        return x.startTime > Date.now();
      });
      setStudentBookedMeetings(meetings);
    } else {
      console.error(resp?.data);
    }
  };

  const getMentorAvailableMeetings = async (mentorId: string) => {
    const resp = await getMeetingsByUserId(mentorId);
    if (resp?.status === 200) {
      let meetings = resp?.data?.body;
      meetings = meetings.map((x: any) => ({
        id: x.id,
        startTime: Date.parse(x.startTime),
        endTime: Date.parse(x.endTime),
        title: x.title,
        description: x.description,
      }));
      meetings = meetings.filter((x: any) => {
        return x.startTime > Date.now();
      });
      setMentorAvailableMeetings(meetings);
    } else {
      console.error(resp?.data);
    }
  };

  const getMentorMeetings = async (mentorId: string) => {
    const resp = await getMeetingsByUserId(mentorId);
    if (resp?.status === 200) {
      let meetings = resp?.data?.body;
      meetings = meetings.map((x: any) => ({
        id: x.id,
        startTime: Date.parse(x.startTime),
        endTime: Date.parse(x.endTime),
        title: x.title,
        description: x.description,
      }));
      setMentorMeetings(meetings);
    } else {
      console.error(resp?.data);
    }
  };

  const getMeetingTodos = async (userId: string) => {
    const resp = await getMeetingsByUserId(userId);
    if (resp?.status === 200) {
      let meetings = resp?.data?.body;
      meetings = meetings.map((m: any) => ({
        meetingId: m.id,
        option: {
          show: true,
          showAdd: true,
        },
        title: m.title,
        task: m.toDoItems.map((td: any) => ({
          id: td.id,
          name: td.title,
          isCompleted: false,
          isDeleted: false,
          isEditing: false,
        })),
      }));
      setMentorMeetings(meetings);
    } else {
      console.error(resp?.data);
    }
  };

  const getInMeetingAgenda = async (meetingId: number) => {
    const resp = await getMeetingById(meetingId);
    if (resp?.status === 200) {
      let meeting = resp?.data?.body;
      const agenda = {
        meetingId: meeting,
        agenda: meeting.agendas.map((x: any) => ({
          itemId: x.id,
          title: x.title,
          content: x.content,
        })),
      };
      setInMeetingAgenda(agenda);
    } else {
      console.error(resp?.data);
    }
  };

  const getInMeetingNote = async (meetingId: number) => {
    const resp = await getMeetingById(meetingId);
    if (resp?.status === 200) {
      let meeting = resp?.data?.body;
      const note = {
        meetingId: meeting,
        note: meeting.notes.map((x: any) => ({
          itemId: x.id,
          title: x.title,
          content: x.details,
        })),
      };
      setInMeetingNote(note);
    } else {
      console.error(resp?.data);
    }
  };

  const getMeetingNotes = async (meetingId: number, userId: string) => {
    const resp = await getMeetingById(meetingId);
    if (resp?.status === 200) {
      let meeting = resp?.data?.body;
      const note = meeting.notes.filter((x: any) => {
        return x.userId === userId;
      });
      setInMeetingNote(note);
    } else {
      console.error(resp?.data);
    }
  };

  const getMeetingRecordings = async (meetingId: number) => {
    const resp = await getMeetingById(meetingId);
    if (resp?.status === 200) {
      let meeting = resp?.data?.body;
      const recordings = {
        meetingId: meetingId,
        recordings: meeting.recordings.map((x: any) => ({
          id: x.id,
          title: x.title,
          cover: "",
          file: x.file,
        })),
      };
      setMeetingRecordings(recordings);
    } else {
      console.error(resp?.data);
    }
  };

  const bookMeeting = async (meetingId: number, userId: string) => {
    const attendee = { id: meetingId, userId: userId, attended: false };
      let meeting: any = await (await getMeetingById(meetingId))?.data?.body;
      if (meeting?.attendees) {
        meeting.attendees.push(attendee);
        const ret = await updateMeeting(meeting, meetingId);
        console.log("book meeting", ret);
      }
  };

  const cancelMeeting = async (meetingId: number, userId: string) => {
      let meeting: any = await (await getMeetingById(meetingId))?.data?.body;
      if (meeting?.attendees) {
        meeting.attendees = meeting.attendees.filter((x: any) => {
          return x.userId !== userId;
        });
        const ret = await updateMeeting(meeting, meetingId);
        console.log("cancel meeting", ret);
      }
  };

  const addMeeting = async (
    title: string,
    desc: string,
    startTime: any,
    endTime: any,
    userId: string
  ) => {
    const meeting = {
      startTime: startTime,
      endTime: endTime,
      summary: title,
      description: desc,
      location: "",
      attendees: [{ userId: userId, attended: false }],
      toDoItems: [],
      notes: [],
    };
    const ret = await createMeeting(meeting);
    console.log("create meeting:", ret);
  };

  const deleteMeeting = async (meetingId: number) => {
    const ret = await deleteMeeting(meetingId);
    console.log("delete meeting", ret);
  };

  const createAgenda = async (title:string, content:string,meetingId:number) => {
    let meeting: any = await (await getMeetingById(meetingId))?.data?.body;
      if (meeting?.attendees) {
        meeting.attendees = meeting.attendees.filter((x: any) => {
          return x.userId !== userId;
        });
        const ret = await updateMeeting(meeting, meetingId);
        console.log("cancel meeting", ret);
      }
  };

  const deleteAgenda = async (agendaId) => {};

  const deleteNote = async (noteId) => {};

  const createNote = async (title, desc) => {};

  const rate = async (mentorId, rating) => {};

  const setTodo = async (todos) => {};

  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession(async (err: any, session: any) => {
          if (err) {
            setIsAuthenticated(false);
            reject();
          } else {
            const attributes: any = await new Promise((resolve, reject) => {
              user.getUserAttributes((err: any, attributes: any) => {
                if (err) {
                  reject(err);
                } else {
                  const results: any = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  setIsAuthenticated(true);
                  resolve(results);
                }
              });
            });

            const token = session.getIdToken().getJwtToken();

            setIsAuthenticated(true);
            resolve({
              user,
              headers: {
                Authorization: token,
              },
              ...session,
              ...attributes,
            });
          }
        });
      } else {
        setIsAuthenticated(false);
        reject();
      }
    });

  const authenticate = async (Username: string, Password: string) => {
    await new Promise((resolve, reject) => {
      console.log(Username);
      const user = new CognitoUser({ Username, Pool: UserPool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      console.log({ authDetails });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess", data);
          console.log(data.getAccessToken().getJwtToken());
          setIsAuthenticated(true);
          const user = UserPool.getCurrentUser();
          console.log(user);
          if (user) {
            const username = user.getUsername();
            setUsername(username);
            setEmail(Username);
          }
          resolve(data);
        },
        onFailure: (err) => {
          console.error("onFailure", err);
          setIsAuthenticated(false);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired", data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <AppContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        isAuthenticated,
        email,
        setEmail,
        password,
        setPassword,
        courses,
        setCourses,
        userType,
        setUserType,
        error,
        setError,
        isCodeSent,
        setIsCodeSent,
        confirmationCode,
        setConfirmationCode,
        username,
        userMeetings,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        dateOfBirth,
        setDateOfBirth,
        setGoogleAuthToken,
        googleAuthToken,
        selectedMentor,
        selectedStudent,
        allMentors,
        studentBookedMeetings,
        mentorAvailableMeetings,
        mentorMeetings,
        futureMeetings,
        meetingRequests,
        inMeetingAgenda,
        inMeetingNote,
        selectedAgenda,
        meetingNotes,
        selectedNote,
        meetingTodos,
        meetingRecordings,
        selectedRecording,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
