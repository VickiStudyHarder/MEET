import React, { useContext, useEffect, useState } from 'react';
import { Paper, Box, Typography, Button, TextField } from '@mui/material';
import { IMessage } from '../../../types/groups';
import AppContext from '../../../contexts/AppContext';
import { sendMessage } from '../../../api/groupChat';

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
    <Box>
      <Paper style={{ maxHeight: 480, overflow: 'auto' }}>
        {messages &&
          messages?.map((message: IMessage) => {
            return (
              <Box
                key={message.id}
                sx={{
                  height: 120,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {message.userId === email ? (
                  <>
                    <Box
                      sx={{
                        height: 100,
                        width: '40%',
                        backgroundColor: 'blue',
                        borderRadius: 4,
                        p: 2,
                      }}
                    >
                      <Typography color='white'>{message.timeSent}</Typography>
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
                        height: 100,
                        width: '40%',
                        backgroundColor: 'blue',
                        borderRadius: 4,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography color='white'>{message.timeSent}</Typography>
                      <Typography color='white'>{message.message}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            );
          })}
      </Paper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: 80,
          width: '100%',
          border: 1,
          mt: 4,
        }}
      >
        <TextField
          variant='outlined'
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          sx={{ display: 'flex', flexGrow: 1, height: '100%' }}
        />
        <Button onClick={send}>Send</Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
