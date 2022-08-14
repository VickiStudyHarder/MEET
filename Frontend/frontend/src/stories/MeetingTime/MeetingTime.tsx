import * as React from "react";
import Box from "@mui/material/Box";
import { Modal ,Button} from "@mui/material";
import './MeetingTime.scss';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  borderRadius: '12px',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(15px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#6001D3',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 12,
    height: 12,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
  
}));

export interface MeetingTimeInfo {
  desc?: string;
  title?: string;
  timeArr: Array<object>;

}

export default function MeetingTime(props:MeetingTimeInfo) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal 
        open={open} 
        onClose={handleClose}
        className="meeting-time-pop"
      >
        <Box className="meeting-time-wrap">
          <Box className="head">
            <Box className="logo-box">
              <Box className="logo"></Box>
            </Box>
            <Box className="title">
              {props.title}
            </Box>
          </Box>
          <Box className="search-box">
            <input type="text" placeholder="Meeting name" />
          </Box>
          <Box className="time-box">
            {props.timeArr.map((item) =>
              <Box className="time-item">
                  <FormControlLabel
                  control={
                    <IOSSwitch 
                      sx={{ m: 1 }} 
                      defaultChecked={item.checked}
                      disabled={item.disabled}
                      />
                    }
                    label={item.time}
                />
              </Box>
            )}
          </Box>
          <Box className="btn-box">
            <Button className="btn-l">Confirm</Button>
            <Button className="btn-r" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
