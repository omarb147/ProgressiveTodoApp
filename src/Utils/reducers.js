import C from "./Types";

export const selectListReducer = (state = "", action) => {
  switch (action.type) {
    case C.SELECT_LIST:
      return action.listId;
  }
  return state;
};
