// components/ui/input.jsx
import React from 'react';

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};