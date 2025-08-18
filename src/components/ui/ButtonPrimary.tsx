// components/ButtonPrimary.tsx
import React from "react";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm transition flex items-center justify-center gap-1 text-white ${className}`}
      style={{
        borderRadius: "999px",
        background: "linear-gradient(180deg, #7C86FF 0%, #615FFF 100%)",
        boxShadow:
          "0 1px 0 0 rgba(255, 255, 255, 0.33) inset, 0 -2px 2px 0 rgba(10, 10, 10, 0.10) inset, 0 0 0 1.5px #432DD7, 0 3px 4px -1px rgba(0, 0, 0, 0.25)",
        padding: "8px 12px",
      }}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
