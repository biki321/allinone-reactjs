import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export const apiStates = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const useApi = (url: string, forceBit: number) => {
  const [data, setData] = useState({
    state: apiStates.LOADING,
    error: "",
    dataArray: [],
  });

  const { currentUser } = useAuth();

  const setPartData = (partialData: any) =>
    setData({ ...data, ...partialData });

  useEffect(() => {
    setPartData({
      state: apiStates.LOADING,
    });
    axios({
      method: "get",
      url: url,
      headers: {
        "auth-token": currentUser!["auth-token"],
      },
    })
      .then(({ data }) => {
        setPartData({
          state: apiStates.SUCCESS,
          dataArray: data,
        });
      })
      .catch(() => {
        setPartData({
          state: apiStates.ERROR,
          error: "fetch failed",
        });
      });
  }, [url, forceBit]); // eslint-disable-line

  return data;
};
