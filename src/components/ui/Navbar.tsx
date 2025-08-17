"use client";
import { MessageSquarePlus, PanelRightClose, Search } from "lucide-react";
import { useSidebar } from "@/components/providers/SidebarProvider";

export default function Navbar() {
  const { toggle } = useSidebar();

  return (
    <div className="h-16 flex items-center justify-between px-6 border-b bg-gray-100 rounded-full m-4">
      {/* Button toggle sidebar */}
      <div>
        <button
          onClick={toggle}
          className="bg-white rounded-full p-2 hover:bg-gray-200 transition"
        >
          <PanelRightClose size={18} className="text-black" />
        </button>
      </div>

      {/* Search bar & New Chat */}
      <div className="flex gap-3 items-center">
        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search your sales history"
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 text-gray-500"
          />
        </div>

        {/* Button New Chat */}
        <button className="bg-black text-white text-sm px-4 py-2 rounded-full flex gap-2 items-center hover:bg-gray-800 transition">
          <MessageSquarePlus size={18} />
          New Chat
        </button>
      </div>
    </div>
  );
}
