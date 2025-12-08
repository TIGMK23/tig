// src/components/ContactForm/components/SubmitButton.tsx
import { memo } from 'react';
import { Loader } from 'lucide-react';
import { SubmitButtonProps } from './types';

export const SubmitButton: React.FC<SubmitButtonProps> = memo(({ isSubmitting, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className="w-full bg-gray-700 text-white py-3 rounded-lg text-lg font-medium 
              hover:bg-gray-800 transition duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed 
              flex items-center justify-center gap-2"
    aria-busy={isSubmitting}
  >
    {isSubmitting ? (
      <>
        <Loader className="h-5 w-5 animate-spin" />
        Sending...
      </>
    ) : 'Submit'}
  </button>
));

SubmitButton.displayName = 'SubmitButton';
