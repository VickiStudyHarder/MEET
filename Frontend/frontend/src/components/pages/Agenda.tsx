import React, { useContext, useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Dialog,
} from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../molecules/NavBar";
import { getMeetingById } from "../../api/meeting";
import { IMeeting } from "../../types/meetings";
import AgendaList from "../../stories/AgendaList/AgendaList";
import CreateAgendaItemForm from "../molecules/CreateAgendaItemForm";
import PageTitle from "../../stories/PageTiltle";
import CircleLoader from "react-spinners/CircleLoader";
import AgendaCard from "../../stories/AgendaCard/AgendaCard";
import AppContext from "../../contexts/AppContext";

interface IAgenda { }

const theme = createTheme();

const Agenda: React.FC<IAgenda> = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<null | IMeeting>(null);
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [diff, setDiff] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { email } = useContext(AppContext);

  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    handleGetMeeting();

  }, []);

  useEffect(() => {
    handleGetMeeting();
  }, [start, end, diff, email]);

  const handleGetMeeting = async () => {
    const result = await getMeetingById(Number(id));
    setMeeting(result);
    setLoading(false);
    console.log("agenda:handleGetMeeting", result);
    if (result) {
      const start = new Date(result.meetingStart).toLocaleString("en-AU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setStart(start);
      const end = new Date(result.meetingEnd).toLocaleString("en-AU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setEnd(end);
      const y = new Date(result.meetingEnd);
      const x = new Date(result.meetingStart);
      const timeDiff = y.valueOf() - x.valueOf();
      console.log("agenda:handleGetMeeting", start, end, timeDiff);
      const diffInHours = timeDiff / 1000 / 60 / 60;
      if (diffInHours < 1) {
        setDiff(`${Math.abs(diffInHours).toFixed(0)} hours ago`);
      } else if (diffInHours < 24) {
        setDiff(`${diffInHours.toFixed(0)} hours`);
      } else {
        setDiff(`${(diffInHours / 24).toFixed(0)} days`);
      }
    }
  };

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <NavBar inMeeting={true} />
          {meeting && (
            <Box  sx={{ pl:10, pr:10 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      m: 2,
                      ml: 0,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ marginLeft: 3 }}>
                      <PageTitle
                        icon="6"
                        content={`Agenda - ${meeting?.summary}`}
                        doSomething={() => navigate(-1)}
                      />
                    </Box>
                    <div className="add">
                      <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        color="secondary"
                        sx={{
                          backgroundColor: "#6001D3",
                          color: "#ffffff",
                          borderRadius: 10,
                          width: 104,
                          height: 45,
                        }}
                        startIcon={<AddCircleOutlineIcon />}
                      >
                        New
                      </Button>
                    </div>
                    {/* <Button
                      onClick={handleClickOpen}
                      variant="outlined"
                      sx={{ borderColor: "#6001D3", color: "#6001D3" }}
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      New
                    </Button> */}
                  </Box>
                </Box>
                <Divider variant="middle" sx={{ width: "100%" }} />
                <Box
                  sx={{
                    m: 2,
                    width: "100%",
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        boxShadow: "0px 50px 80px rgba(106, 114, 154, 0.2)",
                        width: 800,
                        height: 350,
                        mt: 30,
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "row",
                        p: 4,
                        background: "#FFFFFF",
                        // border:,
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          maxWidth: "40%",
                          justifyContent: "center",
                          alignItems: "center",
                          paddingLeft: "60px",
                        }}
                      >
                        {/* <GroupsIcon
                          sx={{ color: "#6001D3", fontSize: 60 }}
                        ></GroupsIcon> */}
                        <Typography
                          style={{ fontFamily: "Quicksand", maxWidth: "300px" }}
                          align="center"
                          // color='#6001D3'
                          sx={{ fontSize: 50, mx: "auto" }}
                        >
                          {meeting.summary}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          align="center"
                          style={{ fontFamily: "Quicksand" }}
                          sx={{ mx: "auto", my: 2 }}
                        >
                          {start}
                        </Typography>
                        <Typography
                          style={{ fontFamily: "Quicksand" }}
                          variant="subtitle1"
                          align="center"
                          // color='white'
                          sx={{ mx: "auto", mb: 2 }}
                        >
                          {end}
                        </Typography>
                      </Box>
                      <Divider
                        variant="middle"
                        orientation="vertical"
                        sx={{ width: "10%", display: "flex", mx: 4 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                          maxWidth: "40%",
                          justifyContent: "center",
                        }}
                      >
                        {/* <AlarmIcon
                          sx={{ color: "#6001D3", fontSize: 60 }}
                        ></AlarmIcon> */}
                        <Typography
                          // variant='h2'
                          // color='#6001D3'
                          sx={{
                            mx: "auto",
                            fontWeight: 500,
                            fontSize: 70,
                            my: 4,
                          }}
                          style={{ fontFamily: "Quicksand" }}
                        >
                          {diff}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {meeting.agendas && (
                    <AgendaList
                      agendaList={meeting.agendas}
                      handleGetMeeting={handleGetMeeting}
                    />
                  )}
                </Box>
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // sx={{ display: 'flex', flexGrow: 1 }}
                maxWidth="lg"
              >
                {meeting && (
                  <CreateAgendaItemForm
                    setOpen={setOpen}
                    meeting={meeting}
                    handleGetMeeting={handleGetMeeting}
                    handleClose={handleClose}
                  />
                )}
              </Dialog>
            </Box>
          )}
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Agenda;
