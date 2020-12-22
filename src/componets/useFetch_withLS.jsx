import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (callback) => {
  const [loading, setLoading] = useState(true);

  const setInitData = () => {
    const defaultUser = [
      {
        id: 1,
        name: "홍길동",
        number: "010-0101-0011",
      },
      {
        id: 2,
        name: "동영준",
        number: "010-5551-0011",
      },
    ];

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken"; //웹사이트 해킹 방지용도

    // 기본적으로 axios.get(url), axios.post(url, data), axios.delete(url/id)를 통해서 쉽게 http 요청을 할 수 있습니다. 아주 좋은 모듈이죠?

    const fetchInitData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/fbooks");
        const datum = await response.data[0];
        console.log("받아온 데이터:", datum);
        return datum;
      } catch (error) {
        return console.log(error);
      }
    };
    const fbFromDJG = fetchInitData();
    // fetchInitData();

    if (fbFromDJG !== null) {
      callback({ type: "SET_INIT_DATA", payload: fbFromDJG });
    } else {
      const defaultFbooks = { idx: 2, information: defaultUser, search: "" };
      callback({ type: "SET_INIT_DATA", payload: defaultFbooks });
    }
    setTimeout(() => {
      setLoading(false); //서버에서 받아오는 시간을 loading으로 표현하려고 가짜로 넣은 것. setTimeout은 반드시 콜백함수속에 지연실행하고픈 내용을 넣어야 지연되어 실행된다.
    }, 2000);
    console.log("useFetch-setInitData 실행");

    // loacalStorage를 활용할 때의 구문
    // const fbFromLS = JSON.parse(localStorage.getItem("Fbooks"));

    // if (fbFromLS !== null) {
    //   callback({ type: "SET_INIT_DATA", payload: fbFromLS });
    // } else {
    //   const defaultFbooks = { idx: 2, information: defaultUser, search: "" };
    //   callback({ type: "SET_INIT_DATA", payload: defaultFbooks });
    // }
    // setTimeout(() => {
    //   setLoading(false); //서버에서 받아오는 시간을 loading으로 표현하려고 가짜로 넣은 것. setTimeout은 반드시 콜백함수속에 지연실행하고픈 내용을 넣어야 지연되어 실행된다.
    // }, 2000);
    // console.log("useFetch-setInitData 실행");
  };

  useEffect(() => {
    console.log("useFetch-useEffect 실행");
    setInitData();
  }, []);

  return loading;
};

export default useFetch;
