"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe, Clock, MoreHorizontal, Store, RefreshCcw } from "lucide-react";
import MainLayout from "../layout/MainLayout";
import { getAdolService, type Product as BackendProduct } from "@/service/api/adolService";
import { useAuth } from "@/hooks/useAuth";

// Convert backend product to display format
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  status: "Live" | "Drafts" | "Sold";
  views: number;
  likes: number;
  date: string;
  stock: number;
  condition: string;
}

export default function ProductsPage() {
    const router = useRouter();
    const { principal, isAuthenticated } = useAuth();
    const [filter, setFilter] = useState<"All" | "Live" | "Drafts" | "Sold">("All");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Convert backend product to display format
    const convertBackendProduct = (backendProduct: BackendProduct): Product => {
        return {
            id: backendProduct.id,
            name: backendProduct.name,
            description: backendProduct.description,
            price: Number(backendProduct.price),
            image: backendProduct.imageBase64 || "/assets/images/background.png",
            status: backendProduct.isActive ? "Live" : "Drafts",
            views: 0, // Backend doesn't have views yet
            likes: 0, // Backend doesn't have likes yet
            date: new Date(Number(backendProduct.createdAt) / 1000000).toLocaleDateString(),
            stock: Number(backendProduct.stock),
            condition: backendProduct.condition,
        };
    };

    // Load products from backend - show all products if not authenticated, user's products if authenticated
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const adolService = await getAdolService();
                
                let fetchedProducts: BackendProduct[] = [];
                if (isAuthenticated && principal) {
                    // Show only user's products if authenticated
                    fetchedProducts = await adolService.getMyProducts();
                    console.log("User products:", fetchedProducts);
                } else {
                    // Show all products if not authenticated
                    fetchedProducts = await adolService.getProducts();
                    console.log("All products:", fetchedProducts);
                }
                
                const convertedProducts = fetchedProducts.map(convertBackendProduct);
                setProducts(convertedProducts);
            } catch (err) {
                console.error("Failed to load products:", err);
                setError("Failed to load products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [isAuthenticated, principal]);

    const refreshProducts = async () => {
        try {
            setLoading(true);
            const adolService = await getAdolService();
            
            let fetchedProducts: BackendProduct[] = [];
            if (isAuthenticated && principal) {
                // Refresh user's products if authenticated
                fetchedProducts = await adolService.getMyProducts();
            } else {
                // Refresh all products if not authenticated
                fetchedProducts = await adolService.getProducts();
            }
            
            const convertedProducts = fetchedProducts.map(convertBackendProduct);
            setProducts(convertedProducts);
        } catch (err) {
            console.error("Failed to refresh products:", err);
            setError("Failed to refresh products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const filtered = filter === "All" ? products : products.filter((p: Product) => p.status === filter);

    const handleProductClick = (productId: string) => {
        router.push(`/products/${productId}`);
    };

    return (
        <MainLayout>
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-black">
                        {isAuthenticated ? "My Products" : "Products"}
                    </h2>
                    <button
                        onClick={refreshProducts}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                {/* Show login prompt for better UX when not authenticated */}
                {!isAuthenticated && (
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-sm">
                            <span className="font-medium">Tip:</span> Log in to see and manage your own products.
                        </p>
                    </div>
                )}

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

                {/* Loading state */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Loading products...</span>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={refreshProducts}
                            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && filtered.length === 0 && (
                    <div className="text-center py-12">
                        <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg mb-2">No products found</p>
                        <p className="text-gray-500">
                            {filter === "All" ? "You haven't created any products yet." : `No ${filter.toLowerCase()} products found.`}
                        </p>
                    </div>
                )}

                {/* Product grid */}
                {!loading && !error && filtered.length > 0 && (
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                        {filtered.map((p: Product) => (
                            <div
                                key={p.id}
                                onClick={() => handleProductClick(p.id)}
                                className="bg-white rounded-2xl border shadow-sm flex flex-col hover:shadow-md transition-shadow cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative p-3">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full max-h-[336px] object-cover rounded-lg"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/assets/images/background.png";
                                        }}
                                    />
                                    <span
                                        className={`absolute top-5 right-5 px-2 py-1 text-xs font-semibold rounded-full ${p.status === "Live"
                                            ? "bg-blue-100 text-blue-600"
                                            : p.status === "Drafts"
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
                                            {p.name}
                                        </h3>
                                        <MoreHorizontal className="w-5 h-5 text-black cursor-pointer" />
                                    </div>

                                    <hr />

                                    {/* Price */}
                                    <p className="text-blue-600 font-semibold text-sm">${p.price}</p>
                                    <p className="text-xs text-neutral-500">Stock: {p.stock}</p>

                                    <hr />

                                    {/* Condition */}
                                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                                        <Store size={18} />
                                        {p.condition}
                                    </div>

                                    {/* Updated */}
                                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                                        <Clock size={18} />
                                        Created {p.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
