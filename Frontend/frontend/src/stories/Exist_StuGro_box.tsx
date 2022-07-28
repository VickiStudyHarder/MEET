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
import { Avatar, CardActionArea, Icon } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormRow from "@mui/material/Grid";
import Item from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export interface IExist_StuGro_box {
  imageUrl?: string;
  GroupName?: string;
  NumofMember?: number;
  GroupLink?: string;

}


export default function StuGro_box(props: IExist_StuGro_box) {
    return (
        <Box sx={{ width: 380, height: 313 }}>
        <Card sx={{ width: 380, height: 313, borderRadius: 5}}>
            <CardActionArea>
                <CardContent>
                    <Grid container direction = "row" sx={{ width: 380, height: 313, marginLeft: 5, marginTop: 2}}>
                        
                        <Grid container item spacing = {1} direction = "column" sx={{width: 380, height: 85, marginTop: 1}}>

                            <Avatar
                                alt="Remy Sharp"
                                src="https://live.staticflickr.com/65535/52235254195_e710148a39_t.jpg"
                                sx={{ width: 85, height: 85}}
                            />
                            
                            <Grid container spacing = {2} direction = "column" sx={{width: 310, direction:"column", alignItems : "center", justify:"flex-end"}}>
                                <Grid item>
                                <Link href="https://www.google.com" underline="hover" sx={{color:"#70798B", mx:"auto", fontSize : "1rem", direction:"column", alignItems : "center", justify:"flex-end"}} >
                                {                                        
                                    <Typography variant="body1">
                                    Revisit <ArrowRightAltOutlinedIcon></ArrowRightAltOutlinedIcon>
                                    </Typography>
                                }
                                </Link>
                                </Grid>
                                <Grid item sx={{marginTop:2}}>
                                <Link href="/" underline="hover" sx={{color:"#70798B", mx:"auto", fontSize : "1rem"}} >
                                {
                                    <Typography variant="body1">
                                    Leave <LogoutOutlinedIcon></LogoutOutlinedIcon>
                                    </Typography>
                                }
                                </Link>
                                </Grid>

                            </Grid>
 

                            
                        </Grid>
                        <Grid container item sx={{mx:"auto"}}>
                                <Typography variant="body1" component="h1" sx={{ marginTop: 1, fontSize : "1.5rem", fontWeight: 600}}>
                                {props.GroupName}
                                </Typography>
                        </Grid>


                        <Grid container item>
                        <Typography variant="body1" component="h2" sx={{width: 245, color:"#70798B", fontSize: 14}}>
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