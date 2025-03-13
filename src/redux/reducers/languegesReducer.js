import {SET_LANGUEGE} from '../actions/type';

const initalState = {
  appLanguege: {id: '1', value: 'en', country: 'English'},
};

export default langueges = (state = initalState, action = {}) => {
  switch (action.type) {
    case SET_LANGUEGE:
      const {appLanguege} = action.payload;
      return {
        ...state,
        appLanguege: appLanguege,
      };
      break;
    default:
      return state;
  }
};
