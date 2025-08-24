"use client";

import { useState, useEffect, useRef } from "react";
import MainLayout from "../layout/MainLayout";
import ChatInput from "@/components/ui/Chat/ChatInput";
import Chat from "@/components/ui/Chat/Chat";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProductListingCard from "@/components/ui/Chat/ProductListingChat";
import {
  ProductListing,
  sendMessageWithImage,
  sendMessageText,
  fileToBase64,
} from "@/service/api/openaiService";
import { ChatIcon } from "@/components/icons";
import { getAdolService } from "@/service/api/adolService";

// Import the ProductInput interface
interface ProductInput {
  name: string;
  description: string;
  price: bigint;
  stock: bigint;
  imageBase64: [] | [string]; // Image data as base64 string
  categoryId: bigint; // Backend expects bigint, not string
  condition: string;
  keySellingPoints: string[];
  knownFlaws: string;
  minimumPrice: [] | [bigint]; // Candid optional format
  pickupDeliveryInfo: string;
  reasonForSelling: string;
  targetPrice: [] | [bigint]; // Candid optional format
}

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productListing, setProductListing] = useState<ProductListing | null>(
    null
  );
  const [isUpdated, setIsUpdated] = useState(false);
  const [messages, setMessages] = useState<
    {
      id: number;
      sender: "user" | "bot";
      text?: string;
      image?: string;
    }[]
  >([
    {
      id: 1,
      sender: "bot",
      text: "Hi! Upload a photo of your product and I'll create a listing for you.",
    },
  ]);

  const adolService = getAdolService();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isUpdated) {
      const timer = setTimeout(() => {
        setIsUpdated(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isUpdated]);

  const handleSubmit = async (text: string, imageFiles: File[]) => {
    if (!text && imageFiles.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const newMessageId = messages.length + 1;
      const newMessages = [...messages];

      if (text) {
        newMessages.push({
          id: newMessageId,
          sender: "user",
          text,
        });
      }

      setMessages(newMessages);

      if (imageFiles.length > 0) {
        const file = imageFiles[0];
        const base64Image = await fileToBase64(file);

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "user",
            image: base64Image,
          },
        ]);

        const aiResponse = await sendMessageWithImage(base64Image, text);

        if (aiResponse.productListing) {
          // Add image base64 to the product listing for later use
          aiResponse.productListing.imageBase64 = base64Image;

          setProductListing(aiResponse.productListing);
          setIsUpdated(true);
          setIsChatOpen(true);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "bot",
            text: aiResponse.message,
          },
        ]);
      } else if (text) {
        const aiResponse = await sendMessageText(text);

        if (aiResponse.productListing) {
          setProductListing(aiResponse.productListing);
          setIsUpdated(true);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "bot",
            text: aiResponse.message,
          },
        ]);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: `Error: ${
            error instanceof Error ? error.message : "An unknown error occurred"
          }`,
        },
      ]);
    } finally {
      setIsLoading(false);

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  };

  const createProduct = async (listing: ProductListing) => {
    setIsCreatingProduct(true);

    try {
      // Parse selling points into an array
      const keySellingPoints = listing.selling_points
        .split("\n")
        .map((point) => point.replace(/^[•\-\*]\s*/, "").trim())
        .filter((point) => point.length > 0);

      // Convert prices to bigint for backend
      const listingPrice = BigInt(listing.listing_price);
      const targetPrice = BigInt(listing.target_price);
      const minimumPrice = BigInt(listing.minimum_price);

      // Convert category to bigint ID
      const categoryId = BigInt(1); // Hardcoded default category ID

      // Prepare product input matching the backend interface
      const productInput: ProductInput = {
        name: listing.item_name,
        description: listing.description,
        price: listingPrice,
        stock: BigInt(1), // Default to 1 item in stock
        imageBase64: listing.imageBase64 ? [listing.imageBase64] : [],
        categoryId: categoryId,
        condition: mapConditionToBackend(listing.condition),
        keySellingPoints:
          keySellingPoints.length > 0
            ? keySellingPoints
            : ["Good quality product"],
        knownFlaws: listing.known_flaws || "None reported",
        minimumPrice: [minimumPrice],
        pickupDeliveryInfo:
          listing.delivery_info ||
          "Pickup and delivery available, contact seller for details.",
        reasonForSelling:
          listing.reason_selling || "Upgrading to a newer model",
        targetPrice: [targetPrice],
      };

      // Call the service to create the product
      const result = await (await adolService).createProduct(productInput);

      if (result) {
        // Success - add success message to chat
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "bot",
            text: `✅ Selamat! Produk "${
              listing.item_name
            }" telah berhasil dibuat dan dipasarkan dengan harga ${new Intl.NumberFormat(
              "id-ID",
              {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }
            ).format(
              listing.listing_price
            )}. Produk Anda sekarang sudah aktif dan siap untuk dijual.`,
          },
        ]);

        // Reset product listing after successful creation
        setProductListing(null);
      } else {
        // Error creating product - add error message to chat
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "bot",
            text: "❌ Maaf, terjadi kesalahan saat membuat produk. Silakan periksa detail produk Anda dan coba lagi. Pastikan semua informasi sudah lengkap dan valid.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error creating product:", error);

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: `❌ Terjadi kesalahan: ${
            error instanceof Error
              ? error.message
              : "Kesalahan tidak terduga saat membuat produk Anda. Silakan coba lagi nanti."
          }`,
        },
      ]);
    } finally {
      setIsCreatingProduct(false);

      // Scroll to bottom to show the latest message
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  };

  // Helper function to map UI condition to backend format
  const mapConditionToBackend = (condition: string): string => {
    switch (condition) {
      case "Excellent":
        return "LIKE_NEW";
      case "Good":
        return "GOOD";
      case "Fair":
        return "FAIR";
      case "Poor":
        return "POOR";
      default:
        return "GOOD";
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex flex-col h-full w-full max-w-5xl mx-auto">
          <div className="flex flex-1 gap-4 p-4 min-h-0">
            {/* Main Content Wrapper - with proper flex layout */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Chat Content - with proper scrolling */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto pb-4 min-h-0"
              >
                {!isChatOpen ? (
                  <div className="flex flex-col h-full justify-center items-center py-20">
                    {/* Welcome Header */}
                    <div className="flex flex-col justify-center items-center mb-6">
                      <ChatIcon className="text-purple-500 mb-4" />
                      <h1 className="text-center text-2xl font-semibold mb-2 text-black">
                        Hi, User
                        <br />
                        <span className="font-normal text-gray-600">
                          Upload a photo and let me create your product listing
                        </span>
                      </h1>
                    </div>
                  </div>
                ) : (
                  <Chat messages={messages} isLoading={isLoading} />
                )}
              </div>

              {/* Chat Input - not fixed, but at the bottom of the flexbox */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <ChatInput
                  onSubmit={(text, imageFiles) =>
                    handleSubmit(text, imageFiles)
                  }
                  isLoading={isLoading}
                />
                {error && (
                  <p className="text-red-500 text-xs mt-1 px-2">{error}</p>
                )}
              </div>
            </div>

            {/* Product Listing Card Section */}
            {productListing && (
              <div className="w-80 hidden md:block">
                <ProductListingCard
                  listing={productListing}
                  isUpdated={isUpdated}
                  onCreateProduct={createProduct}
                  isLoading={isCreatingProduct}
                />
              </div>
            )}
          </div>

          {/* Mobile Product Card (shown when exists) */}
          {productListing && (
            <div className="block md:hidden px-4 mb-4">
              <ProductListingCard
                listing={productListing}
                isUpdated={isUpdated}
                onCreateProduct={createProduct}
                isLoading={isCreatingProduct}
              />
            </div>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
