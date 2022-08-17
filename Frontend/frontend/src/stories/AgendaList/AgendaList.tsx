import React, { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Avatar, CardActionArea } from "@mui/material";
import "./AgendaList.scss";
import { IAgenda } from "../../types/meetings";
import MeetingsArrow from "../../assets/MeetingsArrow.png";
import { useEffect } from "react";
import AgendaListItem from "../../components/molecules/AgendaListItem";
import { AnyRecordWithTtl } from "dns";
import AppContext from "../../contexts/AppContext";

export interface IAgendaList {
  agendaList: IAgenda[];
  handleGetMeeting: any;
}

const { userInfo } = useContext(AppContext);

const AgendaList: React.FC<IAgendaList> = ({
  agendaList,
  handleGetMeeting,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Box className="agenda-list-wrap" sx={{ height: "800px" }}>
      <Box className="title" style={{ fontFamily: "Quicksand" }}>
        Agenda list
      </Box>
      <Box className="box">
        {agendaList.map((item: IAgenda, index) => {
          return (
            <AgendaListItem
              role={userInfo.role}
              item={item}
              index={index}
              handleGetMeeting={handleGetMeeting}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AgendaList;
