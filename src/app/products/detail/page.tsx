"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Package,
} from "lucide-react";
import MainLayout from "../../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import {
  getAdolService,
  type Product as BackendProduct,
} from "@/service/api/adolService";
import { formatRupiah } from "@/utils/currency";

export default function ProductDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (!productId) {
      router.push("/products");
      return;
    }

    const loadProduct = async () => {
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
  }, [productId, router]);

  const handleEdit = () => {
    router.push(`/products/edit?id=${productId}`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      router.push("/products");
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
      alert("Link copied to clipboard!");
    }
  };

  const getStatusColor = (status: any) => {
    if (!status) return "bg-gray-100 text-gray-700";

    // Handle array format [{ active: null }] or [{ sold: null }]
    if (Array.isArray(status) && status.length > 0) {
      const statusVariant = status[0];
      if (statusVariant && typeof statusVariant === "object") {
        if ("active" in statusVariant) return "bg-green-100 text-green-700";
        if ("sold" in statusVariant) return "bg-red-100 text-red-700";
        if ("draft" in statusVariant) return "bg-gray-100 text-gray-700";
      }
    }

    // Handle direct variant object format { active: null }
    if (typeof status === "object") {
      if ("active" in status) return "bg-green-100 text-green-700";
      if ("sold" in status) return "bg-red-100 text-red-700";
      if ("draft" in status) return "bg-gray-100 text-gray-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  const getStatusText = (status: any) => {
    if (!status) return "Draft";

    // Handle array format [{ active: null }] or [{ sold: null }]
    if (Array.isArray(status) && status.length > 0) {
      const statusVariant = status[0];
      if (statusVariant && typeof statusVariant === "object") {
        if ("active" in statusVariant) return "Active";
        if ("sold" in statusVariant) return "Sold";
        if ("draft" in statusVariant) return "Draft";
      }
    }

    // Handle direct variant object format { active: null }
    if (typeof status === "object") {
      if ("active" in status) return "Active";
      if ("sold" in status) return "Sold";
      if ("draft" in status) return "Draft";
    }

    return "Draft";
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleDateString();
  };

  if (!productId) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto text-black">
              <div className="text-center py-8">
                <p className="text-gray-600">
                  Product ID is required to view details.
                </p>
                <button
                  onClick={() => router.push("/products")}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Go back to products
                </button>
              </div>
            </div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="h-96 bg-gray-300 rounded-xl"></div>
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
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
          <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => router.push("/products")}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  Go back to products
                </button>
              </div>
            </div>
          </div>
        </MainLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 text-black">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Created {formatDate(product.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    product.status
                  )}`}
                >
                  {getStatusText(product.status)}
                </span>
                <div className="relative">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  {showOptions && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Product
                      </button>
                      <button
                        onClick={handleShare}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 text-red-600 last:rounded-b-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {product.imageBase64 && product.imageBase64.length > 0 ? (
                    <img
                      src={product.imageBase64[0]}
                      alt={product.name}
                      className="w-full h-96 object-cover"
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Price */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {formatRupiah(Number(product.price))}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>0 views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>0 messages</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>0 likes</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ButtonPrimary onClick={handleEdit}>
                      <Edit className="w-4 h-4" />
                      Edit
                    </ButtonPrimary>
                    <ButtonSecondary onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                      Share
                    </ButtonSecondary>
                  </div>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Product Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="font-medium text-gray-600">
                        {product.condition}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium text-gray-600">
                        Category {product.categoryId.toString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description and Additional Info */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Description
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                {/* Key Selling Points */}
                {product.keySellingPoints &&
                  product.keySellingPoints.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-700">
                        Key Selling Points
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="space-y-1 text-gray-700">
                          {product.keySellingPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                {/* Known Flaws */}
                {product.knownFlaws && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Known Issues
                    </h3>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-red-700">{product.knownFlaws}</p>
                    </div>
                  </div>
                )}

                {/* Reason for Selling */}
                {product.reasonForSelling && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                      Reason for Selling
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">
                        {product.reasonForSelling}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Location and Pricing Info */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pickup & Delivery */}
              {product.pickupDeliveryInfo && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">
                    <MapPin className="w-5 h-5 inline mr-2" />
                    Pickup & Delivery
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">
                      {product.pickupDeliveryInfo}
                    </p>
                  </div>
                </div>
              )}

              {/* Price Information */}
              {product.targetPrice && product.targetPrice.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">
                    <DollarSign className="w-5 h-5 inline mr-2" />
                    Price Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Price:</span>
                      <span className="font-semibold text-gray-600">
                        {formatRupiah(Number(product.price))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Price:</span>
                      <span className="font-semibold text-gray-600">
                        {formatRupiah(Number(product.targetPrice[0]))}
                      </span>
                    </div>
                    {product.minimumPrice &&
                      product.minimumPrice.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Minimum Price:</span>
                          <span className="font-semibold text-gray-600">
                            {formatRupiah(Number(product.minimumPrice[0]))}
                          </span>
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
