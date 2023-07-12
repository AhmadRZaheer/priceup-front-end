import { SET_SELECTED_ID } from "./actions";

const initialState = {
  selectedId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ID:
      return {
        ...state,
        selectedId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
