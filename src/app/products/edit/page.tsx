"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import MainLayout from "../../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";
import { getAdolService, type ProductUpdate, type ProductStatus } from "@/service/api/adolService";
import { formatRupiah } from "@/utils/currency";

type ProductForm = {
  title: string;
  price: string;
  minPrice: string;
  targetPrice: string;
  stock: string;
  description: string;
  category: string;
  condition: string;
  location: string;
  keySellingPoints: string;
  knownFlaws: string;
  reasonForSelling: string;
  imageUrl: string;
  status: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProductForm>({
    title: "",
    price: "",
    minPrice: "",
    targetPrice: "",
    stock: "",
    description: "",
    category: "",
    condition: "",
    location: "",
    keySellingPoints: "",
    knownFlaws: "",
    reasonForSelling: "",
    imageUrl: "",
    status: "active",
  });

  useEffect(() => {
    if (!productId) {
      router.push("/products");
      return;
    }

    // Load actual product data from backend
    const loadProduct = async () => {
      setLoading(true);
      try {
        const adolService = await getAdolService();
        const product = await adolService.getProduct(productId);

        if (product) {
          // Helper function to get status string from backend status variant
          const getStatusString = (status: any): string => {
            if (Array.isArray(status) && status.length > 0) {
              const statusVariant = status[0];
              if (statusVariant && typeof statusVariant === "object") {
                if ("active" in statusVariant) return "active";
                if ("sold" in statusVariant) return "sold";
                if ("draft" in statusVariant) return "draft";
              }
            }
            if (typeof status === "object" && status) {
              if ("active" in status) return "active";
              if ("sold" in status) return "sold"; 
              if ("draft" in status) return "draft";
            }
            return "draft"; // Default fallback
          };

          setFormData({
            title: product.name,
            price: product.price.toString(),
            minPrice: product.minimumPrice && product.minimumPrice.length > 0
              ? product.minimumPrice[0]?.toString() || product.price.toString()
              : product.price.toString(),
            targetPrice: product.targetPrice && product.targetPrice.length > 0
              ? product.targetPrice[0]?.toString() || ""
              : "",
            stock: product.stock?.toString() || "1",
            description: product.description,
            category: product.categoryId.toString(),
            condition: product.condition,
            location: product.pickupDeliveryInfo || "",
            keySellingPoints: Array.isArray(product.keySellingPoints) 
              ? product.keySellingPoints.join(", ") 
              : "",
            knownFlaws: product.knownFlaws || "",
            reasonForSelling: product.reasonForSelling || "",
            imageUrl: product.imageBase64 && product.imageBase64.length > 0
              ? product.imageBase64[0] || ""
              : "",
            status: getStatusString(product.status),
          });
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          imageUrl: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!productId) return;

    setSaving(true);
    try {
      const adolService = await getAdolService();

      // Helper function to create ProductStatus variant
      const createProductStatus = (status: string): ProductStatus => {
        switch (status) {
          case "active": return { active: null };
          case "sold": return { sold: null };
          case "draft": return { draft: null };
          default: return { draft: null };
        }
      };

      // Prepare update data with proper Candid optional format
      const updateData: ProductUpdate = {
        name: formData.title ? [formData.title] : [],
        description: formData.description ? [formData.description] : [],
        price: formData.price ? [BigInt(formData.price)] : [],
        stock: formData.stock ? [BigInt(formData.stock)] : [],
        imageBase64: formData.imageUrl ? [formData.imageUrl] : [],
        categoryId: formData.category ? [BigInt(formData.category)] : [],
        condition: formData.condition ? [formData.condition] : [],
        keySellingPoints: formData.keySellingPoints 
          ? [formData.keySellingPoints.split(",").map(point => point.trim()).filter(Boolean)]
          : [],
        knownFlaws: formData.knownFlaws ? [formData.knownFlaws] : [],
        minimumPrice: formData.minPrice ? [BigInt(formData.minPrice)] : [],
        pickupDeliveryInfo: formData.location ? [formData.location] : [],
        reasonForSelling: formData.reasonForSelling ? [formData.reasonForSelling] : [],
        targetPrice: formData.targetPrice ? [BigInt(formData.targetPrice)] : [],
        status: formData.status ? [createProductStatus(formData.status)] : [],
      };

      console.log("Updating product with data:", updateData);

      // Update product with new data
      const result = await adolService.updateProduct(productId, updateData);

      if (result) {
        // Navigate back to product detail with query params
        router.push(`/products/detail?id=${productId}`);
      } else {
        alert("Failed to save product. Please check your input and try again.");
      }
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/products/detail?id=${productId}`);
  };

  if (!productId) {
    return (
      <ProtectedRoute>
        <MainLayout>
          <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto text-black">
              <div className="text-center py-8">
                <p className="text-gray-600">Product ID is required to edit.</p>
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
            <div className="max-w-2xl mx-auto text-black">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-32 bg-gray-300 rounded"></div>
                </div>
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
          <div className="max-w-2xl mx-auto text-black">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Edit Product
                </h1>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.imageUrl && (
                      <div className="relative">
                        <img
                          src={formData.imageUrl}
                          alt="Product"
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, imageUrl: "" }))
                          }
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product title"
                  />
                </div>

                {/* Price, Target Price, and Min Price */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (Rp)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Price (Rp)
                    </label>
                    <input
                      type="number"
                      name="targetPrice"
                      value={formData.targetPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Price (Rp)
                    </label>
                    <input
                      type="number"
                      name="minPrice"
                      value={formData.minPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1"
                    min="1"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your product..."
                  />
                </div>

                {/* Category and Condition */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="1">Electronics</option>
                      <option value="2">Fashion</option>
                      <option value="3">Home & Living</option>
                      <option value="4">Sports</option>
                      <option value="5">Books</option>
                      <option value="6">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Condition</option>
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup/Delivery Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter location details"
                  />
                </div>

                {/* Key Selling Points */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Selling Points
                  </label>
                  <textarea
                    name="keySellingPoints"
                    value={formData.keySellingPoints}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Highlight the best features, separate multiple points with commas"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Example: Original packaging, Works perfectly, Recently serviced
                  </p>
                </div>

                {/* Known Flaws */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Known Issues/Flaws
                  </label>
                  <textarea
                    name="knownFlaws"
                    value={formData.knownFlaws}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Be honest about any issues or damage (optional)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Transparency helps build trust with buyers
                  </p>
                </div>

                {/* Reason for Selling */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Selling
                  </label>
                  <textarea
                    name="reasonForSelling"
                    value={formData.reasonForSelling}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Why are you selling this item? (optional)"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Example: Upgrading to newer model, Moving abroad, No longer needed
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active - Live and available for purchase</option>
                    <option value="draft">Draft - Not yet published</option>
                    <option value="sold">Sold - Product has been sold</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Active products are visible to buyers, drafts are saved but not published
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <ButtonSecondary onClick={handleCancel}>Cancel</ButtonSecondary>
                <ButtonPrimary onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
