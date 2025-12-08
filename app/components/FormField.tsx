// src/components/ContactForm/components/FormField.tsx
import React, { memo } from 'react';
import { FormFieldProps } from './types';

export const FormField: React.FC<FormFieldProps> = memo(({
  type,
  id,
  name,
  placeholder,
  value,
  error,
  disabled,
  onChange,
  className = ''
}) => {
  const baseClassName = `
    w-full p-3 border rounded-lg
    ${error ? 'border-red-500' : 'border-gray-300'}
    focus:outline-none focus:ring-2 focus:ring-gray-400
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  const sharedProps = {
    id,
    name,
    placeholder,
    className: baseClassName,
    onChange,
    value,
    disabled,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined
  };

  return (
    <div>
      {type === 'textarea' ? (
        <textarea
          {...sharedProps}
          className={`${baseClassName} h-24 resize-none`}
        />
      ) : (
        <input
          {...sharedProps}
          type={type}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-red-500 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';
