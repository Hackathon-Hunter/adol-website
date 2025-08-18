"use client";
import React from "react";

interface ButtonSecondaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-3 py-1.5 text-black
        rounded-full text-sm font-medium
        bg-gradient-to-b from-white to-[#EBEBEB]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.33),inset_0_-2px_2px_rgba(255,255,255,0.1),0_0_0_1.5px_#E8E8E8,0_3px_4px_-1px_rgba(0,0,0,0.25)]
        transition
        ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
