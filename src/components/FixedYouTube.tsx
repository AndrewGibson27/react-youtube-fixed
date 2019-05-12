import React, { useEffect, useRef } from 'react';
import reframe from 'reframe.js';

import { YouTubeContext } from '../contexts/YouTube';
import { Constructable } from '../interfaces/index';
import appendYouTubeScript from '../utils/append-youtube-script';

import './styles.css';

interface YTOnWindow {
  Player: Constructable<YT.Player>;
}

declare global {
  interface Window {
    YT: YTOnWindow;
    onYouTubePlayerAPIReady: () => void;
  }
}

interface FixedYouTubeProps {
  videoId: string;
  isPlaying: boolean;
  isVisible: boolean;
  width?: number;
  height?: number;
}

let player: YT.Player | null = null;

const FixedYouTube: React.SFC<FixedYouTubeProps> = ({
  videoId,
  isPlaying,
  isVisible,
  height = 360,
  width = 640,
}): JSX.Element => {
  const attachEl = useRef(null);

  const setVideo = (): void => {
    player.loadVideoById(videoId);
  };

  const buildPlayer = (): void => {
    const opts: YT.PlayerOptions = {
      height,
      width,
      events: {
        onReady: () => {
          setVideo();
          reframe(player.getIframe());
        },
      },
    };
    player = new window.YT.Player(attachEl.current, opts);
  };

  const destroyPlayer = (): void => {
    player.stopVideo();
    player.destroy();
    player = null;
  };

  const buildYouTube = (): Promise<void> =>
    new Promise(resolve => {
      window.onYouTubePlayerAPIReady = resolve;
      appendYouTubeScript();
    });

  useEffect(
    () => {
      const innerFn = async (): Promise<void> => {
        if (!window.YT) await buildYouTube();

        if (videoId !== null && player) {
          setVideo();
        } else if (videoId !== null && !player) {
          buildPlayer();
        } else if (videoId === null && player) {
          destroyPlayer();
        }
      };

      innerFn();

      return () => {
        if (player) destroyPlayer();
      };
    },
    [videoId]
  );

  useEffect(
    () => {
      if (player) {
        if (isPlaying) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      }
    },
    [isPlaying]
  );

  return (
    <aside style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="rfyt-container">
        <div>
          <div ref={attachEl} />
        </div>
      </div>
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
