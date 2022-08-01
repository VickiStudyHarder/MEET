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
      <Box className="l">
        {props.number}
      </Box>
      <Box className="c">
        <Box className="tit">
          {props.name}
        </Box>
        <Box className="desc">
          {props.description}
        </Box>
      </Box>
      <Box className="r">
        <Button className="btn btn-1">
          Change
        </Button>
        <Button className="btn btn-2">
          Create
        </Button>
      </Box>
    </Box>
  );
}
