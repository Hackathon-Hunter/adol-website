"use client";
import { Home, Box, MessageSquare, Infinity } from "lucide-react";
import { ICPIcon } from '@/components/icons';

export default function Sidebar() {
  return (
    <div className="w-16 h-screen flex flex-col items-center py-6 border-r bg-white">
      <div className="mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <span className="text-white font-bold">↗</span>
        </div>
      </div>
      <nav className="flex flex-col space-y-6 flex-1">
        <Home className="text-purple-500" />
        <Box className="text-gray-400 hover:text-purple-500 cursor-pointer" />
        <MessageSquare className="text-gray-400 hover:text-purple-500 cursor-pointer" />
        <ICPIcon
          width={24}
          height={24}
          className="text-blue-500"
        />
      </nav>
      <div className="flex flex-col items-center space-y-6">
        <div className="w-10 h-10 rounded-full bg-gray-100" />
        <div className="w-10 h-10 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}
