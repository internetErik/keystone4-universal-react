/**
 * @param  {Function} fn       Function we are debouncing
 * @param  {Number}   interval How long to debounce at
 * @return {Function}          Original function debounced
 */
function debounce(fn, interval) {
  let timer = null;
  return (...args) => {
    if(timer === null) {
      timer = setTimeout(
        () => (fn.call(this, ...args), timer = null),
      interval || 20);
    }
  }
}

export default debounce;
