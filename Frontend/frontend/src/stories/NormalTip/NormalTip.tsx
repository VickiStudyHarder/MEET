import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Avatar, CardActionArea, Modal } from "@mui/material";
import "./NormalTip.scss";
import { Button } from "@mui/material";

export interface NormalTipInfo {
  desc?: string;
}

export default function NormalTip(props: NormalTipInfo) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="normal-tip-wrap">
          <Box className="logo">
            <Box className="rill"></Box>
          </Box>
          <Box className="desc">{props.desc}</Box>
        </Box>
      </Modal>
    </div>
  );
}
