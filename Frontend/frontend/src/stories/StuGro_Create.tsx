import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea } from "@mui/material";
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export interface IStuGro_Create {
    NewGroupLink?: string;
}

export default function PostingCard(props: IStuGro_Create) {
  return (
    <Box sx={{ 
            width: 803, 
            height: 759 
            }}>
      <Card sx={{ 
                width: 803, 
                height: 759, 
                borderRadius: 5, 
                marginTop: 7 
                }}>
        <CardActionArea>
          <CardContent>
            <Grid container 
                direction = "column" 
                sx={{
                    width: 750, 
                    marginLeft: 1, 
                    marginTop: 2
                    }}>

                <Grid container 
                    direction = "row" 
                    sx={{
                        marginLeft: 1, 
                        marginTop: 2
                        }}>

                    <Grid item>
                        <GroupsTwoToneIcon 
                        sx={{
                            fontSize: 40, 
                            color:"#0CD68A"
                            }}></GroupsTwoToneIcon>
                    </Grid>

                    <Grid item>
                    <Typography 
                        variant="body1" 
                        sx={{
                            marginTop:1, 
                            marginLeft:3, 
                            fontSize : 40
                            }}>
                            Create Group
                    </Typography>
                    </Grid>
                </Grid>


                <Grid item>
                <TextField 
                    id = "New-Group-Name" 
                    fullWidth label="Group Name" 
                    variant="filled" 
                    sx={{
                        marginTop: 5
                        }}/>
                </Grid>


                <Grid item>
                <TextField 
                    id = "New-Group-Description" 
                    fullWidth multiline 
                    minRows = "15" 
                    maxRows ="15" 
                    label="Group Description" 
                    variant="filled" 
                    sx={{
                        marginTop: 6
                        }}/>
                </Grid>


                <Grid item container 
                    direction="row" 
                    sx={{
                        display:"flex", 
                        alignItem:"center", 
                        justifyContent:"flex-end", 
                        marginTop:5
                        }}>
                <Button 
                    sx={{
                        marginRight:5, 
                        minWidth: "120px", 
                        minHeight:"50px", 
                        maxHeight:"50px", 
                        maxWidth: "120px", 
                        borderRadius: 8, 
                        backgroundColor: "#6001D3", 
                        color: "#FFFFFF", fontSize: 12}} 
                        variant="contained">
                            Create
                </Button>
                <Button 
                    href="https://www.google.com"
                    sx={{
                        minWidth: "100px", 
                        minHeight:"50px",
                        maxHeight:"50px", 
                        maxWidth: "100px", 
                        borderRadius: 8, 
                        backgroundColor: "#FCDC00", 
                        color: "#000000", 
                        fontSize: 12
                        }} 
                        variant="contained">
                            Cancel
                </Button>
                </Grid>


                
            </Grid>
          

          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
