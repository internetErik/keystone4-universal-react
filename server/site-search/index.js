import Fuse from 'fuse.js';
import { siteSearchCache } from '../cache/site-search';

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 1000,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name",
    "meta",
    "type"
  ]
};

// siteSearchCache.fuse = new Fuse(searchCache.data, fuseOptions);