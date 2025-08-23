"use client";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <MainLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Overview</h2>
                            <p className="text-gray-600">Your dashboard overview content goes here.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Statistics</h2>
                            <p className="text-gray-600">Your statistics content goes here.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
                            <p className="text-gray-600">Your quick actions content goes here.</p>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </ProtectedRoute>
    );
}
