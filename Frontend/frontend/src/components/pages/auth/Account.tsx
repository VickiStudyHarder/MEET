import React, { createContext } from 'react'
import { CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import UserPool from '../../../utils/auth/UserPool'
import {useNavigate} from 'react-router-dom'

interface AccountContextInterface {
    authenticate:(Username: string, Password: string) => Promise<void>;
    getSession:() => Promise<unknown>;
    logout :() => void;
}

const defaultState = {
    authenticate:  async (Username: string, Password: string) => {console.log("defaultState authenticate")},
    getSession:  async () => {console.log("defaultState getSession")},
    logout: () => {console.log("defaultState logout")}
}


const AccountContext = createContext<AccountContextInterface>(defaultState);
  
const Account = (props: any) => {
    const navigate = useNavigate()

    const getSession = async () =>
      await new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser()
        if (user) {
          user.getSession(async (err:any, session:any) => {
            if (err) {
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

                    resolve(results)
                  }
                })
              })

              const token = session.getIdToken().getJwtToken()

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
              resolve(data)
            },
            onFailure: (err) => {
              console.error('onFailure', err)
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
        navigate('/login')
      }
    }
    return (
       <AccountContext.Provider value={{
        authenticate, 
        getSession,
        logout
        }}>
        {props.children}
       </AccountContext.Provider>
    )
}

export { Account, AccountContext };