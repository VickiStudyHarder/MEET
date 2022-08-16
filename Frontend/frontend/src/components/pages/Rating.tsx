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
import CircleLoader from 'react-spinners/CircleLoader'

interface IRating { }

const theme = createTheme();

const Rating: React.FC<IRating> = () => {
  const { email } = useContext(AppContext);
  const [user, setUser] = useState<null | IUser>(null);
  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])


  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    const result = await getUser(email);
    setUser(result);
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
        }}>
          <CircleLoader size={100} color={'#6001D3'} loading={loading} />
        </Box>

      ) : (
        <Box>
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
        </Box>
      )}

    </ThemeProvider>
  );
};

export default Rating;
