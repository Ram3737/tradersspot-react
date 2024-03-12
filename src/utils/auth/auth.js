import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function checkAuthTokenPaid() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }

  return true;
}

export function checkAuthTokenNormal() {
  const token = getAuthToken();

  if (token) {
    return redirect("/course");
  }

  return true;
}
