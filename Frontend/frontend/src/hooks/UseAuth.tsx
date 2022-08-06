import React from 'react';
import { AuthContext } from '../contexts/Auth';

const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
