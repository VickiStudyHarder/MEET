import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Icon, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotesIcon from "@mui/icons-material/Notes";
import BallotIcon from "@mui/icons-material/Ballot";
import { pink, blue, purple } from "@mui/material/colors";
import GroupsIcon from "@mui/icons-material/Groups";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import agenda from "../assets/agenda.png";
import note from "../assets/note.png";
import todo from "../assets/todo.png";

export interface IEmptyMeetingBox {
  id?: number;
  type: string;
  icon: number;
}

export default function EmptyMeetingBox(props: IEmptyMeetingBox) {
  const navigate = useNavigate();
  const iconset = [agenda, todo, note];
  const name = ["Create Agenda", "Create Todo", "Create Note"];
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
          style={{
            fontFamily: "Quicksand",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          {name[props.icon]}
          <CardActionArea
            sx={{
              display: "flex",
              flexGrow: 1,
              m: "auto",
              justify: "center",
              justifyContent: "center",
              align: "center",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexGrow: 1,
                m: "auto",
                justify: "center",
                justifyContent: "center",
                align: "center",
              }}
            >
              <img
                src={iconset[props.icon]}
                style={{
                  width: 380,
                  height: 220,
                  marginTop:-26,
                  borderRadius: 20,
                  boxShadow: "-15px 30px 30px rgba(8, 20, 32, 0.2)",
                }}
                alt="YourMeetingImage"
              />
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Button>
  );
}
