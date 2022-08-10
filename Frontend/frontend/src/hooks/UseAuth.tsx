import React from 'react';
import { AppContext } from '../contexts/AppContext';

const useAuth = () => {
  return React.useContext(AppContext);
};

export default useAuth;
