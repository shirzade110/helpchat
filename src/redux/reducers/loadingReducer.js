import {SHOW_LOADING} from '../actions/type';

const initalState = {
  showLoadingFlag: false,
};

export default loading = (state = initalState, action = {}) => {
  switch (action.type) {
    case SHOW_LOADING:
      const {showLoadingFlag} = action.payload;
      return {
        ...state,
        showLoadingFlag: showLoadingFlag,
      };
      break;
    default:
      return state;
  }
};
