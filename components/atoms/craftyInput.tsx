
"use client";
import React, { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  className?: string;
};

const CraftyInput = forwardRef<HTMLInputElement, Props>(({ placeholder, className = "", ...props }, ref) => {
  return (
    <div
      className={
        "relative bg-[#f6f3e9] border-2 border-[#d9d4c7] rounded-lg p-2 w-72 shadow-md font-serif " +
        className
      }
    >
      <input
        ref={ref}
        {...props} // aquí llegan name, onChange, value, defaultValue, etc. de register()
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-[#2c3e50] text-lg w-[85%] placeholder:text-gray-500"
      />
    </div>
  );
});

CraftyInput.displayName = "CraftyInput";
export default CraftyInput;
