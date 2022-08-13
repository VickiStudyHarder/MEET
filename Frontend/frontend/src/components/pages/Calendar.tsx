import { createTheme, CssBaseline, ThemeProvider, Divider, Typography } from '@mui/material';
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
import PageTitle from '../../stories/PageTiltle';
//import './Calendar.css';


const theme = createTheme();


interface ICalendar {
  ID?: string;
  // role: student/mentor
  role?: string;
}



//切換導師和學生不同頁面 student/mentor different page depending on role
let role = "student"



const Calendar: React.FC<ICalendar> = () => {


  const { futureMeetings: data } = useContext(AppContext);
  let metormeetings = JSON.parse(JSON.stringify(data))


  const { selectedMentor: selectedMentor_data } = useContext(AppContext);
  let select_Mentor = JSON.parse(JSON.stringify(data))



  //導師模式，所有導師未來的meetings. Mentor page, showing all the mentor confirmed meetings

  /*
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

*/


  //選中的導師, selected mentor
  /*
  const selectedMentor = [
    {
      mentorname: "Mentor Name",
      mentorRole: 'mentor',
      rating: 4,
      avator: './calendar_avator.jpg'
    }
  ];
*/


  //Mentor選單，所有mentor的列表, all the mentor list
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
      mentorId: "10",
      avatar: "./calendar_avator.jpg",
      name: "Name 10"
    },
    {
      mentorId: "11",
      avatar: "./calendar_avator.jpg",
      name: "Name 11"
    },
  ];


  const mentorMeetings = [ //導師確定的會議，給顯示在calender上, showing all the mentor meetings on calendar
    {
      meetingId: 1,
      title: "meeting 1",
      start: "2022-07-23T10:30:00+00:00",
      end: "2022-07-23T12:30:00+00:00"
    },
    {
      meetingId: 2,
      title: "meeting 2",
      start: "2022-08-13T05:00:00+00:00",
      end: "2022-08-13T12:30:00+00:00"
    },
    {
      meetingId: 3,
      title: "meeting 3",
      start: "2022-08-15T10:30:00+00:00",
      end: "2022-08-15T12:30:00+00:00"
    },
    {
      meetingId: 4,
      title: "meeting 4",
      start: "2022-08-23T10:30:00+00:00",
      end: "2022-08-23T12:30:00+00:00"
    },
    {
      meetingId: 5,
      title: "meeting 5",
      start: "2022-08-26T10:30:00+00:00",
      end: "2022-08-26T12:30:00+00:00"
    },


  ]


  const StudentBookedMeetings = [//學生確定的會議，給顯示在calendar上. Student confirmed meetings to show on the calendar
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



  const [modalCtx, setModalCtx] = React.useState({
    index: 0,
    idx: 0,
    name: '',
  });

  const show_select_metor = (item: any, index: any, e: any) => {
    let val = e.target.mentorId;
    let select_mentor = JSON.parse(JSON.stringify(data));
    select_mentor[index].option.mentorId = item.mentorId;
    selectedMentor_data(select_mentor);
  };



  //切分metor的list，為了顯示，以防mentor不只6位，造成視窗超出. Divide the mentor list to show two columns
  const secondColumnStart = AllMentors.length / 2;
  const TotalNumberofMentor = AllMentors.length



  return (
    <ThemeProvider theme={theme}>
      <NavBar />

      {role === "student" && ( //學生角色，頁面, student page
        <>
          <Box sx={{ marginLeft: 5, display: 'flex' }} >
            <PageTitle content='Calendar' icon='5' />
          </Box>
          <Divider variant="middle" sx={{ marginTop: 2 }} />
          <Grid container direction="row" sx={{
            alignItems: "center", justifyContent: "center", width: '100vw'
          }}>
            <Grid item>
              <Grid container direction="column">
                <Grid item >
                  <h1>Chosen Mentor:</h1>
                  <CalendarUserCardPrimary
                    name={selectedMentor_data?.[0]?.mentorname}
                    job={selectedMentor_data?.[0]?.mentorRole}
                    Rating={selectedMentor_data?.[0]?.rating}
                    avator={selectedMentor_data?.[0]?.avator} />
                </Grid>
                <h3>Mentor List:</h3>
                <Grid item sx={{ maxHeight: 400 }}>
                  <Grid container direction="column" sx={{ maxHeight: 400, overflow: 'auto' }}>
                    <Grid container direction="row" >
                      <Grid item sx={{ width: 200 }}>
                        {AllMentors.slice(0, secondColumnStart + 1).map((item) => (
                          <Button id={item?.mentorId} onClick={(e) => show_select_metor(item, index, e)}><CalendarUserCardMini
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
        role === "mentor" && (  //導師角色，頁面, mentor page
          <>
            <Box sx={{ marginLeft: 5, display: 'flex' }} >
              <PageTitle content='Calendar' icon='5' />
            </Box>
            <Divider variant="middle" sx={{ marginTop: 3 }} />
            <Grid container direction="row" sx={{
              alignItems: "center", justifyContent: "center", width: '100vw'
            }}>
              <Grid item sx={{
                mx: "auto", alignItems: "center"
              }}>
                <h1>Upcoming Meetings</h1>
                <Box sx={{
                  maxHeight: 720,
                  overflow: 'auto',
                  width: 400,
                  bgcolor: '#FFFFF'
                }}>
                  {metormeetings.map((item: any) => (
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
