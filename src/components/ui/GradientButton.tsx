"use client"

import React, { useState } from 'react';
import { Shield, Smartphone, Key, Lock, Info } from 'lucide-react';

// TypeScript interface for GradientButton props
interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

// Reusable Gradient Button Component
const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  disabled = false,
  type = "button"
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-1 w-full
        py-2 px-3 rounded-full text-white font-medium text-sm
        transition-all duration-200 hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
      style={{
        background: 'linear-gradient(180deg, #9BA2FE 0%, #615FFF 100%)',
        boxShadow: `
          0 1px 0 0 rgba(255, 255, 255, 0.50) inset,
          0 -2px 2px 0 rgba(10, 10, 10, 0.10) inset,
          0 0 0 1px #432DD7,
          0 3px 4px -1px rgba(0, 0, 0, 0.25)
        `
      }}
    >
      {children}
    </button>
  );
};

export default GradientButton;