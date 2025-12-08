
// src/components/ContactForm/components/FormMessage.tsx
import { memo } from 'react';
import { FormMessageProps } from './types';

export const FormMessage: React.FC<FormMessageProps> = memo(({ message, type }) => {
  if (!message) return null;

  const backgroundColors = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-yellow-50'
  };

  const textColors = {
    success: 'text-green-700',
    error: 'text-red-700',
    warning: 'text-yellow-700'
  };

  return (
    <div
      className={`mt-2 p-3 rounded-lg text-center ${backgroundColors[type]} ${textColors[type]}`}
      role="alert"
    >
      {message}
    </div>
  );
});

FormMessage.displayName = 'FormMessage';