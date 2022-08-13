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


/* 測試接口用 ->尚未成功
interface studentdata_test {
  mentorId?: string,
  name?: string,
  rating?: number,
  avatar?: string,
}


*/


/* 測試接口用->尚未成功
/*const { setAllMentors } = useContext(AppContext);
const { setSelectedMentor } = useContext(AppContext);

useEffect(() => {
  studentdata_test.mentorId = setSelectedMentor.mentorId,
    studentdata_test.name = setSelectedMentor.name,
    studentdata_test.rating = setSelectedMentor.rating,
    studentdata_test.avatar = setSelectedMentor.avator


}, [setSelectedMentor]);
*/



interface ICalendar {
  ID?: string;
  // role: student/mentor
  role?: string;
}




//切換導師和學生不同頁面 student/mentor
let role = "student"




const Calendar: React.FC<ICalendar> = () => {

  // const { calenderMentorConfirmedMeetings } = useContext(AppContext);

  // useEffect(() => {}, [calenderMentorConfirmedMeetings]);



  //導師模式，所有導師未來的meetings
  const setFutureMeetings = [
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
      date: { day: "02", month: "DEC", year: "2022" },
      title: "Meeting name 2",
      time: "14:30 - 15:00",
    },
    {
      meetingId: "3",
      start: "",
      end: "",
      date: { day: "04", month: "DEC", year: "2022" },
      title: "Meeting name 3",
      time: "14:00 - 15:30",
    },
    {
      meetingId: "4",
      start: "",
      end: "",
      date: { day: "05", month: "Jan", year: "2023" },
      title: "Meeting name 4",
      time: "11:00 - 12:00",
    },
    {
      meetingId: "5",
      start: "",
      end: "",
      date: { day: "06", month: "Feb", year: "2022" },
      title: "Meeting name 5",
      time: "14:00 - 16:00",
    },
    {
      meetingId: "6",
      start: "",
      end: "",
      date: { day: "07", month: "Mar", year: "2022" },
      title: "Meeting name 6",
      time: "14:00 - 15:00",
    },
    {
      meetingId: "7",
      start: "",
      end: "",
      date: { day: "08", month: "Apr", year: "2022" },
      title: "Meeting name 7",
      time: "15:00 - 17:00",
    },
  ];



  //選中的導師
  const selectedMentor = [
    {
      mentorname: "hi1",
      mentorRole: 'mentor',
      rating: 4,
      avator: './calendar_avator.jpg'
    }
  ];



  //Mentor選單，所有mentor的列表
  const AllMentors = [
    {
      mentorId: "1",
      avatar: "./calendar_avator.jpg",
      name: "Name 1"
    },
    {
      mentorId: "2",
      avatar: "./calendar_avator.jpg",
      name: "Name 2"
    },
    {
      mentorId: "3",
      avatar: "./calendar_avator.jpg",
      name: "Name 3"
    },
    {
      mentorId: "4",
      avatar: "./calendar_avator.jpg",
      name: "Name 4"
    },
    {
      mentorId: "5",
      avatar: "./calendar_avator.jpg",
      name: "Name 5"
    },
    {
      mentorId: "6",
      avatar: "./calendar_avator.jpg",
      name: "Name 6"
    },
    {
      mentorId: "7",
      avatar: "./calendar_avator.jpg",
      name: "Name 7"
    },
    {
      mentorId: "8",
      avatar: "./calendar_avator.jpg",
      name: "Name 8"
    },
    {
      mentorId: "9",
      avatar: "./calendar_avator.jpg",
      name: "Name 9"
    },
    {
      mentorId: "1",
      avatar: "./calendar_avator.jpg",
      name: "Name 1"
    },
    {
      mentorId: "1",
      avatar: "./calendar_avator.jpg",
      name: "Name 1"
    },
  ];


  const mentorMeetings = [ //導師確定的會議，給顯示在calender上
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


  const StudentBookedMeetings = [//學生確定的會議，給顯示在calender上
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



  //切分metor的list，為了顯示，以防mentor不只6位，造成視窗超出
  const secondColumnStart = AllMentors.length / 2;
  const TotalNumberofMentor = AllMentors.length



  return (
    <ThemeProvider theme={theme}>
      <NavBar />

      {role === "student" && ( //學生角色，頁面
        <>
          <Grid container direction="row" sx={{
            alignItems: "center", justifyContent: "center"
          }}>
            <Grid item>
              <Grid container direction="column">
                <Grid item >
                  <h1>Chosen Mentor:</h1>
                  <CalendarUserCardPrimary
                    name={selectedMentor?.[0]?.mentorname}
                    job={selectedMentor?.[0]?.mentorRole}
                    Rating={selectedMentor?.[0]?.rating}
                    avator={selectedMentor?.[0]?.avator} />
                </Grid>
                <h1>Mentor List:</h1>
                <Grid item sx={{ overflow: 'auto', maxHeight: 400 }}>
                  <Grid container direction="column">
                    <Grid container direction="row" >
                      <Grid item sx={{ width: 200 }}>
                        {AllMentors.slice(0, secondColumnStart + 1).map((item) => (
                          <Button><CalendarUserCardMini
                            name={item?.name}
                            avator={item?.avatar}
                          /></Button>
                        ))}
                      </Grid>

                      <Grid item sx={{ width: 200 }}>
                        {AllMentors.slice(secondColumnStart + 1, TotalNumberofMentor).map((item) => (

                          <Button><CalendarUserCardMini
                            name={item?.name}
                            avator={item?.avatar}

                          /></Button>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ width: 1200, marginLeft: 10 }}>
              <Calendar_table events={StudentBookedMeetings} />
            </Grid>
            <CssBaseline />
          </Grid>
        </>
      )
      }



      {
        role === "mentor" && (  //導師角色，頁面
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
