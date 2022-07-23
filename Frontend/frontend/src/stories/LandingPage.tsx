import { Box, Container, TextField } from "@mui/material";
import { url } from "inspector";
import React from "react";
import Brand from "./Brand";
import Input from "./Input";

interface LandingPageProps {
  onLogin: () => void;
  onCreateAccount: () => void;
}

export const LandingPage = ({ onLogin, onCreateAccount }: LandingPageProps) => {
  const bgImgUrl =
    "./landingpage.jpg";
  return (
    <Container
      style={{
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
        <Input
          style={{ position: "absolute", left: "95px", top: "248px" }}
        ></Input>
      </Box>
    </Container>
  );
};
