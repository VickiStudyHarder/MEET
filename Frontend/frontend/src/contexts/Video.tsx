import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useState,
  } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { ClientConfig, createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react'
  
  export type IVideoContext = {
    useMicrophoneAndCameraTracks: any;
    useClient: any;
    config: ClientConfig;
    appId: string;
    token: string;
    channelName: string;
  };

  const VideoContext = createContext<IVideoContext>({} as IVideoContext);
  
  export default VideoContext;
  
  const Video = (props: any) => {

    const config: ClientConfig = {mode: "rtc", codec: "h264"}

    const appId = "bd6d86f764ce4313a579d782262c251d";
    const token = "006bd6d86f764ce4313a579d782262c251dIAD3th83TbbUeOE0zU++PoD"


    const useClient  = createClient(config)
    
    const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()
    const channelName = "test";


  
    return (
      <VideoContext.Provider
        value={{config, useClient, useMicrophoneAndCameraTracks , appId, token, channelName }}
      >
        {props.children}
      </VideoContext.Provider>
    );
  };
  
  export { Video, VideoContext };
  