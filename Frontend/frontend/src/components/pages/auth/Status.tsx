import React, {useState, useContext, useEffect} from 'react'
import {AccountContext} from './Account'

const Status = () => {
    const [status, setStatus] = useState(false);

    const { getSession, logout} = useContext(AccountContext)

    useEffect(() => {
        getSession().then((session: any) => {
            console.log({session})
            setStatus(true)
        })  
    }, [getSession])

    return (
        <div>
            {status ? (
                <div>
                    'You are logged in'
                    <button onClick={logout}>Logout</button>
                </div>
            )  : 'Please login below'}
        </div>
    )
}

export default Status;