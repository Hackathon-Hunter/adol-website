
import React from 'react';

interface AdolLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const AdolLogo: React.FC<AdolLogoProps> = ({ 
  width = 40, 
  height = 40, 
  className = "" 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 40 40" 
      fill="none"
      className={className}
    >
      <rect width="40" height="40" rx="20" fill="#615FFF"/>
      <path d="M23 16.9998V11H11V16.9998L23 16.9998Z" fill="white"/>
      <path d="M22.9998 22.9996C19.6861 22.9996 16.9998 25.6859 16.9998 28.9995L11.0007 28.9997L11.0007 28.8449C11.0832 22.3146 16.3822 17.0412 22.9225 17L29 17.0003V29H23L22.9998 22.9996Z" fill="white"/>
    </svg>
  );
};

export default AdolLogo;