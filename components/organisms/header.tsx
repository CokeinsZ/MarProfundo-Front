"use client";

import { Search, User, Sun } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#f9f6ef] shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Search */}
        <div className="flex items-center bg-white border rounded-full px-3 py-1 shadow-sm w-48">
          <Search className="w-4 h-4 text-gray-500 mr-2 font-bold text-" />
          <input
            type="text"
            className="outline-none text-sm bg-transparent w-full"
          />
        </div>

        {/* Center - Home */}
        <nav>
          <Link href="/" className="text-xl font-bold text-gray-800">
            Home
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <User className="w-5 h-5 text-gray-700" />
          <button className="px-3 py-1 rounded-full bg-gray-200 text-xl font-bold text-gray-800">
            Category
          </button>
          <Sun className="w-6 h-6 text-yellow-500" />
        </div>
      </div>
    </header>
  );
}
