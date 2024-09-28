import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  refrence
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={refrence}
        {...props}
        id={id}
      />
    </div>
  );
});
export default Input;
