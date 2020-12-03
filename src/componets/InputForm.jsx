import React from "react";

const InputForm = () => {
  console.log("InputForm 실행");
  return (
    <>
      <form>
        <input type="text" placeholder="이름"></input>
        <input type="text" placeholder="전화번호"></input>
        <button>저장</button>
      </form>
    </>
  );
};

export default InputForm;
