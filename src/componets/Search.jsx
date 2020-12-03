import React from "react";

const Search = () => {
  console.log("Search 실행");
  return (
    <form>
      <input type="text" placeholder="검색어"></input>
      <button>입력</button>
    </form>
  );
};

export default Search;
