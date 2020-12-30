import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (callback) => {
  const [loading, setLoading] = useState(true);

  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken"; //웹사이트 해킹 방지용도

  const fetchInitData = async () => {
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

    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        Authorization: `jwt ${jwt.token}`,
      },
    };
    try {
      // const response = await axios.get("http://127.0.0.1:8000/api/fbooks");
      // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6InRyYXZpczIiLCJleHAiOjE2MDk4MDcxNjgsImVtYWlsIjoidHJhdmlzQHRyYXZpcy5jb20iLCJvcmlnX2lhdCI6MTYwOTE0MDYwM30.IYgBUsVkOTeeqpG2Nd-zC4JLBUufj3XSA1kkGN4Kv5w
      const response = await axios.get(
        "http://127.0.0.1:8000/api/fbooks/",
        config
      );
      const fbFromDJG = await response.data[0];
      console.log("받아온 데이터:", fbFromDJG);
      callback({ type: "SET_INIT_DATA", payload: fbFromDJG });
      setTimeout(() => {
        setLoading(false); //서버에서 받아오는 시간을 loading으로 표현하려고 가짜로 넣은 것. setTimeout은 반드시 콜백함수속에 지연실행하고픈 내용을 넣어야 지연되어 실행된다.
        callback({ type: "SET_JWT", payload: jwt });
      }, 1000);
    } catch (error) {
      const defaultFbooks = { id: 2, information: defaultUser, search: "" };
      callback({ type: "SET_INIT_DATA", payload: defaultFbooks });
      setTimeout(() => {
        setLoading(false); //서버에서 받아오는 시간을 loading으로 표현하려고 가짜로 넣은 것. setTimeout은 반드시 콜백함수속에 지연실행하고픈 내용을 넣어야 지연되어 실행된다.
      }, 2000);
      return console.log("서버에서 정보를 받아올 수 없습니다.");
    }
  };

  useEffect(() => {
    console.log("useFetch-useEffect 실행");
    fetchInitData();
  }, []);

  return loading;
};

export default useFetch;
