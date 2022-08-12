import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useContext } from 'react';
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
import Button from '@mui/material/Button';
import AppContext from "../../contexts/AppContext";
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





interface studentdata_test {
  mentorId?: string,
  name?: string,
  rating?: number,
  avatar?: string,
}
//test trial the role: student/mentor
let role = "mentor"


/*const { setAllMentors } = useContext(AppContext);
const { setSelectedMentor } = useContext(AppContext);

useEffect(() => {
  studentdata_test.mentorId = setSelectedMentor.mentorId,
    studentdata_test.name = setSelectedMentor.name,
    studentdata_test.rating = setSelectedMentor.rating,
    studentdata_test.avatar = setSelectedMentor.avator


}, [setSelectedMentor]);
*/

const Calendar: React.FC<ICalendar> = () => {

  // const { calenderMentorConfirmedMeetings } = useContext(AppContext);

  // useEffect(() => {}, [calenderMentorConfirmedMeetings]);

  //fake data for testing
  const setFutureMeetings = [ //導師模式，所有導師未來的meetings
    {
      meetingId: "1",
      start: "",
      end: "",
      date: { day: "01", month: "DEC", year: "2022" },
      title: "Meeting name 1",
      time: "12:00 - 13:00",
    },
    {
      meetingId: "2",
      start: "",
      end: "",
      date: { day: "01", month: "DEC", year: "2022" },
      title: "name 2",
      time: "14:00 - 15:00",
    },
    {
      meetingId: "3",
      start: "",
      end: "",
      date: { day: "01", month: "DEC", year: "2022" },
      title: "name 3",
      time: "14:00 - 15:30",
    },
    {
      meetingId: "4",
      start: "",
      end: "",
      date: { day: "01", month: "DEC", year: "2022" },
      title: "name 4",
      time: "11:00 - 12:00",
    },
    {
      meetingId: "5",
      start: "",
      end: "",
      date: { day: "01", month: "DEC", year: "2022" },
      title: "name 5",
      time: "14:00 - 16:00",
    },
    {
      meetingId: "6",
      start: "",
      end: "",
      date: { day: "01", month: "DEC", year: "2022" },
      title: "name 6",
      time: "14:00 - 15:00",
    },
    {
      meetingId: "7",
      start: "",
      end: "",
      date: { day: "01", month: "DEC", year: "2022" },
      title: "name 7",
      time: "15:00 - 17:00",
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


  const mentorMeetings = [
    {
      meetingId: 1,
      title: "meeting 1",
      start: "2022-07-23T10:30:00+00:00",
      end: "2022-07-23T12:30:00+00:00"
    },
    {
      meetingId: 2,
      title: "meeting 2",
      start: "2022-08-23T10:30:00+00:00",
      end: "2022-08-23T12:30:00+00:00"
    },
    {
      meetingId: 3,
      title: "meeting 3",
      start: "2022-08-26T10:30:00+00:00",
      end: "2022-08-26T12:30:00+00:00"
    },


  ]



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
                  <CalendarUserCardPrimary
                    name={studentdata?.[0]?.mentorname}
                    job={studentdata?.[0]?.mentorRole}
                    Rating={studentdata?.[0]?.rating}
                    avator={studentdata?.[0]?.avator} />
                </Grid>

                <h1>Mentor List:</h1>
                <Grid item sx={{ overflow: 'auto', maxHeight: 400 }}>
                  <Grid container direction="column">
                    <Grid container direction="row" >
                      <Grid item sx={{ width: 200 }}>


                        {mentorlistdata.slice(0, secondColumnStart + 1).map((item) => (

                          <Button><CalendarUserCardMini
                            name={item?.mentorname}
                            avator={item?.avator}

                          /></Button>
                        ))}
                      </Grid>

                      <Grid item sx={{ width: 200 }}>
                        {mentorlistdata.slice(secondColumnStart + 1, TotalNumberofMentor).map((item) => (

                          <Button><CalendarUserCardMini
                            name={item?.mentorname}
                            avator={item?.avator}

                          /></Button>
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
                  maxHeight: 720,
                  overflow: 'auto',
                  width: 410


                }}>
                  {setFutureMeetings.map((item) => (

                    <CalendarMentorConfirmedMeetings
                      date={[item?.date?.day, item?.date?.month, item?.date?.year]}
                      meetingName={item?.title}
                      time={item?.time}

                    />
                  ))}

                </Box>

              </Grid>
              <Grid item
                sx={{
                  width: 1200, alignItems: "center", mx: "auto", justifyContent: "center"
                }}>
                <Calendar_table events={mentorMeetings} />
              </Grid>
              <CssBaseline />



            </Grid>
          </>

        )
      }

    </ThemeProvider >





  );





};

export default Calendar;
