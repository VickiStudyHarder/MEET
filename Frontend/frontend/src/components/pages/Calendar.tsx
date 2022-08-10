import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';
import Exist_StuGro_box from '../../stories/Exist_StuGro_box';
import CalendarUserCardMini from '../../stories/CalendarUserCardMini/CalendarUserCardMini';
import CalendarUserCardPrimary from '../../stories/CalendarUserCardPrimary/CalendarUserCardPrimary';
import Calendar_table from '../../stories/Calendar_table';
import Grid from "@mui/material/Grid";
//import './Calendar.css';




interface ICalendar {
  // role: student/mentor
  //role: string;
  /*meetingID: number;
  pic: string;
  description: string;*/
}


const theme = createTheme();







/*
export default function Calendar({
  // role: student/mentor
  role: 'student';
  meetingID: "";
  pic: ""
  description: '',
  ...props
}: ICalendar) {

  */



/*export default function Calendar({
  // role: student/mentor
  role = 'student',
  ...props
}: ICalendar) {*/




const Calendar: React.FC<ICalendar> = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Grid container direction="row" sx={{
        alignItems: "center", mx: "auto", justifyContent: "center"
      }}>
        <Grid item>
          <Grid container direction="column">
            <Grid item sx={{ marginRight: 10 }}>
              <CalendarUserCardPrimary />
            </Grid>
            <Grid item sx={{ marginTop: 5 }}>
              <Grid container direction="column">
                <Grid container direction="row">
                  <Grid item>
                    <CalendarUserCardMini />
                  </Grid>
                  <Grid item sx={{ marginLeft: 5 }}>
                    <CalendarUserCardMini />
                  </Grid>

                </Grid>
                <Grid container direction="row" sx={{ marginTop: 5 }}>
                  <Grid item>
                    <CalendarUserCardMini />
                  </Grid>
                  <Grid item sx={{ marginLeft: 5 }}>
                    <CalendarUserCardMini />
                  </Grid>

                </Grid>
                <Grid container direction="row" sx={{ marginTop: 5 }}>
                  <Grid item>
                    <CalendarUserCardMini />
                  </Grid>
                  <Grid item sx={{ marginLeft: 5 }}>
                    <CalendarUserCardMini />
                  </Grid>

                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
        <Grid item sx={{ width: 1200 }}>
          <Calendar_table />
        </Grid>
        <CssBaseline />



      </Grid>
    </ThemeProvider >




  );






  /*
  return (
    <>
        {
          role === 'mentor' && (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NavBar />
              <Exist_StuGro_box />
              <div>Calendar1</div>
            </ThemeProvider>


          )
        }
        {
          role === 'student' && (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NavBar />
              <Exist_StuGro_box />
              <div>Calendar</div>
            </ThemeProvider>


          )

        }
      </>
  );
  */
};

export default Calendar;
