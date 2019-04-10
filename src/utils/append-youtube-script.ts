import { YOUTUBE_SCRIPT } from '../constants';

const appendYouTubeScript = (): void => {
  const tag = document.createElement('script');
  tag.src = YOUTUBE_SCRIPT;
  tag.async = true;
  document.body.appendChild(tag);
};

export default appendYouTubeScript;
