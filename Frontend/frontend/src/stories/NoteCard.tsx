import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

interface ListProps {
  pic: string;
  title: string;
  numberOfNotes: string;
  doSomething: (params: any) => any;
}

/**
 * Primary UI component for user interaction
 */
export default function NoteCard({
  pic = "",
  title = "",
  numberOfNotes = "0",
  doSomething,
  ...props
}: ListProps) {
  return (
    <Card variant="outlined" sx={{ height: 280, width: 340 }}>
      <CardActionArea onClick={doSomething}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 280,
            width: 340,
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: 250,
              width: 160,
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "column",
              marginRight: 7,
              marginBottom: -1,
            }}
          >
            <Box sx={{ display: "flex", height: 100 }}>
              <Avatar
                alt="icon"
                src={pic}
                variant="square"
                sx={{ width: 40, height: 40, marginTop: 3, borderRadius: 3 }}
              />
            </Box>
            <Box sx={{ display: "flex", height: 100 }}>
              <Typography
                component="div"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                {title}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", height: -1, justifyContent: "flex-end" }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
                marginBottom={4}
              >
                {numberOfNotes} items
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
