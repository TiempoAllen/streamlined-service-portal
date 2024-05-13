import { json, redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    // throw json(
    //   { message: "You have no access to this page." },
    //   { status: 500 }
    // );
    return redirect("/");
  }

  return null;
};
