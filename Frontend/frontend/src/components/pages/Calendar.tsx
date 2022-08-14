import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Divider,
  Typography,
} from "@mui/material";
import "./Calendar.css";
import { useEffect, useContext, useState } from "react";
import React from "react";
import NavBar from "../molecules/NavBar";
import Exist_StuGro_box from "../../stories/Exist_StuGro_box";
import CalendarUserCardMini from "../../stories/CalendarUserCardMini/CalendarUserCardMini";
import CalendarUserCardPrimary from "../../stories/CalendarUserCardPrimary/CalendarUserCardPrimary";
import CalendarTable from "../../stories/CalendarTable";
import CalendarMentorConfirmedMeetings from "../../stories/CalendarMentorConfirmedMeetings/CalendarMentorConfirmedMeetings";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppContext from "../../contexts/AppContext";
import PageTitle from "../../stories/PageTiltle";
import MeetingTime from "../../stories/MeetingTime/MeetingTime";
//import './Calendar.css';

const theme = createTheme();

interface ICalendar {
  ID?: string;
  // role: student/mentor
  role?: string;
}

//切換導師和學生不同頁面 student/mentor different page depending on role
let role = "student";

const Calendar: React.FC<ICalendar> = () => {
  const { futureMeetings: data } = useContext(AppContext);
  let metormeetings = JSON.parse(JSON.stringify(data));

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
      mentorId: 4,
      name: "Mentor Name",
      rating: 4,
      avator: './calendar_avator.jpg'
    }
  ];
  */

  //Mentor選單，所有mentor的列表, all the mentor list
  const AllMentors = [
    {
      mentorId: "user1",
      avatar: "./calendar_avator.jpg",
      name: "Name 1",
    },
    {
      mentorId: "2",
      avatar: "./calendar_avator.jpg",
      name: "Name 2",
    },
    {
      mentorId: "3",
      avatar: "./calendar_avator.jpg",
      name: "Name 3",
    },
    {
      mentorId: "user4",
      avatar: "./calendar_avator.jpg",
      name: "Name 4",
    },
    {
      mentorId: "user5",
      avatar: "./calendar_avator.jpg",
      name: "Name 5",
    },
    {
      mentorId: "6",
      avatar: "./calendar_avator.jpg",
      name: "Name 6",
    },
    {
      mentorId: "7",
      avatar: "./calendar_avator.jpg",
      name: "Name 7",
    },
    {
      mentorId: "8",
      avatar: "./calendar_avator.jpg",
      name: "Name 8",
    },
    {
      mentorId: "9",
      avatar: "./calendar_avator.jpg",
      name: "Name 9",
    },
    {
      mentorId: "10",
      avatar: "./calendar_avator.jpg",
      name: "Name 10",
    },
    {
      mentorId: "11",
      avatar: "./calendar_avator.jpg",
      name: "Name 11",
    },
  ];

  const mentorMeetings = [
    //導師確定的會議，給顯示在calender上, showing all the mentor meetings on calendar
    {
      meetingId: 1,
      title: "meeting 1",
      start: "2022-07-23T10:30:00+00:00",
      end: "2022-07-23T12:30:00+00:00",
    },
    {
      meetingId: 2,
      title: "meeting 2",
      start: "2022-08-13T05:00:00+00:00",
      end: "2022-08-13T12:30:00+00:00",
    },
    {
      meetingId: 3,
      title: "meeting 3",
      start: "2022-08-15T10:30:00+00:00",
      end: "2022-08-15T12:30:00+00:00",
    },
    {
      meetingId: 4,
      title: "meeting 4",
      start: "2022-08-23T10:30:00+00:00",
      end: "2022-08-23T12:30:00+00:00",
    },
    {
      meetingId: 5,
      title: "meeting 5",
      start: "2022-08-26T10:30:00+00:00",
      end: "2022-08-26T12:30:00+00:00",
    },
  ];

  const StudentBookedMeetings = [
    //學生確定的會議，給顯示在calendar上. Student confirmed meetings to show on the calendar
    {
      meetingId: 1,
      title: "meeting 1",
      start: "2022-07-23T10:30:00+00:00",
      end: "2022-07-23T12:30:00+00:00",
    },
    {
      meetingId: 2,
      title: "meeting 2",
      start: "2022-08-23T10:30:00+00:00",
      end: "2022-08-23T12:30:00+00:00",
    },
    {
      meetingId: 3,
      title: "meeting 3",
      start: "2022-08-26T10:30:00+00:00",
      end: "2022-08-26T12:30:00+00:00",
    },
  ];

  const {
    allMentors,
    getAllMentors,
    getSelectedMentor,
    selectedMentor,
    mentorTimeOfDay,
    getMentorTimeOfDay,
  } = useContext(AppContext);

  //切分metor的list，為了顯示，以防mentor不只6位，造成視窗超出. Divide the mentor list to show two columns
  const secondColumnStart = AllMentors.length / 2;
  const TotalNumberofMentor = AllMentors.length;

  useEffect(() => {
    getAllMentors();
  }, []);

  useEffect(() => {
    console.log("calender:", allMentors);
  }, [allMentors]);

  //Get the selected mentor
  const onselect = (id_check: any) => {
    getSelectedMentor(id_check);
  };

  const [open, setOpen] = useState(false);
  const [selectedTimeArr, setSelectedTimeArr] = useState(false);
  const [minCard, setMinCard] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex">
        <div className="leftContent">
          <div style={{ marginTop: "20px" }}>
            <CalendarUserCardPrimary />
            <div className="minCardContent">
              {minCard.map((item, index) => {
                return (
                  <div className="minCard">
                    <CalendarUserCardMini />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="rightContent">
          <div className="add">
            <Button
              sx={{
                minWidth: "100px",
                minHeight: "50px",
                maxHeight: "50px",
                maxWidth: "100px",
                borderRadius: 8,
                backgroundColor: "#6001D3",
                color: "#fff",
                fontSize: 12,
              }}
              variant="contained"
              onClick={() => {
                setOpen(true);
                getMentorTimeOfDay("", new Date("2011-10-10T14:00:00"));
              }}
            >
              +Add
            </Button>
            <MeetingTime
              timeArr={mentorTimeOfDay}
              open={open}
              setOpen={setOpen}
              onConfirmCallback={null}
              onDenyCallback={null}
              setSelectedTimeArr={setSelectedTimeArr}
            ></MeetingTime>
          </div>
          <CalendarTable events={mentorMeetings} hegiht="90vh" />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Calendar;
