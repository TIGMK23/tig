// src/app/components/utils/validation.ts
import { ContactFormData, FormErrors } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\d{0,16}$/;
  return phoneRegex.test(phone);
};

export const validateForm = (formData: ContactFormData): FormErrors => {
  const errors: FormErrors = {};
  
  // Required fields validation
  const requiredFields: (keyof ContactFormData)[] = ['firstName', 'lastName', 'email', 'message'];
  requiredFields.forEach((field) => {
    if (!formData[field].toString().trim()) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  // Email validation
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Message length validation
  if (formData.message && formData.message.split(' ').length > 150) {
    errors.message = 'Message cannot exceed 150 words';
  }

  // Human verification
  if (!formData.isHuman) {
    errors.isHuman = 'Please confirm you are human';
  }

  return errors;
};