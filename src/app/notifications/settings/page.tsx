"use client";

import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { ArrowLeft } from "lucide-react";

export default function ManageNotifications() {
    const [settings, setSettings] = useState({
        sales: true,
        messages: true,
        logistics: false,
        credits: true,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const items = [
        {
            key: "sales",
            title: "Sales Updates (Always On)",
            subtitle: "New offers & final buyer approvals",
            desc: "We’ll always notify you about serious offers and deals that need your approval.",
            disabled: true,
        },
        {
            key: "messages",
            title: "Buyer Messages",
            subtitle: "Questions & general buyer chats",
            desc: "Let your AI agent handle buyer questions. Enable if you’d like to see them too.",
        },
        {
            key: "logistics",
            title: "Logistics",
            subtitle: "Pickup & delivery schedule confirmations",
            desc: "Get notified when it’s time to prepare for pickup or delivery.",
        },
        {
            key: "credits",
            title: "Credits & Wallet",
            subtitle: "Low balance & top-up confirmations",
            desc: "Stay updated on your credit balance so your AI agent never stops working.",
        },
    ];

    return (
        <MainLayout>
            <div className="bg-white rounded-3xl border px-64 py-10">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <ArrowLeft size={20} />Manage Notifications
                    </h2>
                    <p className="text-sm text-gray-500 ml-7">
                        Choose what updates you want to be notified about.
                    </p>
                </div>

                {/* List */}
                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <div
                            key={item.key}
                            className="flex flex-col rounded-2xl border px-5 py-4 hover:bg-gray-50 transition"
                        >
                            <div>
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                                    </div>
                                    {/* Toggle */}
                                    <button
                                        onClick={() => !item.disabled && toggleSetting(item.key as keyof typeof settings)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${settings[item.key as keyof typeof settings]
                                            ? "bg-indigo-500"
                                            : "bg-gray-300"
                                            } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings[item.key as keyof typeof settings]
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                                }`}
                                        />
                                    </button>
                                </div>
                                <hr className="mt-3 mb-3" />
                                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
