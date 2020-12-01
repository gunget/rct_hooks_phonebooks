import React from "react";
import "../css/Item.css";

const Item = ({ todo, changeTodoStatus }) => {
  const toggleStatus = (e) => {
    const id = e.target.dataset.id;
    changeTodoStatus(id);
  };

  const textStatus = todo.userId === 0 ? "checked" : "";

  return (
    <li data-id={todo.id} onClick={toggleStatus} className={textStatus}>
      {todo.title}
    </li>
  );
};

export default Item;
