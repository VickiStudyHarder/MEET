import { Button } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import VideoCall from './VideoCall';

interface IVideoCallWrapper {}

const VideoCallWrapper: React.FC<IVideoCallWrapper> = ({}) => {
  const [inCall, setInCall] = useState(false);

  return (
    <div style={{ height: '100%' }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button
          variant='contained'
          color='primary'
          onClick={() => setInCall(true)}
        >
          Join Call
        </Button>
      )}
    </div>
  );
};
export default VideoCallWrapper;
