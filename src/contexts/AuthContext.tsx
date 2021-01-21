import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

interface CurrentUser {
  email: string;
  userId: string;
  "auth-token": string;
}

interface ContextI {
  currentUser: CurrentUser | null;
  login: ((email: string, password: string) => Promise<void>) | null;
  signup: ((email: string, password: string) => Promise<void>) | null;
}

const AuthContext = React.createContext<ContextI>({
  currentUser: null,
  login: null,
  signup: null,
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
        url: "http://localhost:8032/api/user/signup",
        data: {
          email: email,
          password: password,
        },
      });
      console.log(res);
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
        url: "http://localhost:8032/api/user/login",
        data: {
          email: email,
          password: password,
        },
      });
      console.log(res);
      localStorage.setItem("alino", res.data["auth-token"]);
      //   res.data["token"] = res.headers["auth-token"];
      setCurrentUser(res.data);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("alino");
    const source = axios.CancelToken.source();

    console.log(token);
    if (token) {
      axios({
        method: "get",
        url: "http://localhost:8032/api/user/currentuser",
        headers: {
          "auth-token": token,
        },
        cancelToken: source.token,
      })
        .then((res) => {
          console.log(res.data);
          //   res.data["token"] = token;

          setCurrentUser(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (axios.isCancel(error)) {
            console.log("caught error cancel");
          } else {
            setCurrentUser(null);
            setLoading(false);
          }
        });
    } else {
      console.log("not token found");
      setLoading(false);
    }
    return () => {
      console.log("cleanded");
      source.cancel();
    };
  }, []);

  const value = { currentUser, signup, login };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
