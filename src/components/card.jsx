// components/ui/card.jsx
import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="bg-gray-100 p-4 border-b">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h3 className="text-lg font-bold">{children}</h3>;
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const CardFooter = ({ children }) => {
  return <div className="p-4 border-t">{children}</div>;
};

export const CardDescription = ({ children }) => {
  return <p className="text-sm text-gray-600">{children}</p>;
};