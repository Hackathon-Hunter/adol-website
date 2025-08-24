"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Edit,
    Trash2,
    Share2,
    MoreHorizontal,
    Clock,
    MapPin,
    DollarSign,
    Eye,
    MessageCircle,
    Heart,
    Star,
    Globe,
    Settings,
    Package
} from "lucide-react";
import MainLayout from "../../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import { getAdolService, type Product as BackendProduct } from "@/service/api/adolService";

interface ProductDetailPageProps {
    params: Promise<{
        productId: string;
    }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const router = useRouter();
    const [productId, setProductId] = useState<string | null>(null);
    const [product, setProduct] = useState<BackendProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        // Get params and initialize
        const initParams = async () => {
            const { productId: paramProductId } = await params;
            setProductId(paramProductId);
        };

        initParams();
    }, [params]);

    // Load product when productId changes
    useEffect(() => {
        const loadProduct = async () => {
            if (!productId) return;

            try {
                setLoading(true);
                setError(null);
                const adolService = await getAdolService();
                const foundProduct = await adolService.getProduct(productId);

                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                console.error("Failed to load product:", err);
                setError("Failed to load product. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    const handleEdit = () => {
        router.push(`/products/${productId}/edit`);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.push('/products');
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product?.name,
                text: product?.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const getStatusColor = (status: any) => {
        if (!status) return "bg-gray-100 text-gray-700";
        
        // Handle array format [{ active: null }] or [{ sold: null }]
        if (Array.isArray(status) && status.length > 0) {
            const statusVariant = status[0];
            if (statusVariant && typeof statusVariant === 'object') {
                if ('active' in statusVariant) return "bg-green-100 text-green-700";
                if ('sold' in statusVariant) return "bg-red-100 text-red-700";
                if ('draft' in statusVariant) return "bg-gray-100 text-gray-700";
            }
        }
        
        // Handle direct variant object format { active: null }
        if (typeof status === 'object') {
            if ('active' in status) return "bg-green-100 text-green-700";
            if ('sold' in status) return "bg-red-100 text-red-700";
            if ('draft' in status) return "bg-gray-100 text-gray-700";
        }
        
        return "bg-gray-100 text-gray-700";
    };

    const getStatusText = (status: any) => {
        if (!status) return "Draft";
        
        // Handle array format [{ active: null }] or [{ sold: null }]
        if (Array.isArray(status) && status.length > 0) {
            const statusVariant = status[0];
            if (statusVariant && typeof statusVariant === 'object') {
                if ('active' in statusVariant) return "Active";
                if ('sold' in statusVariant) return "Sold";
                if ('draft' in statusVariant) return "Draft";
            }
        }
        
        // Handle direct variant object format { active: null }
        if (typeof status === 'object') {
            if ('active' in status) return "Active";
            if ('sold' in status) return "Sold";
            if ('draft' in status) return "Draft";
        }
        
        return "Draft";
    };

    const formatDate = (timestamp: bigint) => {
        return new Date(Number(timestamp) / 1000000).toLocaleDateString();
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <MainLayout>
                    <div className="p-6">
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-gray-600">Loading product...</span>
                        </div>
                    </div>
                </MainLayout>
            </ProtectedRoute>
        );
    }

    if (error || !product) {
        return (
            <ProtectedRoute>
                <MainLayout>
                    <div className="p-6">
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {error || "Product not found"}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                The product you're looking for doesn't exist or has been removed.
                            </p>
                            <ButtonPrimary onClick={() => router.push('/products')}>
                                Back to Products
                            </ButtonPrimary>
                        </div>
                    </div>
                </MainLayout>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <MainLayout>
                <div className="p-6 max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleShare}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <div className="relative">
                                <button
                                    onClick={() => setShowOptions(!showOptions)}
                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                                >
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                                {showOptions && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                        <button
                                            onClick={handleEdit}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit Product
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete Product
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column - Product Image */}
                        <div className="space-y-4">
                            <div className="relative">
                                <img
                                    src={
                                        (product.imageBase64 && Array.isArray(product.imageBase64) && product.imageBase64.length > 0) 
                                            ? product.imageBase64[0] 
                                            : "/assets/images/background.png"
                                    }
                                    alt={product.name}
                                    className="w-full h-96 object-cover rounded-lg"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/assets/images/background.png";
                                    }}
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                                        {getStatusText(product.status)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Product Details */}
                        <div className="space-y-6">
                            {/* Title and Price */}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-blue-600">
                                            ${Number(product.price)}
                                        </p>
                                        {product.minimumPrice && (
                                            <p className="text-sm text-gray-500">
                                                Minimum price: <span className="font-semibold">${Number(product.minimumPrice)}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 py-4 border-y">
                                <div className="text-center">
                                    <Eye className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                    <p className="font-semibold">-</p>
                                    <p className="text-xs text-gray-500">Views</p>
                                </div>
                                <div className="text-center">
                                    <MessageCircle className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                    <p className="font-semibold">-</p>
                                    <p className="text-xs text-gray-500">Messages</p>
                                </div>
                                <div className="text-center">
                                    <Heart className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                    <p className="font-semibold">-</p>
                                    <p className="text-xs text-gray-500">Likes</p>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <p className="font-medium">{product.categoryId}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Stock:</span>
                                    <p className="font-medium">{Number(product.stock)}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Condition:</span>
                                    <p className="font-medium">{product.condition}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Created:</span>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        {formatDate(product.createdAt)}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <ButtonPrimary onClick={handleEdit} className="flex-1">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Product
                                </ButtonPrimary>
                                <ButtonSecondary onClick={handleShare} className="flex-1">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </ButtonSecondary>
                            </div>
                        </div>
                    </div>

                    {/* Description and Details */}
                    <div className="mt-8 grid lg:grid-cols-2 gap-8">
                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Description</h2>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {product.description}
                                </p>
                            </div>

                            {/* Key Selling Points */}
                            {product.keySellingPoints && product.keySellingPoints.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-3">Key Selling Points</h3>
                                    <ul className="space-y-2">
                                        {product.keySellingPoints.map((point, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                                                <span className="text-gray-700">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Known Flaws */}
                            {product.knownFlaws && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-3">Known Issues</h3>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <p className="text-gray-700">{product.knownFlaws}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Additional Details */}
                        <div className="space-y-6">
                            {/* Reason for Selling */}
                            {product.reasonForSelling && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Reason for Selling</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700">{product.reasonForSelling}</p>
                                    </div>
                                </div>
                            )}

                            {/* Pickup/Delivery Info */}
                            {product.pickupDeliveryInfo && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Pickup & Delivery</h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700">{product.pickupDeliveryInfo}</p>
                                    </div>
                                </div>
                            )}

                            {/* Price Information */}
                            {product.targetPrice && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Price Information</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Current Price:</span>
                                            <span className="font-semibold">${Number(product.price)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Target Price:</span>
                                            <span className="font-semibold">${Number(product.targetPrice)}</span>
                                        </div>
                                        {product.minimumPrice && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Minimum Price:</span>
                                                <span className="font-semibold">${Number(product.minimumPrice)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MainLayout>
        </ProtectedRoute>
    );
}
