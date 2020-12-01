import React from "react";
import "../css/Headers.css";

const Header = ({ todos }) => {
  return (
    <>
      <h1>Hello Todo Application</h1>
      <div className="countInfo">
        해야할 일 ! {todos.filter((todo) => todo.userId === 1).length}개가
        있습니다.
      </div>
    </>
  );
};

export default Header;
