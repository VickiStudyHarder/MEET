import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Avatar, CardActionArea ,Modal} from "@mui/material";
import './BookMeeting.scss';
import { Button } from '@mui/material';

export interface BookMeetingInfo {
  time?: string;
  name?: string;
  desc?: string;
}

export default function BookMeeting(props: BookMeetingInfo) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal 
        open={open} 
        onClose={handleClose}
      >
        <Box className="book-meeting-wrap">
          <Box className="avator-box">
            <Avatar className="avator" alt="Remy Sharp" src="" />
            <Box className="time-box">
              <Box className="name">BOOK MEETING</Box>
              <Box className="tit">Metting123</Box>
              <Box className="time">{props.time}</Box>
            </Box>
          </Box>
          <Box className="desc">
            {props.desc}
          </Box>
          <Box className="btn-box">
            <Button className="btn-l">Approve</Button>
            <Button className="btn-r">Deny</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
