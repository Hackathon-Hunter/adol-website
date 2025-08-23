"use client";

import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/ui/ChatInput";
import {
  getCurrentProductListing,
  type ProductListing,
} from "@/service/api/openaiService";

export interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text?: string;
  image?: string;
  productListing?: ProductListing;
  quickReplies?: string[];
  editingListing?: ProductListing;
}

interface UIChatProps {
  messages: ChatMessage[];
  isAnalyzing: boolean;
  onSendMessage?: (message: string) => void;
  onCreateProduct?: (listing: ProductListing) => void;
}

export default function UIChat({
  messages,
  isAnalyzing,
  onSendMessage,
  onCreateProduct,
}: UIChatProps) {
  const [inputText, setInputText] = useState("");
  const [currentProduct, setCurrentProduct] = useState<ProductListing | null>(
    null
  );
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Monitor for product updates from the OpenAI service
  useEffect(() => {
    const checkForProductUpdates = () => {
      const latestProduct = getCurrentProductListing();
      if (
        latestProduct &&
        JSON.stringify(latestProduct) !== JSON.stringify(currentProduct)
      ) {
        setCurrentProduct(latestProduct);
      }
    };

    // Check for updates periodically
    const interval = setInterval(checkForProductUpdates, 500);
    return () => clearInterval(interval);
  }, [currentProduct]);

  const handleSendTextMessage = () => {
    if (!inputText.trim() || !onSendMessage) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendTextMessage();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSellingPoints = (sellingPoints: string) => {
    // Handle both string and array formats
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

  const ProductListingCard = ({
    listing,
    isUpdated = false,
  }: {
    listing: ProductListing;
    isUpdated?: boolean;
  }) => (
    <div
      className={`bg-white border rounded-xl p-4 shadow-sm max-w-md transition-all duration-500 ${
        isUpdated
          ? "border-green-300 shadow-lg ring-2 ring-green-100"
          : "border-gray-200"
      }`}
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
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onCreateProduct?.(listing)}
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-sm"
        >
          Buat Listing
        </button>
        <button
          onClick={() => {
            if (onSendMessage) {
              onSendMessage("Saya ingin mengedit detail produk ini");
            }
          }}
          className="flex-1 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          Edit Detail
        </button>
      </div>
    </div>
  );

  // Function to determine if a product listing has been updated
  const isProductUpdated = (listing: ProductListing) => {
    return (
      currentProduct &&
      JSON.stringify(listing) === JSON.stringify(currentProduct) &&
      messages.some(
        (msg) =>
          msg.productListing &&
          JSON.stringify(msg.productListing) !== JSON.stringify(currentProduct)
      )
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-screen flex flex-col">
      {/* Editing Mode Header */}
      {(messages.some((msg) => msg.editingListing || msg.quickReplies) ||
        currentProduct) && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200 p-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">✨</span>
            <span className="text-sm font-medium text-purple-700">
              {currentProduct
                ? "Mode Edit Aktif - AI siap membantu menyempurnakan produk Anda"
                : "Mode Edit Listing - AI membantu menyempurnakan produk Anda"}
            </span>
            <span className="text-lg">📝</span>
          </div>
          {currentProduct && (
            <div className="text-xs text-purple-600 mt-1">
              Produk: {currentProduct.item_name}
            </div>
          )}
        </div>
      )}

      {/* Chat body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 pb-20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              {/* Text Message */}
              {msg.text && (
                <div
                  className={`inline-block px-4 py-2 rounded-2xl text-sm max-w-full ${
                    msg.sender === "user"
                      ? "bg-sky-200 text-black"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {msg.text}
                  </div>
                </div>
              )}

              {/* Quick Replies */}
              {msg.quickReplies && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {msg.quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => onSendMessage?.(reply)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-purple-700 rounded-full text-sm font-medium hover:from-purple-100 hover:to-blue-100 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Image Preview */}
              {msg.image && (
                <div className="mt-2">
                  <img
                    src={msg.image}
                    alt="preview"
                    className="w-32 h-32 rounded-xl object-cover shadow-md border border-gray-200"
                  />
                </div>
              )}

              {/* Product Listing Card */}
              {msg.productListing && (
                <div className="mt-2">
                  <ProductListingCard
                    listing={msg.productListing}
                    isUpdated={isProductUpdated(msg.productListing) || false}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isAnalyzing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  Analyzing image...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Auto-scroll target */}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input - Always visible during chat conversations */}
      {onSendMessage && (
        <div className="fixed bottom-4 left-4 right-4 mx-auto max-w-2xl w-full">
          {/* Quick reply hint */}
          {messages.some((msg) => msg.quickReplies) && (
            <div className="text-center mb-2">
              <span className="text-xs text-purple-600 bg-white px-3 py-1 rounded-full shadow-sm border border-purple-100">
                💡 Pilih quick reply atau ketik pesan custom
              </span>
            </div>
          )}

          <div className="flex gap-2 bg-white rounded-full shadow-lg border-2 border-purple-100 px-4 py-2 focus-within:border-purple-300 transition-colors mb-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                currentProduct
                  ? `Edit ${currentProduct.item_name}...`
                  : "Ketik pesan untuk melanjutkan percakapan..."
              }
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
            />
            <button
              onClick={handleSendTextMessage}
              disabled={!inputText.trim()}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white disabled:from-gray-300 disabled:to-gray-400 flex items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
