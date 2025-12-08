// src/app/components/constants.ts
import { ContactFormData } from './types';

export const INITIAL_FORM_STATE: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  isHuman: false
};

export const RATE_LIMIT_DURATION = 60000; // 1 minute
export const MAX_SUBMISSIONS = 3;
