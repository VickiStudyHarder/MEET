import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../molecules/NavBar";
import RequestCard from "../../stories/RequestCard";
import CurrentMeetingCard from "../../stories/MeetingScheduleToday/MeetingScheduleToday";
import UpcomingMeetingCard from "../../stories/MeetingScheduleTomorrow/MeetingScheduleTomorrow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import AppContext from "../../contexts/AppContext";
import { getMeetingsByUserId } from "../../api/meeting";
import { IMeeting, IMeetingResponse } from "../../types/meetings";
import CircleLoader from "react-spinners/CircleLoader";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

const Home = () => {
  const navigate = useNavigate();
  const { email } = useContext(AppContext);
  const [upcomingMeetings, setUpcomingMeetings] =
    useState<null | IMeetingResponse[]>(null);
  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);
  useEffect(() => {
    handleGetUpcomingMeetings();
  }, []);

  const handleGetUpcomingMeetings = async () => {
    const result = await getMeetingsByUserId(email);
    setLoading(false);
    const upComingMeetings = filterUpcomingMeetings(result);
    setUpcomingMeetings(upComingMeetings);
  };

  const filterUpcomingMeetings = (meetings: IMeetingResponse[]) => {
    const currentTime = new Date();
    console.log(currentTime);
    const upComingMeetings = meetings.filter(
      (x) => new Date(x.meeting.meetingEnd).getTime() > currentTime.getTime()
    );
    return upComingMeetings;
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <CircleLoader size={100} color={"#6001D3"} loading={loading} />
        </Box>
      ) : (
        <Box>
          <CssBaseline />
          <NavBar />
          <Container maxWidth="xl" sx={{ display: "flex" }}>
            {upcomingMeetings && upcomingMeetings.length > 0 ? (
              <>
                <Box sx={{ maxWidth: "30%", display: "flex", m: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      {upcomingMeetings && (
                        <CurrentMeetingCard
                          meeting={upcomingMeetings[0]?.meeting}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Grid
                  container
                  spacing={2}
                  sx={{ m: 2 }}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {upcomingMeetings &&
                    upcomingMeetings.map((meeting: IMeetingResponse) => {
                      return (
                        <Button
                          onClick={() =>
                            navigate(`/meeting/${meeting.meeting.id}`)
                          }
                        >
                          <UpcomingMeetingCard meeting={meeting.meeting} />
                        </Button>
                      );
                    })}
                </Grid>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  mt: 16,
                  justify: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h2"
                  align="center"
                  sx={{ justify: "center", textAlign: "center", width: "100%" }}
                  style={{ fontFamily: "Quicksand" }}
                >
                  You have no upcoming meetings
                </Typography>
              </Box>
            )}
          </Container>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Home;
