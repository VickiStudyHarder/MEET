import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Avatar, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormRow from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

export interface IRequestCard {
  imageUrl?: string;
  userName?: string;
  courseName?: string;
  MeetingName?: string;
  Part_rate?: number;
  MeetingTime?: string;
  Rating?: number;
}

export default function RequestCard(props: IRequestCard) {
  return (
    <Box sx={{ width: 292, height: 422 }}>
        <Card sx={{ width: 288, height: 413, borderRadius: 5}}>
            <CardActionArea>
                <CardContent>
                    <Grid container direction = "column" sx={{ width: 280, height: 410, marginLeft: 1, marginTop: 2}}>
                        
                        <Grid container item spacing = {1} direction = "row" sx={{mx: "auto", marginTop: 1}}>
                            <FormRow>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 66, height: 66}}
                                />
                            </FormRow>
                            <FormRow>
                                <Grid container spacing = {2} direction = "column" sx={{marginleft: 1, mx:"auto"}}>
                                    <Grid item sx={{position: "relative", top: "9px"}}>
                                    <Typography variant="body1" component="h1" sx={{mx:"auto", fontSize : "1rem", color:"#70798B"}}>
                                    {props.MeetingName}
                                    </Typography>
                                    </Grid>
                                    <Grid item sx={{position: "relative", top: "-9px"}}>
                                    <Typography variant="body1" component="h1" sx={{mx:"auto", fontSize : "1rem", color:"#70798B"}}>
                                    {props.MeetingTime}
                                    </Typography>
                                    </Grid>

                                </Grid>
                            </FormRow>
 

                            
                        </Grid>
                        <Grid container item sx={{mx:"auto", marginTop : 3}}>
                                <Typography variant="body1" component="h1" sx={{ fontSize : "1.5rem", fontWeight: 600}}>
                                {props.userName}
                                </Typography>
                        </Grid>


                        <Grid container item>
                            <div><Rating name="read-only" size="large" value={props.Rating} sx={{marginleft: 100,  marginTop: 1, fontSize : "1.5rem", color:"#FF054D"}} readOnly /></div>
                        </Grid>


                        <Grid container item>
                        <Typography variant="body1" component="h2" sx={{width: 245, marginTop: 6, color:"#70798B", fontSize: 14}}>
                        Whether to agree to the student's request to participate in the meeting？
                        </Typography>
                        </Grid>

                        
                    
                        <Grid container item direction = "row" justifyContent="space-between" sx={{width: 245, marginTop: 7}}>
                        <FormRow>
                        <Button sx={{minWidth: "100px", minHeight:"40px",maxHeight:"40px", maxWidth: "100px", borderRadius: 5, backgroundColor: "#6001D3", color: "#FFFFFF", fontSize: 12}} variant="contained">Approve</Button>
                        </FormRow>
                        <FormRow>
                        <Button sx={{minWidth: "100px", maxWidth: "100px", minHeight:"40px", maxHeight:"40px",borderRadius: 5, backgroundColor: "#FCDC00", color: "#000000", fontSize: 12}} variant="contained">Deny</Button>
                        </FormRow>

                        </Grid>
                        
                    </Grid>
                            
                </CardContent>
            </CardActionArea>
        </Card>
    </Box>
  );
}
