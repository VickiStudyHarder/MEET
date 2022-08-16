import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline, Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import PageTitle from '../../stories/PageTiltle';
import NavBar from '../molecules/NavBar';
import RatingCardMentor from '../../stories/EvaluateCardButton';
import RatingCard from '../../stories/RatingCard';
import { getUser } from '../../api/users';
import AppContext from '../../contexts/AppContext';
import { IUser } from '../../types/meetings';

interface IRating {}

const theme = createTheme();

const Rating: React.FC<IRating> = () => {
  const { email } = useContext(AppContext);
  const [user, setUser] = useState<null | IUser>(null);

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    const result = await getUser(email);
    setUser(result);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
        {user && (
          <>
            <Box sx={{ marginLeft: 3, display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}
              >
                <PageTitle
                  content={`Rating - ${user.firstName} ${user.lastName}`}
                  icon='1'
                />
              </Box>
            </Box>
            <Divider variant='middle' sx={{ marginTop: 3 }} />
            <Box
              sx={{
                maxHeight: '75vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}
            >
              <RatingCard user={user} />
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Rating;
