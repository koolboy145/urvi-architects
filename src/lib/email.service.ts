import { emailConfig } from '@/config/email.config';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  error?: string;
}

/**
 * Send email using the backend API
 */
export async function sendEmail(formData: ContactFormData): Promise<EmailResponse> {
  try {
    // In development, use relative path so Vite proxy routes to backend
    // In production, use full URL from env variable
    const isDevelopment = import.meta.env.DEV;
    const apiUrl = isDevelopment 
      ? '/api/send-email'  // Use proxy in development
      : (import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/send-email` : '/api/send-email');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailConfig.to,
        subject: emailConfig.subject,
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'We encountered an issue sending your message. Please try again.';
      
      try {
        const errorData = await response.json();
        
        // Map server errors to user-friendly messages
        if (errorData.error) {
          if (errorData.error.includes('Authentication failed') || errorData.error.includes('EAUTH')) {
            errorMessage = 'Email service configuration error. Please contact support.';
          } else if (errorData.error.includes('Connection') || errorData.error.includes('ECONNECTION')) {
            errorMessage = 'Unable to connect to email service. Please check your internet connection and try again.';
          } else if (errorData.error.includes('Missing required fields')) {
            errorMessage = 'Please fill in all required fields.';
          } else if (errorData.error.includes('Invalid email format')) {
            errorMessage = 'Please enter a valid email address.';
          } else {
            errorMessage = errorData.error;
          }
        } else if (response.status === 400) {
          errorMessage = 'Invalid request. Please check your information and try again.';
        } else if (response.status === 500) {
          errorMessage = 'Our server encountered an issue. Please try again in a moment.';
        } else if (response.status >= 400 && response.status < 500) {
          errorMessage = 'There was an issue with your request. Please try again.';
        }
      } catch {
        // If we can't parse the error response, use generic message
        if (response.status === 500) {
          errorMessage = 'Our server encountered an issue. Please try again in a moment.';
        } else {
          errorMessage = 'We encountered an issue sending your message. Please try again.';
        }
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }

    await response.json();
    return {
      success: true,
    };
  } catch (error) {
    // Provide user-friendly error messages
    let errorMessage = 'We\'re sorry, but something went wrong. Please try again later.';
    
    if (error instanceof TypeError) {
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to our servers. Please check your internet connection and try again.';
      } else {
        errorMessage = 'A network error occurred. Please try again.';
      }
    } else if (error instanceof Error && error.message) {
      // Only show user-friendly error messages, not technical details
      errorMessage = 'An unexpected error occurred. Please try again.';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

