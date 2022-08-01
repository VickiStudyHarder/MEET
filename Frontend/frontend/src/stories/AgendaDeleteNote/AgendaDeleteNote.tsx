import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import './AgendaDeleteNote.scss';
import { Button } from '@mui/material';


export interface AgendaDeleteNoteInfo {
  title?: string;
  desc?: string;
  author?: string;
  time?: string;
}

export default function PostingAgendaDeleteNoteInfo(props: AgendaDeleteNoteInfo) {
  const theme = useTheme();
  return (
    <Box className="agenda-delete-note-wrap">
      <Box className="l"></Box>
      <Box className="c">
        <Box className="tit">
          {props.title}
        </Box>
        <Box className="desc">
          {props.desc}
        </Box>
      </Box>
      <Button className="r">
        Delete
      </Button>
      <Box className="tip">
        <span>By {props.author} .</span>
        <span>Posted {props.time} </span>
      </Box>
    </Box>
  );
}
