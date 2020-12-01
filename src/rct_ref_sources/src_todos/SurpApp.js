import React from "react";
import App from "./App";
import List from "./components/List.js";
import Headers from "./components/Headers.js";
import Form from "./components/Form";

const SurpApp = () => {
  return (
    <App>
      {/* App이 부모 컴포넌트. App은 자기의 js파일로 가서 자식 컴포넌트들을
        props.children으로 호출해서 쓸 수 있다 */}
      <Headers />
      {/* Headers등은 자식 컴포넌트 */}
      <Form />
      <List />
    </App>
  );
};

export default SurpApp;
