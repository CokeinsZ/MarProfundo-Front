"use client";

import { useState } from "react";

export default function CraftyInput({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState("");

  return (
    <div className="relative bg-[#f6f3e9] border-2 border-[#d9d4c7] rounded-lg p-2 w-72 shadow-md
      before:content-[''] before:absolute before:bottom-[-6px] before:left-0 before:w-full before:h-[8px]
      before:bg-[repeating-linear-gradient(-45deg,#f6f3e9,#f6f3e9_3px,#e0ddd3_3px,#e0ddd3_6px)]
      before:[clip-path:polygon(0_50%,5%_55%,10%_45%,15%_55%,20%_50%,25%_60%,30%_45%,35%_55%,40%_50%,45%_60%,50%_45%,55%_55%,60%_50%,65%_60%,70%_45%,75%_55%,80%_50%,85%_60%,90%_45%,95%_55%,100%_50%)]
      font-serif">
      
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder= {placeholder}
        className="bg-transparent border-none outline-none text-[#2c3e50] text-lg w-[85%] placeholder:text-gray-500"
      />
    </div>
  );
}
