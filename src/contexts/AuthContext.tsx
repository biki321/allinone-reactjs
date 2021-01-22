import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { apiurl } from "../apiurl";

interface CurrentUser {
  email: string;
  userId: string;
  "auth-token": string;
}

interface ContextI {
  currentUser: CurrentUser | null;
  login: ((email: string, password: string) => Promise<void>) | null;
  signup: ((email: string, password: string) => Promise<void>) | null;
  logout: (() => void) | null;
}

const AuthContext = React.createContext<ContextI>({
  currentUser: null,
  login: null,
  signup: null,
  logout: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    try {
      const res = await axios({
        method: "post",
        url: `${apiurl}/api/user/signup`,
        data: {
          email: email,
          password: password,
        },
      });
      localStorage.setItem("alino", res.data["auth-token"]);
      //   res.data["token"] = res.headers["auth-token"];
      setCurrentUser(res.data);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }

  async function login(email: string, password: string) {
    try {
      const res = await axios({
        method: "post",
        url: `${apiurl}/api/user/login`,
        data: {
          email: email,
          password: password,
        },
      });
      localStorage.setItem("alino", res.data["auth-token"]);
      //   res.data["token"] = res.headers["auth-token"];
      setCurrentUser(res.data);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("alino");
    setCurrentUser(null);
    setLoading(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("alino");
    const source = axios.CancelToken.source();

    if (token) {
      axios({
        method: "get",
        url: `${apiurl}/api/user/currentuser`,
        headers: {
          "auth-token": token,
        },
        cancelToken: source.token,
      })
        .then((res) => {
          //   res.data["token"] = token;

          setCurrentUser(res.data);
          setLoading(false);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            // console.log("caught error cancel");
          } else {
            setCurrentUser(null);
            setLoading(false);
          }
        });
    } else {
      // console.log("not token found");
      setLoading(false);
    }
    return () => {
      // console.log("cleanded");
      source.cancel();
    };
  }, []);

  const value = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
