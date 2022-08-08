import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../utils/auth/UserPool';
import { useNavigate } from 'react-router-dom';
import { getMeetingsByUserId } from '../api/meeting';

export type users = 'student' | 'mentor' | '';

export type IUserContext = {
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
};

const UserContext = createContext<IUserContext>({} as IUserContext);

export default UserContext;

const User = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [courses, setCourses] = useState([]);
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [username, setUsername] = useState('');
  const [userMeetings, setUserMeetings] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getMeeting = async (x: string) => {
      console.log('Get Meeting');
      console.log(email);
      let response = await getMeetingsByUserId(x);
      console.log(response);
      setUserMeetings(response);
    };
    getMeeting(email);
  }, [email]);

  const getMeeting = () => {
    return getMeetingsByUserId('z3417347@gmail.com');
  };

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
          console.log('onSuccess', data);
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
          console.error('onFailure', err);
          setIsAuthenticated(false);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('newPasswordRequired', data);
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
      navigate('/login');
    }
  };
  return (
    <UserContext.Provider
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { User, UserContext };
