import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
