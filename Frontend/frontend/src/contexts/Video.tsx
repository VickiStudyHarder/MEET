import React, { createContext } from 'react';
import {
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
} from 'agora-rtc-react';

export type IVideoContext = {
  useMicrophoneAndCameraTracks: any;
  useClient: any;
  config: ClientConfig;
  appId: string;
  token: string;
};

const VideoContext = createContext<IVideoContext>({} as IVideoContext);

export default VideoContext;

const Video = (props: any) => {
  const config: ClientConfig = {
    mode: 'rtc',
    codec: 'vp8',
  };

  const appId: string = 'bd6d86f764ce4313a579d782262c251d'; //ENTER APP ID HERE
  const token: string | null =
    '006bd6d86f764ce4313a579d782262c251dIABx91FpIVkZy37IcqONd2aBFCre0gmpOwTg/PotDblBqgx+f9gAAAAAEACZ/16C6OPLYgEAAQDo48ti';

  const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

  return (
    <VideoContext.Provider
      value={{ config, useClient, useMicrophoneAndCameraTracks, appId, token }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};

export { Video, VideoContext };
