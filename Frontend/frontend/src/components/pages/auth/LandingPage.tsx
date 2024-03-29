import { Box, Button, Container, Link } from "@mui/material";
import { useContext, useState } from "react";
import AppContext from "../../../contexts/AppContext";
import Brand from "../../../stories/Brand";
import CustomInput from "../../../stories/Input";

interface LandingPageProps {}

const LandingPage = (props: LandingPageProps) => {
  const { authenticate } = useContext(AppContext);
  const bgImgUrl = "./landingpage.jpg";
  const onClick = (event: any) => {
    console.log(email, passwd);
    event.preventDefault();

    authenticate(email, passwd)
      .then((data: any) => {
        console.log("Logged In!", data);
        // navigate('/Home')
      })
      .catch((err: any) => {
        console.error("Failed to login!", err);
      });
  };
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [createMode, setCreateMode] = useState(false);
  return (
    <Container
      sx={{
        margin: 0,
        width: "100%",
        height: "auto",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${bgImgUrl})`,
        overflow: "hidden",
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
          onChange={(e: any) => setPasswd(e.target.value)}
          value={passwd}
          type="password"
          label={
            createMode
              ? "Create a password for your account"
              : "Your password here"
          }
          sx={{ position: "absolute", left: "95px", top: "326px" }}
        ></CustomInput>
        <CustomInput
          onChange={(e: any) => setEmail(e.target.value)}
          type="email"
          value={email}
          label={
            createMode ? "Put email here for regsiteration" : "Your email here"
          }
          sx={{ position: "absolute", left: "95px", top: "248px" }}
        ></CustomInput>
        {createMode ? (
          <CustomInput
            onChange={(e: any) => setEmail(e.target.value)}
            type="email"
            value={email}
            label={
              createMode
                ? "Put email here for regsiteration"
                : "Your email here"
            }
            sx={{ position: "absolute", left: "95px", top: "404px" }}
          ></CustomInput>
        ) : (
          <></>
        )}
        <Link
          sx={{ position: "absolute", left: "95px", top: "405px" }}
          href="#"
          onClick={() => {
            console.log("xxx");
            setCreateMode(!createMode);
          }}
        >
          {createMode
            ? "Already have an account? Sign in here."
            : "Don't have an account? Sign up here."}
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
          onClick={onClick}
        >
          <Box
            sx={{
              position: "absolute",
              left: "24px",
              textAlign: "center",
              width: "130px",
            }}
          >
            {createMode ? "Get Started" : "Sign in"}
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

export default LandingPage;
