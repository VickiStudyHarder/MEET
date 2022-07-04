import React from 'react';
import { AccountContext } from '../contexts/Account'

const useAuth = () => {
    return React.useContext(AccountContext);
  };

  export default useAuth;