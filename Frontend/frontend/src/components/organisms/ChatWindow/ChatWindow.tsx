import React from 'react';
import { Paper } from '@mui/material';

interface IChatWindow {
 
}

const ChatWindow : React.FC<IChatWindow> = () => {
    return (
        <Paper sx={{display: 'flex', flexGrow: 1}} elevation={3} variant="outlined"></Paper>
    )
}

export default ChatWindow;