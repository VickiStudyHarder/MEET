import React, { useContext } from 'react';
import {
  Grid,
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AuthContext } from '../../../contexts/Auth';

interface IStudentMentor {
  incrementStage: () => void;
  decrementStage: () => void;
}

const StudentMentor: React.FC<IStudentMentor> = ({
  incrementStage,
  decrementStage,
}) => {
  const { userType, setUserType } = useContext(AuthContext);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    userType: string
  ) => {
    setUserType(userType);
    console.log(userType);
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
          justify: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          I am a
        </Typography>
        <Box component='form' noValidate sx={{ m: 4 }}>
          <ToggleButtonGroup
            orientation='horizontal'
            exclusive
            onChange={handleChange}
            value={userType}
          >
            <ToggleButton value='student' aria-label='student'>
              Student
            </ToggleButton>
            <ToggleButton value='mentor' aria-label='mentor'>
              Mentor
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ x: 20 }}>
          <Button
            onClick={decrementStage}
            sx={{ p: 4 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Previous
          </Button>
          <Button
            onClick={incrementStage}
            sx={{ p: 4 }}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default StudentMentor;
