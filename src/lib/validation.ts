/**
 * Validation and sanitization utilities for form inputs
 * Protects against XSS attacks and ensures data integrity
 */

/**
 * Sanitizes a string to prevent XSS attacks
 * Removes potentially dangerous HTML/script tags and escapes special characters
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Escape special characters that could be used in XSS attacks
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  // Replace dangerous characters
  sanitized = sanitized.replace(/[&<>"'/]/g, (char) => escapeMap[char] || char);
  
  // Remove null bytes and control characters
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Validates email format: text@domain.tld
 * Allows letters, numbers, dots, hyphens, underscores, and @ symbol
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }

  // Trim whitespace
  const trimmedEmail = email.trim();

  // Email regex pattern: text@domain.tld
  // Allows: letters, numbers, dots, hyphens, underscores before @
  // Requires: @ symbol
  // After @: domain name with letters, numbers, dots, hyphens
  // Requires: TLD with at least 2 letters
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }

  // Additional checks
  if (trimmedEmail.length > 254) {
    return { isValid: false, error: 'Email address is too long' };
  }

  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return { isValid: false, error: 'Email address cannot contain consecutive dots' };
  }

  // Check that @ appears only once
  const atCount = (trimmedEmail.match(/@/g) || []).length;
  if (atCount !== 1) {
    return { isValid: false, error: 'Email address must contain exactly one @ symbol' };
  }

  return { isValid: true };
}

/**
 * Validates full name: only letters and spaces, no numbers or special characters
 * Allows: letters (including accented characters), spaces, hyphens, apostrophes
 */
export function validateName(name: string): { isValid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: 'Name is required' };
  }

  // Trim whitespace
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return { isValid: false, error: 'Name cannot be empty' };
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, error: 'Name is too long (maximum 100 characters)' };
  }

  // Allow letters (including accented characters), spaces, hyphens, and apostrophes
  // This regex allows international names with accented characters
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      error: 'Not a valid name. Please use only letters.',
    };
  }

  // Check for consecutive spaces
  if (trimmedName.includes('  ')) {
    return { isValid: false, error: 'Name cannot contain consecutive spaces' };
  }

  // Check that name doesn't start or end with space, hyphen, or apostrophe
  if (/^[\s'-]|[\s'-]$/.test(trimmedName)) {
    return {
      isValid: false,
      error: 'Name cannot start or end with a space, hyphen, or apostrophe',
    };
  }

  return { isValid: true };
}

/**
 * Validates and sanitizes message/description field
 */
export function validateMessage(message: string): { isValid: boolean; error?: string } {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message is required' };
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }

  if (trimmedMessage.length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters long' };
  }

  if (trimmedMessage.length > 5000) {
    return { isValid: false, error: 'Message is too long (maximum 5000 characters)' };
  }

  return { isValid: true };
}

/**
 * Sanitizes all form data before sending
 */
export function sanitizeFormData(data: {
  name: string;
  email: string;
  message: string;
}): {
  name: string;
  email: string;
  message: string;
} {
  return {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email).toLowerCase().trim(),
    message: sanitizeInput(data.message),
  };
}

