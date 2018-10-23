import { WINDOW_RESIZED } from './global-constants';

export const windowResizedAction = () => ({
  type   : WINDOW_RESIZED,
  windowSize : {
    width  : window.innerWidth,
    height : window.innerHeight,
  },
})
