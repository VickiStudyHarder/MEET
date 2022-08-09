import { Box, Button, Container, Link } from "@mui/material";
import { useContext, useState } from "react";
import AccountContext from "../../../contexts/Account";
import Brand from "../../../stories/Brand";
import CustomInput from "../../../stories/Input";

interface LandingPageProps {}

export const LandingPage = (props: LandingPageProps) => {
  const { authenticate } = useContext(AccountContext);
  const bgImgUrl = "./landing_page.jpg";
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
    <>
      <div
        style={{
          position: "absolute",
          top:"0px",
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${bgImgUrl})`,
        }}
      ></div>
      <Box
        sx={{
          borderRadius: '64px',
          width: '596px',
          backdropFilter: "blur(8px)",
          marginLeft: '100px',
          marginTop: '100px',
        }}
      >
        <Box sx={{ paddingLeft: "80px", paddingTop: "80px" }}>
          <Brand></Brand>
        </Box>
        <Box >
          <div style={{borderRadius:"100%",width:"108px",height:"108px"}}>
            <input type="file"></input>
          </div>
        </Box>
        {/* <CustomInput
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
        </Button> */}
      </Box>
    </>
  );
};
