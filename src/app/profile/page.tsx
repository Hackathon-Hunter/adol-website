"use client";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
    const { principal } = useAuth();
    
    return (
        <ProtectedRoute>
            <MainLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Principal ID
                            </label>
                            <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
                                {principal?.toString() || 'Not available'}
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                User Information
                            </label>
                            <p className="text-gray-600">
                                Your profile information will be displayed here.
                            </p>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </ProtectedRoute>
    );
}
