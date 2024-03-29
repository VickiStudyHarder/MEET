import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Icon, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import AssignmentIcon from "@mui/icons-material/Assignment";
import NotesIcon from "@mui/icons-material/Notes";
import BallotIcon from "@mui/icons-material/Ballot";
import { pink, blue, purple } from "@mui/material/colors";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import { maxWidth } from "@mui/system";

export interface IMeetingBox {
  id?: number;
  type: string;
  boxName: "To Do" | "Meeting Note" | "Agenda Item";
  meetingName1: string;
  meetingName2: string;
}

export default function MeetingBox(props: IMeetingBox) {
  const dueDate =
    props.boxName === "To Do"
      ? new Date(props.meetingName1).toLocaleString("en-AU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      : props.meetingName1;
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(`/${props.type}/${props.id}`)}>
      <Box sx={{ width: 260, height: 210 }}>
        <Card
          sx={{
            width: 260,
            height: 210,
            borderRadius: 5,
            boxShadow: "-15px 30px 30px rgba(8, 20, 32, 0.2)",
          }}
          style={{ fontFamily: "Quicksand" }}
        >
          <CardActionArea>
            <CardContent sx={{ pt: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  m: 2,
                  mt: 1
                }}
              >
                {props.boxName === "Agenda Item" && (
                  <Avatar sx={{ bgcolor: purple[500], m: "auto" }}>
                    <BallotIcon />
                  </Avatar>
                )}
                {props.boxName === "To Do" && (
                  <Avatar sx={{ bgcolor: blue[500], m: "auto" }}>
                    <NotesIcon />
                  </Avatar>
                )}
                {props.boxName === "Meeting Note" && (
                  <Avatar sx={{ bgcolor: pink[500], m: "auto" }}>
                    <AssignmentIcon />
                  </Avatar>
                )}
                <Typography
                  variant="body1"
                  component="h1"
                  align="center"
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    m: "auto",
                    justifyContent: "center",
                  }}
                  style={{ fontFamily: "Quicksand" }}
                >
                  {props.boxName}
                </Typography>
              </Box>
              {props.boxName === "Agenda Item" && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      m: 2,
                      mt: 3
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        color: "#000000",
                        fontWeight: 'bold',
                        fontSize: 15,
                        
                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      Title:
                    </Typography>
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        width: 245,
                        color: "#70798B",
                        fontSize: 14,
                        justifyContent: "center",
                        ml:1.5,
                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      {dueDate}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      m: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        color: "#000000",
                        fontWeight: 'bold',
                        fontSize: 15,

                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      Detial:
                    </Typography>
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        width: 245,
                        color: "#70798B",
                        fontSize: 14,
                        m: "auto",
                        justifyContent: "center",
                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      {props.meetingName2}
                    </Typography>
                  </Box>
                </Box>
              )}
              {props.boxName === "To Do" && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      m: 2,
                      ml: 1,
                      mt: 3
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        color: "#000000",
                        fontWeight: 'bold',
                        fontSize: 15,

                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      Due date:
                    </Typography>
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        width: 245,
                        color: "#70798B",
                        fontSize: 14,
                        justifyContent: "center",
                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      {dueDate}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      m: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        color: "#000000",
                        fontWeight: 'bold',
                        fontSize: 15,

                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      Detial:
                    </Typography>
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        width: 245,
                        color: "#70798B",
                        fontSize: 14,
                        m: "auto",
                        justifyContent: "center",
                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      {props.meetingName2}
                    </Typography>
                  </Box>
                </Box>
              )}

              {props.boxName === "Meeting Note" && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      m: 2,
                      mt: 3
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        color: "#000000",
                        fontWeight: 'bold',
                        fontSize: 15,

                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      Title:
                    </Typography>
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        width: 245,
                        color: "#70798B",
                        fontSize: 14,
                        justifyContent: "center",
                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      {dueDate}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      ml:1.5,
                      m: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        color: "#000000",
                        fontWeight: 'bold',
                        fontSize: 15,

                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      Detial:
                    </Typography>
                    <Typography
                      variant="body1"
                      component="h2"
                      sx={{
                        width: 245,
                        color: "#70798B",
                        fontSize: 14,
                        m: "auto",
                        justifyContent: "center",
                      }}
                      style={{ fontFamily: "Quicksand" }}
                    >
                      {props.meetingName2}
                    </Typography>
                  </Box>
                </Box>
              )}

            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Button>
  );
}
