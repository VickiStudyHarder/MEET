import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  Avatar,
  Box,
} from '@mui/material';
import Popover from '@mui/material/Popover';
import LogoImg from '../../stories/LogoImg'
import AvaterMeun from '../../stories/AvatarMenu'

interface INavBar {}

const options = [
  { title: 'Upcoming Meetings', url: '/home' },
  { title: 'Calendar', url: '/calendar' },
  { title: 'All Meetings', url: '/meetings' },
  { title: 'All To Dos', url: '/todo' },
  { title: 'Rating', url: '/rating' },
  // { title: 'Recording', url: '/recording' },
  { title: 'Group', url: '/group' },
];

const NavBar: React.FC<INavBar> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const changeAvatar = () => {};
  const img = 'https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg'


  return (
    <Box sx={{ display: 'flex', m: 4 }}>
      <Grid
        container
        spacing={4}
        justifyContent='flex-end'
        style={{
          paddingTop: '10px',
          paddingBottom: '10px',
          marginBottom: '10px',
        }}
      >
        <Toolbar sx={{display:'flex', justifyContent:'space-between', width:'100%'}}>

          <Box sx={{display:'flex', marginLeft:5}}>
            <LogoImg title='MEET' content='is all you need' />  
          </Box>
          <Box sx={{display:'flex'}}>
             {options.map((option) => {
            return (
              <Button
                color='inherit'
                sx = {{color:'#70798B', marginRight: 2}}
                onClick={(e) => {
                  navigate(option.url);
                }}
                key={option.title}
              >
                {location.pathname === option.url ? (
                  <Typography style={{ fontWeight: 600, color:'#000000' }}>
                    {option.title}
                  </Typography>
                ) : (
                  <Typography>{option.title}</Typography>
                )}
              </Button>
            );
          })}          
          <Grid>
          <AvaterMeun pic={img} changeFunc={changeAvatar} logoutFunc={(e) => navigate('/login')} />
          </Grid>
          </Box>
         

        </Toolbar>
      </Grid>
    </Box>
  );
};

export default NavBar;
