import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

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

interface INavBar {}

const options = [
  { title: 'Home', url: '/Home' },
  { title: 'Calendar', url: '/Calendar' },
  { title: 'Agenda', url: '/Agenda' },
  { title: 'Notes', url: '/Notes' },
  { title: 'To Do Task', url: '/ToDo' },
  { title: 'Rating', url: '/Rating' },
  { title: 'Recording', url: '/Recording' },
  { title: 'Group', url: '/Group' },
];

const NavBar: React.FC<INavBar> = ({}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMenu = (event: { currentTarget: any }) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }} style={{ marginBottom: '40px' }}>
      <Grid
        container
        sm={12}
        xs={12}
        spacing={4}
        justify='flex-end'
        style={{ paddingTop: '10px', paddingBottom: '10px', marginBottom: '10px' }}
      >
        <Toolbar>
          {options.map((option) => {
            return (
              <Button color='inherit' onClick={(e) => handleMenu(e)}>
                {option.title}
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
