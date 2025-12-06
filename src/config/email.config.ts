/**
 * Email Configuration
 * 
 * Configure your email settings here for EmailJS.
 * 
 * To set up EmailJS:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables:
 *    - {{name}} - Sender's name
 *    - {{email}} - Sender's email address
 *    - {{message}} - Message content
 *    - {{subject}} - Email subject
 * 4. Add your Service ID, Template ID, and Public Key to .env file:
 *    - VITE_EMAILJS_SERVICE_ID=your_service_id
 *    - VITE_EMAILJS_TEMPLATE_ID=your_template_id
 *    - VITE_EMAILJS_PUBLIC_KEY=your_public_key
 * 
 * Example EmailJS Template:
 * Subject: {{subject}}
 * 
 * From: {{name}} ({{email}})
 * 
 * Message:
 * {{message}}
 */

export const emailConfig = {
  // Recipient email (configured in EmailJS service settings)
  to: 'guest@wckd.space',
  
  // Email subject template
  subject: 'New Enquiry | Someone wants to Collaborate with you !',
};

