"use client";

import { Loader2 } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "bot";
  text?: string;
  image?: string;
}

interface ChatProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function Chat({ messages, isLoading = false }: ChatProps) {
  return (
    <div className="space-y-4 px-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.text && (
            <div
              className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-purple-100 text-purple-900"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          )}
          {msg.image && (
            <img
              src={msg.image}
              alt="Preview"
              className="max-w-[180px] max-h-[180px] rounded-xl object-cover shadow-sm"
            />
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="px-4 py-2 rounded-2xl text-sm bg-gray-100 text-gray-800 flex items-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Thinking...
          </div>
        </div>
      )}

      {/* Extra space at the bottom to ensure messages don't get hidden behind input */}
      <div className="h-2"></div>
    </div>
  );
}
