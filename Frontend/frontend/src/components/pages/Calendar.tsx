import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Divider,
  Typography,
} from "@mui/material";
import { func } from "prop-types";
import { callbackify } from "util";
import { url } from "node:inspector";
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
import CancelMeeting from "../../stories/CancelMeeting/CancelMeeting";
import BookMeeting from "../../stories/BookMeeting/BookMeeting";
import UpcomingMeetingCard from "../../stories/MeetingScheduleTomorrow/MeetingScheduleTomorrow";
import { useNavigate } from "react-router-dom";
// import './Calendar.css';

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
    removeMeeting,
    bookMeeting,
    cancelMeeting,
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
  const [creatingPanelTitle, setCreatingPanelTitle] =
    useState<any>("Create Meeting");
  const [deletePanelTitle, setDeletePanelTitle] =
    useState<any>("Delete Meeting");
  const [deletePanelDuration, setDeletePanelDuration] = useState<any>({
    start: new Date(),
    end: new Date(),
  });
  const [bookingPanelTitle, setBookingPanelTitle] =
    useState<any>("Book Meeting");
  const [cancelPanelTitle, setCancelPanelTitle] = useState<any>("Book Meeting");
  const [selectedEvent, setSelectedEvent] = useState<any>();

  useEffect(() => {
    console.log("all mentors:", allMentors);
  }, [allMentors]);

  useEffect(() => {
    console.log("Meeting title", creatingPanelTitle);
  }, [creatingPanelTitle]);

  useEffect(() => {
    if (userInfo.role === "mentor") {
      getAllMeetings(email);
    }
  }, [userInfo]);

  useEffect(() => {
    console.log("all meetings", allMeetings);
  }, [allMeetings]);

  const onCreatingConfirmCallback = async () => {
    let times = mentorTimeOfDay.filter((x: any) => {
      return x.checked === true && x.disabled === false;
    });
    times = times.sort((a: any, b: any) => {
      return a.hour - b.hour;
    });
    console.log("calendar:creating", times);
    const len = times.length;
    if (len > 0) {
      let prevT = times[0].hour;
      let flag = false;
      times.forEach((t: any) => {
        if (t.hour - prevT > 1) {
          flag = true;
        }
        prevT = t.hour;
      });
      if (flag === false) {
        const date = times[0].date;
        console.log("calendar:creating:times[0].date", date);

        const startHr = times[0].hour;
        const endHr = times[len - 1].hour + 1;
        const startTime = new Date(new Date(date.getTime()).setHours(startHr));
        const endTime = new Date(new Date(date.getTime()).setHours(endHr));
        console.log("calendar:creating meeting", startTime, endTime);
        await addMeeting(
          creatingPanelTitle,
          "",
          startTime.toString(),
          endTime.toString(),
          email
        );
        setOpenCreatingPanel(false);
      } else {
        alert("Selected time slots should be consecutive!");
      }
    }
  };

  const onCreatingDenyCallback = () => {};

  const onDeleteConfirmCallback = async () => {
    if (userInfo.role === "mentor") {
      await removeMeeting(selectedEvent?.id, email);
      setOpenDeletePanel(false);
    }
  };

  const onBookConfirmCallback = async () => {
    if (userInfo.role === "student") {
    }
  };

  const eventClick = (e: any) => {
    const event = e.event;
    console.log("calendar:event click", event);
    if (!event.extendedProps.expired) {
      if (userInfo.role === "mentor") {
        setSelectedEvent(event);
        setOpenDeletePanel(true);
      } else {
      }
    }
  };

  const headerClick = (e: any) => {
    if (userInfo.role === "mentor") {
      let splits = e.split("-");
      splits = splits.map((s: any) => Number(s));
      const date = new Date(splits[0], splits[1] - 1, splits[2], 0, 0, 0, 0);
      setOpenCreatingPanel(true);
      getMentorTimeOfDay(email, date);
    } else {
    }
  };

  function yyyymmdd(date: any) {
    var y = date.getFullYear().toString();
    var m = (date.getMonth() + 1).toString();
    var d = date.getDate().toString();
    var h = date.getHours();
    d.length == 1 && (d = "0" + d);
    m.length == 1 && (m = "0" + m);
    h.length == 1 && (h = "0" + h);
    return `${y}/${m}/${d} ${h}:00:00`;
  }
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <NavBar></NavBar>
      <CancelMeeting
        name={"Cancel Booking"}
        desc={cancelPanelTitle}
        open={openCancelPanel}
        setOpen={setOpenCancelPanel}
      ></CancelMeeting>
      <CancelMeeting
        name={`Delete Meeting`}
        desc={selectedEvent?.title || ""}
        time={`${yyyymmdd(selectedEvent?.start || new Date())}-
          ${yyyymmdd(selectedEvent?.end || new Date())}`}
        open={openDeletePanel}
        content={`Do you really want to delete your meeting?`}
        setOpen={setOpenDeletePanel}
        onConfirmCallback={onDeleteConfirmCallback}
      ></CancelMeeting>
      <BookMeeting
        name={"Book Meeting"}
        desc={bookingPanelTitle}
        open={openBookingPanel}
        setOpen={setOpenBookingPanel}
      ></BookMeeting>
      <MeetingTime
        label={`Create Meeting ${mentorTimeOfDay[0]?.date}`}
        open={openCreatingPanel}
        setOpen={setOpenCreatingPanel}
        onConfirmCallback={onCreatingConfirmCallback}
        onDenyCallback={onCreatingDenyCallback}
        setMeetingTitle={setCreatingPanelTitle}
      ></MeetingTime>
      <div className="flex">
        <div className="leftContent">
          {userInfo.role === "student" && (
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
          )}
          {userInfo.role === "mentor" && (
            <Grid container spacing={2} sx={{ m: 2 }}>
              {allMeetings.map((m: any) => {
                if (!m.expired) {
                  return (
                    <Button onClick={() => navigate(`/meeting/${m.id}`)}>
                      <UpcomingMeetingCard meeting={{...m,id:m.id,meetingStart:m.startTime,meetingEnd:m.endTime,summary:m.title}} />
                    </Button>
                  );
                }
              })}
            </Grid>
          )}
        </div>
        <div className="rightContent">
          {/* {userInfo.role === "mentor" && (
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
                  
                }}
              >
                +Add
              </Button>
            </div>
          )} */}

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
                  color: m.expired ? "#70798B" : "#FD346E",
                  extendedProps: { expired: m.expired },
                }))}
                eventClick={eventClick}
                headerClick={headerClick}
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
                headerClick={headerClick}
              ></CalendarTable>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Calendar;
