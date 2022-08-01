import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import './AgendaCreateNote.scss';
import { Button } from '@mui/material';


export interface CalendarUserCardMiniInfo {
  title?: string;
  desc?: string;
}

export default function PostingCard(props: CalendarUserCardMiniInfo) {
  const theme = useTheme();
  return (
    <Box className="agenda-create-note-wrap">
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
    </Box>
  );
}
