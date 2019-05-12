import React, { useState, createContext } from 'react';

interface YouTubeWrapperProps {
  children: React.ReactNode;
  initialVideoId?: string | null;
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
  initialIsVisible = true,
}): JSX.Element => {
  const [videoId, setVideoId] = useState(initialVideoId);
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const [isPlaying, setIsPlaying] = useState(true);

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
