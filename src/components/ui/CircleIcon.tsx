import React from "react";

interface CircleIconProps {
  children: React.ReactNode;
  bgColor?: string; 
  borderColor?: string; 
  size?: string;
}

const CircleIcon: React.FC<CircleIconProps> = ({
  children,
  bgColor = "bg-white",
  borderColor = "border-gray-300",
  size = "w-8 h-8",
}) => {
  return (
    <div
      className={`rounded-full border flex items-center justify-center ${bgColor} ${borderColor} ${size}`}
    >
      {children}
    </div>
  );
};

export default CircleIcon;
