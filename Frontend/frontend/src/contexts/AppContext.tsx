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
import {
  IMeeting,
  IToDoItem,
  INotes,
  IMeetingAttendee,
  IAgenda,
} from "../types/meetings";
import { getMentors, getUser } from "../api/users";
import {
  createMeeting,
  deleteAgendaItem,
  deleteMeeting,
  deleteNote,
  deleteRecordingItem,
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
  mentorBookedMeetings: any;
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
  setMeetingTodos: any;
  meetingRecordings: any;
  selectedRecording: any;
  getFutureMeetings: any;
  getAllMentors: any;
  getSelectedMentor: any;
  getSelectedStudent: any;
  getMentorBookedMeetings: any;
  getMentorAvailableMeetings: any;
  getMentorMeetings: any;
  getMeetingTodos: any;
  getInMeetingAgenda: any;
  getInMeetingNote: any;
  getSelectedNotes: any;
  getMeetingRecordings: any;
  getSelectedAgenda: any;
  getSelectedRecording: any;
  bookMeeting: any;
  cancelMeeting: any;
  addMeeting: any;
  removeMeeting: any;
  addAgenda: any;
  removeAgenda: any;
  addNote: any;
  removeNote: any;
  addRecording: any;
  removeRecording: any;
  updateMeetingTodos:any;
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
  const [mentorBookedMeetings, setMentorBookedMeetings] = useState([{}]); //学生模式下已被学生预定的当前老师的会议
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

  const [mentorAvailableTimeOfDay,setMentorAvailableTimeOfDay] = useState([])

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
    setMentorBookedMeetings([{ id: "", title: "", start: "", end: "" }]);
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
    setSeletedAgenda({
      meetingId: "",
      items: [{ id: "", title: "", content: "" }],
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
    let meetings = await getMeetingsByUserId(userId);
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
  };

  const getAllMentors = async () => {
    let mentors = await getMentors();
    mentors = mentors.map((item: any) => ({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      rating: item.rating,
    }));
    setAllMentors(mentors);
  };

  const getSelectedMentor = async (mentorId: string) => {
    let mentor = await getUser(mentorId);
    mentor = {
      id: mentor.id,
      firstName: mentor.firstName,
      lastName: mentor.lastName,
      rating: mentor.rating,
    };
    setSelectedMentor(mentor);
  };

  const getSelectedStudent = async (studentId: string) => {
    let student = await getUser(studentId);
    student = {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      rating: student.rating,
    };
    setSelectedStudent(student);
  };

  const getMentorBookedMeetings = async (
    studentId: string,
    mentorId: string
  ) => {
    let meetings = await getMeetingsByUserId(studentId);
    meetings = meetings.map((x: any) => ({
      id: x.id,
      startTime: Date.parse(x.startTime),
      endTime: Date.parse(x.endTime),
      title: x.title,
      description: x.description,
    }));
    meetings = meetings.filter((x: any) => {
      return (
        x.startTime > Date.now() &&
        x.meetingAttendee.some((y: any) => {
          return y.userId === mentorId;
        })
      );
    });
    setMentorBookedMeetings(meetings);
  };

  const getMentorAvailableMeetings = async (
    mentorId: string,
    studentId: string
  ) => {
    let meetings = await getMeetingsByUserId(mentorId);
    meetings = meetings.map((x: any) => ({
      id: x.id,
      startTime: Date.parse(x.startTime),
      endTime: Date.parse(x.endTime),
      title: x.title,
      description: x.description,
    }));
    meetings = meetings.filter((x: any) => {
      return (
        x.startTime > Date.now() &&
        x.meetingAttendee.some((y: any) => {
          return y.userId === studentId;
        })
      );
    });
    setMentorAvailableMeetings(meetings);
  };

  const getMentorMeetings = async (mentorId: string) => {
    let meetings = await getMeetingsByUserId(mentorId);
    meetings = meetings.map((x: any) => ({
      id: x.id,
      startTime: Date.parse(x.startTime),
      endTime: Date.parse(x.endTime),
      title: x.title,
      description: x.description,
    }));
    setMentorMeetings(meetings);
  };

  // const getMentorAvalableTimeOfDay = async (mentorId: string,date:Date) => {
  //   let meetings = await getMeetingsByUserId(mentorId);
  //   meetings = meetings.map((x: any) => ({
  //     id: x.id,
  //     startTime: Date.parse(x.startTime),
  //     endTime: Date.parse(x.endTime),
  //     title: x.title,
  //     description: x.description,
  //   }));
  //   meetings = meetings.filter((x:any)=>{return x.startTime.getDay() === date.getDay()})
  //   const []
  // };

  const getMeetingTodos = async (userId: string) => {
    let meetings = await getMeetingsByUserId(userId);
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
  };

  const getInMeetingAgenda = async (meetingId: number) => {
    let meeting = await getMeetingById(meetingId);
    const agenda = {
      meetingId: meeting,
      agenda: meeting.agendas.map((x: any) => ({
        itemId: x.id,
        title: x.title,
        content: x.content,
      })),
    };
    setInMeetingAgenda(agenda);
  };

  const getInMeetingNote = async (meetingId: number) => {
    let meeting = await getMeetingById(meetingId);
    const note = {
      meetingId: meeting,
      note: meeting.notes.map((x: any) => ({
        itemId: x.id,
        title: x.title,
        content: x.details,
      })),
    };
    setInMeetingNote(note);
  };

  const getSelectedNotes = async (meetingId: number, userId: string) => {
    let meeting = await getMeetingById(meetingId);
    const note = meeting.notes.filter((x: any) => {
      return x.userId === userId;
    });
    setInMeetingNote(note);
  };

  const getMeetingRecordings = async (meetingId: number) => {
    let meeting = await getMeetingById(meetingId);
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
  };

  const getSelectedAgenda = async (meetingId: number) => {
    let meeting = await getMeetingById(meetingId);
    const obj = meeting.agendas;
    setSeletedAgenda(obj);
  };

  const getSelectedRecording = async (meetingId: number) => {
    let meeting = await getMeetingById(meetingId);
    const obj = meeting.recordings;
    setSelectedRecording(obj);
  };

  const bookMeeting = async (
    meetingId: number,
    studentId: string,
    mentorId: string
  ) => {
    const attendee = { id: meetingId, userId: studentId, attended: false };
    let meeting: any = await getMeetingById(meetingId);
    if (meeting?.attendees) {
      meeting.attendees.push(attendee);
      const ret = await updateMeeting(meeting, meetingId);
      console.log("book meeting", ret);
      getMentorBookedMeetings(studentId, mentorId);
      getMentorAvailableMeetings(mentorId, studentId);
    }
  };

  const cancelMeeting = async (
    meetingId: number,
    studentId: string,
    mentorId: string
  ) => {
    let meeting: any = await getMeetingById(meetingId);
    if (meeting?.attendees) {
      meeting.attendees = meeting.attendees.filter((x: any) => {
        return x.userId !== studentId;
      });
      const ret = await updateMeeting(meeting, meetingId);
      console.log("cancel meeting", ret);
      getMentorBookedMeetings(studentId, mentorId);
      getMentorAvailableMeetings(mentorId, studentId);
    }
  };

  const addMeeting = async (
    title: string,
    desc: string,
    startTime: string,
    endTime: string,
    mentorId: string
  ) => {
    const meeting = {
      meetingStart: startTime,
      meetingEnd: endTime,
      summary: title,
      description: desc,
      location: "",
      meetingAttendees: [{ userId: mentorId, attended: false }],
    } as IMeeting;
    const ret = await createMeeting(meeting);
    console.log("create meeting:", ret);
    getMentorMeetings(mentorId);
  };

  const removeMeeting = async (meetingId: number, mentorId: string) => {
    const ret = await deleteMeeting(meetingId);
    console.log("delete meeting", ret);
    getMentorMeetings(mentorId);
  };

  const addAgenda = async (
    title: string,
    content: string,
    meetingId: number
  ) => {
    let meeting: any = await getMeetingById(meetingId);
    const agenda = { title: title, details: content, meetingId: meetingId };
    if (meeting?.agendas) {
      meeting.agendas.push(agenda);
      const ret = await updateMeeting(meeting, meetingId);
      console.log("add agenda", ret);
    }
    getSelectedAgenda(meetingId);
  };

  const removeAgenda = async (agendaId: number, meetingId: number) => {
    const ret = await deleteAgendaItem(agendaId);
    console.log("delete agenda", ret);
    getSelectedAgenda(meetingId);
  };

  const addNote = async (
    title: string,
    content: string,
    meetingId: number,
    userId: string
  ) => {
    let meeting: any = await getMeetingById(meetingId);
    const note = {
      title: title,
      details: content,
      meetingId: meetingId,
      creatingUserId: userId,
    };
    if (meeting?.notes) {
      meeting.notes.push(note);
      const ret = await updateMeeting(meeting, meetingId);
      console.log("add note", ret);
    }
    getSelectedNotes(meetingId, userId);
  };

  const removeNote = async (
    noteId: number,
    meetingId: number,
    userId: string
  ) => {
    const ret = await deleteNote(noteId);
    console.log("delete note", ret);
    getSelectedNotes(meetingId, userId);
  };

  const addRecording = async (
    title: string,
    content: string,
    meetingId: number
  ) => {
    let meeting: any = await getMeetingById(meetingId);
    const recording = { title: title, details: content, meetingId: meetingId };
    if (meeting?.recordings) {
      meeting.recordings.push(recording);
      const ret = await updateMeeting(meeting, meetingId);
      console.log("add recording", ret);
    }
    getSelectedRecording(meetingId);
  };

  const removeRecording = async (id: number, meetingId: number) => {
    const ret = await deleteRecordingItem(id);
    console.log("delete recording", ret);
    getSelectedRecording(meetingId);
  };

  const rate = async (mentorId: string, rating: number) => {};

  const updateMeetingTodos = async (todos: any) => {};

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
        mentorBookedMeetings,
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
        setMeetingTodos,
        meetingRecordings,
        selectedRecording,
        getFutureMeetings,
        getAllMentors,
        getSelectedMentor,
        getSelectedStudent,
        getMentorBookedMeetings,
        getMentorAvailableMeetings,
        getMentorMeetings,
        getMeetingTodos,
        getInMeetingAgenda,
        getInMeetingNote,
        getSelectedNotes,
        getMeetingRecordings,
        getSelectedAgenda,
        getSelectedRecording,
        bookMeeting,
        cancelMeeting,
        addMeeting,
        removeMeeting,
        addAgenda,
        removeAgenda,
        addNote,
        removeNote,
        addRecording,
        removeRecording,
        updateMeetingTodos,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
