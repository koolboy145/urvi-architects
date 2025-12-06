import emailjs from '@emailjs/browser';
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
 * Send email using EmailJS (client-side, no backend required)
 */
export async function sendEmail(formData: ContactFormData): Promise<EmailResponse> {
  try {
    // Validate EmailJS configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return {
        success: false,
        error: 'Email service is not configured. Please contact support.',
      };
    }

    // Initialize EmailJS with public key
    emailjs.init(publicKey);

    // Prepare template parameters
    // These variables match standard EmailJS template variables: {{name}}, {{email}}, {{message}}, {{subject}}
    const templateParams = {
      name: formData.name,           // Maps to {{name}} in EmailJS template
      email: formData.email,         // Maps to {{email}} in EmailJS template
      message: formData.message,      // Maps to {{message}} in EmailJS template
      subject: emailConfig.subject,  // Maps to {{subject}} in EmailJS template
      // Additional formatted version for convenience
      email_body: `Full Name: ${formData.name}\nEmail Address: ${formData.email}\n\nDescription:\n${formData.message}`,
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: 'We encountered an issue sending your message. Please try again.',
      };
    }
  } catch (error) {
    // Provide user-friendly error messages
    let errorMessage = 'We\'re sorry, but something went wrong. Please try again later.';
    
    if (error instanceof Error) {
      // EmailJS specific error handling
      if (error.message.includes('Invalid') || error.message.includes('invalid')) {
        errorMessage = 'Please check your information and try again.';
      } else if (error.message.includes('Network') || error.message.includes('network')) {
        errorMessage = 'Unable to connect to email service. Please check your internet connection and try again.';
      } else if (error.message.includes('Service') || error.message.includes('Template')) {
        errorMessage = 'Email service configuration error. Please contact support.';
      }
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

