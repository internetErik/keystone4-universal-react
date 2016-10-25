
const initialState = {
  currentCount: 0
};

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case 'INCREASE_COUNTER':
      newState.currentCount += 1;
      break;
    case 'DECREASE_COUNTER':
      newState.currentCount -= 1;
      break;
  }
  return newState;
};
