/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useEffect, useRef } from 'react';

import { YouTubeContext } from '../contexts/YouTube';
import { YOUTUBE_SCRIPT } from '../constants';

interface FixedYouTubeProps {
  videoId: string;
  isPlaying: boolean;
  isVisible: boolean;
  width?: number;
  height?: number;
}

// https://stackoverflow.com/questions/41017287/cannot-use-new-with-expression-typescript
interface Constructable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
}

interface YTOnWindow {
  Player: Constructable<YT.Player>;
}

declare global {
  interface Window {
    YT: YTOnWindow;
    onYouTubePlayerAPIReady: () => void;
  }
}

const appendYouTubeScript = (): void => {
  const tag: HTMLScriptElement = document.createElement('script');
  tag.src = YOUTUBE_SCRIPT;
  tag.async = true;
  document.body.appendChild(tag);
};

const FixedYouTube: React.SFC<FixedYouTubeProps> = ({
  videoId,
  isPlaying,
  isVisible,
  height = 360,
  width = 640,
}: FixedYouTubeProps) => {
  let player: YT.Player;
  const attachEl = useRef(null);

  const buildVideo = (): void => {
    if (!window.YT) {
      // eslint-disable-next-line func-names
      window.onYouTubePlayerAPIReady = function(): void {
        const opts = { height, width, videoId };
        player = new window.YT.Player(attachEl.current, opts);
      };
      appendYouTubeScript();
    }
  };

  const destroyVideo = (): void => {
    player.destroy();
  };

  useEffect(
    () => {
      if (videoId !== null) {
        buildVideo();
      } else {
        destroyVideo();
      }

      return () => {
        destroyVideo();
      };
    },
    [videoId]
  );

  useEffect(
    () => {
      if (videoId !== null) {
        if (isPlaying) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      }
    },
    [isPlaying]
  );

  useEffect(() => {}, [isVisible]);

  if (videoId === null) return null;
  return (
    <aside>
      <div ref={attachEl} />
    </aside>
  );
};

export default () => (
  <YouTubeContext.Consumer>
    {({ videoId, isPlaying, isVisible }) => (
      <FixedYouTube
        videoId={videoId}
        isPlaying={isPlaying}
        isVisible={isVisible}
      />
    )}
  </YouTubeContext.Consumer>
);
