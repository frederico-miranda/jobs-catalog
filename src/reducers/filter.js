const initialState = {};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_FILTERS': {
      return ({});
    }

    case 'SET_FILTER': {
      const nextState = { ...state };
      nextState[action.filterName] = action.filterValue;

      return nextState;
    }

    case 'REMOVE_FILTER': {
      const nextState = { ...state };
      delete nextState[action.filterName];

      return nextState;
    }

    default:
      return state;
  }
};

export default filtersReducer;
