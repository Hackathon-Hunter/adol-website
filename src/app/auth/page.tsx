"use client"

import React, { useState, useEffect } from 'react';
import { Shield, Smartphone, Key, Lock, Info, Ban, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GradientButton from '../../components/ui/GradientButton';
import { useAuth } from '../../hooks/useAuth';

export default function InternetIdentityLogin() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to a protected page if already authenticated
    if (isAuthenticated && !isLoading) {
      router.push('/home'); // Redirect to home page after login
    }
  }, [isAuthenticated, isLoading, router]);

  const handleIcpLogin = async () => {
    setError(null);
    try {
      await login();
      // Success will be handled by useEffect
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  // Show loading while auth is initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/assets/images/background.png')",
        backgroundColor: "#87CEEB"
      }}
    >
      <div className="relative z-10 w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-semibold text-gray-800">Internet Identity</h1>
              <button className="text-gray-400 hover:text-gray-600">
                <Info size={20} />
              </button>
            </div>
            <p className="text-gray-500 text-sm">Authenticate securely on the Internet Computer</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Features List */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="text-blue-500" size={20} />
              <span className="text-gray-700 text-sm">WebAuth-based security</span>
            </div>

            <div className="flex items-center space-x-3">
              <Smartphone className="text-blue-500" size={20} />
              <span className="text-gray-700 text-sm">Register multiple devices</span>
            </div>

            <div className="flex items-center space-x-3">
              <Key className="text-blue-500" size={20} />
              <span className="text-gray-700 text-sm">Unique identity for each app</span>
            </div>

            <div className="flex items-center space-x-3">
              <Lock className="text-blue-500" size={20} />
              <span className="text-gray-700 text-sm">No usernames or passwords</span>
            </div>
          </div>

          <GradientButton
            className="mb-4"
            onClick={handleIcpLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Shield size={20} />
                <span>Sign in with Internet Identity</span>
              </>
            )}
          </GradientButton>

          {/* Cancel Button */}
          <button className="w-full text-gray-500 py-2 px-6 rounded-xl shadow-md hover:bg-gray-50 transition-colors duration-200 mb-6 flex justify-center items-center gap-2">
            <Ban size={20} />Cancel
          </button>

          {/* Terms */}
          <div className="text-center text-xs text-gray-500 mb-4">
            By authenticating with Internet Identity, you agree to our{' '}
            <button className="text-black hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-black hover:underline">Privacy Policy</button>
          </div>

          {/* Learn More Link */}
          <div className="text-center">
            <span className="text-gray-500 text-sm">New to Internet Identity? </span>
            <button
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              className="text-black hover:underline text-sm font-medium"
            >
              Learn more
            </button>
          </div>
        </div>

        {/* How Internet Identity Works Card */}
        {showHowItWorks && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">How Internet Identity Works</h2>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <p>You'll be redirected to the Internet Identity service</p>
              </div>

              <div className="flex space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <p>Authenticate using your registered device (biometric, security key, etc.)</p>
              </div>

              <div className="flex space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <p>You'll receive a unique pseudonymous identity for this application</p>
              </div>

              <div className="flex space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  4
                </span>
                <p>You'll be redirected back to continue your session</p>
              </div>
            </div>

            <button
              onClick={() => setShowHowItWorks(false)}
              className="w-full mt-6 text-gray-500 py-2 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Got it
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-4 flex flex-col gap-3">
          <h4 className="font-semibold text-black">How Internet Identity Works</h4>
          <div className="flex flex-col gap-2 text-gray-500 text-sm">
            <span>1. You'll be redirected to the Internet Identity service</span>
            <span>2. Authenticate using your registered device (biometrics, security key, etc.)</span>
            <span>3. You'll receive a unique pseudonymous identity for this application</span>
            <span>4. You'll be redirected back to continue your session</span>
          </div>
        </div>
      </div>

    </div>
  );
}