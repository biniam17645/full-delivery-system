import React from 'react';

interface BrandLogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  onClick,
  size = 'md',
  className = '',
}) => {
  const boxSizes = {
    sm: 'w-8 h-8 rounded-lg text-lg border',
    md: 'w-11 h-11 rounded-xl text-2xl border-2',
    lg: 'w-14 h-14 rounded-2xl text-3xl border-2',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 cursor-pointer select-none transition-transform active:scale-95 ${className}`}
    >
      <div
        className={`${boxSizes[size]} bg-kechPurple flex items-center justify-center text-white font-extrabold shadow-md border-kechOrange`}
      >
        K
      </div>
      <span className={`${textSizes[size]} font-black tracking-tight text-kechPurple`}>
        KECH<span className="text-kechOrange"> DELIVERY</span>
      </span>
    </div>
  );
};
