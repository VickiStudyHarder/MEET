import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Avatar, CardActionArea ,Modal} from "@mui/material";
import './SuccessTip.scss';
import { Button } from '@mui/material';

export interface SuccessTipInfo {
  desc?: string;
}

export default function SuccessTip(props:SuccessTipInfo) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal 
        open={open} 
        onClose={handleClose}
      >
        <Box className="success-tip-wrap">
          <Box className="logo"></Box>
          <Box className="desc">{props.desc}</Box>
        </Box>
      </Modal>
    </div>
  );
}
