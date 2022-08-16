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
import avater0 from "../../avatars/0.png";
import avater1 from "../../avatars/1.png";
import avater2 from "../../avatars/2.png";
import avater3 from "../../avatars/3.png";
import avater4 from "../../avatars/4.png";
import avater5 from "../../avatars/5.png";
import avater6 from "../../avatars/6.png";
import avater7 from "../../avatars/7.png";
import avater8 from "../../avatars/8.png";
import avater9 from "../../avatars/9.png";
import avater10 from "../../avatars/10.png";
import avater11 from "../../avatars/11.png";
import avater12 from "../../avatars/12.png";

interface INavBar {
  inMeeting?: boolean;
}

const options = [
  { title: "Upcoming Meetings", url: "/home" },
  { title: "Calendar", url: "/calendar" },
  { title: "All Meetings", url: "/meetings" },
  { title: "All To Dos", url: "/todo" },
  { title: "Rating", url: "/rating" },
  // { title: 'Recording', url: '/recording' },
  { title: "Group", url: "/group" },
];

const NavBar: React.FC<INavBar> = ({ inMeeting = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userInfo, getUserInfo } = useContext(AppContext);
  const [image, setImage] = useState("");

  const changeAvatar = () => {};
  useEffect(() => {
    console.log("navbar:email=", email);
    getUserInfo(email);
    if (userInfo.avatar === "1") {
      setImage(avater1);
    }
    if (userInfo.avatar === "2") {
      setImage(avater2);
    }
    if (userInfo.avatar === "3") {
      setImage(avater3);
    }
    if (userInfo.avatar === "4") {
      setImage(avater4);
    }
    if (userInfo.avatar === "5") {
      setImage(avater5);
    }
    if (userInfo.avatar === "6") {
      setImage(avater6);
    }
    if (userInfo.avatar === "7") {
      setImage(avater7);
    }
    if (userInfo.avatar === "8") {
      setImage(avater8);
    }
    if (userInfo.avatar === "9") {
      setImage(avater9);
    }
    if (userInfo.avatar === "10") {
      setImage(avater10);
    }
    if (userInfo.avatar === "11") {
      setImage(avater11);
    }
    if (userInfo.avatar === "12") {
      setImage(avater12);
    }
  }, []);

  useEffect(() => {
    console.log("userinfo=", userInfo);
    console.log("location=", location);
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
            {inMeeting &&
              options.map((option) => {
                return (
                  <Button
                    color="inherit"
                    sx={{ color: "#70798B", marginRight: 2 }}
                    onClick={(e) => {
                      navigate(option.url);
                    }}
                    key={option.title}
                  >
                    {"/meetings" === option.url && (
                      <Typography
                        style={{ fontWeight: 600, color: "#000000" }}
                        fontFamily={"Quicksand"}
                      >
                        {option.title}
                      </Typography>
                    )}
                    {"/meetings" !== option.url && (
                      <Typography fontFamily={"Quicksand"}>
                        {option.title}
                      </Typography>
                    )}
                  </Button>
                );
              })}
            {!inMeeting &&
              options.map((option) => {
                return (
                  <Button
                    color="inherit"
                    sx={{ color: "#70798B", marginRight: 2 }}
                    onClick={(e) => {
                      navigate(option.url);
                    }}
                    key={option.title}
                  >
                    {location.pathname === option.url && (
                      <Typography
                        style={{ fontWeight: 600, color: "#000000" }}
                        fontFamily={"Quicksand"}
                      >
                        {option.title}
                      </Typography>
                    )}
                    {location.pathname !== option.url && (
                      <Typography fontFamily={"Quicksand"}>
                        {option.title}
                      </Typography>
                    )}
                  </Button>
                );
              })}
            <Grid>
              <AvaterMeun
                pic={image}
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
