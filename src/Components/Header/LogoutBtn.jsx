import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth";
import { logout } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../store/LoadingSlice";

function LogoutBtn() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setError("");
    dispatch(showLoading());

    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <button
        onClick={logoutHandler}
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      >
        Logout
      </button>
    </>
  );
}

export default LogoutBtn;
