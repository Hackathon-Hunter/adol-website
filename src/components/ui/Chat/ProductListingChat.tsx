"use client";

import { ProductListing } from "@/service/api/openaiService";
import { Loader2 } from "lucide-react";

interface ProductListingCardProps {
  listing: ProductListing;
  isUpdated?: boolean;
  onCreateProduct?: (listing: ProductListing) => void;
  className?: string;
  isLoading?: boolean;
}

export default function ProductListingCard({
  listing,
  isUpdated = false,
  onCreateProduct,
  className = "",
  isLoading = false,
}: ProductListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSellingPoints = (sellingPoints: string) => {
    if (typeof sellingPoints === "string") {
      return sellingPoints
        .split("\n")
        .filter((point) => point.trim())
        .map((point, index) => (
          <li key={index} className="text-sm text-gray-600">
            {point.replace(/^[•\-\*]\s*/, "").trim()}
          </li>
        ));
    }
    return <li className="text-sm text-gray-600">{sellingPoints}</li>;
  };

  return (
    <div
      className={`bg-white border rounded-xl p-4 shadow-sm max-w-md transition-all duration-500 ${
        isUpdated
          ? "border-green-300 shadow-lg ring-2 ring-green-100"
          : "border-gray-200"
      } ${className}`}
    >
      {/* Update indicator */}
      {isUpdated && (
        <div className="mb-3 flex items-center justify-center">
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium animate-pulse">
            ✨ Produk telah diperbarui!
          </span>
        </div>
      )}

      <div className="mb-3">
        <h3 className="font-semibold text-lg text-gray-900 break-words">
          {listing.item_name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{listing.category}</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {listing.description}
        </p>
      </div>

      {/* Price Section */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <span className="text-gray-500 block text-xs">Listing Price</span>
            <span className="font-semibold text-green-600 text-xs">
              {formatPrice(listing.listing_price)}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">Target Price</span>
            <span className="font-medium text-xs">
              {formatPrice(listing.target_price)}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">Min Price</span>
            <span className="font-medium text-red-500 text-xs">
              {formatPrice(listing.minimum_price)}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2 text-sm">
        {/* Condition */}
        <div className="flex items-center">
          <span className="font-medium text-gray-700 text-xs">Kondisi:</span>
          <span
            className={`ml-2 px-2 py-1 rounded-full text-xs ${
              listing.condition === "Excellent"
                ? "bg-green-100 text-green-800"
                : listing.condition === "Good"
                ? "bg-blue-100 text-blue-800"
                : listing.condition === "Fair"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {listing.condition}
          </span>
        </div>

        {/* Selling Points */}
        <div>
          <span className="font-medium text-gray-700 text-xs block mb-1">
            Keunggulan:
          </span>
          <ul className="list-disc list-inside space-y-1">
            {formatSellingPoints(listing.selling_points)}
          </ul>
        </div>

        {/* Known Flaws */}
        {listing.known_flaws && listing.known_flaws !== "None reported" && (
          <div>
            <span className="font-medium text-gray-700 text-xs block mb-1">
              Kerusakan/Kekurangan:
            </span>
            <p className="text-gray-600 text-xs leading-relaxed">
              {listing.known_flaws}
            </p>
          </div>
        )}

        {/* Reason for Selling */}
        <div>
          <span className="font-medium text-gray-700 text-xs block mb-1">
            Alasan Dijual:
          </span>
          <p className="text-gray-600 text-xs leading-relaxed">
            {listing.reason_selling}
          </p>
        </div>

        {/* Delivery Info */}
        <div>
          <span className="font-medium text-gray-700 text-xs block mb-1">
            Info Pengiriman:
          </span>
          <p className="text-gray-600 text-xs leading-relaxed">
            {listing.delivery_info}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {onCreateProduct && (
        <div className="mt-4 flex gap-2">
          {onCreateProduct && (
            <button
              onClick={() => onCreateProduct(listing)}
              className="flex-1 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-sm"
              disabled={isLoading}
            >
              Buat Listing{" "}
              {isLoading && <Loader2 size={18} className="animate-spin ml-4" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
