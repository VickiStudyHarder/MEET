import { Box, Button, Container, Link, TextField } from "@mui/material";
import { url } from "inspector";
import React from "react";
import Brand from "./Brand";
import CustomInput from "./Input";

interface LandingPageProps {
  onLogin: () => void;
  onCreateAccount: () => void;
  isSignin: boolean;
}

export const LandingPage = (props: LandingPageProps) => {
  const bgImgUrl = "./landingpage.jpg";
  const onClick = ()=>{

  }
  return (
    <Container
      sx={{
        margin: 0,
        width: "100%",
        height: "auto",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${bgImgUrl})`,
      }}
    >
      <Box
        style={{
          borderRadius: 64,
          width: 596,
          height: 729,
          backdropFilter: "blur(8px)",
          marginLeft: 64,
          marginTop: 64,
        }}
      >
        <Box style={{ position: "absolute", left: "95px", top: "140px" }}>
          <Brand></Brand>
        </Box>
        <CustomInput
          sx={{ position: "absolute", left: "95px", top: "248px" }}
        ></CustomInput>
        <CustomInput
          sx={{ position: "absolute", left: "95px", top: "328px" }}
        ></CustomInput>
        <Link
          sx={{ position: "absolute", left: "95px", top: "405px" }}
          href="#"
        >
          {props.isSignin
            ? "Already have an account? Sign in here."
            : "Already have an account? Sign in here."}
        </Link>
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            left: "95px",
            bottom: "98px",
            width: "227px",
            height: "72px",
            borderRadius: "36px",
            backgroundImage: "linear-gradient(to right,#EA327C, #720CCA)",
          }}
          onClick={onClick()}
        >
          <Box
            sx={{
              position: "absolute",
              left: "24px",
              textAlign: "center",
              width: "130px",
            }}
          >
            Get Started
          </Box>
          <img
            style={{
              width: "44px",
              height: "44px",
              position: "absolute",
              right: "16px",
              top: "16px",
            }}
            src="./get-started.png"
            alt=""
          ></img>
        </Button>
      </Box>
    </Container>
  );
};
