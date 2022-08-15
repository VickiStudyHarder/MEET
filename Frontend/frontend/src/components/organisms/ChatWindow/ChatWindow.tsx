import React, { useContext, useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Paper, Box, Typography, Button, TextField, Divider } from '@mui/material';
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
    setText('')
  };

  // function date
  function add0(m:any){return m<10?'0'+m:m }

  function format(input:any)
  {
  var time = new Date(input);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
  }
  useEffect(() => {
    console.log('message is', messages);

  }, [messages]);
  return (
    <Box display={{ display: 'flex', flexDirection: 'column' }}>
      <Paper style={{ height: 680, maxHeight: 680, overflow: 'auto', backgroundColor: '#F3F4F6', borderRadius:20 }}>
        <Box style={{ height: 680, maxHeight: 600, overflow: 'auto', backgroundColor: '#F3F4F6' }}>

          <Box sx={{ height: 560, maxHeight: 560 }}>
            {messages &&
              messages?.map((message: IMessage) => {
                let dateMessage = new Date(Date.parse(message.timeSent))
                
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
                    {message.userId !== email ? (
                      <>
                        <Box
                          sx={{
                            width: '40%',
                            backgroundColor: '#ffffff',
                            // borderRadius: 6,
                            borderRadius: 2,
                            p: 2,
                            m: 2,
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                            <Typography variant="caption" sx={{ color: 'gray', marginLeft: 2 }}>
                              {message.userId}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'gray', marginRight: 2 }}>
                              Sent at {format(message.timeSent)}
                            </Typography>
                          </Box>

                          <Divider variant='middle' sx={{ margin: 1 }} />
                          <Typography color='black' sx={{ textAlign: 'right', marginRight: 2 }}>
                            {message.message}
                          </Typography>
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
                            backgroundColor: '#ffffff',
                            borderRadius: 2,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            m: 2,
                            justifyContent: 'center',
                          }}
                        >
                          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                            <Typography variant="caption" sx={{ color: 'gray', marginLeft: 2 }}>
                              You
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'gray', marginRight: 2 }}>
                              Sent at {format(message.timeSent)}
                            </Typography>
                          </Box>

                          <Divider variant='middle' sx={{ margin: 1 }} />
                          <Typography color='black' sx={{ textAlign: 'right', marginRight: 2 }}>
                            {message.message}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                );
              })}
          </Box>

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
              backgroundColor: '#ffffff',
              mx: 2
            }}
            InputProps={{
              endAdornment: (
                <Button onClick={send} variant="contained" startIcon={<SendIcon />} style={{ backgroundColor: "#6001D3", borderRadius: 20, width: 140, height: 40 }}>
                  Send
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
