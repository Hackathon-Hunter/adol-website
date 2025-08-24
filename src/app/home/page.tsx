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
import { getAdolService, type ProductInput as BackendProductInput } from "@/service/api/adolService";

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
      // Get the service instance
      const adolService = await getAdolService();
      
      // Get or create category ID dynamically from backend
      const categoryId = await adolService.getCategoryIdByName(listing.category || "general");
      
      // Utility function to convert selling points to string array
      const parseSellingPoints = (sellingPoints: any): string[] => {
        if (!sellingPoints) return [];
        if (Array.isArray(sellingPoints)) return sellingPoints.filter(point => point && point.trim());
        if (typeof sellingPoints === 'string') return sellingPoints.split('\n').filter(point => point && point.trim());
        return [String(sellingPoints)]; // Convert to string if unknown type
      };

      // Map ProductListing to ProductInput format with validation
      const productInput: BackendProductInput = {
        categoryId: categoryId,
        status: [{ active: null }],
        keySellingPoints: parseSellingPoints(listing.selling_points),
        name: listing.item_name || "Untitled Product",
        minimumPrice: listing.minimum_price ? [BigInt(Math.max(1, listing.minimum_price))] : [],
        reasonForSelling: listing.reason_selling || "Not specified",
        targetPrice: listing.target_price ? [BigInt(Math.max(1, listing.target_price))] : [],
        description: listing.description || "No description provided",
        stock: BigInt(1),
        imageBase64: (listing.imageBase64 && listing.imageBase64.startsWith('data:image/')) ? [listing.imageBase64] : [],
        pickupDeliveryInfo: listing.delivery_info || "Contact seller for details",
        knownFlaws: listing.known_flaws || "None reported",
        price: BigInt(Math.max(1, listing.listing_price || 1)),
        condition: listing.condition || "used"
      };

      console.log('Creating product with data:', {
        ...productInput,
        imageBase64: productInput.imageBase64.length > 0 ? `[base64 data: ${productInput.imageBase64[0]?.substring(0, 50)}...]` : 'No image data'
      });
      
      const result = await adolService.createProduct(productInput);

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
      
      let errorText = "❌ Gagal membuat listing: ";
      
      if (error instanceof Error) {
        if (error.message.includes("session has expired") || error.message.includes("Invalid signature")) {
          errorText += "Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.";
        } else if (error.message.includes("fetch")) {
          errorText += "Tidak dapat terhubung ke backend. Periksa koneksi internet Anda.";
        } else if (error.message.includes("auth")) {
          errorText += "Masalah autentikasi. Silakan login kembali.";
        } else {
          errorText += error.message;
        }
      } else {
        errorText += "Terjadi kesalahan tidak terduga. Silakan coba lagi.";
      }

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: errorText,
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
