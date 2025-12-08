// src/app/components/ContactForm/index.tsx
import React, { useState, useCallback, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { FormField } from '@/app/components/FormField';
import { SubmitButton } from '@/app/components/SubmitButton';
import { FormMessage } from '@/app/components/FormMessage';
import { ContactFormErrorBoundary } from '@/app/components/ErrorBoundary';
import { useRateLimit } from '@/app/components/hooks/useRateLimit';
import { logAnalytics } from '@/app/components/utils/analytics';
import { validateForm } from '@/app/components/utils/validation';
import { ContactFormData, FormErrors } from '@/app/components/types';
import { INITIAL_FORM_STATE, RATE_LIMIT_DURATION, MAX_SUBMISSIONS } from '@/app/components/constants';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning'>('success');
  const formRef = useRef<HTMLFormElement>(null);
  const { isRateLimited, addAttempt } = useRateLimit(RATE_LIMIT_DURATION, MAX_SUBMISSIONS);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
    logAnalytics('form_field_interaction', { field: name, hasValue: !!value.trim() });
  }, []);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isHuman: e.target.checked }));
    setFormErrors(prev => ({ ...prev, isHuman: '' }));
    logAnalytics('form_checkbox_change', { field: 'isHuman', checked: e.target.checked });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage('');

    if (isRateLimited()) {
      setStatusMessage('Too many attempts. Please try again later.');
      setMessageType('warning');
      logAnalytics('form_rate_limited', {});
      return;
    }

    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      logAnalytics('form_validation_failed', { errors });
      return;
    }

    try {
      setIsSubmitting(true);
      addAttempt();
      logAnalytics('form_submission_started', {});

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(INITIAL_FORM_STATE);
        setStatusMessage('Thanks for your message. We will contact you soon.');
        setMessageType('success');
        logAnalytics('form_submission_success', {});
        
        if (formRef.current) {
          const firstInput = formRef.current.querySelector('input');
          firstInput?.focus();
        }
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.message || 'Server issue! Please try again later.');
        setMessageType('error');
        logAnalytics('form_submission_error', { error: errorData.message });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatusMessage('Failed to send message. Please try again.');
      setMessageType('error');
      logAnalytics('form_submission_error', { error: 'Network error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled = isSubmitting || isRateLimited();

  return (
    <ContactFormErrorBoundary>
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-2xl" role="region" aria-label="Contact form">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">Contact Us</h2>
        
        <FormMessage message={statusMessage} type={messageType} />

        {isRateLimited() && (
          <FormMessage 
            message="Please wait before submitting again" 
            type="warning" 
          />
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mt-4" noValidate>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <FormField
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                error={formErrors.firstName}
                disabled={isFormDisabled}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <FormField
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                error={formErrors.lastName}
                disabled={isFormDisabled}
                onChange={handleChange}
              />
            </div>
          </div>

          <FormField
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            error={formErrors.email}
            disabled={isFormDisabled}
            onChange={handleChange}
          />

          <FormField
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone (max 16 digits)"
            value={formData.phone}
            error={formErrors.phone}
            disabled={isFormDisabled}
            onChange={handleChange}
          />

          <FormField
            type="textarea"
            id="message"
            name="message"
            placeholder="Your Message (max 150 words)"
            value={formData.message}
            error={formErrors.message}
            disabled={isFormDisabled}
            onChange={handleChange}
            className="h-24 resize-none"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isHuman"
              name="isHuman"
              checked={formData.isHuman}
              onChange={handleCheckboxChange}
              disabled={isFormDisabled}
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

          <SubmitButton 
            isSubmitting={isSubmitting}
            disabled={isFormDisabled}
          />
        </form>
      </div>
    </ContactFormErrorBoundary>
  );
};

export default ContactForm;