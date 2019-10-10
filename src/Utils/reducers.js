import C from "./Types";

export const selectListReducer = (state = "", action) => {
  switch (action.type) {
    case C.SELECT_LIST:
      return action.listId;
  }
  return state;
};

export const searchReducer = (state = "", action) => {
  switch (action.type) {
    case C.ON_SEARCH:
      return action.query;
    case C.CANCEL_SEARCH:
      return "";
    default:
      return state;
  }
};
