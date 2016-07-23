import {
  actionTypes
} from '../actions/menuActions';

const INITIAL_STATE = {
  activeIndex: 0,
  isDropdownActive: false
};

const menuReducer = (state = INITIAL_STATE, {payload, type}) => {
  switch (type) {
    case actionTypes.SET_ACTIVE:
      return {
        ...state,
        activeIndex: payload.activeIndex
      };

    case actionTypes.SET_DROPDOWN_ACTIVE:
      return {
        ...state,
        isDropdownActive: payload.isDropdownActive
      };

    default:
      return state;
  }
};

export default menuReducer;
