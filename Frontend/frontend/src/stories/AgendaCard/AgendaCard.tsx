import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import './AgendaCard.scss';
import { Button } from '@mui/material';


export interface AgendaCardInfo {
  number?: string;
  name?: string;
  description?: string;
}

export default function PostingAgendaCardInfo(props: AgendaCardInfo) {
  const theme = useTheme();
  return (
    <Box className="agenda-card-wrap">
      <Box className="l" style={{ fontFamily: "Quicksand" }}>
        {props.number}
      </Box>
      <Box className="c">
        <Box className="tit" style={{ fontFamily: "Quicksand" }}>
          {props.name}
        </Box>
        <Box className="desc" style={{ fontFamily: "Quicksand" }}>
          {props.description}
        </Box>
      </Box>
      <Box className="r">
        <Button className="btn btn-1" style={{ fontFamily: "Quicksand" }}>
          Change
        </Button>
        <Button className="btn btn-2" style={{ fontFamily: "Quicksand" }}>
          Create
        </Button>
      </Box>
    </Box>
  );
}
