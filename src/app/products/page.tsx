"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, Clock, MoreHorizontal, Store, RefreshCcw } from "lucide-react";
import MainLayout from "../layout/MainLayout";
import { getAdolService, type Product as BackendProduct } from "@/service/api/adolService";
import { useAuth } from "@/hooks/useAuth";
import { formatRupiah } from "@/utils/currency";

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

function ProductsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { principal, isAuthenticated } = useAuth();
    const [filter, setFilter] = useState<"All" | "Live" | "Drafts" | "Sold">("All");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Convert backend product to display format
    const convertBackendProduct = (backendProduct: BackendProduct): Product => {
        // Debug: Log the actual product structure
        console.log("Converting backend product:", backendProduct);
        console.log("Product status field:", backendProduct.status, "Type:", typeof backendProduct.status);
        
        // Handle imageBase64 array format from backend
        const imageUrl = (backendProduct.imageBase64 && backendProduct.imageBase64.length > 0) 
            ? backendProduct.imageBase64[0] 
            : "/assets/images/background.png";
            
        // Convert backend status variant to display status
        const getDisplayStatus = (status: any): "Live" | "Drafts" | "Sold" => {
            // Handle case where status is undefined or null
            if (!status) return "Drafts";
            
            // Handle array format: [] | [variant]
            if (Array.isArray(status)) {
                if (status.length === 0) return "Drafts";
                
                const statusVariant = status[0];
                if (!statusVariant || typeof statusVariant !== 'object') return "Drafts";
                
                if ('active' in statusVariant) return "Live";
                if ('sold' in statusVariant) return "Sold";
                if ('draft' in statusVariant) return "Drafts";
                return "Drafts";
            }
            
            // Handle direct variant object format
            if (typeof status === 'object') {
                if ('active' in status) return "Live";
                if ('sold' in status) return "Sold";
                if ('draft' in status) return "Drafts";
            }
            
            // Handle string format (fallback)
            if (typeof status === 'string') {
                switch (status.toLowerCase()) {
                    case "active": return "Live";
                    case "sold": return "Sold";
                    case "draft": return "Drafts";
                    default: return "Drafts";
                }
            }
            
            return "Drafts";
        };
            
        return {
            id: backendProduct.id,
            name: backendProduct.name,
            description: backendProduct.description,
            price: Number(backendProduct.price),
            image: imageUrl || "/assets/images/background.png", // Ensure it's never undefined
            status: getDisplayStatus(backendProduct.status),
            views: 0, // Backend doesn't have views yet
            likes: 0, // Backend doesn't have likes yet
            date: new Date(Number(backendProduct.createdAt) / 1000000).toLocaleDateString(),
            stock: Number(backendProduct.stock),
            condition: backendProduct.condition,
        };
    };

    // Reset filter to "All" when user logs out
    useEffect(() => {
        if (!isAuthenticated && filter !== "All") {
            setFilter("All");
        }
    }, [isAuthenticated, filter]);

    // Load products from backend based on the selected filter
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const adolService = await getAdolService();
                
                let fetchedProducts: BackendProduct[] = [];
                
                if (isAuthenticated && principal) {
                    // For authenticated users, use specific methods based on filter
                    switch (filter) {
                        case "All":
                            fetchedProducts = await adolService.getMyProducts();
                            break;
                        case "Live":
                            // Get all user products and filter for active ones
                            const allUserProducts = await adolService.getMyProducts();
                            fetchedProducts = allUserProducts.filter(product => {
                                const status = product.status;
                                if (Array.isArray(status) && status.length > 0) {
                                    const statusVariant = status[0];
                                    return statusVariant && typeof statusVariant === 'object' && 'active' in statusVariant;
                                }
                                if (typeof status === 'object' && status && 'active' in status) {
                                    return true;
                                }
                                return false;
                            });
                            break;
                        case "Drafts":
                            fetchedProducts = await adolService.getDraftProducts();
                            break;
                        case "Sold":
                            fetchedProducts = await adolService.getSoldProducts();
                            break;
                        default:
                            fetchedProducts = await adolService.getMyProducts();
                    }
                    console.log(`${filter} products:`, fetchedProducts);
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
    }, [isAuthenticated, principal, filter]);

    // Handle refresh parameter from URL
    useEffect(() => {
        const refresh = searchParams.get('refresh');
        if (refresh === 'true') {
            // Clear the refresh parameter and refresh the products
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('refresh');
            window.history.replaceState({}, '', newUrl.toString());
            
            // Force refresh products using current filter
            const forceRefresh = async () => {
                try {
                    setLoading(true);
                    const adolService = await getAdolService();
                    
                    let fetchedProducts: BackendProduct[] = [];
                    
                    if (isAuthenticated && principal) {
                        // Use filter-specific methods for authenticated users
                        switch (filter) {
                            case "All":
                                fetchedProducts = await adolService.getMyProducts();
                                break;
                            case "Live":
                                const allUserProducts = await adolService.getMyProducts();
                                fetchedProducts = allUserProducts.filter(product => {
                                    const status = product.status;
                                    if (Array.isArray(status) && status.length > 0) {
                                        const statusVariant = status[0];
                                        return statusVariant && typeof statusVariant === 'object' && 'active' in statusVariant;
                                    }
                                    if (typeof status === 'object' && status && 'active' in status) {
                                        return true;
                                    }
                                    return false;
                                });
                                break;
                            case "Drafts":
                                fetchedProducts = await adolService.getDraftProducts();
                                break;
                            case "Sold":
                                fetchedProducts = await adolService.getSoldProducts();
                                break;
                            default:
                                fetchedProducts = await adolService.getMyProducts();
                        }
                    } else {
                        fetchedProducts = await adolService.getProducts();
                    }
                    
                    const convertedProducts = fetchedProducts.map(convertBackendProduct);
                    setProducts(convertedProducts);
                } catch (err) {
                    console.error("Failed to refresh products:", err);
                } finally {
                    setLoading(false);
                }
            };
            
            forceRefresh();
        }
    }, [searchParams, isAuthenticated, principal, filter]);

    const refreshProducts = async () => {
        try {
            setLoading(true);
            const adolService = await getAdolService();
            
            let fetchedProducts: BackendProduct[] = [];
            
            if (isAuthenticated && principal) {
                // Use filter-specific methods for authenticated users
                switch (filter) {
                    case "All":
                        fetchedProducts = await adolService.getMyProducts();
                        break;
                    case "Live":
                        const allUserProducts = await adolService.getMyProducts();
                        fetchedProducts = allUserProducts.filter(product => {
                            const status = product.status;
                            if (Array.isArray(status) && status.length > 0) {
                                const statusVariant = status[0];
                                return statusVariant && typeof statusVariant === 'object' && 'active' in statusVariant;
                            }
                            if (typeof status === 'object' && status && 'active' in status) {
                                return true;
                            }
                            return false;
                        });
                        break;
                    case "Drafts":
                        fetchedProducts = await adolService.getDraftProducts();
                        break;
                    case "Sold":
                        fetchedProducts = await adolService.getSoldProducts();
                        break;
                    default:
                        fetchedProducts = await adolService.getMyProducts();
                }
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

    // No need for frontend filtering since we're getting filtered data from backend
    const filtered = products;

    const handleProductClick = (productId: string) => {
        router.push(`/products/detail?id=${productId}`);
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

                {/* Tabs - Show all tabs only for authenticated users */}
                <div className="flex gap-3 mb-6">
                    {(isAuthenticated ? ["All", "Live", "Drafts", "Sold"] : ["All"]).map((tab) => (
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
                            {isAuthenticated 
                                ? (filter === "All" ? "You haven't created any products yet." : `No ${filter.toLowerCase()} products found.`)
                                : "No products available at the moment."
                            }
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
                                    <p className="text-blue-600 font-semibold text-sm">{formatRupiah(p.price)}</p>
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

// Loading component for Suspense fallback
function ProductsLoading() {
    return (
        <MainLayout>
            <div className="p-6">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Loading products...</span>
                </div>
            </div>
        </MainLayout>
    );
}

// Main page component with Suspense boundary
export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductsLoading />}>
            <ProductsContent />
        </Suspense>
    );
}
