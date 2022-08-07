import React from 'react';
import { UserContext } from '../contexts/User';

const useAuth = () => {
  return React.useContext(UserContext);
};

export default useAuth;
