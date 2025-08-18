"use client";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

import {
    ShoppingBag,
    MessageCircle,
    Infinity,
    Settings,
    Banknote,
    Pen,
    Ban,
} from "lucide-react";

import MainLayout from "../layout/MainLayout";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import CircleIcon from "@/components/ui/CircleIcon";

export default function Notifications() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("all");

    const tabs = [
        { key: "all", label: "All", count: 6 },
        { key: "sales", label: "Sales" },
        { key: "messages", label: "Messages" },
        { key: "credits", label: "Credits" },
    ];

    const notifications = [
        {
            type: "sales",
            icon: (
                <CircleIcon
                    bgColor="bg-blue-100"
                    borderColor="border-blue-300"
                >
                    <ShoppingBag size={18} className="text-blue-500" />
                </CircleIcon>
            ),
            title: "Sales",
            text: "You've got a new offer! Rp 1,650,000 for your Marshall Major IV. Ready to deal?",
            product: "Marshall Major IV Bluetooth Headphones",
            time: "Just now",
            actions: ["Accept Offer", "Counter Offer", "Reject Offer"],
        },
        {
            type: "messages",
            icon: (
                <CircleIcon
                    bgColor="bg-yellow-100"
                    borderColor="border-yellow-300"
                >
                    <MessageCircle size={18} className="text-yellow-500" />
                </CircleIcon>
            ),
            title: "Message",
            text: "Buyer asks: 'Is the battery still good?'",
            product: "iPhone 12 Pro Max 256GB Pacific Blue",
            time: "Today, 21.40",
            actions: ["Reply Now"],
        },
        {
            type: "messages",
            icon: (
                <CircleIcon
                    bgColor="bg-green-100"
                    borderColor="border-green-300"
                >
                    <MessageCircle size={18} className="text-green-500" />
                </CircleIcon>
            ),
            title: "Message",
            text: "A buyer sent you a message: 'Can you ship to Jakarta?'",
            product: "IKEA Markus Office Chair",
            time: "Yesterday, 16.41",
            actions: ["Reply Now"],
        },
        {
            type: "credits",
            icon: (
                <CircleIcon
                    bgColor="bg-purple-100"
                    borderColor="border-purple-300"
                >
                    <Infinity size={18} className="text-purple-500" />
                </CircleIcon>
            ),
            title: "Credits",
            text: "You have 5 credits left. Top up now to keep your AI agent active.",
            time: "Tuesday, 08.25",
            actions: ["Top up"],
        },
    ];

    const actionIcons: Record<string, ReactNode> = {
        "Accept Offer": <Banknote size={14} />,
        "Counter Offer": <Pen size={14} />,
        "Reject Offer": <Ban size={14} />,
        "Reply Now": <Pen size={14} />,
        "Top up": <Banknote size={14} />,
    };

    const filtered =
        activeTab === "all"
            ? notifications
            : notifications.filter((n) => n.type === activeTab);

    return (
        <MainLayout>
            <div className="bg-white rounded-3xl border px-64 py-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-normal text-black">Notifications</h2>
                    <ButtonSecondary onClick={() => router.push("/notifications/settings")}>
                        <Settings size={16} />
                        Manage Notifications
                    </ButtonSecondary>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${activeTab === tab.key
                                ? "bg-sky-200 text-black border border-sky-300"
                                : "bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {tab.label}
                            {tab.count && (
                                <span
                                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.key
                                        ? "bg-white text-black"
                                        : "bg-gray-300 text-gray-700"
                                        }`}
                                >
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="flex flex-col gap-4">
                    {filtered.map((n, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-2xl p-4 flex flex-col gap-3 hover:bg-gray-100 transition"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex gap-2 items-center">
                                    {n.icon}
                                    <div>
                                        <p className="text-sm font-normal text-gray-500">{n.title}</p>
                                        <p className="text-sm text-gray-600">{n.text}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">{n.time}</span>
                            </div>

                            <div className="ml-10 border border-gray-200"></div>

                            {n.product && (
                                <div className="ml-10 text-sm text-gray-700">{n.product}</div>
                            )}

                            <div className="flex gap-2 ml-10">
                                {n.actions.map((a, idx) => {
                                    if (idx === 0 && n.type === "sales") {
                                        return (
                                            <ButtonPrimary
                                                key={idx}
                                                onClick={() => console.log("Accept Offer")}
                                            >
                                                {actionIcons[a]}
                                                <span>{a}</span>
                                            </ButtonPrimary>
                                        );
                                    } else if (a === "Counter Offer" || a === "Reply Now") {
                                        return (
                                            <button
                                                key={idx}
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                                            >
                                                {actionIcons[a]}
                                                <span>{a}</span>
                                            </button>
                                        );
                                    } else if (a === "Reject Offer") {
                                        return (
                                            <button
                                                key={idx}
                                                className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                                            >
                                                {actionIcons[a]}
                                                <span>{a}</span>
                                            </button>
                                        );
                                    } else {
                                        return (
                                            <ButtonPrimary key={idx}>
                                                {actionIcons[a]}
                                                <span>{a}</span>
                                            </ButtonPrimary>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}