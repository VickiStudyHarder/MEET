import React, { useState, useEffect, useContext } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { gapi } from 'gapi-script';
import { createToken } from '../../../api/google';
import { UserContext } from '../../../contexts/User';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

interface IGoogle {
  incrementStage: () => void;
  decrementStage: () => void;
}

const CLIENT_ID =
  '782858661732-0gqlc5n856gk2b943tpl3ebarpcdhfdg.apps.googleusercontent.com';

const GoogleAuth: React.FC<IGoogle> = ({ incrementStage, decrementStage }) => {
  const [token, setToken] = useState('');
  const [isNextEnabled, setNextEnabled] = useState(false);
  const navigate = useNavigate();

  const { email } = useContext(UserContext);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'openid email profile https://www.googleapis.com/auth/calendar',
      });
    }

    gapi.load('client:auth2', start);
  }, [isNextEnabled]);

  const onSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const { code } = response;
    console.log({ email });
    try {
      const result = await createToken(code || '', email);
      if (result.status !== 200) {
        throw new Error('Unable to set tokens correctly');
      }
      console.log(result);
      setNextEnabled(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onFailure = (error: any) => {
    console.log(error);
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
      }}
    >
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Complete Google Sign Up</Typography>
        <Typography>To Proceed</Typography>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          justify: 'center',
        }}
      >
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
      </Box>
      <Box sx={{ x: 20 }}>
        <Button
          onClick={decrementStage}
          sx={{ p: 4 }}
          startIcon={<ArrowBackIosIcon />}
        >
          Previous
        </Button>
        {isNextEnabled && (
          <Button
            onClick={incrementStage}
            sx={{ p: 4 }}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default GoogleAuth;
