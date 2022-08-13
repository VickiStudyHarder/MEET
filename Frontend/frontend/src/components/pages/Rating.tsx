import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline, Divider } from '@mui/material';
import React from 'react';
import PageTitle from '../../stories/PageTiltle';
import NavBar from '../molecules/NavBar';
import RatingCardMentor from '../../stories/RatingCardMentor'

interface IRating {}

const theme = createTheme();

const Rating: React.FC<IRating> = () => {
  const data = {
    mentorId: '1',
    name:'Jack wolf',
    pic:'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg'
  }
  
  // submit function
  const submitRating = () => {}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginLeft: 3, display: 'flex' }} >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                <PageTitle content={`Rating - ${data.name}`} icon='1' />
              </Box>
            </Box>
            <Divider variant="middle" sx={{ marginTop: 3 }} />
            <Box sx={{ maxHeight: '75vh', display:'flex', justifyContent:'center', alignItems:'center', marginTop: 20   }}>
            <RatingCardMentor 
            imageUrl={data.pic}
            userName={data.name}
            doSomething={submitRating}
            />
            </Box>

          </Box>
    </ThemeProvider>
  );
};

export default Rating;
