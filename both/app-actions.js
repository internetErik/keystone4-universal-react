import {
  PAGE_DATA_LOAD_SUCCESS,
  PAGE_DATA_LOAD_FAILURE,
  OPEN_NAVIGATION_SECTION,
  OPEN_MOBILE_NAVIGATION,
  CLOSE_MOBILE_NAVIGATION,
  OPEN_LIGHTBOX,
  CLOSE_LIGHTBOX,
} from './app-constants';

export const pageDataLoadSuccessAction = pageData => ({
  type: PAGE_DATA_LOAD_SUCCESS,
  pageData,
})

export const pageDataLoadFailureAction = pageData => ({
  type: PAGE_DATA_LOAD_FAILURE,
  pageData,
})

export const openNavSectionAction = section => ({
  type: OPEN_NAVIGATION_SECTION,
  section,
})

export const openMobileNavAction = () => ({
  type: OPEN_MOBILE_NAVIGATION,
})

export const closeMobileNavAction = () => ({
  type: CLOSE_MOBILE_NAVIGATION,
})

export const openLightboxAction = lightBoxConfig => ({
  type: OPEN_LIGHTBOX,
  lightBoxConfig,
})

export const closeLightboxAction = () => ({
  type: CLOSE_LIGHTBOX,
})
