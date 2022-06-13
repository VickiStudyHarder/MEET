import React, {useState} from 'react';
import {Grid, Box, Paper, ToggleButton, ToggleButtonGroup, Button} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface IStudentMentor {
    emailValue?: string;
    passwordValue?: string;
    incrementStage: (value: number) => void;
    decrementStage: (value: number) => void;
}

const StudentMentor : React.FC<any> = ({incrementStage, decrementStage}) => {
    const [userType, setUserType] = useState('')

    const handleChange = (event: React.MouseEvent<HTMLElement>, userType: string) => {
        setUserType(userType);
        console.log(userType)
    };

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
              I am a
            </Typography>
            <Box component="form" noValidate  sx={{ m: 4}}>
            <ToggleButtonGroup
                orientation="horizontal"
                exclusive
                onChange={handleChange}
                value={userType}
                >
                    <ToggleButton  value="student" aria-label="student">Student</ToggleButton>
                    <ToggleButton  value="mentor" aria-label="mentor">Mentor</ToggleButton>
                </ToggleButtonGroup>
            </Box>
                <Box sx={{x:20}}>
                    <Button onClick={decrementStage}>Previous</Button>
                    <Button onClick={incrementStage}>Next</Button>
                </Box>
          </Box>
        </Grid>
    )
}

export default StudentMentor;
