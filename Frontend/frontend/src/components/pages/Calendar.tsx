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
import { userInfo } from "node:os";
//import './Calendar.css';

const theme = createTheme();

interface ICalendar {
  ID?: string;
  role?: string;
}

const Calendar: React.FC<ICalendar> = () => {
  const {
    allMentors,
    getAllMentors,
    mentorMeetings,
    getSelectedMentor,
    selectedMentor,
    mentorTimeOfDay,
    getMentorTimeOfDay,
    addMeeting,
    allMeetings,
    email,
    userInfo,
    getAllMeetings,
    getMentorMeetings,
  } = useContext(AppContext);

  useEffect(() => {
    getAllMentors();
  }, []);

  //Get the selected mentor
  const onselect = (id_check: any) => {
    getSelectedMentor(id_check);
  };

  const [openCreatingPanel, setOpenCreatingPanel] = useState(false);
  const [openDeletePanel, setOpenDeletePanel] = useState(false);
  const [openCancelPanel, setOpenCancelPanel] = useState(false);
  const [openBookingPanel, setOpenBookingPanel] = useState(false);
  const [selectedTimeArr, setSelectedTimeArr] = useState<any[]>([]);
  const [meetingTitle, setMeetingTitle] = useState<any>("New Meeting");

  useEffect(() => {
    console.log("all mentors:", allMentors);
  }, [allMentors]);

  useEffect(() => {
    // console.log("selectedTimeArr:", selectedTimeArr);
  }, [selectedTimeArr]);

  useEffect(() => {
    setSelectedTimeArr(mentorTimeOfDay);
  }, [mentorTimeOfDay]);
  useEffect(() => {
    console.log("Meeting title", meetingTitle);
  }, [meetingTitle]);

  useEffect(() => {
    if (userInfo.role === "mentor") {
      getAllMeetings(email);
    }
  }, [userInfo]);

  useEffect(() => {
    console.log("all meetings", allMeetings);
  }, [allMeetings]);

  const onConfirmCallback = async () => {
    console.log("selectedTimeArr:", selectedTimeArr);
    let times = selectedTimeArr.filter((x: any) => {
      return x.checked === true && x.disabled === false;
    });
    times = times.sort((a: any, b: any) => {
      return a.hour - b.hour;
    });
    const len = times.length;
    if (len > 0) {
      let prevT = times[0].hour;
      let flag = false;
      times.forEach((t: any) => {
        if (t.hour - prevT > 1) {
          flag = true;
        }
      });
      if (flag === false) {
        const date = times[0].date;
        const startHr = times[0].hour;
        const endHr = times[len - 1].hour;
        const startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDay(),
          startHr,
          0,
          0,
          0
        );
        const endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDay(),
          endHr + 1,
          0,
          0,
          0
        );
        await addMeeting(
          meetingTitle,
          "",
          startTime.toISOString(),
          endTime.toISOString(),
          email
        );
        setOpenCreatingPanel(false);
      } else {
        alert("Selected time slots should be consecutive!");
      }
    }
  };

  const onDenyCallback = () => {};

  const eventClick = (e:any) => {
    console.log(e);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar></NavBar>
      <div className="flex">
        <div className="leftContent">
          <div style={{ marginTop: "20px" }}>
            <CalendarUserCardPrimary
              name={`${selectedMentor.lastName} ${selectedMentor.firstName}`}
              rating={selectedMentor.rating}
              avatar={`./avatars/${selectedMentor?.avatar || "0"}.png`}
            />
            <div className="minCardContent">
              {allMentors.map((item: any, index: any) => {
                return (
                  <Box
                    className="minCard"
                    onClick={() => {
                      getSelectedMentor(item.id);
                    }}
                  >
                    <CalendarUserCardMini
                      name={`${item.lastName} ${item.firstName}`}
                      avator={`./avatars/${item?.avatar || "0"}.png`}
                    />
                  </Box>
                );
              })}
            </div>
          </div>
        </div>
        <div className="rightContent">
          {userInfo.role === "mentor" && (
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
                  setOpenCreatingPanel(true);
                  getMentorTimeOfDay("", new Date("2011-10-10T14:00:00"));
                }}
              >
                +Add
              </Button>
              <MeetingTime
                timeArr={mentorTimeOfDay.map((x: any) => ({
                  date: x.date,
                  hour: x.hour,
                  time: `${x.hour}:00-${x.hour + 1}:00`,
                  checked: x.checked,
                  disabled: x.disabled,
                }))}
                label={"Create Meeting"}
                open={openCreatingPanel}
                setOpen={setOpenCreatingPanel}
                onConfirmCallback={onConfirmCallback}
                onDenyCallback={onDenyCallback}
                selectedTimeArr={selectedTimeArr}
                setSelectedTimeArr={setSelectedTimeArr}
                setMeetingTitle={setMeetingTitle}
              ></MeetingTime>
            </div>
          )}

          <div>
            {userInfo.role === "mentor" && (
              <CalendarTable
                height="80vh"
                width="60vh"
                events={allMeetings.map((m: any) => ({
                  id: m.id,
                  title: m.title,
                  start: m.startTime,
                  end: m.endTime,
                  extendedProps: { expired: m.expired },
                }))}
                eventClick={eventClick}
              ></CalendarTable>
            )}
            {userInfo.role === "student" && (
              <CalendarTable
                height="80vh"
                width="60vh"
                events={mentorMeetings.map((m: any) => ({
                  id: m.id,
                  title: m.title,
                  start: m.startTime,
                  end: m.endTime,
                  extendedProps: { booked: m.booked },
                }))}
                eventClick={eventClick}
              ></CalendarTable>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Calendar;
