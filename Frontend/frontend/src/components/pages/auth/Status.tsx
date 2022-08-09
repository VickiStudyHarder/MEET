import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/User';

const Status = () => {
  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(UserContext);

  useEffect(() => {
    getSession().then((session: any) => {
      console.log({ session });
      setStatus(true);
    });
  }, [getSession]);

  return (
    <div>
      {status ? (
        <div>
          'You are logged in'
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        'Please login below'
      )}
    </div>
  );
};

export default Status;
