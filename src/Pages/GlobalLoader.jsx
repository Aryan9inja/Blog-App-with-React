import React from "react";
import { useSelector } from "react-redux";
import {Loader} from "../Components";

function GlobalLoader() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      {/* This will cover the whole page */}
      <Loader>Loading...</Loader>
    </div>
  ) : null;
}

export default GlobalLoader;
