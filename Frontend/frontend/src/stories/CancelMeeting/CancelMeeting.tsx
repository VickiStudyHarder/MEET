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
  content?:string;
  open:any;
  setOpen:any;
  onConfirmCallback?:any;
  onDenyCallback?:any;
}

export default function CancelMeeting(props:CancelMeetingInfo) {
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);
  return (
    <div>
      <Modal 
        open={props.open} 
        onClose={handleClose}
      >
        <Box className="cancel-meeting-wrap">
          <Box className="avator-box">
            <Box className="avator"></Box>
            <Box className="time-box">
              <Box className="name">{props.name}</Box>
              <Box className="tit">{props.desc}</Box>
              <Box className="time">{props.time}</Box>
            </Box>
          </Box>
          <Box className="desc">
            {props.content}
          </Box>
          <Box className="btn-box">
            <Button className="btn-l" onClick={()=>{props.onConfirmCallback()}}>Confirm</Button>
            <Button className="btn-r" onClick={()=>{
              handleClose();
              props.onDenyCallback()
            }}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
