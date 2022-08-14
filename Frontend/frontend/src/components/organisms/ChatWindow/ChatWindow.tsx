import React, { useContext, useEffect, useState } from 'react';
import { Paper, Box, Typography, Button, TextField } from '@mui/material';
import { IMessage } from '../../../types/groups';
import AppContext from '../../../contexts/AppContext';
import { sendMessage } from '../../../api/groupChat';
import SendArrow from '../../../assets/SendArrow.png';

interface IChatWindow {
  groupId: number;
  messages?: IMessage[];
  getMessages: any;
}

const ChatWindow: React.FC<IChatWindow> = ({
  groupId,
  messages,
  getMessages,
}) => {
  const { email } = useContext(AppContext);
  const [text, setText] = useState('');

  const send = () => {
    const date = Date.now();
    const timeSent = new Date(date).toISOString();
    const currentMessage = {
      userId: email,
      groupId: groupId,
      timeSent: timeSent,
      message: text,
    };
    sendMessage(currentMessage);
    getMessages();
  };

  return (
    <Box display={{ display: 'flex', flexDirection: 'column'}}>
      <Paper style={{ height: 680, maxHeight: 680, overflow: 'auto' }}>
        <Box sx={{ height: 560, maxHeight: 560 }}>
          {messages &&
            messages?.map((message: IMessage) => {
              return (
                <Box
                  key={message.id}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                  }}
                >
                  {message.userId === email ? (
                    <>
                      <Box
                        sx={{
                          width: '40%',
                          backgroundColor: 'lightGray',
                          borderRadius: 6,
                          p: 2,
                          m: 2,
                          justifyContent: 'center',
                        }}
                      >
                        <Typography color='white'>{message.message}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>
                      <Box
                        key={message.id}
                        sx={{
                          width: '40%',
                          backgroundColor: 'gray',
                          borderRadius: 6,
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          m: 2,
                          justifyContent: 'center',
                        }}
                      >
                        {message.message}
                      </Box>
                    </>
                  )}
                </Box>
              );
            })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            height: 80,
            width: '100%',
          }}
          justifyContent='center'
        >
          <TextField
            value={text}
            onChange={(e: any) => setText(e.target.value)}
            sx={{
              display: 'flex',
              flexGrow: 1,
              my: 'auto',
              backgroundColor: 'lightGray',
              mx:2
            }}
            InputProps={{
              endAdornment: (
                <Button onClick={send} sx={{ my: 'auto' }}>
                  <img
                    src={SendArrow}
                    height='40'
                    width='40'
                    alt='send-arrow'
                  />
                </Button>
              ),
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatWindow;
