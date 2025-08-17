"use client";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";
import { SidebarProvider } from "@/components/providers/SidebarProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarProvider>
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-white m-4 rounded-[36px] overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto p-4">{children}</main>
                </div>
            </SidebarProvider>
        </div>
    );
}
