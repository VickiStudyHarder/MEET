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

export interface IMeetingRow {
  meeting: any;
}

const MeetingRow: React.FC<IMeetingRow> = ({ meeting }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        minHeight: 200,
        height: 200,
        width: '100%',
        m: 4,
        p: 2,
      }}
    >
      {JSON.stringify(meeting)}
    </Box>
  );
};

export default MeetingRow;
