'use client';

import React, { useState, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  isHuman: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const INITIAL_FORM_STATE: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  isHuman: false
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{0,16}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validate specific fields
    if (name === 'message' && value.split(' ').length > 150) return;
    if (name === 'phone' && !validatePhone(value)) return;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isHuman: e.target.checked }));
    setFormErrors(prev => ({ ...prev, isHuman: '' }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    requiredFields.forEach((field) => {
      if (!formData[field as keyof FormData].toString().trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation (if provided)
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Message length
    if (formData.message && formData.message.split(' ').length > 150) {
      errors.message = 'Message cannot exceed 150 words';
    }

    // Human verification
    if (!formData.isHuman) {
      errors.isHuman = 'Please confirm you are human';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(INITIAL_FORM_STATE);
        setSuccessMessage('Thanks for your message. We will contact you soon.');
      } else {
        const errorData = await response.json();
        setSuccessMessage(errorData.message || 'Server issue! Please try again later.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSuccessMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName: string) => `
    w-full p-3 border rounded-lg
    ${formErrors[fieldName] ? 'border-red-500' : 'border-gray-300'}
    focus:outline-none focus:ring-2 focus:ring-gray-400
  `;

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl" role="region" aria-label="Contact form">      
      {successMessage && (
        <div className="mt-2 p-3 rounded-lg bg-green-50 text-green-700 text-center" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4" noValidate>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className={getInputClassName('firstName')}
              onChange={handleChange}
              value={formData.firstName}
              aria-invalid={!!formErrors.firstName}
              aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
            />
            {formErrors.firstName && (
              <p id="firstName-error" className="mt-1 text-red-500 text-sm" role="alert">
                {formErrors.firstName}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className={getInputClassName('lastName')}
              onChange={handleChange}
              value={formData.lastName}
              aria-invalid={!!formErrors.lastName}
              aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
            />
            {formErrors.lastName && (
              <p id="lastName-error" className="mt-1 text-red-500 text-sm" role="alert">
                {formErrors.lastName}
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={getInputClassName('email')}
            onChange={handleChange}
            value={formData.email}
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? 'email-error' : undefined}
          />
          {formErrors.email && (
            <p id="email-error" className="mt-1 text-red-500 text-sm" role="alert">
              {formErrors.email}
            </p>
          )}
        </div>

        <div>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone (max 16 digits)"
            className={getInputClassName('phone')}
            onChange={handleChange}
            value={formData.phone}
            aria-invalid={!!formErrors.phone}
            aria-describedby={formErrors.phone ? 'phone-error' : undefined}
          />
          {formErrors.phone && (
            <p id="phone-error" className="mt-1 text-red-500 text-sm" role="alert">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message (max 150 words)"
            className={`${getInputClassName('message')} h-24 resize-none`}
            onChange={handleChange}
            value={formData.message}
            aria-invalid={!!formErrors.message}
            aria-describedby={formErrors.message ? 'message-error' : undefined}
          />
          {formErrors.message && (
            <p id="message-error" className="mt-1 text-red-500 text-sm" role="alert">
              {formErrors.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isHuman"
            name="isHuman"
            checked={formData.isHuman}
            onChange={handleCheckboxChange}
            className="w-5 h-5"
            aria-invalid={!!formErrors.isHuman}
            aria-describedby={formErrors.isHuman ? 'isHuman-error' : undefined}
          />
          <label htmlFor="isHuman" className="text-gray-700">I am a human</label>
          {formErrors.isHuman && (
            <span id="isHuman-error" className="text-red-500 text-sm flex items-center gap-1" role="alert">
              <AlertCircle className="h-4 w-4" /> {formErrors.isHuman}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-700 text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;