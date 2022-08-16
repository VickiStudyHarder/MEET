import React, { useState, useEffect, useContext } from "react";
import { Button, Grid, Box, Paper, TextField, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AppContext } from "../../../contexts/AppContext";
import UserPool from "../../../utils/auth/UserPool";
import { useNavigate } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import { createUser } from "../../../api/users";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createToken } from "../../../api/google";

const CompleteSignUp: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [open, setOpen] = React.useState(false);
  const {
    email,
    password,
    courses,
    setCourses,
    error,
    setError,
    confirmationCode,
    setConfirmationCode,
    isCodeSent,
    setIsCodeSent,
    username,
    firstName,
    lastName,
    dateOfBirth,
    userType,
    googleAuthToken,
  } = useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSignUp = (event: any) => {
    event.preventDefault();

    console.log(email, password);
    UserPool.signUp(email, password, [], [], async (err: any, data: any) => {
      if (err) {
        setError(err.message);
        setOpen(true);
        console.log(error);
        return;
      }
      setIsCodeSent(true);
    });
  };

  const onConfirm = async () => {
    const confirmParams = {
      Pool: UserPool,
      Username: email,
    };

    const cognitoUser = new CognitoUser(confirmParams);
    const x = await cognitoUser.confirmRegistration(
      confirmationCode,
      true,
      async (err: any, data: any) => {
        if (err) {
          console.log(err);
        }
      }
    );
    console.log(x);
    const username = cognitoUser.getUsername();
    console.log(username);
    const user = {
      id: username,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      avatar: "1",
      role: userType,
      rating: 0,
      totalMeetings: 0,
    };
    await createUser(user);
    const result = await createToken(googleAuthToken || "", email);
    if (result.status !== 200) {
      throw new Error("Unable to set tokens correctly");
    }
    console.log(result);
    navigate("/login");
  };

  useEffect(() => {}, [courses, isCodeSent]);

  const onSubmit = () => {
    console.log("On Submit");
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justify: "center",
        }}
      >
        <Box>
          <Typography component="h1" variant="h5" sx={{ p: 4 }}>
            Complete Sign Up
          </Typography>
        </Box>
        <Box component="form" noValidate sx={{ m: 4 }}>
          {isCodeSent && (
            <TextField
              sx={{ m: 4 }}
              id="outlined-multiline-flexible"
              label="ConfirmationCode"
              multiline
              maxRows={4}
              value={confirmationCode}
              onChange={(e: any) => setConfirmationCode(e.target.value)}
            />
          )}
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"An error occured"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {error}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Box>
          {isCodeSent ? (
            <Button onClick={onConfirm} sx={{ p: 4 }}>
              Confirm Code
            </Button>
          ) : (
            <Button onClick={onSignUp} sx={{ p: 4 }}>
              Get Sign Up Verification Code
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default CompleteSignUp;
