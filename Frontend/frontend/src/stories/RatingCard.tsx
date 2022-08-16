import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Avatar, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { IUser } from "../types/meetings";
import CalendarAvatar from "../assets/calendar_avator.jpg";

export interface IRatingCard {
  user: IUser;
}

const RatingCard: React.FC<IRatingCard> = ({ user }) => {
  const formattedRole = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  console.log("rating", user);
  return (
    <Box sx={{ width: 662, height: 610 }}>
      <Avatar
        sx={{
          width: 188,
          height: 188,
          borderRadius: 94,
          mx: "auto",
        }}
        variant="rounded"
        src={`./avatars/${user?.avatar || "0"}.png`}
      />
      <Card
        sx={{
          width: 662,
          height: 518,
          borderRadius: 5,
          marginTop: -12,
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            direction: "column",
          }}
        >
          <Grid item>
            <CardContent sx={{ borderRadius: 5, marginTop: 15 }}>
              <Typography
                component="legend"
                variant="h3"
                sx={{
                  my: 2,
                  mx: "auto",
                }}
                style={{ fontFamily: "Quicksand" }}
              >
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              <Typography
                component="legend"
                sx={{
                  mx: "auto",
                  my: 2,
                  color: "#617181",
                }}
                variant="h4"
                style={{ fontFamily: "Quicksand" }}
              >
                {formattedRole}
              </Typography>
              <Typography
                variant="h5"
                component="legend"
                sx={{
                  mx: "auto",
                  marginTop: 6,
                  fontSize: "2rem",
                  color: "#ABAFC7",
                }}
                style={{ fontFamily: "Quicksand" }}
              >
                Your Rating
              </Typography>
              <Rating
                name="read-only"
                size="large"
                value={user.rating}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mx: "auto",
                  my: 4,
                  width: "100%",
                }}
                readOnly
              />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default RatingCard;
