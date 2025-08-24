"use client";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MessageCircle, ExternalLink, AlertCircle, Shield } from "lucide-react";

export default function MessagesPage() {
  const agentUrl = "https://agentverse.ai/agents/details/agent1qd2mu8zses2cxgd46wn9d79esn6u64juz00sg7w0qc5zsxa2v0fgs9c5a6w/profile";

  const openInNewTab = () => {
    window.open(agentUrl, '_blank');
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="h-full flex flex-col items-center justify-center p-8">
          {/* Content Container */}
          <div className="max-w-2xl text-center space-y-8">
            {/* Icon and Title */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <MessageCircle className="w-20 h-20 text-purple-600" />
                  <Shield className="w-8 h-8 text-orange-500 absolute -top-2 -right-2 bg-white rounded-full p-1" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Agent Messages</h1>
                <p className="text-lg text-gray-600">Connect with your AI Agent</p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-800">Security Notice</h3>
              </div>
              <p className="text-amber-700 leading-relaxed">
                For security reasons, the AI agent interface cannot be embedded directly in this page. 
                Agentverse.ai has security policies that prevent iframe embedding to protect against 
                clickjacking attacks.
              </p>
            </div>

            {/* Action Button */}
            <div className="space-y-4">
              <button
                onClick={openInNewTab}
                className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <ExternalLink className="w-6 h-6" />
                Open AI Agent Interface
              </button>
              
              <p className="text-sm text-gray-500">
                This will open the Agentverse AI agent in a new browser tab where you can interact with it safely.
              </p>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-3">What you can do with the AI Agent:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  Chat and get assistance with your projects
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  Receive AI-powered recommendations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  Get help with product development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                  Access advanced AI capabilities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
