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
} from '@material-ui/core';
import Popover from '@mui/material/Popover';

interface INavBar {}

const options = [
  { title: 'Home', url: '/home' },
  { title: 'Calendar', url: '/calendar' },
  { title: 'Agenda', url: '/agenda' },
  { title: 'Notes', url: '/notes' },
  { title: 'To Do Task', url: '/todo' },
  { title: 'Rating', url: '/rating' },
  { title: 'Recording', url: '/recording' },
  { title: 'Group', url: '/group' },
];

const NavBar: React.FC<INavBar> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
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
        <Toolbar>
          {options.map((option) => {
            return (
              <Button
                color='inherit'
                onClick={(e) => {
                  navigate(option.url);
                }}
                key={option.title}
              >
                {location.pathname === option.url ? (
                  <Typography style={{ fontWeight: 600 }}>
                    {option.title}
                  </Typography>
                ) : (
                  <Typography>{option.title}</Typography>
                )}
              </Button>
            );
          })}
          <Grid>
            <Button>
              <Avatar src='https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg' />
            </Button>
          </Grid>
        </Toolbar>
      </Grid>
    </Box>
  );
};

export default NavBar;
