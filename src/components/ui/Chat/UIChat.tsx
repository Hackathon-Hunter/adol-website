"use client";

import { useState } from "react";
import ChatInput from "@/components/ui/ChatInput";

export default function UIChat() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "That's a Marshall Major IV Bluetooth headphone, right?",
        },
        {
            id: 2,
            sender: "bot",
            text: "I'll create a draft listing for you. To activate the AI agent, 10 credits are required. Your current balance is 50 credits. Proceed?",
        },
        { id: 3, sender: "user", text: "Yes, go ahead." },
        {
            id: 4,
            sender: "user",
            image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Marshall_Major_IV.jpg/320px-Marshall_Major_IV.jpg",
        },
    ]);

    return (
        <div className="w-full max-w-2xl mx-auto h-screen flex flex-col">
            {/* Chat body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 pb-28">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        {msg.text && (
                            <span
                                className={`px-4 py-2 rounded-2xl text-sm ${msg.sender === "user"
                                        ? "bg-sky-200 text-black"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                            >
                                {msg.text}
                            </span>
                        )}
                        {msg.image && (
                            <img
                                src={msg.image}
                                alt="preview"
                                className="w-32 h-32 rounded-xl object-cover shadow"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Fixed Input */}
            <div className="fixed bottom-0 left-0 right-0 p-2">
                <div className="max-w-2xl mx-auto">
                    <ChatInput onSubmit={() => setIsChatOpen(true)} />
                </div>
            </div>
        </div>
    );
}
