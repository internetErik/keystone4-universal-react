'use strict';
// http://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js
export let isBrowser = typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]';

export let isServer = !isBrowser;
