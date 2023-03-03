import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { registerFormType } from "pages/register";
import { loginService, logoutService, registerService } from "services/auth.service";
import { getAccessToken, setAccessToken } from "utils/accessToken";
import { Loading } from "@comps";
import { useAlert } from "./alert.context";

interface authContextType {
  user: Boolean;
  setUser: Boolean | Dispatch<SetStateAction<Boolean>>;
  userInfo: string;
  setUserInfo: string | Dispatch<SetStateAction<string>>;
  roles: Array<String>;
  setRoles: Array<String> | Dispatch<SetStateAction<Array<String>>>;
  login: (body: { email: string; password: string }) => Promise<void>;
  register: (body: registerFormType) => Promise<void>;
  logout: () => void;
  checkUserLoggedIn: () => void;
}

const authContextInitialValues: authContextType = {
  user: false,
  setUser: () => Boolean,
  userInfo: "",
  setUserInfo: () => String,
  roles: [],
  setRoles: () => {},
  login: async () => {},
  register: async () => {},
  logout: () => {},
  checkUserLoggedIn: () => {},
};

export const AuthContext = createContext<authContextType>(authContextInitialValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [user, setUser] = useState<Boolean>(false);
  const [userInfo, setUserInfo] = useState<string>("");
  const [roles, setRoles] = useState<Array<String>>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();
  const { setMessage, toggleOpenAlert, setType } = useAlert();

  useEffect(() => {
    if (loading && !user) checkUserLoggedIn();
  });

  const login = async (body: { email: string; password: string }) => {
    let data;
    try {
      data = await loginService(body);
    } catch (err) {
      console.log(err);
    }

    if (data) {
      if (!data.ok) {
        setType("error");
        setMessage(data.message);
        toggleOpenAlert();
      } else {
        setRoles(data.data.roles);
        setAccessToken(data.data.accessToken);
        setType("success");
        setMessage(data.message);
        toggleOpenAlert();
        localStorage.setItem("roles", data.data.roles);
        setUser(true);
        setUserInfo(data.data.userId);
        const timeout = setTimeout(() => {
          router.push("/user/profile");
          clearTimeout(timeout);
        }, 1000);
      }
    } else {
      setType("error");
      setMessage("Something happened, please try again");
      toggleOpenAlert();
    }
  };

  const register = async (body: registerFormType) => {
    const data = await registerService(body);

    if (!data.ok) {
      setType("error");
      setMessage(data.message);
      toggleOpenAlert();
    } else {
      setType("success");
      setMessage(data.message);
      toggleOpenAlert();
      setUser(true);
      localStorage.setItem("roles", data.roles);
      setAccessToken(data.accessToken);
      const timeout = setTimeout(() => {
        router.push("/user/profile");
        clearTimeout(timeout);
      }, 1500);
    }
  };

  const logout = async () => {
    let data;
    try {
      data = await logoutService();
    } catch (err) {
      console.log(err);
    }

    if (data) {
      if (!data.ok) {
        setType("error");
        setMessage(data.message);
        toggleOpenAlert();
      } else {
        setType("success");
        setMessage(data.message);
        toggleOpenAlert();
        setUser(false);
        setAccessToken("");
        const timeout = setTimeout(() => {
          router.push("/");
          clearTimeout(timeout);
        }, 1000);
      }
    } else {
      setType("error");
      setMessage("Something happened, please try again");
      toggleOpenAlert();
    }
  };

  const checkUserLoggedIn = async () => {
    const accessToken = getAccessToken();

    if (accessToken.length < 1) {
      const request = await fetch("http://localhost:4000/api/refreshToken", {
        method: "POST",
        credentials: "include",
        headers: {
          authorization: `bearer ${getAccessToken()}`,
        },
      });

      if (request.ok) {
        const data = await request.json();

        if (data.ok) {
          setRoles(data.roles);
          setUserInfo(data.userId);
          setAccessToken(data.accessToken);
          localStorage.setItem("roles", data.roles);
          setUser(true);
        }
      }
    }
    setLoading(false);
  };

  const value = {
    user: user,
    setUser: setUser,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    login: login,
    register: register,
    logout: logout,
    checkUserLoggedIn: checkUserLoggedIn,
    roles: roles,
    setRoles: setRoles,
  };

  return <AuthContext.Provider value={value}>{loading ? <Loading /> : children}</AuthContext.Provider>;
}
