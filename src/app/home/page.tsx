"use client";

import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import ChatInput from "@/components/ui/ChatInput";
import UIChat from "@/components/ui/Chat/UIChat"; // pastikan path sesuai
import { ArrowUp } from "lucide-react";
import { ChatIcon } from "@/components/icons";
import ProtectedRoute from "@/components/ProtectedRoute";
import { type ProductListing } from "@/service/api/openaiService";
import { type ProductInput } from "@/service/api/adolService";

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
    const [currentEditingListing, setCurrentEditingListing] = useState<ProductListing | null>(null);
    const [editingStep, setEditingStep] = useState(0);
    const [editingChanges, setEditingChanges] = useState<Partial<ProductListing>>({});

    const handleCreateProduct = async (listing: ProductListing) => {
        try {
            // Add creating message
            const creatingMessage: ChatMessage = {
                id: Date.now(),
                sender: "bot",
                text: "Sedang membuat product listing... ⏳"
            };
            setChatMessages(prev => [...prev, creatingMessage]);

            // Import and use the adolService singleton
            const { getAdolService } = await import("@/service/api/adolService");
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

            // Debug: Check the format of selling_points from AI
            console.log('Listing data from AI:', {
                selling_points: listing.selling_points,
                selling_points_type: typeof listing.selling_points,
                is_array: Array.isArray(listing.selling_points),
                parsed: parseSellingPoints(listing.selling_points)
            });

            // Map ProductListing to ProductInput format with validation
            const productInput: ProductInput = {
                name: listing.item_name || "Untitled Product",
                description: listing.description || "No description provided",
                price: BigInt(Math.max(1, listing.listing_price || 1)), // Ensure minimum price of 1
                stock: BigInt(1), // Default stock to 1 for marketplace listings
                categoryId: categoryId, // Use dynamic category ID from backend
                condition: listing.condition || "used",
                keySellingPoints: parseSellingPoints(listing.selling_points),
                knownFlaws: listing.known_flaws || "None reported",
                pickupDeliveryInfo: listing.delivery_info || "Contact seller for details",
                reasonForSelling: listing.reason_selling || "Not specified",
                minimumPrice: listing.minimum_price ? [BigInt(Math.max(1, listing.minimum_price))] : [],
                targetPrice: listing.target_price ? [BigInt(Math.max(1, listing.target_price))] : [],
                imageBase64: (listing.imageBase64 && listing.imageBase64.startsWith('data:image/')) ? [listing.imageBase64] : [] // Include base64 image data
            };

            console.log('Creating product with data:', {
                ...productInput,
                imageBase64: productInput.imageBase64.length > 0 ? `[base64 data: ${productInput.imageBase64[0]?.substring(0, 50)}...]` : 'No image data'
            });
            const result = await adolService.createProduct(productInput);

            if (result) {
                // Success - product created
                const resultMessage: ChatMessage = {
                    id: Date.now() + 1,
                    sender: "bot",
                    text: `✅ Product listing berhasil dibuat! 🎉\nProduct ID: ${result.id}`
                };
                setChatMessages(prev => [...prev, resultMessage]);

                // Show success actions
                const successActionsMessage: ChatMessage = {
                    id: Date.now() + 2,
                    sender: "bot",
                    text: "Apa yang ingin Anda lakukan selanjutnya?",
                    quickReplies: [
                        "Lihat product saya",
                        "Buat listing lagi", 
                        "Share ke marketplace",
                        "Edit listing ini"
                    ]
                };
                setTimeout(() => {
                    setChatMessages(prev => [...prev, successActionsMessage]);
                }, 1000);

            } else {
                // Failed to create product - check if we need to create seller profile
                console.log('Product creation failed, checking if seller profile needed...');
                
                // Try to create seller profile and retry product creation
                const retryMessage: ChatMessage = {
                    id: Date.now() + 1,
                    sender: "bot",
                    text: "🔄 Mencoba membuat profil seller dan mencoba lagi..."
                };
                setChatMessages(prev => [...prev, retryMessage]);
                
                try {
                    await adolService.createBasicSellerProfile();
                    
                    // Retry product creation
                    const retryResult = await adolService.createProduct(productInput);
                    if (retryResult) {
                        const successMessage: ChatMessage = {
                            id: Date.now() + 2,
                            sender: "bot",
                            text: `✅ Product listing berhasil dibuat setelah setup profil seller! 🎉\nProduct ID: ${retryResult.id}`
                        };
                        setChatMessages(prev => [...prev, successMessage]);
                    } else {
                        const finalErrorMessage: ChatMessage = {
                            id: Date.now() + 2,
                            sender: "bot",
                            text: "❌ Gagal membuat listing setelah setup profil seller. Periksa console untuk detail error."
                        };
                        setChatMessages(prev => [...prev, finalErrorMessage]);
                    }
                } catch (retryError) {
                    console.error("Failed to create seller profile and retry:", retryError);
                    const errorMessage: ChatMessage = {
                        id: Date.now() + 2,
                        sender: "bot",
                        text: "❌ Gagal membuat listing. Silakan coba lagi atau periksa console untuk detail."
                    };
                    setChatMessages(prev => [...prev, errorMessage]);
                }
            }

        } catch (error) {
            console.error("Failed to create product:", error);
            let errorText = "❌ Gagal membuat listing: ";
            
            if (error instanceof Error) {
                if (error.message.includes("fetch")) {
                    errorText += "Tidak dapat terhubung ke backend. Periksa koneksi internet Anda.";
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
                text: errorText
            };
            setChatMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleSendMessage = (message: string) => {
        // Handle system messages (from Edit First button)
        if (message.startsWith('__SYSTEM_MESSAGE__')) {
            const systemMessage = JSON.parse(message.replace('__SYSTEM_MESSAGE__', ''));
            setChatMessages(prev => [...prev, systemMessage]);

            // Set editing listing if provided
            if (systemMessage.editingListing) {
                setCurrentEditingListing(systemMessage.editingListing);
                setEditingStep(1);
            }
            return;
        }

        // Handle regular user messages
        const userMessage: ChatMessage = {
            id: Date.now(),
            sender: "user",
            text: message
        };

        setChatMessages(prev => [...prev, userMessage]);

        // Handle editing responses
        if (currentEditingListing) {
            handleEditingResponse(message);
        }

        // Handle post-creation actions
        if (message.includes("Buat listing lagi")) {
            // Reset chat and go back to initial state
            setChatMessages([]);
            setIsChatOpen(false);
            setCurrentEditingListing(null);
            setEditingStep(0);
            setEditingChanges({});
        } else if (message.includes("Lihat product saya")) {
            const responseMessage: ChatMessage = {
                id: Date.now(),
                sender: "bot",
                text: "Fitur 'Lihat Product Saya' akan segera tersedia! Untuk sementara, Anda bisa cek di dashboard. 📊"
            };
            setChatMessages(prev => [...prev, responseMessage]);
        } else if (message.includes("Share ke marketplace")) {
            const responseMessage: ChatMessage = {
                id: Date.now(),
                sender: "bot",
                text: "Fitur share ke marketplace (Tokopedia, Shopee, dll) akan segera hadir! 🚀"
            };
            setChatMessages(prev => [...prev, responseMessage]);
        }
    };

    const handleEditingResponse = async (userResponse: string) => {
        // Process user's editing response and provide follow-up questions or suggestions

        // Track changes based on user response
        let newChanges: Partial<ProductListing> = { ...editingChanges };

        // Apply changes based on current step and user response
        switch (editingStep) {
            case 1: // Condition response
                if (userResponse.includes("lebih baik")) {
                    newChanges.condition = "Excellent" as const;
                } else if (userResponse.includes("naikkan") && currentEditingListing) {
                    // Handle price increase for better condition
                    newChanges.condition = "Excellent" as const;
                    const percentage = userResponse.includes("10-15%") ? 1.15 : userResponse.includes("5-10%") ? 1.1 : 1.0;
                    newChanges.listing_price = Math.round(currentEditingListing.listing_price * percentage);
                    newChanges.target_price = Math.round(newChanges.listing_price * 0.85);
                    newChanges.minimum_price = Math.round(newChanges.listing_price * 0.7);
                } else if (userResponse.includes("kerusakan")) {
                    newChanges.condition = "Fair" as const;
                    newChanges.known_flaws = userResponse;
                } else if (userResponse.includes("garansi")) {
                    newChanges.condition = "Excellent" as const;
                    newChanges.selling_points = (newChanges.selling_points || currentEditingListing?.selling_points || "") + "\n• Masih dalam garansi";
                }
                break;

            case 2: // Price response  
                if (currentEditingListing) {
                    if (userResponse.includes("terlalu tinggi") || userResponse.includes("Turun")) {
                        const percentage = userResponse.includes("20%") ? 0.8 : userResponse.includes("15%") ? 0.85 : 0.9;
                        newChanges.listing_price = Math.round((currentEditingListing.listing_price) * percentage);
                        newChanges.target_price = Math.round(newChanges.listing_price * 0.85);
                        newChanges.minimum_price = Math.round(newChanges.listing_price * 0.7);
                    } else if (userResponse.includes("terlalu rendah") || userResponse.includes("Naik")) {
                        const percentage = userResponse.includes("20%") ? 1.2 : userResponse.includes("15%") ? 1.15 : 1.1;
                        newChanges.listing_price = Math.round((currentEditingListing.listing_price) * percentage);
                        newChanges.target_price = Math.round(newChanges.listing_price * 0.85);
                        newChanges.minimum_price = Math.round(newChanges.listing_price * 0.7);
                    }
                }
                break;

            case 3: // Additional details
                if (userResponse.includes("aksesoris")) {
                    newChanges.selling_points = (newChanges.selling_points || currentEditingListing?.selling_points || "") + "\n• Lengkap dengan aksesoris original";
                } else if (userResponse.includes("history")) {
                    newChanges.description = (newChanges.description || currentEditingListing?.description || "") + " Digunakan dengan hati-hati oleh pemilik pertama.";
                }
                break;
        }

        setEditingChanges(newChanges);

        setTimeout(() => {
            const responses = getEditingResponseByStep(editingStep, userResponse, newChanges);
            responses.forEach((response, index) => {
                setTimeout(() => {
                    setChatMessages(prev => [...prev, response]);
                }, index * 1000);
            });
            setEditingStep(prev => prev + 1);
        }, 500);
    };

    const getEditingResponseByStep = (step: number, userResponse: string, changes?: Partial<ProductListing>): ChatMessage[] => {
        const baseId = Date.now();

        switch (step) {
            case 1: // Condition response
                if (userResponse.includes("lebih baik")) {
                    return [{
                        id: baseId,
                        sender: "bot",
                        text: "Bagus! Saya akan update kondisi menjadi 'Excellent'. Mau saya naikkan harga juga?",
                        quickReplies: ["Ya, naikkan 10-15%", "Ya, naikkan 5-10%", "Tidak, biarkan sama"]
                    }];
                } else if (userResponse.includes("naikkan") && currentEditingListing) {
                    // Handle price increase for better condition
                    const percentage = userResponse.includes("10-15%") ? 1.15 : userResponse.includes("5-10%") ? 1.1 : 1.0;
                    const newPrice = Math.round(currentEditingListing.listing_price * percentage);
                    const newTarget = Math.round(newPrice * 0.85);
                    const newMinimum = Math.round(newPrice * 0.7);

                    return [{
                        id: baseId,
                        sender: "bot",
                        text: `Perfect! Kondisi diupdate ke 'Excellent' dan harga dinaikkan menjadi Rp ${newPrice.toLocaleString('id-ID')}. Lanjut ke pertanyaan berikutnya! 💰`
                    }];
                } else if (userResponse.includes("kerusakan")) {
                    return [{
                        id: baseId,
                        sender: "bot",
                        text: "Terima kasih infonya. Bisakah Anda jelaskan kerusakan apa yang ada? Ini akan saya masukkan ke 'known_flaws' agar pembeli tidak kecewa.",
                        quickReplies: ["Ada goresan kecil", "Baterai agak drop", "Ada noda/bekas pakai", "Fungsi tidak 100%"]
                    }];
                } else {
                    return [{
                        id: baseId,
                        sender: "bot",
                        text: "Baik, kondisi sudah sesuai. Mari kita lanjut ke aspek lainnya! 👍"
                    }];
                }

            case 2: // Price response
                if (userResponse.includes("terlalu tinggi")) {
                    return [{
                        id: baseId,
                        sender: "bot",
                        text: "Saya akan turunkan harga. Berapa persen kira-kira yang cocok?",
                        quickReplies: ["Turun 10%", "Turun 15%", "Turun 20%", "Saya tentukan sendiri"]
                    }];
                } else if (userResponse.includes("terlalu rendah")) {
                    return [{
                        id: baseId,
                        sender: "bot",
                        text: "Baik, saya akan sesuaikan harga naik. Berapa target harga yang Anda inginkan?",
                        quickReplies: ["Naik 10%", "Naik 15%", "Naik 20%", "Saya tentukan sendiri"]
                    }];
                } else {
                    return [{
                        id: baseId,
                        sender: "bot",
                        text: "Perfect! Harga sudah pas. Lanjut ke detail tambahan. ✨"
                    }];
                }

            case 3: // Additional details response
                // Special handling for "Selesai, buat listing"
                if (userResponse.includes("Selesai") || userResponse.includes("buat listing")) {
                    const finalListing = currentEditingListing && changes ? {
                        ...currentEditingListing,
                        ...changes
                    } : currentEditingListing;

                    return [
                        {
                            id: baseId,
                            sender: "bot",
                            text: "Perfect! Listing Anda sudah siap dengan semua penyesuaian yang diminta. 🚀"
                        },
                        {
                            id: baseId + 1,
                            sender: "bot",
                            text: "Berikut adalah listing final yang sudah diperbaharui:",
                            productListing: finalListing!
                        }
                    ];
                } else {
                    return [{
                        id: baseId,
                        sender: "bot",
                        text: "Sip! Saya akan update listing dengan informasi tambahan ini. Apakah ada hal lain yang ingin disesuaikan?",
                        quickReplies: ["Update deskripsi", "Ubah alasan jual", "Selesai, buat listing", "Kembali ke awal"]
                    }];
                }

            default:
                // Create updated listing by merging original with changes
                const updatedListing = currentEditingListing && changes ? {
                    ...currentEditingListing,
                    ...changes
                } : currentEditingListing;

                return [
                    {
                        id: baseId,
                        sender: "bot",
                        text: "Terima kasih atas masukannya! Listing telah diperbarui sesuai preferensi Anda. 🎉"
                    },
                    {
                        id: baseId + 1,
                        sender: "bot",
                        text: "Berikut adalah listing yang sudah diperbaharui:",
                        productListing: updatedListing!
                    }
                ];
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
            image: data.images.length > 0 ? URL.createObjectURL(data.images[0]) : undefined
        };

        setChatMessages(prev => [...prev, userMessage]);

        if (data.hasImages) {
            setIsAnalyzing(true);

            // Add analyzing message
            const analyzingMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: "bot",
                text: "I'm analyzing your image with GPT-4.0 to create a product listing. This will cost 10 credits..."
            };

            setChatMessages(prev => [...prev, analyzingMessage]);

            try {
                // Import the enhanced analysis functions
                const { analyzeImageWithFullFallback, fileToBase64WithFallbacks } = await import("@/service/api/openaiService");

                const analysisPromises = data.images.map(async (file) => {
                    console.log('Starting real AI analysis for file:', {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        sizeInMB: (file.size / (1024 * 1024)).toFixed(2)
                    });

                    console.log('Converting image to base64 for storage...');
                    // Convert image to base64 for later use in product creation
                    const imageVersions = await fileToBase64WithFallbacks(file);
                    const imageBase64 = imageVersions.recommended; // Use recommended format
                    console.log('Image converted to base64, length:', imageBase64.length);

                    console.log('Using enhanced AI analysis with multiple conversion methods');
                    // Use enhanced analysis that tries multiple image formats
                    const listing = await analyzeImageWithFullFallback(file, data.text);
                    
                    // Attach the base64 image data to the listing
                    return {
                        ...listing,
                        imageBase64: imageBase64
                    };
                });

                const results = await Promise.all(analysisPromises);

                // Add result messages
                results.forEach((listing, index) => {
                    // Log the generated prices for debugging
                    console.log(`✅ Real AI analysis result ${index + 1}:`, {
                        product: listing.item_name,
                        category: listing.category,
                        condition: listing.condition,
                        prices: {
                            listing: `Rp ${listing.listing_price.toLocaleString('id-ID')}`,
                            target: `Rp ${listing.target_price.toLocaleString('id-ID')}`,
                            minimum: `Rp ${listing.minimum_price.toLocaleString('id-ID')}`
                        },
                        hasImage: !!listing.imageBase64,
                        imageSize: listing.imageBase64 ? `${listing.imageBase64.length} characters` : 'No image'
                    });

                    const resultMessage: ChatMessage = {
                        id: Date.now() + 2 + index,
                        sender: "bot",
                        text: `✅ GPT-4.0 analysis complete! Here's your generated product listing:`,
                        productListing: listing
                    };

                    setChatMessages(prev => [...prev, resultMessage]);
                });

            } catch (error) {
                console.error("AI analysis failed:", error);

                let errorText = "Sorry, I couldn't analyze the image with GPT-4.0.";
                if (error instanceof Error) {
                    if (error.message.includes("template prices")) {
                        errorText = "⚠️ AI tried to use template prices instead of analyzing your actual product. Let me retry with a more specific approach...";
                    } else {
                        errorText = `Sorry, I couldn't analyze the image. Error: ${error.message}. Please try again with a clearer image or check your connection.`;
                    }
                }

                const errorMessage: ChatMessage = {
                    id: Date.now() + 2,
                    sender: "bot",
                    text: errorText
                };
                setChatMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsAnalyzing(false);
            }
        }
    };

    return (
        <ProtectedRoute>
            <MainLayout>
                {/* Kalau chat terbuka tampilkan UIChat */}
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
