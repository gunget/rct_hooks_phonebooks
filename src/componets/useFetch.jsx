import { useState, useEffect } from "react";

const useFetch = (dispatch) => {
  const [loading, setLoading] = useState(true);

  const setInitData = () => {
    const defaultUser = {
      information: [
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
      ],
      keyword: "",
    };
    dispatch({ type: "SET_INIT_DATA", payload: defaultUser });
    setLoading(false);
    console.log("useFetch setInit 실행");
  };

  setInitData();

  //   useEffect(() => {
  //     setInitData();
  //   }, []);

  return loading;
};

export default useFetch;
