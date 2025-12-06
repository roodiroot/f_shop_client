import Cookies from "js-cookie";

import { User, UserAuth } from "@/types/user";

export const saveAuthData = (token: string, userData: UserAuth) => {
  Cookies.set("authToken", token, { expires: 7 });
  Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
};

export const updateUserData = (userData: User) => {
  Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
};

export const getAuthData = () => {
  const token = Cookies.get("authToken");
  const userData = Cookies.get("userData");
  return {
    token,
    userData: userData ? JSON.parse(userData) : null,
  };
};

export const clearAuthData = () => {
  Cookies.remove("authToken");
  Cookies.remove("userData");
};
