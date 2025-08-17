"use client";

import { useState } from "react";
import { Globe, Clock, MoreHorizontal, Store, RefreshCcw } from "lucide-react";
import MainLayout from "../layout/MainLayout";

type Product = {
    id: number;
    title: string;
    price: string;
    minPrice: string;
    status: "Live" | "Draft" | "Sold";
    image: string;
    marketplace: string;
    updated: string;
};

const products: Product[] = [
    {
        id: 1,
        title: "Marshall Major IV Bluetooth Headphones",
        price: "Rp 1,850,000",
        minPrice: "Rp 1,600,000",
        status: "Live",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Marshall_Major_IV.jpg",
        marketplace: "Facebook Marketplace",
        updated: "2 hours ago",
    },
    {
        id: 2,
        title: "Nike Air Max 97 Silver Bullet",
        price: "Rp 2,300,000",
        minPrice: "Rp 2,000,000",
        status: "Live",
        image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fc2d86b1-97bb-41de-bfe4-cc8d98efb725/air-max-97-shoes-JXw9pm.png",
        marketplace: "Facebook Marketplace",
        updated: "5 hours ago",
    },
    {
        id: 3,
        title: "iPhone 12 Pro Max 256GB Pacific Blue",
        price: "Rp 12,000,000",
        minPrice: "Rp 11,500,000",
        status: "Draft",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-max-blue-2020?wid=1144&hei=1144&fmt=jpeg",
        marketplace: "-",
        updated: "yesterday",
    },
    {
        id: 4,
        title: "Canon EOS M50 Mirrorless Camera",
        price: "Rp 7,200,000",
        minPrice: "Rp 6,800,000",
        status: "Sold",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Canon_EOS_M50.jpg",
        marketplace: "Facebook Marketplace",
        updated: "2 days ago",
    },
    {
        id: 5,
        title: "Canon EOS M50 Mirrorless Camera",
        price: "Rp 7,200,000",
        minPrice: "Rp 6,800,000",
        status: "Sold",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-max-blue-2020?wid=1144&hei=1144&fmt=jpeg",
        marketplace: "Facebook Marketplace",
        updated: "2 days ago",
    },
];

export default function MyProduct() {
    const [filter, setFilter] = useState<"All" | "Live" | "Drafts" | "Sold">(
        "All"
    );

    const filtered =
        filter === "All" ? products : products.filter((p) => p.status === filter);

    return (
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
                            className="w-full border rounded-xl shadow-sm bg-white flex flex-col"
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
    );
}
