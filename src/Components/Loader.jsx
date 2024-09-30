import React from "react";

function Loader({children}) {
  return (
    <div className="flex justify-center mt-8 flex-col items-center">
      <div className="loader"></div>
      <div className="loaders">{children}</div>
    </div>
  );
}

export default Loader;
