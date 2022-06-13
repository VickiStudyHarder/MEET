import React, {useState} from 'react';
import {Button,Grid, Box, Paper, ToggleButton, ToggleButtonGroup, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';

interface ICourses {
    incrementStage: () => void;
    decrementStage: () => void;
}

const Courses : React.FC<ICourses> = ({incrementStage, decrementStage}) => {
    const [courses, setCourses] = useState([])
    const [temp, setTemp] = useState("")

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center'
            }}
          >
            <Typography component="h1" variant="h5">
                Which courses are you taking?
            </Typography>
            <Box component="form" noValidate  sx={{ m: 4}}>
            <TextField
                id="outlined-multiline-flexible"
                label="Courses"
                multiline
                maxRows={4}
                value={temp}
                onChange={(e: any) => setTemp(e.target.value)}
                />
            </Box>
                <Box sx={{x:20}}>
                    <Button onClick={decrementStage}>Previous</Button>
                    <Button onClick={incrementStage}>Next</Button>
                </Box>
          </Box>
        </Grid>
    )
}

export default Courses;
