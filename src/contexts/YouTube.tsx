import React, { useState, createContext } from 'react';

interface YouTubeWrapperProps {
  children: React.ReactNode;
  initialVideoId?: string | null;
  initialIsPlaying?: boolean;
  initialIsVisible?: boolean;
}

interface YouTubeContext {
  videoId: string;
  isPlaying: boolean;
  isVisible: boolean;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const YouTubeContext = createContext<YouTubeContext | null>(null);
const YouTubeWrapper: React.SFC<YouTubeWrapperProps> = ({
  children,
  initialVideoId = null,
  initialIsPlaying = false,
  initialIsVisible = true,
}): JSX.Element => {
  const [videoId, setVideoId] = useState(initialVideoId);
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying);
  const [isVisible, setIsVisible] = useState(initialIsVisible);

  return (
    <YouTubeContext.Provider
      value={{
        videoId,
        isPlaying,
        isVisible,
        setVideoId,
        setIsPlaying,
        setIsVisible,
      }}
    >
      {children}
    </YouTubeContext.Provider>
  );
};

export { YouTubeWrapper, YouTubeContext };
