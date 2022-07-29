import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Grid,
  Box,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AccountContext } from '../../../contexts/Account';
import UserPool from '../../../utils/auth/UserPool';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'



interface IGoogle {}

const CLIENT_ID =
  '782858661732-0gqlc5n856gk2b943tpl3ebarpcdhfdg.apps.googleusercontent.com';

const Google: React.FC<IGoogle> = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'openid email profile https://www.googleapis.com/auth/calendar'
      })
    }

    gapi.load('client:auth2', start)
  })

  const onSuccess = (response: any) => {
    //const accessToken = gapi.auth.getAccessToken().access_token;
    console.log(response);
    //console.log(accessToken)
  };

  const onFailure = (error: any) => {
    console.log(error);
  };


  return (
    <div>
      <div>Google Calendar API</div>
      <div>
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Sign In & Authorize Calendar'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code'
          accessType='offline'
          scope='openid email profile https://www.googleapis.com/auth/calendar'
        />
      </div>
    </div>
  );
};

export default Google;
