import React from "react";

function Container({ children }) {
  return (
    <div className="w-full mx-auto px-2"> {/* Use full width and reduce padding */}
      {children}
    </div>
  );
}

export default Container;
