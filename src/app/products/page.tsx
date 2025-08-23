"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Clock, MoreHorizontal, Store, RefreshCcw } from "lucide-react";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { products, type Product } from "@/data/products";

export default function MyProduct() {
    const router = useRouter();
    const [filter, setFilter] = useState<"All" | "Live" | "Drafts" | "Sold">(
        "All"
    );

    const filtered =
        filter === "All" ? products : products.filter((p) => p.status === filter);

    const handleProductClick = (productId: number) => {
        router.push(`/products/${productId}`);
    };

    return (
        <ProtectedRoute>
        <MainLayout>
            <div className="p-6">
                {/* Header */}
                <h2 className="text-xl font-semibold mb-4 text-black">My Product</h2>

                {/* Tabs */}
                <div className="flex gap-3 mb-6">
                    {["All", "Live", "Drafts", "Sold"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab as any)}
                            className={`px-4 py-1 rounded-full text-sm font-medium border transition ${filter === tab
                                ? "bg-sky-200 text-black border-transparent"
                                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Product grid */}
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {filtered.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => handleProductClick(p.id)}
                            className="bg-white rounded-2xl border shadow-sm flex flex-col hover:shadow-md transition-shadow cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative p-3">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full max-h-[336px] object-cover rounded-lg"
                                />
                                <span
                                    className={`absolute top-5 right-5 px-2 py-1 text-xs font-semibold rounded-full ${p.status === "Live"
                                        ? "bg-blue-100 text-blue-600"
                                        : p.status === "Draft"
                                            ? "bg-orange-100 text-orange-600"
                                            : "bg-green-100 text-green-600"
                                        }`}
                                >
                                    {p.status}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-3 space-y-2 flex-1">
                                {/* Header (title + more) */}
                                <div className="flex items-start justify-between">
                                    <h3 className="text-sm font-normal line-clamp-2 text-black">
                                        {p.title}
                                    </h3>
                                    <MoreHorizontal className="w-5 h-5 text-black cursor-pointer" />
                                </div>

                                <hr />

                                {/* Price */}
                                <p className="text-blue-600 font-semibold text-sm">{p.price}</p>
                                <p className="text-xs text-neutral-500">Min. Price {p.minPrice}</p>

                                <hr />

                                {/* Marketplace */}
                                <div className="flex items-center gap-1 text-xs text-neutral-500">
                                    <Store size={18} />
                                    {p.marketplace}
                                </div>

                                {/* Updated */}
                                <div className="flex items-center gap-1 text-xs text-neutral-500">
                                    <RefreshCcw size={18} />
                                    Last updated {p.updated}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
        </ProtectedRoute>
    );
}
