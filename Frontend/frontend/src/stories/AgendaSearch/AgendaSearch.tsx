import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import './AgendaSearch.scss';
import { Button } from '@mui/material';


export interface CalendarUserCardMiniInfo {
  avator?: string;
  name?: string;
}

export default function PostingCard(props: CalendarUserCardMiniInfo) {
  const theme = useTheme();
  return (
    <Box className="agenda-search-wrap">
      <input className="l" type="text" placeholder="zoom link here" />
      <Button className="r">
        Rating
      </Button>
    </Box>
  );
}
