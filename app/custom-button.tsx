// CustomButton.js
import React from "react";

export default function CustomButton({
  children,
  onClick,
  size = "sm",
  variant = "text",
  className = "",
  ...rest
}) {
  const baseStyles = "focus:outline-none font-medium rounded";
  const sizeStyles = size === "sm" ? "px-3 py-2 text-sm" : "px-4 py-2";
  const variantStyles =
    variant === "text" ? "bg-transparent" : "bg-blue-600 text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
