import {useRef, useContext, useEffect} from "react";
import {FbContext} from './FbStore';

const Search = () => {
  console.log("Search 실행");
  const {dispatch} = useContext(FbContext);
  const searchRef = useRef(false);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({type:'SEARCH_NAME', payload:searchRef.current.value});
  }
  
  // useEffect(() => {
  //   dispatch({type:'SEARCH_NAME', payload:searchRef.current.value});
  // }, []);

  return (
    <form>
      <input type="text" placeholder="검색어" ref={searchRef}></input>
      <button onClick={handleSearch}>이름검색</button>
    </form>
  );
};

export default Search;
