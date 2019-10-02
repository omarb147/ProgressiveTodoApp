import React, { useState } from "react";
import TodoList from "../Components/TodoList";
import Lists from "../Components/Lists";

const Todos = () => {
  const [selectedList, setSelectedList] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  return (
    <div>
      <Lists selectedList={selectedList} setSelectedList={setSelectedList} />
      <TodoList selectedList={selectedList} />
    </div>
  );
};

export default Todos;
