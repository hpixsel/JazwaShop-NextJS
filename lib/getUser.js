/* eslint-disable react-hooks/rules-of-hooks */
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "/context/auth-context";

export function getUser() {
  const userCookie = getCookie('user')
  const userJson = JSON.parse(userCookie)
  if (!!userJson.session) {
    return jwtDecode(userJson.user)
  } else {
    return userJson.user
  }
}