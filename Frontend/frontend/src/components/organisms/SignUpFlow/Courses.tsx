import React, {useState, useEffect, useContext} from 'react';
import {Button,Grid, Box, Paper, TextField, IconButton, InputAdornment} from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {AccountContext} from '../../../contexts/Account'
import UserPool from '../../../utils/auth/UserPool';
import { useNavigate } from 'react-router-dom';


interface ICourses {
    decrementStage: () => void;
}

const Courses : React.FC<ICourses> = ({decrementStage }) => {
    const navigate = useNavigate()
    const [input, setInput] = useState("")

    const {email, password, courses, setCourses, error, setError } = useContext(AccountContext)

    const addCourse = () => {
        const updatedCourses = [input, ...courses]
        setCourses(updatedCourses)
        setInput("")
    }

    const onSubmit = (event:any) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], [], (err:any, data:any) => {
          if (err) {
            setError(err.message)
            console.log(error)
            return;
          }
          setError("")
          navigate('/login')
        });
    };

    useEffect(() => {

    }, [courses])

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
            <Typography component="h1" variant="h5" sx={{p: 4}}>
                Which courses are you taking?
            </Typography>
            {courses.length > 0 && 
                <Typography component="h1" variant="h5" sx={{p: 4}}>
                    Selected Courses:
                </Typography>
                }
            {courses.length > 0 &&
                courses.map((course:string) => {
                    return (
                    <Typography component="h1" variant="h5">
                        {course}
                    </Typography>
                    )
                }) 
            }
            <Box component="form" noValidate  sx={{ m: 4}}>
            <TextField
                id="outlined-multiline-flexible"
                label="Courses"
                multiline
                maxRows={4}
                value={input}
                onChange={(e: any) => setInput(e.target.value)}
                InputProps={{endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={addCourse}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </InputAdornment>
                    ), 
                }}
            />
            </Box>
                <Box sx={{x:40}}>
                    <Button onClick={decrementStage} sx={{p:4}} startIcon={<ArrowBackIosIcon />}>Previous</Button>
                    <Button onClick={onSubmit} sx={{p:4}}>Sign Up</Button>
                </Box>
          </Box>
        </Grid>
    )
}

export default Courses;
