const ACTION_TYPES_PREFIX = 'menu';
const ACTION_TYPES = {
  SET_ACTIVE: `${ACTION_TYPES_PREFIX}:SET_ACTIVE`,
  SET_DROPDOWN_ACTIVE: `${ACTION_TYPES_PREFIX}:SET_DROPDOWN_ACTIVE`
};

const setActive = (activeIndex) => {
  return {
    payload: {
      activeIndex
    },
    type: ACTION_TYPES.SET_ACTIVE
  };
};

const setDropdownActive = (isDropdownActive = false) => {
  return {
    payload: {
      isDropdownActive
    },
    type: ACTION_TYPES.SET_DROPDOWN_ACTIVE
  };
};

export {ACTION_TYPES as actionTypes};

export {setActive};
export {setDropdownActive};

export default {
  setActive,
  setDropdownActive
};
