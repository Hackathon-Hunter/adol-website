"use client";

import { useState } from "react";
import MainLayout from "./partial/MainLayout";
import ChatInput from "@/components/ui/ChatInput";
import UIChat from "@/components/ui/Chat/UIChat"; // pastikan path sesuai
import { ArrowUp } from "lucide-react";
import { ChatIcon } from "@/components/icons";

export default function Page() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <MainLayout>
            {/* Kalau chat terbuka tampilkan UIChat */}
            {isChatOpen ? (
                <UIChat />
            ) : (
                <div>
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

                    <ChatInput onSubmit={() => setIsChatOpen(true)} />
                </div>
            )}
        </MainLayout>
    );
}
