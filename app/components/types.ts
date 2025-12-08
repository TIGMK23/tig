// src/components/ContactForm/types.ts
import { ChangeEvent, ReactNode } from 'react';

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    message: string;
    isHuman: boolean;
  }
  
export interface FormErrors {
    [key: string]: string;
  }
  
export interface FormFieldProps {
    type: 'text' | 'email' | 'tel' | 'textarea';
    id: string;
    name: keyof ContactFormData;  // This ensures name can only be a key from ContactFormData
    placeholder: string;
    value: string;
    error?: string;
    disabled: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
  }
  
export interface SubmitButtonProps {
    isSubmitting: boolean;
    disabled: boolean;
  }
  
export interface FormMessageProps {
    message: string;
    type: 'success' | 'error' | 'warning';
  }

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  isHuman: boolean;
}


export interface FormFieldProps {
  type: 'text' | 'email' | 'tel' | 'textarea';
  id: string;
  name: keyof FormData;
  placeholder: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

export interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled: boolean;
}

export interface FormMessageProps {
  message: string;
  type: 'success' | 'error' | 'warning';
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    message: string;
    isHuman: boolean;
  }
  
