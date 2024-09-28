import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth";
import { logout } from "../../store/AuthSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout() 
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => {
        console.log("The button didn't work as intended and gave error: ", err);
      });
  };

  return (
    <button onClick={logoutHandler} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </button>
  );
}

export default LogoutBtn;
