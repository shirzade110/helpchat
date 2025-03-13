import {SET_USER_ID, SET_USER_NAME, ACTIVE_QR_LOGIN} from '../actions/type';

const initalState = {
  userId: null,
  userName: null,
  activeQRLogin: false,
};

export default user = (state = initalState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      const {userId} = action.payload;
      return {
        ...state,
        userId: userId,
      };
      break;
    case SET_USER_NAME:
      const {userName} = action.payload;
      return {
        ...state,
        userName: userName,
      };
      break;
    case ACTIVE_QR_LOGIN:
      const {activeQRLogin} = action.payload;
      return {
        ...state,
        activeQRLogin: activeQRLogin,
      };
      break;
    default:
      return state;
  }
};
