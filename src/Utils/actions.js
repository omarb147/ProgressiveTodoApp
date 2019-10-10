import C from "./Types";

export const selectList = listId => {
  return { type: C.SELECT_LIST, listId };
};

export const onSearch = query => {
  return { type: C.ON_SEARCH, query };
};

export const cancelSearch = () => {
  return { type: C.CANCEL_SEARCH };
};
