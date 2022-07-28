import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Avatar, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";


export interface IRatingCard {
  imageUrl?: string;
  userName?: string;
  courseName?: string;
  Rating?: number;
  UserType?: string;
  Part_rate?: number
}

export default function RatingCard(props: IRatingCard) {
  return (
    <Box sx={{ width: 662, height: 610}}>
      <Avatar
        sx={{
          width: 188,
          height: 188,
          borderRadius: 94,
          mx: "auto"
        }}
        variant="rounded"
        src={props.imageUrl}
      />


      <Card sx={{
          width: 662, 
          height: 518, 
          borderRadius: 5, 
          marginTop: -12
          }}>

        <Grid container 
          sx={{
            justifyContent: "center", 
            alignItems: "center", 
            direction: "column"
            }}>
          <Grid item>
          <CardContent sx={{borderRadius: 5, marginTop:15}}>
          <Typography 
            component="legend" 
            variant="h3" 
            sx={{
              marginTop: 1, 
              mx: "auto"
              }}>
            {props.userName}
          </Typography>
          
          
          <Typography variant="body1" component="h2">
            {props.courseName}
          </Typography>
          <Typography 
            component="legend" 
            sx={{
              mx: "auto" , 
              marginTop: 1, 
              color:"#617181"
              }}>
                {props.UserType}
          </Typography>
          <Typography 
            variant="h5" 
            component="legend" 
            sx={{
              mx: "auto", 
              marginTop: 8, 
              fontSize : "2rem", 
              color:"#ABAFC7"}}
              >
                Achievement
          </Typography>

          <div><Rating 
            name="read-only" 
            size="large" 
            value={props.Rating} 
            sx={{
              marginleft: 100, 
              marginTop: 5, 
              fontSize : "3rem", 
              color:"#FF054D"}} 
              readOnly />
          </div>
          <Typography 
            variant="body1" 
            component="legend" 
            sx={{
              mx: "auto", 
              fontSize : "1rem"
              }}>
                Participating Rate: {props.Part_rate}%
          </Typography>
          </CardContent>
          </Grid>
        </Grid>
          
          
      </Card>
 
    </Box>
  );
}
