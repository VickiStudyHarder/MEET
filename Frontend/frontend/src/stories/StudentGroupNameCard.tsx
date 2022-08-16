import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import AppContext from "../contexts/AppContext";
import UserImage from "../assets/UserImage.png";
import { message } from "antd";

export interface IStudentGroupNameCard {
  myGroups?: any;
  doSomething?: (params: any) => any;
  inChat?: boolean;
  groupName?: string;
  switchButton?: boolean;
}

export const StudentGroupNameCard: React.FC<IStudentGroupNameCard> = ({
  myGroups,
  doSomething,
  inChat,
  groupName,
  switchButton,
}) => {
  const { firstName, lastName, getUserInfo, userInfo, getMeetingTodos, email } =
    useContext(AppContext);
  useEffect(() => {
    getUserInfo(email);
    console.log("userinfo=", userInfo);
  }, []);

  return (
    <Box sx={{ width: 380, height: 666 }}>
      <Avatar
        sx={{
          width: 260,
          minWidth: 260,
          height: 260,
          minHeight: 260,
          z: 40,
          mx: "auto",
          borderRadius: 8,
        }}
        variant="rounded"
        src={`../avatars/${userInfo?.avatar || "0"}.png`}
      />
      <Card
        sx={{
          width: 380,
          height: 610,
          marginTop: -25,
          pt: 30,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            {userInfo.firstName} {userInfo.lastName}
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              marginTop: 1,
              color: "#70798B",
              marginBottom: 3,
            }}
          >
            {userInfo.role}
          </Typography>
          {!inChat && (
            <Box sx={{ marginTop: 10 }}>
              <Button
                onClick={doSomething}
                variant="contained"
                style={{
                  color: "#000000",
                  backgroundColor: "#EEEEEE",
                  borderRadius: 20,
                  width: 200,
                  height: 50,
                  fontWeight: "bold",
                }}
              >
                {switchButton && "My group"}
                {!switchButton && "All group"}
              </Button>
            </Box>
          )}
          {inChat && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="subtitle2"
                sx={{ textAlign: "center", marginTop: 8, color: "gray" }}
              >
                Welcome to:
              </Typography>
              <Typography variant="h2" sx={{ textAlign: "center" }}>
                {groupName}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentGroupNameCard;
