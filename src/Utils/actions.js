import C from "./Types";

export const selectList = listId => {
  return { type: C.SELECT_LIST, listId };
};
