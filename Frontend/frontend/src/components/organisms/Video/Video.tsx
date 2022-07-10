import { AgoraVideoPlayer } from 'agora-rtc-react';
import { Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';

interface IVideo {
  users: any;
  tracks: any;
}

const Video: React.FC<IVideo> = ({ users, tracks }) => {
  const [gridSpacing, setGridSpacing] = useState(12);
  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <Grid container style={{ height: '100%' }}>
      <Grid item xs={12}>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: '100%', width: '100%' }}
        />
      </Grid>
      {users.length > 0 &&
        users.map((user:any) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={12}  style={{ height: '100%' }}>
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: '100%', width: '100%' }}
                />
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
};
export default Video;
