import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Icon } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';




export interface INew_StuGro_box {
  imageUrl?: string;
  GroupName?: string;
  NumofMember?: number;
  GroupLink?: string;

}


export default function StuGro_box(props: INew_StuGro_box) {
    return (
        <Box sx={{
            width: 380, 
            height: 313 
            }}>
        <Card sx={{ 
            width: 380, 
            height: 313, 
            borderRadius: 5}}>
            <CardActionArea>
                <CardContent>

                    <Grid container 
                        direction = "row" 
                        sx={{ 
                            width: 380, 
                            height: 313, 
                            marginLeft: 5, 
                            marginTop: 2}}>
                        
                        <Grid container item 
                            spacing = {1} 
                            direction = "column" 
                            sx={{
                                width: 380, 
                                height: 85, 
                                marginTop: 1}}
                                >
                            <Grid item>
                            <Avatar
                                alt="Remy Sharp"
                                src="https://live.staticflickr.com/65535/52235254195_e710148a39_t.jpg"
                                sx={{ width: 85, height: 85}}
                                />
                            </Grid>
                            <Grid item>
                                <Link href="https://www.google.com" 
                                    underline="hover" 
                                    sx={{
                                        color:"#70798B", 
                                        mx:"auto", 
                                        fontSize : "1rem"}} >
                                {                                        
                                    <Typography variant="body1">
                                    Join <ArrowRightAltOutlinedIcon></ArrowRightAltOutlinedIcon>
                                    </Typography>
                                }
                                </Link>

                            </Grid>
 

                            
                        </Grid>
                        <Grid container item 
                            sx={{mx:"auto"}}>
                                <Typography 
                                    variant="body1" 
                                    component="h1" 
                                    sx={{ 
                                        marginTop: 1, 
                                        fontSize : "1.5rem", 
                                        fontWeight: 600
                                        }}>
                                    {props.GroupName}
                                </Typography>
                        </Grid>


                        <Grid container item>
                        <Typography 
                        variant="body1" 
                        component="h2" 
                        sx={{
                            width: 245, 
                            color:"#70798B", 
                            fontSize: 14}}
                            >
                        {props.NumofMember}/30 Member
                        </Typography>
                        </Grid>

                        
                    </Grid>
                            
                </CardContent>
            </CardActionArea>
        </Card>
    </Box>
    );
  }