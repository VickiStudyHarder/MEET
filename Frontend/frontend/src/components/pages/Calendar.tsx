import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';
import Exist_StuGro_box from '../../stories/Exist_StuGro_box';
import CalendarUserCardMini from '../../stories/CalendarUserCardMini/CalendarUserCardMini';
import CalendarUserCardPrimary from '../../stories/CalendarUserCardPrimary/CalendarUserCardPrimary';
import Calendar_table from '../../stories/Calendar_table';
import CalendarMentorConfirmedMeetings from '../../stories/CalendarMentorConfirmedMeetings/CalendarMentorConfirmedMeetings';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
//import './Calendar.css';






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

interface ICalendar {
  ID?: string;
  // role: student/mentor
  role?: string;
}


//test trial the role: student/mentor
let role = "student"



const Calendar: React.FC<ICalendar> = () => {

  // const { calenderMentorConfirmedMeetings } = useContext(AppContext);

  // useEffect(() => {}, [calenderMentorConfirmedMeetings]);

  //fake data for testing
  const data = [
    {
      date: ["01", "DEC", "2022"],
      meetingName: "name 1",
      time: "12:00 - 13:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
  ];

  const studentdata = [
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    }
  ];


  const mentorlistdata = [
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: 'https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg'
    },
  ];

  const secondColumnStart = mentorlistdata.length / 2;
  const TotalNumberofMentor = mentorlistdata.length

  return (

    <ThemeProvider theme={theme}>
      <NavBar />
      {role === "student" && (
        <>
          <Grid container direction="row" sx={{
            alignItems: "center", justifyContent: "center"
          }}>
            <Grid item>
              <Grid container direction="column">
                <Grid item >
                  <h1>Chosen Mentor:</h1>
                  <CalendarUserCardPrimary name={studentdata?.[0]?.mentorname}
                    job={studentdata?.[0]?.mentorRole}
                    Rating={studentdata?.[0]?.rating}
                    avator={studentdata?.[0]?.avator} />
                </Grid>

                <h1>List of Mentors:</h1>
                <Grid item sx={{ overflow: 'auto', height: 500 }}>
                  <Grid container direction="column">
                    <Grid container direction="row" >
                      <Grid item sx={{ width: 200 }}>


                        {mentorlistdata.slice(0, secondColumnStart + 1).map((item) => (

                          <CalendarUserCardMini
                            name={item?.mentorname}
                            avator={item?.avator}

                          />
                        ))}
                      </Grid>

                      <Grid item sx={{ overflow: 'auto' }}>
                        {mentorlistdata.slice(secondColumnStart + 1, TotalNumberofMentor).map((item) => (

                          <CalendarUserCardMini
                            name={item?.mentorname}
                            avator={item?.avator}

                          />
                        ))}

                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>


              </Grid>



            </Grid>
            <Grid item sx={{ width: 1200, marginLeft: 10 }}>
              <Calendar_table />
            </Grid>
            <CssBaseline />



          </Grid>
        </>

      )
      }



      {
        role === "mentor" && (
          <>
            <Grid container direction="row" sx={{
              justifyContent: "center"
            }}>
              <Grid item sx={{
                mx: "auto", alignItems: "center"
              }}>
                <h1>Upcoming Meetings</h1>
                <Box sx={{
                  maxHeight: 800,
                  overflow: 'auto',


                }}>
                  {data.map((item) => (

                    <CalendarMentorConfirmedMeetings
                      date={item?.date}
                      meetingName={item?.meetingName}
                      time={item?.time}

                    />
                  ))}




                </Box>

              </Grid>
              <Grid item
                sx={{
                  width: 1200, alignItems: "center", mx: "auto", justifyContent: "center"
                }}>
                <Calendar_table />
              </Grid>
              <CssBaseline />



            </Grid>
          </>

        )
      }

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
