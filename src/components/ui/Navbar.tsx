"use client";
import { Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b bg-white">
      <div>

      </div>
      <div className="flex gap-3 items-center">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search your sales history"
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 text-gray-500"
          />
        </div>
        <button className="bg-black text-white text-sm px-4 py-2 rounded-full">
          New Chat
        </button>
      </div>
    </div>
  );
}
