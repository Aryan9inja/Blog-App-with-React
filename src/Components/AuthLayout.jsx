import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const [loading, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.status);
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      redirect("/login");
    } else if (!authentication && authStatus !== authentication) {
      redirect("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
