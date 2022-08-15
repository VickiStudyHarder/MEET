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
  open:any;
  setOpen:any;
  onConfirmCallback?:any;
  onDenyCallback?:any;
  content?:string;
}

export default function BookMeeting(props: BookMeetingInfo) {
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);
  return (
    <div>
      <Modal 
        open={props.open} 
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
          {props.content}
          </Box>
          <Box className="btn-box">
            <Button className="btn-l" onClick={()=>{props.onConfirmCallback()}}>Approve</Button>
            <Button className="btn-r" onClick={()=>{
              handleClose();
              props.onDenyCallback()
            }}>Deny</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
