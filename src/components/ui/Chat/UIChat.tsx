"use client";

import { useState, useRef, useEffect } from "react";
import ChatInput from "@/components/ui/ChatInput";
import { type ProductListing } from "@/service/api/openaiService";

interface ChatMessage {
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

export default function UIChat({ messages, isAnalyzing, onSendMessage, onCreateProduct }: UIChatProps) {
    const [inputText, setInputText] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendTextMessage = () => {
        if (!inputText.trim() || !onSendMessage) return;
        onSendMessage(inputText);
        setInputText("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendTextMessage();
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleEditListing = (listing: ProductListing) => {
        if (!onSendMessage) return;

        // Generate editing conversation
        const editingQuestions = [
            {
                id: Date.now() + 1,
                sender: "bot" as const,
                text: "Saya akan membantu Anda menyempurnakan listing ini! 📝",
                editingListing: listing
            },
            {
                id: Date.now() + 2,
                sender: "bot" as const,
                text: "Bagaimana kondisi sebenarnya produk ini? Apakah deskripsi AI sudah akurat?",
                quickReplies: [
                    "Kondisi lebih baik dari perkiraan AI",
                    "Kondisi sesuai dengan AI",
                    "Ada beberapa kerusakan yang tidak terdeteksi",
                    "Produk masih dalam garansi"
                ]
            },
            {
                id: Date.now() + 3,
                sender: "bot" as const,
                text: "Apakah harga yang diusulkan AI sesuai dengan ekspektasi Anda?",
                quickReplies: [
                    "Harga terlalu tinggi",
                    "Harga sudah sesuai",
                    "Harga terlalu rendah",
                    "Saya ingin harga khusus"
                ]
            },
            {
                id: Date.now() + 4,
                sender: "bot" as const,
                text: "Adakah detail penting yang ingin Anda tambahkan untuk menarik pembeli?",
                quickReplies: [
                    "Tambah aksesoris yang disertakan",
                    "Jelaskan history penggunaan",
                    "Tambah alasan jual yang meyakinkan",
                    "Tidak ada yang perlu ditambah"
                ]
            }
        ];

        // Send editing conversation messages
        editingQuestions.forEach((question, index) => {
            setTimeout(() => {
                onSendMessage(`__SYSTEM_MESSAGE__${JSON.stringify(question)}`);
            }, index * 1000); // Delay each message by 1 second
        });
    };

    const ProductListingCard = ({ listing }: { listing: ProductListing }) => {
        console.log(listing, 'line 32');
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm max-w-md">
                <div className="mb-3">
                    <h3 className="font-semibold text-lg text-gray-900">{listing.item_name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{listing.category}</p>
                    <p className="text-sm text-gray-700">{listing.description}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                            <span className="text-gray-500 block">Listing Price</span>
                            <span className="font-semibold text-green-600">{formatPrice(listing.listing_price)}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Target Price</span>
                            <span className="font-medium">{formatPrice(listing.target_price)}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Min Price</span>
                            <span className="font-medium text-red-500">{formatPrice(listing.minimum_price)}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div>
                        <span className="font-medium text-gray-700">Condition:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${listing.condition === 'Excellent' ? 'bg-green-100 text-green-800' :
                            listing.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
                                listing.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                            }`}>
                            {listing.condition}
                        </span>
                    </div>

                    <div>
                        <span className="font-medium text-gray-700">Selling Points:</span>
                        <p className="text-gray-600 mt-1">{listing.selling_points}</p>
                    </div>

                    {listing.known_flaws && (
                        <div>
                            <span className="font-medium text-gray-700">Known Issues:</span>
                            <p className="text-gray-600 mt-1">{listing.known_flaws}</p>
                        </div>
                    )}

                    <div>
                        <span className="font-medium text-gray-700">Reason for Selling:</span>
                        <p className="text-gray-600 mt-1">{listing.reason_selling}</p>
                    </div>

                    <div>
                        <span className="font-medium text-gray-700">Delivery Info:</span>
                        <p className="text-gray-600 mt-1">{listing.delivery_info}</p>
                    </div>
                </div>

                                <div className="mt-4 flex gap-2">
                    <button 
                        onClick={() => onCreateProduct?.(listing)}
                        className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
                    >
                        Create Listing
                    </button>
                    <button 
                        onClick={() => handleEditListing(listing)}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        Edit First
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto h-screen flex flex-col">
            {/* Editing Mode Header */}
            {messages.some(msg => msg.editingListing || msg.quickReplies) && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200 p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">✨</span>
                        <span className="text-sm font-medium text-purple-700">Mode Edit Listing - AI membantu menyempurnakan produk Anda</span>
                        <span className="text-lg">📝</span>
                    </div>
                </div>
            )}

            {/* Chat body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 pb-20">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div className={`max-w-md ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                            {msg.text && (
                                <span
                                    className={`inline-block px-4 py-2 rounded-2xl text-sm ${msg.sender === "user"
                                        ? "bg-sky-200 text-black"
                                        : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    {msg.text}
                                </span>
                            )}

                            {/* Quick Replies */}
                            {msg.quickReplies && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {msg.quickReplies.map((reply, index) => (
                                        <button
                                            key={index}
                                            onClick={() => onSendMessage?.(reply)}
                                            className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-purple-700 rounded-full text-sm font-medium hover:from-purple-100 hover:to-blue-100 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {msg.image && (
                                <img
                                    src={msg.image}
                                    alt="preview"
                                    className="w-32 h-32 rounded-xl object-cover shadow mt-2"
                                />
                            )}
                            {msg.productListing && (
                                <div className="mt-2">
                                    <ProductListingCard listing={msg.productListing} />
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
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-sm text-gray-600">Analyzing image...</span>
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
                    {messages.some(msg => msg.quickReplies) && (
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
                            placeholder="Ketik pesan untuk melanjutkan percakapan..."
                            className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400"
                        />
                        <button
                            onClick={handleSendTextMessage}
                            disabled={!inputText.trim()}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white disabled:from-gray-300 disabled:to-gray-400 flex items-center justify-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};      