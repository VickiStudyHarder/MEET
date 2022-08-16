import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Avatar, CardActionArea } from "@mui/material";
import "./UserCard.scss";
import Star from "./assets/star.svg";
import { Button } from "@mui/material";

export interface userCardInfo {
  time?: string;
  name?: string;
  star: Array<number>;
  desc?: string;
}

export default function PostingCard(props: userCardInfo) {
  const theme = useTheme();
  return (
    <Box className="user-card-wrap">
      <Box className="avator-box">
        <Avatar className="avator" alt="Remy Sharp" src="" />
        <Box className="time-box">
          <Box className="tit">Metting</Box>
          <Box className="time">{props.time}</Box>
        </Box>
      </Box>
      <Box className="name">{props.name}</Box>
      <Box className="star-box">
        {props.star.map(() => (
          <img className="star" src={Star} alt="Build" />
        ))}
      </Box>
      <Box className="desc">{props.desc}</Box>
      <Box className="btn-box">
        <Button className="btn-l">Approve</Button>
        <Button className="btn-r">Deny</Button>
      </Box>
    </Box>
  );
}
