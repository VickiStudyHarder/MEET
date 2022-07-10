import { useState } from "react";
import ChannelForm from "./ChannelForm";
import VideoCall from "./VideoCall";


export interface IVideoContainer {

}

const VideoContainer = () => {
    const [inCall, setInCall] = useState(false);
    const [channelName, setChannelName] = useState("");
    return (
      <div>
        <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
        {inCall ? (
          <VideoCall setInCall={setInCall} channelName={channelName} />
        ) : (
          <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
        )}
      </div>
    );
  };

  export default VideoContainer;
  