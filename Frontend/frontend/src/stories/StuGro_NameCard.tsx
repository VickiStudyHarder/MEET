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
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export interface IStuGro_NameCard {
  imageUrl?: string;
  userName?: string;
  courseName?: string;
  MyGroupLink?: string;
  GroupSpaceLink?: string;
}

export default function PostingCard(props: IStuGro_NameCard) {
  return (
    <Box sx={{ width: 380, height: 666}}>
        <Avatar
              sx={{
                width: 260,
                height: 260,
                borderRadius: 5,
                marginTop: 0,
                mx: "auto",
              }}
              src={props.imageUrl}
        />
      <Card sx={{ width: 380, 
                height: 610, 
                borderRadius: 5, 
                marginTop: -25}}>
        <CardActionArea>
          <CardContent>
            <Typography variant="body1" 
                        component="h2" 
                        sx={{textAlign:"center", 
                            fontSize : "1.5rem", 
                            marginTop : 30}}>
                {props.userName}
            </Typography>
            <Typography variant="body1" 
                        component="h2" 
                        sx={{textAlign:"center", 
                            fontSize : "0.8rem", 
                            marginTop : 2, 
                            color:"#70798B"}}>
                {props.courseName}
            </Typography>

            <Box textAlign="center" 
                sx={{marginTop: 10}}>
                <Button href={props.GroupSpaceLink} 
                        sx={{textAlign:"center", 
                        minWidth: "196px", 
                        minHeight:"55px",
                        maxHeight:"55px", 
                        maxWidth: "196px", 
                        borderRadius: 7, 
                        backgroundColor: "#F6F6F6", 
                        color: "#000000", 
                        fontSize: 12, 
                        marginBottom:6}} 
                        variant="contained">
                        Group Space
                </Button>
            </Box>


            <Link href={props.MyGroupLink} 
                    underline="hover" 
                    sx={{textAlign:"center", 
                        color:"#000000", 
                        mx:"auto", 
                        fontSize : "1rem"}}>
                {                                        
                    <Typography variant="body1" >
                        My Group
                    </Typography>
                }
            </Link>
             </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
