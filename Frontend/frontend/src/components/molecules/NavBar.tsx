import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  Avatar,
  Box,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import LogoImg from "../../stories/LogoImg";
import AvaterMeun from "../../stories/AvatarMenu";
import { User } from "../../contexts";
import AppContext from "../../contexts/AppContext";

interface INavBar {}

const options = [
  { title: "Upcoming Meetings", url: "/home" },
  { title: "Calendar", url: "/calendar" },
  { title: "All Meetings", url: "/meetings" },
  { title: "All To Dos", url: "/todo" },
  { title: "Rating", url: "/rating" },
  // { title: 'Recording', url: '/recording' },
  { title: "Group", url: "/group" },
];

const NavBar: React.FC<INavBar> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userInfo, getUserInfo } = useContext(AppContext);

  const changeAvatar = () => {};
  useEffect(() => {
    console.log("navbar:email=", email);
    getUserInfo(email);
  }, []);

  useEffect(() => {
    console.log("userinfo=", userInfo);
  }, [userInfo]);

  return (
    <Box sx={{ display: "flex", m: 4 }}>
      <Grid
        container
        spacing={4}
        justifyContent="flex-end"
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", marginLeft: 5 }}>
            <LogoImg title="MEET" content="is all you need" />
            {/* <Brand></Brand> */}
          </Box>
          <Box sx={{ display: "flex" }}>
            {options.map((option) => {
              return (
                <Button
                  color="inherit"
                  sx={{ color: "#70798B", marginRight: 2 }}
                  onClick={(e) => {
                    navigate(option.url);
                  }}
                  key={option.title}
                >
                  {location.pathname === option.url ? (
                    <Typography style={{ fontWeight: 600, color: "#000000" }} fontFamily={"Quicksand"}>
                      {option.title}
                    </Typography>
                  ) : (
                    <Typography fontFamily={"Quicksand"}>{option.title}</Typography>
                  )}
                </Button>
              );
            })}
            <Grid>
              <AvaterMeun
                pic={`./avatars/${userInfo?.avatar || "0"}.png`}
                changeFunc={changeAvatar}
                logoutFunc={(e) => navigate("/login")}
              />
            </Grid>
          </Box>
        </Toolbar>
      </Grid>
    </Box>
  );
};

export default NavBar;
