"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import MainLayout from "../../../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonSecondary from "@/components/ui/ButtonSecondary";

type ProductForm = {
    title: string;
    price: string;
    minPrice: string;
    description: string;
    category: string;
    condition: string;
    location: string;
    marketplace: string;
    image: string;
};

interface EditProductPageProps {
    params: Promise<{
        productId: string;
    }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const router = useRouter();
    const [productId, setProductId] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<ProductForm>({
        title: "",
        price: "",
        minPrice: "",
        description: "",
        category: "",
        condition: "",
        location: "",
        marketplace: "",
        image: ""
    });

    useEffect(() => {
        // Get params and initialize
        const initParams = async () => {
            const { productId: paramProductId } = await params;
            setProductId(paramProductId);
        };
        
        initParams();
    }, [params]);

    useEffect(() => {
        if (!productId) return;
        
        // Simulate loading existing product data
        const loadProduct = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Mock data - in real app, fetch from API
            setFormData({
                title: "Marshall Major IV Bluetooth Headphones",
                price: "1850000",
                minPrice: "1600000",
                description: "Premium wireless headphones with exceptional sound quality. Perfect for music lovers and professionals. Includes original packaging and charging cable.",
                category: "Electronics",
                condition: "Like New",
                location: "Jakarta, Indonesia",
                marketplace: "Facebook Marketplace",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Marshall_Major_IV.jpg"
            });
            setLoading(false);
        };

        loadProduct();
    }, [productId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSaving(false);
        router.push(`/products/${productId}`);
    };

    const handleCancel = () => {
        router.back();
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

    return (
        <ProtectedRoute>
            <MainLayout>
                <div className="max-w-4xl mx-auto p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Image */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Product Image</h3>
                            <div className="flex items-center gap-6">
                                {formData.image && (
                                    <div className="relative">
                                        <img
                                            src={formData.image}
                                            alt="Product"
                                            className="w-32 h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter product title"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price (Rp) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Price (Rp) *
                                    </label>
                                    <input
                                        type="number"
                                        name="minPrice"
                                        value={formData.minPrice}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Home & Garden">Home & Garden</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Books">Books</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Condition *
                                    </label>
                                    <select
                                        name="condition"
                                        value={formData.condition}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Condition</option>
                                        <option value="New">New</option>
                                        <option value="Like New">Like New</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Poor">Poor</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="City, Country"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Marketplace
                                    </label>
                                    <select
                                        name="marketplace"
                                        value={formData.marketplace}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Marketplace</option>
                                        <option value="Facebook Marketplace">Facebook Marketplace</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="WhatsApp">WhatsApp</option>
                                        <option value="Tokopedia">Tokopedia</option>
                                        <option value="Shopee">Shopee</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border">
                            <h3 className="text-lg font-semibold mb-4">Description</h3>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Describe your product in detail..."
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end">
                            <ButtonSecondary 
                                type="button" 
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </ButtonSecondary>
                            <ButtonPrimary 
                                type="submit" 
                                disabled={saving}
                                className="min-w-32"
                            >
                                {saving ? (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Saving...
                                    </div>
                                ) : (
                                    'Save Changes'
                                )}
                            </ButtonPrimary>
                        </div>
                    </form>
                </div>
            </MainLayout>
        </ProtectedRoute>
    );
}
