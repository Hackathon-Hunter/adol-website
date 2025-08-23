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
    Settings
} from "lucide-react";
import MainLayout from "../../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import { products, type Product } from "@/data/products";

interface ProductDetailPageProps {
    params: Promise<{
        productId: string;
    }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
    const router = useRouter();
    const [productId, setProductId] = useState<number | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        // Get params and initialize
        const initParams = async () => {
            const { productId: paramProductId } = await params;
            const id = parseInt(paramProductId);
            setProductId(id);
        };

        initParams();
    }, [params]);

    useEffect(() => {
        if (productId === null) return;

        // Simulate API call
        const fetchProduct = async () => {
            setLoading(true);
            // Mock delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const foundProduct = products.find(p => p.id === productId);
            setProduct(foundProduct || null);
            setLoading(false);
        };

        fetchProduct();
    }, [productId]);

    const handleEdit = () => {
        // Navigate to edit page
        router.push(`/products/${productId}/edit`);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            // Handle delete logic
            router.push('/products');
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product?.title,
                text: product?.description,
                url: window.location.href,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <MainLayout>
                    <div className="flex items-center justify-center min-h-96">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </MainLayout>
            </ProtectedRoute>
        );
    }

    if (!product) {
        return (
            <ProtectedRoute>
                <MainLayout>
                    <div className="text-center py-12">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                        <ButtonPrimary onClick={() => router.push('/products')}>
                            Back to Products
                        </ButtonPrimary>
                    </div>
                </MainLayout>
            </ProtectedRoute>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Live': return 'bg-green-100 text-green-800';
            case 'Draft': return 'bg-yellow-100 text-yellow-800';
            case 'Sold': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <ProtectedRoute>
            <MainLayout>
                <div className="max-w-6xl mx-auto p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Products</span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowOptions(!showOptions)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <MoreHorizontal size={20} />
                            </button>

                            {showOptions && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                                    <button
                                        onClick={handleEdit}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Edit size={16} />
                                        Edit Product
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Share2 size={16} />
                                        Share
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-96 object-cover"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Status Badge */}
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>
                                    {product.status}
                                </span>
                                {product.marketplace !== '-' && (
                                    <span className="flex items-center gap-1 text-sm text-gray-600">
                                        <Globe size={14} />
                                        {product.marketplace}
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900">
                                {product.title}
                            </h1>

                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <DollarSign size={20} className="text-green-600" />
                                    <span className="text-2xl font-bold text-green-600">
                                        {product.price}
                                    </span>
                                </div>
                                <p className="text-gray-600">
                                    Minimum price: <span className="font-semibold">{product.minPrice}</span>
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                                        <Eye size={16} />
                                    </div>
                                    <p className="font-semibold">{product.views}</p>
                                    <p className="text-sm text-gray-600">Views</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                                        <MessageCircle size={16} />
                                    </div>
                                    <p className="font-semibold">{product.messages}</p>
                                    <p className="text-sm text-gray-600">Messages</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                                        <Heart size={16} />
                                    </div>
                                    <p className="font-semibold">{product.likes}</p>
                                    <p className="text-sm text-gray-600">Likes</p>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Product Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Category</p>
                                        <p className="font-medium">{product.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Condition</p>
                                        <p className="font-medium">{product.condition}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-medium flex items-center gap-1">
                                            <MapPin size={14} />
                                            {product.location}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Updated</p>
                                        <p className="font-medium flex items-center gap-1">
                                            <Clock size={14} />
                                            {product.updated}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <ButtonPrimary onClick={handleEdit} className="flex-1">
                                    <Edit size={16} />
                                    Edit Product
                                </ButtonPrimary>
                                <ButtonSecondary onClick={handleShare}>
                                    <Share2 size={16} />
                                </ButtonSecondary>
                                <ButtonSecondary onClick={() => setShowOptions(!showOptions)}>
                                    <Settings size={16} />
                                </ButtonSecondary>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
                        <h3 className="text-lg font-semibold mb-4">Description</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Seller Info */}
                    <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
                        <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{product.seller}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <Star size={16} className="text-yellow-500 fill-current" />
                                    <span className="font-medium">{product.rating}</span>
                                    <span className="text-gray-600 text-sm">(125 reviews)</span>
                                </div>
                            </div>
                            <ButtonSecondary>
                                <MessageCircle size={16} />
                                Contact Seller
                            </ButtonSecondary>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </ProtectedRoute>
    );
}
