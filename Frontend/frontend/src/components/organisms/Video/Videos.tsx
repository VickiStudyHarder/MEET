import { AgoraVideoPlayer, IAgoraRTCRemoteUser, IMicrophoneAudioTrack , ICameraVideoTrack} from 'agora-rtc-react';

interface IVideos {
    users: IAgoraRTCRemoteUser[];
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const Videos: React.FC<IVideos> = ({users, tracks}) => {
  
    return (
      <div>
        <div id="videos">
          <AgoraVideoPlayer className='vid' videoTrack={tracks[1]} />
          {users.length > 0 &&
            users.map((user) => {
              if (user.videoTrack) {
                return (
                  <AgoraVideoPlayer className='vid' videoTrack={user.videoTrack} key={user.uid} />
                );
              } else return null;
            })}
        </div>
      </div>
    );
  };

  export default Videos;
  