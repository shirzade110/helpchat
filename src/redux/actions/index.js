import {
  SELECTION_SECTION_SHOW,
  SELECT_ALL_BEDS,
  SHOW_MODAL_SAVE_SELECT_BEDS,
  SET_LANGUEGE,
  SHOW_LOADING,
  SET_USER_ID,
  SET_USER_NAME,
  ACTIVE_QR_LOGIN,
} from './type';

// ---  list actions ---

export const showSelectionSection = (showSelectionSectionFlag) => ({
  type: SELECTION_SECTION_SHOW,
  payload: {
    showSelectionSectionFlag: showSelectionSectionFlag,
  },
});

export const selectAllBeds = (selectAllBedsFlag) => ({
  type: SELECT_ALL_BEDS,
  payload: {
    selectAllBedsFlag: selectAllBedsFlag,
  },
});

export const showModalSaveSelectBeds = (showModalSaveSelectBedsFlag) => ({
  type: SHOW_MODAL_SAVE_SELECT_BEDS,
  payload: {
    showModalSaveSelectBedsFlag: showModalSaveSelectBedsFlag,
  },
});

export const setLanguege = (appLanguege) => ({
  type: SET_LANGUEGE,
  payload: {
    appLanguege: appLanguege,
  },
});

export const showLoading = (showLoadingFlag) => ({
  type: SHOW_LOADING,
  payload: {
    showLoadingFlag: showLoadingFlag,
  },
});

// user actions
export const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: {
    userId: userId,
  },
});

export const setUserName = (userName) => ({
  type: SET_USER_NAME,
  payload: {
    userName: userName,
  },
});

export const setActivateQRLogin = (activeQRLogin) => ({
  type: ACTIVE_QR_LOGIN,
  payload: {
    activeQRLogin: activeQRLogin,
  },
});
