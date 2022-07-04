import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import UserPool from '../utils/auth/UserPool'
import {useNavigate} from 'react-router-dom'

export type users = "student" | "mentor" | ""

export type AccountContextInterface = {
    authenticate:(Username: string, Password: string) => Promise<void>;
    getSession:() => Promise<unknown>;
    logout :() => void;
    isAuthenticated : boolean;
    email: string;
    password:string;
    courses:string[];
    userType: string;
    error: any;
    setEmail: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    setCourses: Dispatch<SetStateAction<any>>;
    setUserType: Dispatch<SetStateAction<string>>;
    setError: Dispatch<SetStateAction<string>>;
 }

// const defaultState = {
//     authenticate:  async (Username: string, Password: string) => {console.log("defaultState authenticate")},
//     getSession:  async () => {console.log("defaultState getSession")},
//     logout: () => {console.log("defaultState logout")},
//     isAuthenticated: false,
//     email: "",
//     password: "",
//     courses: [],
//     userType: "" as users
// }

const AccountContext = createContext<AccountContextInterface>({} as AccountContextInterface);

export default AccountContext;
  
const Account = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] =useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [courses, setCourses] = useState([])
  const [userType, setUserType] = useState("")
  const [error, setError] = useState("")

    const navigate = useNavigate()

    const getSession = async () =>
      await new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser()
        if (user) {
          user.getSession(async (err:any, session:any) => {
            if (err) {
              setIsAuthenticated(false)
              reject()
            } else {
              const attributes:any = await new Promise((resolve, reject) => {
                user.getUserAttributes((err:any, attributes:any) => {
                  if (err) {
                    reject(err)
                  } else {
                    const results:any = {}

                    for (let attribute of attributes) {
                      const { Name, Value } = attribute
                      results[Name] = Value
                    }

                    setIsAuthenticated(true)
                    resolve(results)
                  }
                })
              })

              const token = session.getIdToken().getJwtToken()

              
              setIsAuthenticated(true)
              resolve({
                user,
                headers: {
                  Authorization: token,
                },
                ...session,
                ...attributes,
              })
            }
          })
        } else {

          setIsAuthenticated(false)
          reject()
        }
    })

    const authenticate = async (Username: string, Password:string) => {
       await new Promise((resolve, reject) => {
        const user = new CognitoUser({Username, Pool: UserPool})
        const authDetails = new AuthenticationDetails({Username, Password})
  
          console.log({authDetails})
  
          user.authenticateUser(authDetails, { 
            onSuccess: (data) => {
              console.log('onSuccess', data);
              setIsAuthenticated(true)
              resolve(data)
            },
            onFailure: (err) => {
              console.error('onFailure', err)
              setIsAuthenticated(false)
              reject(err)
            },
            newPasswordRequired: (data) => {
              console.log('newPasswordRequired', data)
              resolve(data)
            }
          })
       })
    }

    const logout = () => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.signOut();
        setIsAuthenticated(false)
        navigate('/login')
      }
    }
    return (
       <AccountContext.Provider value={{
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
        setError
        }}>
        {props.children}
       </AccountContext.Provider>
    )
}

export { Account, AccountContext };