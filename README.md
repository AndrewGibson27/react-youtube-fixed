# React YouTube Fixed

A fixed-position, responsive YouTube player you can control from anywhere in your React app!

Uses:

- Context
- Hooks
- TypeScript

## Installation

### NPM

`npm i @andrewgibson/react-youtube-fixed --save`

### Yarn

`yarn add @andrewgibson/react-youtube-fixed`

### CDN

`<script src="https://unpkg.com/@andrewgibson/react-youtube-fixed@latest/dist/rytf.min.js"></script>`

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
    <FixedYouTube />
  </div>
);

render(
  <YouTubeWrapper>
    <App />
  </YouTubeWrapper>,
  document.getElementById('foo')
);
```

## Initialization

The `<YouTubeWrapper />` component has a few optional props:

- `initialVideoId (string, default: null)`: If you want a video to play immediately when `FixedYouTube` is rendered, send this.
- `initialIsVisible (boolean, default: true)`: Whether the player should be hidden at first.

## Styles

A small stylesheet positions the player and makes it go full width on smaller screens.

### Bundler usage

`import '@andrewgibson/react-youtube-fixed/dist/rytf.min.css'`;

### CDN usage

`<link href="https://unpkg.com/@andrewgibson/react-youtube-fixed@latest/dist/rytf.min.css" rel="stylesheet" type="text/css">`

## Development

You can run `npm run dev` to fire up a development server. The `index.html` file in this repo contains the bundle produced by that command.

## Browser support

We tell TypeScript to compile down to ES5, but you'll need promises for this thing to work.

## License

MIT
