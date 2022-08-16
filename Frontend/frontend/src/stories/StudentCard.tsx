import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Avatar, CardActionArea } from "@mui/material";

export interface IPostingCardProps {
  imageUrl?: string;
  userName?: string;
  courseName?: string;
}

export default function PostingCard(props: IPostingCardProps) {
  return (
    <Box sx={{ width: 380, height: 462 }}>
      <Card sx={{ width: 380, height: 406, borderRadius: 5, marginTop: 7 }}>
        <CardActionArea>
          <CardContent>
            <Avatar
              sx={{
                width: 260,
                height: 260,
                borderRadius: 5,
                marginTop: 0,
                mx: "auto",
              }}
              variant="rounded"
              src={props.imageUrl}
            />
          </CardContent>
          <Typography variant="body1" component="h2" sx={{ mx: "auto" }}>
            {props.userName}
          </Typography>
          <Typography variant="body1" component="h2">
            {props.courseName}
          </Typography>
        </CardActionArea>
      </Card>
    </Box>
  );
}
