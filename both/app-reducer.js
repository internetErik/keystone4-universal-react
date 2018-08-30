import React from 'react';
import {
  PAGE_DATA_LOAD_SUCCESS,
  PAGE_DATA_LOAD_FAILURE,
  OPEN_NAVIGATION_SECTION,
  OPEN_MOBILE_NAVIGATION,
  CLOSE_MOBILE_NAVIGATION,
  OPEN_LIGHTBOX,
  CLOSE_LIGHTBOX,
} from './app-constants';
import { LOCATION_CHANGE } from 'react-router-redux';

let initialState = {
  pageData             : {},
  currentActiveSection : '',
  currentNavSection    : '',
  mobileNavOpen        : false,
  lightboxConfig       : {},
};

// This is so we can load in the site configuration
export const setAppInitialState = state => {
  initialState = {
    ...initialState,
    ...state,
  };
}

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch(action.type) {
    //load page data
    case PAGE_DATA_LOAD_SUCCESS:
      newState.pageData = action.pageData;
      break;
    case PAGE_DATA_LOAD_FAILURE:
      console.warn('Problem loading page data');
      break;

    // navigation state
    case OPEN_NAVIGATION_SECTION:
      newState.currentNavSection = action.section;
      break;
    case OPEN_MOBILE_NAVIGATION:
      newState.mobileNavOpen = true;
      break;
    case CLOSE_MOBILE_NAVIGATION:
      newState.mobileNavOpen = false;
      newState.currentNavSection = '';
      break;

    // handle page routes
    case LOCATION_CHANGE:
      // always scroll top, and timeouts will move to proper place
      window.scrollTo(0, 0);
      break;
    case OPEN_LIGHTBOX:
      newState.lightboxConfig = action.lightboxConfig;
      break;
    case CLOSE_LIGHTBOX:
      newState.lightboxConfig = {};
      break;
    default: break;
  }
  return newState;
};

export default reducer;

