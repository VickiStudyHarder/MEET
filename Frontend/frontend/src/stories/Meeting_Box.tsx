import * as React from "react";


import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Icon } from "@mui/material";
import Grid from "@mui/material/Grid";

import AssignmentIcon from '@mui/icons-material/Assignment';
import { green, pink } from '@mui/material/colors';
import GroupsIcon from '@mui/icons-material/Groups';




export interface Meeting_Box {
  Box_name?: string;
  Meeting_name1?: string;
  Meeting_name2?: string;

}


export default function Meeting_Box(props: Meeting_Box) {
    return (
        <Box sx={{ width: 260, height: 210 }}>
        <Card sx={{ width: 260, height: 210, borderRadius: 5}}>
            <CardActionArea>
                <CardContent>
                    <Grid container 
                        direction = "row" 
                        sx={{ 
                            width: 260, 
                            height: 210, 
                            }}>
                        
                        <Grid container item 
                            direction = "column" 
                            sx={{
                                width: 260, 
                                height: 20, 
                                }}>

                            <Avatar sx={{ bgcolor: pink[500] }}>
                                    <AssignmentIcon />
                                  </Avatar>
                            
                        </Grid>
                        
                        <Grid container item sx={{mx:"auto"}}>
                                <Typography 
                                    variant="body1" 
                                    component="h1" 
                                    sx={{ 
                                        fontSize : "1.5rem", 
                                        fontWeight: 600
                                        }}>
                                {props.Box_name}
                                </Typography>
                        </Grid>


                        <Grid container item>
                        <Typography 
                            variant="body1" 
                            component="h2" 
                            sx={{
                                width: 245, 
                                color:"#70798B", 
                                fontSize: 14
                                }}>
                        <GroupsIcon/>
                        {props.Meeting_name1}
                        </Typography>
                        </Grid>

                        <Grid container item>
                        <Typography 
                            variant="body1" 
                            component="h2" 
                            sx={{
                                width: 245, 
                                color:"#70798B", 
                                marginTop: 0.1, 
                                fontSize: 14
                                }}>
                        <GroupsIcon/>
                        {props.Meeting_name2}
                        </Typography>
                        </Grid>

                        
                    </Grid>
                            
                </CardContent>
            </CardActionArea>
        </Card>
    </Box>
    );
  }