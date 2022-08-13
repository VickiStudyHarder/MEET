import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Avatar, CardActionArea ,Modal} from "@mui/material";
import './CancelMeeting.scss';
import { Button } from '@mui/material';

export interface CancelMeetingInfo {
  time?: string;
  name?: string;
  desc?: string;
}

export default function CancelMeeting(props:CancelMeetingInfo) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal 
        open={open} 
        onClose={handleClose}
      >
        <Box className="cancel-meeting-wrap">
          <Box className="avator-box">
            <Box className="avator"></Box>
            <Box className="time-box">
              <Box className="name">CANCEL MEETING</Box>
              <Box className="tit">Metting123</Box>
              <Box className="time">{props.time}</Box>
            </Box>
          </Box>
          <Box className="desc">
            {props.desc}
          </Box>
          <Box className="btn-box">
            <Button className="btn-l">Confirm</Button>
            <Button className="btn-r">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
