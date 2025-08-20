"use client";

import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import ChatInput from "@/components/ui/ChatInput";
import UIChat from "@/components/ui/Chat/UIChat"; // pastikan path sesuai
import { ArrowUp } from "lucide-react";
import { ChatIcon } from "@/components/icons";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Page() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <ProtectedRoute>
            <MainLayout>
            {/* Kalau chat terbuka tampilkan UIChat */}
            {isChatOpen ? (
                <UIChat />
            ) : (
                <div className="flex flex-col h-full justify-center w-full">
                    {/* Header */}
                    <div className="flex flex-col justify-center items-center">
                        <ChatIcon width={64} height={64} className="text-blue-500" />
                        <h1 className="text-center text-2xl font-semibold mb-2 text-black">
                            Hi, Ryan
                            <br />
                            <span className="font-normal">
                                Ready to <span className="text-purple-500">make some cash?</span>
                            </span>
                        </h1>
                    </div>

                    {/* ChatInput full width */}
                    <div className="w-full mt-4">
                        <ChatInput onSubmit={() => setIsChatOpen(true)} />
                    </div>
                </div>

            )}
        </MainLayout>
        </ProtectedRoute>
    );
}
