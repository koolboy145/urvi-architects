import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Linkedin, ArrowUpRight, Loader2 } from 'lucide-react';
import { sendEmail } from '@/lib/email.service';
import { useToast } from '@/hooks/use-toast';
import { validateName, validateEmail, validateMessage, sanitizeFormData } from '@/lib/validation';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNameChange = (value: string) => {
    setFormData({ ...formData, name: value });
    // Clear error when user starts typing
    if (errors.name) {
      const validation = validateName(value);
      if (validation.isValid) {
        setErrors({ ...errors, name: undefined });
      } else {
        setErrors({ ...errors, name: validation.error });
      }
    }
  };

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value });
    // Clear error when user starts typing
    if (errors.email) {
      const validation = validateEmail(value);
      if (validation.isValid) {
        setErrors({ ...errors, email: undefined });
      } else {
        setErrors({ ...errors, email: validation.error });
      }
    }
  };

  const handleMessageChange = (value: string) => {
    setFormData({ ...formData, message: value });
    // Clear error when user starts typing
    if (errors.message) {
      const validation = validateMessage(value);
      if (validation.isValid) {
        setErrors({ ...errors, message: undefined });
      } else {
        setErrors({ ...errors, message: validation.error });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const messageValidation = validateMessage(formData.message);

    const newErrors: FormErrors = {};
    
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.error;
    }

    // If there are validation errors, show them and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: 'Please fix the errors',
        description: 'Some fields have validation errors. Please check and correct them.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize all form data before sending
      const sanitizedData = sanitizeFormData(formData);
      const result = await sendEmail(sanitizedData);

      if (result.success) {
        toast({
          title: 'Message sent successfully!',
          description: 'We will get back to you soon.',
        });
        // Reset form and errors
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setErrors({});
      } else {
        toast({
          title: 'Unable to send message',
          description: result.error || 'We encountered an issue sending your message. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'We\'re sorry, but an unexpected error occurred. Please try again later, or contact us directly if the problem persists.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div>
            <p className="label-uppercase text-gold mb-4">Get In Touch</p>
            <h2 className="heading-section text-foreground mb-8">
              Let's Create Something Beautiful Together
            </h2>
            <p className="text-body mb-12">
              Ready to transform your space? We'd love to hear about your project. 
              Reach out for a complimentary consultation.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <a
                  href="https://www.google.com/maps/place/URVI+Architectural+Services/@25.6089411,85.0788031,16z/data=!4m10!1m2!2m1!1s19+Kautilya+Nagar+BMP+Rd+Ashiana+More+Khajpura+Patna+Bihar+800014+India!3m6!1s0x39ed57383d9de94d:0xd6c5d5292ab96623!8m2!3d25.6028098!4d85.0802509!15sCkcxOSBLYXV0aWx5YSBOYWdhciBCTVAgUmQgQXNoaWFuYSBNb3JlIEtoYWpwdXJhIFBhdG5hIEJpaGFyIDgwMDAxNCBJbmRpYVpJIkcxOSBrYXV0aWx5YSBuYWdhciBibXAgcmQgYXNoaWFuYSBtb3JlIGtoYWpwdXJhIHBhdG5hIGJpaGFyIDgwMDAxNCBpbmRpYZIBFmFyY2hpdGVjdHVyYWxfZGVzaWduZXKaASNDaFpEU1VoTk1HOW5TMFZRU3pRNVRqTmlka3hFYUVKbkVBReABAPoBBAgAEEs!16s%2Fg%2F11ls0nm84b?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
                  aria-label="Open location in Google Maps"
                >
                  <MapPin className="w-5 h-5 text-gold" />
                </a>
                <div>
                  <p className="font-medium text-foreground mb-1">Studio</p>
                  <p className="text-muted-foreground">
                    19, Kautilya Nagar, BMP Rd,  Ashiana More,<br />
                    Khajpura, Patna, Bihar 800014, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <a
                  href="tel:+919634659272"
                  className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
                  aria-label="Call +91 96346 59272"
                >
                  <Phone className="w-5 h-5 text-gold" />
                </a>
                <div>
                  <p className="font-medium text-foreground mb-1">Phone</p>
                  <p className="text-muted-foreground">+91 96346 59272</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <a
                  href="mailto:ar.urvija.kriti@gmail.com"
                  className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer"
                  aria-label="Send email to ar.urvija.kriti@gmail.com"
                >
                  <Mail className="w-5 h-5 text-gold" />
                </a>
                <div>
                  <p className="font-medium text-foreground mb-1">Email</p>
                  <p className="text-muted-foreground">ar.urvija.kriti@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/urvi_design/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ar-urvija-kriti-2b85657a/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-cream-dark p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() => {
                    const validation = validateName(formData.name);
                    if (!validation.isValid) {
                      setErrors({ ...errors, name: validation.error });
                    }
                  }}
                  className={`w-full px-4 py-3 bg-background border transition-colors duration-300 focus:outline-none ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-border focus:border-gold'
                  }`}
                  placeholder="Your name (letters only)"
                  required
                  pattern="[a-zA-ZÀ-ÿ\s'-]+"
                  title="Name can only contain letters, spaces, hyphens, and apostrophes"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={() => {
                    const validation = validateEmail(formData.email);
                    if (!validation.isValid) {
                      setErrors({ ...errors, email: validation.error });
                    }
                  }}
                  className={`w-full px-4 py-3 bg-background border transition-colors duration-300 focus:outline-none ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-border focus:border-gold'
                  }`}
                  placeholder="your@email.com"
                  required
                  pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address (format: text@domain.tld)"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Tell Us About Your Project
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  onBlur={() => {
                    const validation = validateMessage(formData.message);
                    if (!validation.isValid) {
                      setErrors({ ...errors, message: validation.error });
                    }
                  }}
                  rows={5}
                  className={`w-full px-4 py-3 bg-background border transition-colors duration-300 resize-none focus:outline-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-border focus:border-gold'
                  }`}
                  placeholder="Describe your vision..."
                  required
                  minLength={10}
                  maxLength={5000}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {formData.message.length}/5000 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-cream font-medium text-sm uppercase tracking-wider hover:bg-gold transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
