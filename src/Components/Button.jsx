import React from "react";

function Button({
  Children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  clasName = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${clasName}`}
      {...props}
      type={type}
    >
      {Children}
    </button>
  );
}

export default Button;
