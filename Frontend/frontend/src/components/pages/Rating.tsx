import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline, Divider } from '@mui/material';
import React from 'react';
import PageTitle from '../../stories/PageTiltle';
import NavBar from '../molecules/NavBar';
import RatingCardMentor from '../../stories/RatingCardMentor'
import RatingCard from "../../stories/RatingCard";

interface IRating {}

const theme = createTheme();

const Rating: React.FC<IRating> = () => {

  const Ratingdata = [
    { 
      imageUrl: "./calendar_avator.jpg",
      userName: "Jack",
      courseName: "comp9323",
      Rating: 4,
      UserType: "student",
      Part_rate: 80
    }
  ]
  // submit function
  const submitRating = () => {}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box sx={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginLeft: 3, display: 'flex' }} >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                <PageTitle content={`Rating - ${Ratingdata[0].userName}`} icon='1' />
              </Box>
            </Box>
            <Divider variant="middle" sx={{ marginTop: 3 }} />
            <Box sx={{ maxHeight: '75vh', display:'flex', justifyContent:'center', alignItems:'center', marginTop: 20   }}>
            <RatingCard userName={Ratingdata?.[0]?.userName} 
              imageUrl={Ratingdata?.[0]?.imageUrl}
              courseName={Ratingdata?.[0]?.courseName} 
              Rating={Ratingdata?.[0]?.Rating}
              UserType={Ratingdata?.[0]?.UserType}
              Part_rate={Ratingdata?.[0]?.Part_rate}
              />
            </Box>
          </Box>
    </ThemeProvider>
  );
};

export default Rating;
