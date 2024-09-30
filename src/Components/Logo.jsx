import React from "react";

function Logo({ width = "100px" }) {
  return <div style={(width = { width })}>
    <img src="../Logo.webp" alt="Logo" />
  </div>;
}

export default Logo;
