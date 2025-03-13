import {
  SELECTION_SECTION_SHOW,
  SELECT_ALL_BEDS,
  SHOW_MODAL_SAVE_SELECT_BEDS,
} from '../actions/type';

const initalState = {
  showSelectionSectionFlag: false,
  selectAllBedsFlag: false,
  showModalSaveSelectBedsFlag: false,
};

export default beds = (state = initalState, action = {}) => {
  switch (action.type) {
    case SELECTION_SECTION_SHOW:
      const {showSelectionSectionFlag} = action.payload;
      return {
        ...state,
        showSelectionSectionFlag: showSelectionSectionFlag,
      };
      break;
    case SELECT_ALL_BEDS:
      const {selectAllBedsFlag} = action.payload;
      return {
        ...state,
        selectAllBedsFlag: selectAllBedsFlag,
      };
      break;
    case SHOW_MODAL_SAVE_SELECT_BEDS:
      const {showModalSaveSelectBedsFlag} = action.payload;
      return {
        ...state,
        showModalSaveSelectBedsFlag: showModalSaveSelectBedsFlag,
      };
      break;
    default:
      return state;
  }
};
