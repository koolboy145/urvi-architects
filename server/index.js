/**
 * Backend API Server for Email Functionality
 * 
 * This server handles email sending using SMTP (Gmail).
 * 
 * To run this server:
 * 1. Install dependencies: npm install express nodemailer dotenv cors
 * 2. Create a .env file with EMAIL_USER and EMAIL_PASSWORD
 * 3. Run: node server/index.js
 */

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://127.0.0.1:8080', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('ERROR: EMAIL_USER and EMAIL_PASSWORD must be set in .env file');
  console.error('Please check your .env file and ensure both variables are set.');
}

// Create reusable transporter object using Gmail SMTP
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD in .env file');
  }
  
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Gmail App Password
    },
  });
};

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, name, email, message } = req.body;

    // Validate required fields
    if (!to || !subject || !name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Create transporter
    let transporter;
    try {
      transporter = createTransporter();
    } catch (transporterError) {
      console.error('Failed to create email transporter:', transporterError.message);
      return res.status(500).json({
        success: false,
        error: 'Email service is temporarily unavailable. Please try again later.',
      });
    }

    // Format email body
    const emailBody = `Full Name: ${name}\nEmail Address: ${email}\n\nDescription:\n${message}`;

    // Send email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'URVI Architectural Services'}" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <h3 style="color: #2c3e50; margin-top: 20px;">Description:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    res.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    // Provide user-friendly error messages without exposing technical details
    let errorMessage = 'We\'re sorry, but we encountered an issue sending your message. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email service authentication failed. Please contact support if this issue persists.';
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Unable to connect to email service. Please check your internet connection and try again.';
    } else if (error.code === 'EMESSAGE') {
      errorMessage = 'There was an issue with the email content. Please try again.';
    } else if (error.code === 'EENVELOPE') {
      errorMessage = 'Invalid email address. Please check your information and try again.';
    }
    // For any other errors, use the generic message (don't expose technical details)
    
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Make sure to set EMAIL_USER and EMAIL_PASSWORD in your .env file`);
});

