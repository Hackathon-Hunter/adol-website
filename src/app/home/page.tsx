"use client";

import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import ChatInput from "@/components/ui/ChatInput";
import UIChat from "@/components/ui/Chat/UIChat";
import { ChatIcon } from "@/components/icons";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  sendMessageText,
  setCurrentProductListing,
  getCurrentProductListing,
  type ProductListing,
} from "@/service/api/openaiService";
import { getAdolService, type ProductInput } from "@/service/api/adolService";

interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text?: string;
  image?: string;
  productListing?: ProductListing;
  quickReplies?: string[];
  editingListing?: ProductListing;
}

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentEditingListing, setCurrentEditingListing] =
    useState<ProductListing | null>(null);

  // Utility function to parse selling points
  const parseSellingPoints = (sellingPoints: any): string[] => {
    if (!sellingPoints) return [];
    if (Array.isArray(sellingPoints))
      return sellingPoints.filter((point) => point && point.trim());
    if (typeof sellingPoints === "string")
      return sellingPoints.split("\n").filter((point) => point && point.trim());
    return [String(sellingPoints)];
  };

  const handleCreateProduct = async (listing: ProductListing) => {
    try {
      // Add creating message
      const creatingMessage: ChatMessage = {
        id: Date.now(),
        sender: "bot",
        text: "Sedang membuat product listing... ⏳",
      };
      setChatMessages((prev) => [...prev, creatingMessage]);

      const adolService = await getAdolService();

      // Get or create category ID
      const categoryId = await adolService.getCategoryIdByName(
        listing.category || "general"
      );

      // Map ProductListing to ProductInput format
      const productInput: ProductInput = {
        name: listing.item_name || "Untitled Product",
        description: listing.description || "No description provided",
        price: BigInt(Math.max(1, listing.listing_price || 1)),
        stock: BigInt(1),
        categoryId: categoryId,
        condition: listing.condition || "used",
        keySellingPoints: parseSellingPoints(listing.selling_points),
        knownFlaws: listing.known_flaws || "None reported",
        pickupDeliveryInfo:
          listing.delivery_info || "Contact seller for details",
        reasonForSelling: listing.reason_selling || "Not specified",
        minimumPrice: listing.minimum_price
          ? [BigInt(Math.max(1, listing.minimum_price))]
          : [],
        targetPrice: listing.target_price
          ? [BigInt(Math.max(1, listing.target_price))]
          : [],
        imageBase64:
          listing.imageBase64 && listing.imageBase64.startsWith("data:image/")
            ? [listing.imageBase64]
            : [],
      };

      const result = await adolService.createProduct(productInput);

      if (result) {
        // Success
        const resultMessage: ChatMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text: `✅ Product listing berhasil dibuat! 🎉\nProduct ID: ${result.id}`,
        };
        setChatMessages((prev) => [...prev, resultMessage]);

        // Show success actions
        const actionsMessage: ChatMessage = {
          id: Date.now() + 2,
          sender: "bot",
          text: "Apa yang ingin Anda lakukan selanjutnya?",
          quickReplies: [
            "Buat listing lagi",
            "Lihat product saya",
            "Share ke marketplace",
          ],
        };
        setChatMessages((prev) => [...prev, actionsMessage]);
      } else {
        // Try to create seller profile and retry
        const retryMessage: ChatMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text: "🔄 Mencoba membuat profil seller dan mencoba lagi...",
        };
        setChatMessages((prev) => [...prev, retryMessage]);

        try {
          await adolService.createBasicSellerProfile();
          const retryResult = await adolService.createProduct(productInput);

          if (retryResult) {
            const successMessage: ChatMessage = {
              id: Date.now() + 2,
              sender: "bot",
              text: `✅ Product listing berhasil dibuat setelah setup profil seller! 🎉\nProduct ID: ${retryResult.id}`,
            };
            setChatMessages((prev) => [...prev, successMessage]);
          } else {
            const finalErrorMessage: ChatMessage = {
              id: Date.now() + 2,
              sender: "bot",
              text: "❌ Gagal membuat listing setelah setup profil seller. Silakan coba lagi.",
            };
            setChatMessages((prev) => [...prev, finalErrorMessage]);
          }
        } catch (retryError) {
          const errorMessage: ChatMessage = {
            id: Date.now() + 2,
            sender: "bot",
            text: "❌ Gagal membuat listing. Silakan coba lagi.",
          };
          setChatMessages((prev) => [...prev, errorMessage]);
        }
      }
    } catch (error) {
      let errorText = "❌ Gagal membuat listing: ";

      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorText +=
            "Tidak dapat terhubung ke backend. Periksa koneksi internet Anda.";
        } else if (error.message.includes("auth")) {
          errorText += "Masalah autentikasi. Silakan login kembali.";
        } else {
          errorText += error.message;
        }
      } else {
        errorText += "Terjadi kesalahan tidak terduga. Silakan coba lagi.";
      }

      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: errorText,
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = async (message: string) => {
    // Handle system messages (from Edit First button)
    if (message.startsWith("__SYSTEM_MESSAGE__")) {
      const systemMessage = JSON.parse(
        message.replace("__SYSTEM_MESSAGE__", "")
      );
      setChatMessages((prev) => [...prev, systemMessage]);

      if (systemMessage.editingListing) {
        setCurrentEditingListing(systemMessage.editingListing);
        setCurrentProductListing(systemMessage.editingListing);
      }
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };
    setChatMessages((prev) => [...prev, userMessage]);

    // Handle post-creation actions
    if (message.includes("Buat listing lagi")) {
      setChatMessages([]);
      setIsChatOpen(false);
      setCurrentEditingListing(null);
      setCurrentProductListing(null);
      return;
    } else if (message.includes("Lihat product saya")) {
      const responseMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Fitur 'Lihat Product Saya' akan segera tersedia! Untuk sementara, Anda bisa cek di dashboard. 📊",
      };
      setChatMessages((prev) => [...prev, responseMessage]);
      return;
    } else if (message.includes("Share ke marketplace")) {
      const responseMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Fitur share ke marketplace (Tokopedia, Shopee, dll) akan segera hadir! 🚀",
      };
      setChatMessages((prev) => [...prev, responseMessage]);
      return;
    }

    try {
      // Get AI response
      const response = await sendMessageText(message);

      // Check if product was updated
      const updatedProduct = getCurrentProductListing();
      if (updatedProduct && updatedProduct !== currentEditingListing) {
        setCurrentEditingListing(updatedProduct);
      }

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: response.toString(),
      };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Maaf, terjadi kesalahan. Silakan coba lagi.",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleChatSubmit = async (data: {
    text: string;
    images: File[];
    hasImages: boolean;
  }) => {
    setIsChatOpen(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: data.text,
      image:
        data.images.length > 0
          ? URL.createObjectURL(data.images[0])
          : undefined,
    };
    setChatMessages((prev) => [...prev, userMessage]);

    if (data.hasImages) {
      setIsAnalyzing(true);

      // Add analyzing message
      const analyzingMessage: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "I'm analyzing your image with GPT-4.0 to create a product listing. This will cost 10 credits...",
      };
      setChatMessages((prev) => [...prev, analyzingMessage]);

      try {
        // Import analysis functions
        const { analyzeImageWithFallback, fileToBase64 } = await import(
          "@/service/api/openaiService"
        );

        const analysisPromises = data.images.map(async (file) => {
          // Convert image to base64
          const imageBase64 = await fileToBase64(file, "auto");

          // Analyze with AI
          const listing = await analyzeImageWithFallback(file, data.text);

          // Attach base64 image data
          return {
            ...listing,
            imageBase64: imageBase64,
          };
        });

        const results = await Promise.all(analysisPromises);

        // Add result messages
        results.forEach((listing, index) => {
          const resultMessage: ChatMessage = {
            id: Date.now() + 2 + index,
            sender: "bot",
            text: `✅ GPT-4.0 analysis complete! Here's your generated product listing:`,
            productListing: listing,
          };

          setChatMessages((prev) => [...prev, resultMessage]);
        });
      } catch (error) {
        let errorText = "Sorry, I couldn't analyze the image with GPT-4.0.";

        if (error instanceof Error) {
          if (error.message.includes("template prices")) {
            errorText =
              "⚠️ AI tried to use template prices instead of analyzing your actual product. Let me retry with a more specific approach...";
          } else {
            errorText = `Sorry, I couldn't analyze the image. Error: ${error.message}. Please try again with a clearer image or check your connection.`;
          }
        }

        const errorMessage: ChatMessage = {
          id: Date.now() + 2,
          sender: "bot",
          text: errorText,
        };
        setChatMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        {isChatOpen ? (
          <div className="flex flex-col h-full justify-center w-full">
            <UIChat
              messages={chatMessages}
              isAnalyzing={isAnalyzing}
              onSendMessage={handleSendMessage}
              onCreateProduct={handleCreateProduct}
            />
          </div>
        ) : (
          <div className="flex flex-col h-full justify-center w-full">
            {/* Header */}
            <div className="flex flex-col justify-center items-center">
              <ChatIcon width={64} height={64} className="text-blue-500" />
              <h1 className="text-center text-2xl font-semibold mb-2 text-black">
                Hi, Ryan
                <br />
                <span className="font-normal">
                  Upload a photo and let me create your product listing
                </span>
              </h1>
            </div>

            {/* ChatInput full width */}
            <div className="w-full mt-4">
              <ChatInput onSubmit={handleChatSubmit} />
            </div>
          </div>
        )}
      </MainLayout>
    </ProtectedRoute>
  );
}
