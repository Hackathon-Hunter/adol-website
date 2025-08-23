"use client";

import { useState } from "react";
import { ArrowLeft, Wallet, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopUpBalance from "@/components/ui/TopUpBalance";
import ButtonSecondary from "@/components/ui/ButtonSecondary";

export default function CreditsPage() {
    const router = useRouter();
    const [balance, setBalance] = useState(50);

    const handleTopUp = (amount: number) => {
        setBalance(prev => prev + amount);
    };

    const transactions = [
        {
            id: 1,
            type: "top-up",
            amount: 25,
            description: "ICP Credits Top-up",
            timestamp: "2 hours ago",
            status: "completed"
        },
        {
            id: 2,
            type: "usage",
            amount: -5,
            description: "AI Agent - Product Listing",
            timestamp: "1 day ago",
            status: "completed"
        },
        {
            id: 3,
            type: "top-up",
            amount: 50,
            description: "ICP Credits Top-up",
            timestamp: "3 days ago",
            status: "completed"
        },
        {
            id: 4,
            type: "usage",
            amount: -3.5,
            description: "AI Agent - Customer Support",
            timestamp: "5 days ago",
            status: "completed"
        },
        {
            id: 5,
            type: "usage",
            amount: -7.2,
            description: "AI Agent - Price Optimization",
            timestamp: "1 week ago",
            status: "completed"
        }
    ];

    const usageStats = [
        {
            service: "Product Listing AI",
            usage: "12 operations",
            cost: "8.5 ICP",
            percentage: 68
        },
        {
            service: "Customer Support AI",
            usage: "8 operations",
            cost: "3.5 ICP",
            percentage: 28
        },
        {
            service: "Price Optimization",
            usage: "1 operation",
            cost: "7.2 ICP",
            percentage: 4
        }
    ];

    return (
        <ProtectedRoute>
            <MainLayout>
                <div className="p-6 max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">ICP Credits</h1>
                            <p className="text-gray-600">Manage your balance and view transaction history</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Balance and Top-up */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Balance Card */}
                            <TopUpBalance
                                currentBalance={balance}
                                onTopUp={handleTopUp}
                            />

                            {/* Usage Breakdown */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Breakdown</h3>
                                <div className="space-y-4">
                                    {usageStats.map((stat, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700">
                                                    {stat.service}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    {stat.cost}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${stat.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {stat.usage}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Transaction History */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                                            <p className="text-gray-600 text-sm">Your recent credit transactions</p>
                                        </div>
                                        <ButtonSecondary>
                                            <Clock size={16} />
                                            Export
                                        </ButtonSecondary>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {transactions.map((transaction) => (
                                        <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-full ${transaction.type === 'top-up'
                                                            ? 'bg-green-100'
                                                            : 'bg-blue-100'
                                                        }`}>
                                                        {transaction.type === 'top-up' ? (
                                                            <TrendingUp size={20} className="text-green-600" />
                                                        ) : (
                                                            <Wallet size={20} className="text-blue-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            {transaction.description}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-sm text-gray-600">
                                                                {transaction.timestamp}
                                                            </span>
                                                            <div className="flex items-center gap-1">
                                                                <CheckCircle size={12} className="text-green-500" />
                                                                <span className="text-xs text-green-600 capitalize">
                                                                    {transaction.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className={`text-lg font-semibold ${transaction.amount > 0
                                                            ? 'text-green-600'
                                                            : 'text-red-600'
                                                        }`}>
                                                        {transaction.amount > 0 ? '+' : ''}{transaction.amount} ICP
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        ≈ ${Math.abs(transaction.amount * 12.5).toFixed(2)} USD
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Load More */}
                                <div className="p-6 border-t border-gray-200 text-center">
                                    <ButtonSecondary className="w-full">
                                        Load More Transactions
                                    </ButtonSecondary>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                            <div className="text-2xl font-bold text-green-600 mb-2">+75 ICP</div>
                            <div className="text-sm text-gray-600">Total Topped Up</div>
                            <div className="text-xs text-gray-500 mt-1">This Month</div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                            <div className="text-2xl font-bold text-blue-600 mb-2">-25.7 ICP</div>
                            <div className="text-sm text-gray-600">Total Used</div>
                            <div className="text-xs text-gray-500 mt-1">This Month</div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
                            <div className="text-2xl font-bold text-purple-600 mb-2">21</div>
                            <div className="text-sm text-gray-600">AI Operations</div>
                            <div className="text-xs text-gray-500 mt-1">This Month</div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </ProtectedRoute>
    );
}
