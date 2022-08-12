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
import { getMeetingsByUserId } from "../api/meeting";
import { array } from "prop-types";

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
  meetingTodos: [];
  selectedMentor:{};
  selectedStudent:{};
  allMentors:[];
  studentBookedMeetings:[];
  mentorAvailableMeetings:[];
  mentorMeetings:[];
  futureMeetings:[];
  meetingRequests:[];
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
  const [selectedStudent,setSelectedStudent] = useState({})
  const [allMentors, setAllMentors] = useState([{}]); //导师列表
  const [studentBookedMeetings, setStudentBookedMeetings] = useState([{}]); //学生模式下已被学生预定的当前老师的会议
  const [mentorAvailableMeetings, setMentorAvailableMeetings] =
  useState([{}]); //学生模式下当前老师的可被预定会议
  const [mentorMeetings, setMentorMeetings] = useState([{}]); //老师模式下自己的meeting
  
  const [futureMeetings, setFutureMeetings] = useState<any>([{}]);  //老师模式下未来的会议
  const [meetingRequests, setMeetingsRequests] = useState<any>([
    {},
  ]); //老师模式下学生的所有入会请求
  
  const [inMeetingAgenda, setInMeetingAgenda] = useState<any>({});
  const [inMeetingNote, setInMeetingNote] = useState<any>({});

  const [selectedAgenda,setSeletedAgenda] = useState({})
  
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
      mentorId: "",
      name: "",
      rating: 5,
      avatar: "",
    });
    setAllMentors([{ mentorId: "", avatar: "", name: "" }]);
    setStudentBookedMeetings([
      { meetingId: "", title: "", start: "", end: "" },
    ]);
    setMentorAvailableMeetings([
      { meetingId: "",  title: "", start: "", end: "" },
    ]);
    setMentorMeetings([{ meetingId: "",  title: "", start: "", end: "" },])
    setFutureMeetings([
      {
        meetingId: "",
        start:"",
        end:"",
        date: { day: "01", month: "DEC", year: "2022" },
        title: "name 1",
        time: "12:00 - 13:00",
      },
    ]);
    setMeetingsRequests([
      {
        requestId: "",
        meetingId: "",
        userId:"",
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
      {
        option: {
          show: true,
          showAdd: true,
        },
        title: "meeting 3",
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
            isDeleted: true,
            isEditing: false,
          },
        ],
      },
      {
        option: {
          show: true,
          showAdd: true,
        },
        title: "Meeting 4",
        task: [],
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
      { meetingId: "", userId: "",avatar:"", title: "", description: "" },
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
  }, []);

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
        meetingTodos,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
