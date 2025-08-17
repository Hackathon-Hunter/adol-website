"use client";
import Link from "next/link";
import { Home, Box, MessageSquare } from "lucide-react";
import { AdolLogo, ICPIcon } from "@/components/icons";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/providers/SidebarProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`h-screen flex flex-col py-6 border-r bg-gray-100 transition-all duration-300
      ${collapsed ? "w-16 items-center" : "w-64 items-start px-6"}`}
    >
      {/* Logo */}
      <div className={`mb-6 ${collapsed ? "" : "flex items-center gap-3"}`}>
        <AdolLogo />
        {!collapsed && (
          <span className="text-xl font-bold text-gray-800">Adol</span>
        )}
      </div>

      {/* Border divider dengan responsive margin */}
      <div className={`border border-gray-300 transition-all duration-300 ${collapsed ? "w-8" : "w-full"}`}></div>

      {/* Menu */}
      <nav className={`flex flex-col flex-1 mt-4 ${collapsed ? "space-y-6 items-center" : "space-y-4"}`}>
        <div className="relative group">
          <Link href="/home" className={`flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-200 ${collapsed ? "justify-center" : ""}`}>
            <Home
              size={20}
              className={`${isActive("/home")
                ? "text-purple-500"
                : "text-gray-400"
                }`}
            />
            {!collapsed && (
              <span className={`${isActive("/home")
                ? "text-purple-500 font-medium"
                : "text-gray-600"
                }`}>
                Home
              </span>
            )}
          </Link>
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Home
            </div>
          )}
        </div>

        <div className="relative group">
          <Link href="/products" className={`flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-200 ${collapsed ? "justify-center" : ""}`}>
            <Box
              size={20}
              className={`${isActive("/products")
                ? "text-purple-500"
                : "text-gray-400"
                }`}
            />
            {!collapsed && (
              <span className={`${isActive("/products")
                ? "text-purple-500 font-medium"
                : "text-gray-600"
                }`}>
                Products
              </span>
            )}
          </Link>
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Products
            </div>
          )}
        </div>

        <div className="relative group">
          <Link href="/messages" className={`flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-200 ${collapsed ? "justify-center" : ""}`}>
            <MessageSquare
              size={20}
              className={`${isActive("/messages")
                ? "text-purple-500"
                : "text-gray-400"
                }`}
            />
            {!collapsed && (
              <span className={`${isActive("/messages")
                ? "text-purple-500 font-medium"
                : "text-gray-600"
                }`}>
                Messages
              </span>
            )}
          </Link>
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              Messages
            </div>
          )}
        </div>

        <div className="relative group">
          <Link href="/infinity" className={`flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-200 ${collapsed ? "justify-center" : ""}`}>
            <ICPIcon
              width={20}
              height={20}
              className={`${isActive("/infinity")
                ? "text-blue-500"
                : "text-gray-400"
                }`}
            />
            {!collapsed && (
              <span className={`${isActive("/infinity")
                ? "text-blue-500 font-medium"
                : "text-gray-600"
                }`}>
                ICP
              </span>
            )}
          </Link>
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              ICP
            </div>
          )}
        </div>
      </nav>

      {/* Border divider dengan responsive margin */}
      <div className={`border border-gray-300 transition-all duration-300 ${collapsed ? "w-8" : "w-full"}`}></div>

      {/* Bottom icons */}
      <div className={`flex flex-col space-y-4 mt-4 ${collapsed ? "items-center" : ""}`}>
        <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          {!collapsed && <span className="text-gray-600">Settings</span>}
        </div>
        <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gray-300" />
          {!collapsed && <span className="text-gray-600">Profile</span>}
        </div>
      </div>
    </div>
  );
}