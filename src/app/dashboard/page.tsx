"use client";

import { useState } from "react";
import { BarChart3, ShoppingBag, Users, TrendingUp, DollarSign, Activity } from "lucide-react";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import TopUpBalance from "@/components/ui/TopUpBalance";

export default function DashboardPage() {
    const [balance, setBalance] = useState(50);

    const handleTopUp = (amount: number) => {
        setBalance(prev => prev + amount);
        // Here you would typically update the balance in your backend/state management
        console.log(`Topped up ${amount} ICP. New balance: ${balance + amount}`);
    };

    const stats = [
        {
            title: "Total Sales",
            value: "Rp 45,230,000",
            change: "+12.5%",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            title: "Active Listings",
            value: "24",
            change: "+3",
            icon: ShoppingBag,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            title: "Total Views",
            value: "1,247",
            change: "+18.2%",
            icon: Activity,
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            title: "Conversion Rate",
            value: "3.2%",
            change: "+0.8%",
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-100"
        }
    ];

    return (
        <ProtectedRoute>
            <MainLayout>
                <div className="p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
                        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* ICP Balance - Takes full width on mobile, 1 column on desktop */}
                        <div className="lg:col-span-1">
                            <TopUpBalance 
                                currentBalance={balance}
                                onTopUp={handleTopUp}
                            />
                        </div>

                        {/* Quick Stats - Takes 2 columns on desktop */}
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                                {stats.map((stat, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                                <stat.icon size={20} className={stat.color} />
                                            </div>
                                            <span className={`text-sm font-medium ${stat.color}`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                                {stat.value}
                                            </h3>
                                            <p className="text-gray-600 text-sm">{stat.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Additional Dashboard Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <BarChart3 size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                                    <p className="text-gray-600 text-sm">Your latest store activities</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            New order for Marshall Headphones
                                        </p>
                                        <p className="text-xs text-gray-600">2 hours ago</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            Product listing updated
                                        </p>
                                        <p className="text-xs text-gray-600">5 hours ago</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            New customer message
                                        </p>
                                        <p className="text-xs text-gray-600">1 day ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <Users size={20} className="text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                                    <p className="text-gray-600 text-sm">Manage your store efficiently</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                                <button className="flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ShoppingBag size={16} className="text-blue-600" />
                                    <span className="text-sm font-medium text-gray-900">Add New Product</span>
                                </button>
                                
                                <button className="flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <BarChart3 size={16} className="text-green-600" />
                                    <span className="text-sm font-medium text-gray-900">View Analytics</span>
                                </button>
                                
                                <button className="flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Users size={16} className="text-purple-600" />
                                    <span className="text-sm font-medium text-gray-900">Customer Support</span>
                                </button>
                                
                                <button className="flex items-center gap-3 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                    <DollarSign size={16} className="text-orange-600" />
                                    <span className="text-sm font-medium text-gray-900">Payment Settings</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </ProtectedRoute>
    );
}
