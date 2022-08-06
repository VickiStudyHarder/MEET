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
} from '@material-ui/core';

const styles = (theme: any) => ({
  row: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  container: {
    width: 1170,
    margin: 'auto',
  },
  buttonFontSize: {
    fontSize: '11px',
    color: '#a1a1a1',
  },

  AppBar: {
    //height:400,
    //background: `url("http://lorempixel.com/1920/1080/nature") no-repeat center center`,
    backgroundColor: '#fff',
    backgroundSize: 'cover',
  },
  mainLogo: {
    color: '#a1a1a1',
    justifyContent: 'left',
    '&:hover': {
      background: 'transparent',
    },
  },

  avatar: {
    height: '100%',
    borderRadius: 0,
  },

  loginButton: {
    background: '#e91e63',
    color: '#fff',
    borderRadius: '25px',
    padding: '0px 25px',

    '&:hover': {
      background: 'blue',
      boxShadow: '0px 2px 10px #888888',
    },
  },
});

interface INavBar {}

const options = [
  { title: 'Home', url: '/Home' },
  { title: 'Calendar', url: '/Home' },
  { title: 'Agenda', url: '/Home' },
  { title: 'Notes', url: '/Home' },
  { title: 'To Do Task', url: '/Home' },
  { title: 'Rating', url: '/Home' },
  { title: 'Recording', url: '/Recording' },
  { title: 'Group', url: '/Group' },
];

const NavBar: React.FC<INavBar> = ({}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleMenu = (event: { currentTarget: any }) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position='static' color='default'>
        <Grid item sm={12} xs={12}>
          <Toolbar>
            <Button color='inherit' onClick={(e) => handleMenu(e)}>
              Discover
            </Button>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
            <Button color='inherit'>Profile</Button>
            <Button color='inherit'>Login</Button>
            <Grid>
              <Button>
                <Avatar src='https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg' />
              </Button>
            </Grid>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
};

export default NavBar;
