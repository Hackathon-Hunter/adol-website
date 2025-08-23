"use client";

import { useState } from "react";
import { Wallet, Plus, Minus, CreditCard, TrendingUp } from "lucide-react";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

interface TopUpBalanceProps {
    currentBalance?: number;
    onTopUp?: (amount: number) => void;
    className?: string;
}

export default function TopUpBalance({ 
    currentBalance = 50, 
    onTopUp,
    className = "" 
}: TopUpBalanceProps) {
    const [topUpAmount, setTopUpAmount] = useState<number>(10);
    const [isLoading, setIsLoading] = useState(false);
    const [showTopUpModal, setShowTopUpModal] = useState(false);

    const predefinedAmounts = [10, 25, 50, 100, 250, 500];

    const handleTopUp = async () => {
        if (topUpAmount <= 0) return;
        
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (onTopUp) {
                onTopUp(topUpAmount);
            }
            
            setShowTopUpModal(false);
            setTopUpAmount(10);
        } catch (error) {
            console.error('Top-up failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const incrementAmount = () => {
        setTopUpAmount(prev => Math.min(prev + 10, 1000));
    };

    const decrementAmount = () => {
        setTopUpAmount(prev => Math.max(prev - 10, 10));
    };

    return (
        <>
            {/* Balance Card */}
            <div className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white ${className}`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-3 rounded-full">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">ICP Credits</h3>
                            <p className="text-blue-100 text-sm">Available Balance</p>
                        </div>
                    </div>
                    <TrendingUp size={20} className="text-blue-200" />
                </div>
                
                <div className="mb-6">
                    <div className="text-3xl font-bold mb-1">
                        {currentBalance.toFixed(2)} ICP
                    </div>
                    <p className="text-blue-100 text-sm">
                        ≈ ${(currentBalance * 12.5).toFixed(2)} USD
                    </p>
                </div>

                <div className="flex gap-3">
                    <ButtonPrimary 
                        onClick={() => setShowTopUpModal(true)}
                        className="flex-1 bg-white/20 hover:bg-white/30 border-0"
                    >
                        <Plus size={16} />
                        Top Up
                    </ButtonPrimary>
                    <ButtonSecondary 
                        className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                        <CreditCard size={16} />
                        History
                    </ButtonSecondary>
                </div>
            </div>

            {/* Top-Up Modal */}
            {showTopUpModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Top Up ICP Credits</h2>
                            <button
                                onClick={() => setShowTopUpModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Current Balance */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="text-sm text-gray-600 mb-1">Current Balance</div>
                            <div className="text-lg font-semibold text-gray-900">
                                {currentBalance.toFixed(2)} ICP
                            </div>
                        </div>

                        {/* Amount Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Amount (ICP)
                            </label>
                            
                            {/* Predefined Amounts */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {predefinedAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setTopUpAmount(amount)}
                                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                                            topUpAmount === amount
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                                        }`}
                                    >
                                        {amount} ICP
                                    </button>
                                ))}
                            </div>

                            {/* Custom Amount Input */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={decrementAmount}
                                    className="p-2 rounded-lg border border-gray-300 hover:border-blue-300 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                
                                <input
                                    type="number"
                                    value={topUpAmount}
                                    onChange={(e) => setTopUpAmount(Math.max(1, parseInt(e.target.value) || 0))}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-medium"
                                    min="1"
                                    max="1000"
                                />
                                
                                <button
                                    onClick={incrementAmount}
                                    className="p-2 rounded-lg border border-gray-300 hover:border-blue-300 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="text-xs text-gray-500 mt-2 text-center">
                                ≈ ${(topUpAmount * 12.5).toFixed(2)} USD
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Top-up Amount:</span>
                                <span className="font-semibold">{topUpAmount} ICP</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Current Balance:</span>
                                <span className="font-semibold">{currentBalance.toFixed(2)} ICP</span>
                            </div>
                            <hr className="my-2 border-blue-200" />
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">New Balance:</span>
                                <span className="font-bold text-blue-600">
                                    {(currentBalance + topUpAmount).toFixed(2)} ICP
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <ButtonSecondary 
                                onClick={() => setShowTopUpModal(false)}
                                className="flex-1"
                                disabled={isLoading}
                            >
                                Cancel
                            </ButtonSecondary>
                            <ButtonPrimary 
                                onClick={handleTopUp}
                                className="flex-1"
                                disabled={isLoading || topUpAmount <= 0}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Plus size={16} />
                                        Top Up {topUpAmount} ICP
                                    </>
                                )}
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
