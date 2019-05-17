# React YouTube Fixed

A fixed-position, responsive YouTube player you can control from anywhere in your React app!

Uses:

- Context
- Hooks
- TypeScript

## Installation

`npm i @andrewgibson/react-youtube-fixed --save`
`yarn add @andrewgibson/react-youtube-fixed`

## Usage

```JSX
import React, { useContext } from 'react';
import { render } from 'react-dom';

import {
  YouTubeContext, // the context itself
  FixedYouTube, // the actual player component
  YouTubeWrapper, // a wrapper around the context's Provider
} from '@andrewgibson/react-youtube-fixed';

const Controller = () => {
  const ytContextValue = React.useContext(YouTubeContext);
  const { setVideoId, setIsPlaying, setIsVisible } = ytContextValue;

  return (
    <div>
      <button
        onClick={() => {
          setVideoId('XgtopghkBZc');
        }}
      >
        Create video
      </button>

      <button
        onClick={() => {
          setVideoId(null);
        }}
      >
        Destroy video
      </button>

      <button
        onClick={() => {
          setIsPlaying(false);
        }}
      >
        Pause video
      </button>

      <button
        onClick={() => {
          setIsPlaying(true);
        }}
      >
        Play video
      </button>

      <button
        onClick={() => {
          setIsVisible(false);
        }}
      >
        Hide video
      </button>

      <button
        onClick={() => {
          setIsVisible(true);
        }}
      >
        Show video
      </button>
    </div>
  );
};

const App = () => (
  <div>
    <Controller />
    <FixedYouTube /> // contains the player and accesses context
  </div>
);

render(
  <YouTubeWrapper>
    <App />
  </YouTubeWrapper>,
  document.getElementById('foo')
);
```
