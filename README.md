# URVI Architectural Services

> A modern, responsive portfolio website showcasing architectural and interior design services with a sophisticated UI and seamless user experience.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.6-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![EmailJS](https://img.shields.io/badge/EmailJS-4.4.1-F06A66?logo=emailjs)](https://www.emailjs.com/)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Configuration](#configuration)
  - [EmailJS Setup](#emailjs-setup)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
  - [GitHub Pages](#github-pages)
  - [Production Build](#production-build)
- [User Guide](#user-guide)
  - [Navigation](#navigation)
  - [Portfolio Section](#portfolio-section)
  - [Contact Form](#contact-form)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
  - [Email Service Issues](#email-service-issues)
  - [GitHub Pages Deployment Issues](#github-pages-deployment-issues)
  - [Build and Development Issues](#build-and-development-issues)

## Features

✨ **Modern UI/UX**
- Responsive design optimized for all devices
- Smooth scroll animations and transitions
- Dynamic navigation bar with scroll-based styling
- Professional color palette with gold accents

📱 **Interactive Components**
- Portfolio gallery with modal project details
- Testimonials carousel
- Contact form with EmailJS integration
- Clickable contact information (maps, phone, email)

🎨 **Design Sections**
- Hero section with compelling visuals
- Philosophy and values showcase
- Services overview
- Statistics display
- Portfolio with project details
- Process workflow
- Team showcase
- Client testimonials
- Contact section with form

🚀 **Performance**
- Fast page loads with Vite
- Optimized images and assets
- Client-side routing with React Router
- No backend required (EmailJS for contact form)

## Tech Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.2.6** - Build tool and dev server
- **React Router 6.30.1** - Client-side routing

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Email Service
- **EmailJS 4.4.1** - Client-side email service (no backend required)

### Additional Libraries
- **TanStack Query** - Data fetching and state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 9.x or higher (comes with Node.js)
- **Git** (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/koolboy145/urvi-architects.git
   cd urvi-architects
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```
   
   See [EmailJS Setup](#emailjs-setup) for detailed instructions.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:8080`

### Development

The development server runs on `http://localhost:8080` with hot module replacement (HMR) enabled. Changes to your code will automatically refresh in the browser.

**Development Features:**
- Fast refresh on file changes
- Source maps for debugging
- TypeScript type checking
- ESLint for code quality

## Configuration

### EmailJS Setup

EmailJS is used for the contact form functionality. It's a client-side service that requires no backend server.

#### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

#### Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Save your Service ID** (you'll need this later)

**For Gmail:**
- Enable "Less secure app access" or use OAuth2
- Or use Gmail API with OAuth2 (recommended for production)

#### Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use these template variables (automatically sent from the contact form):
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email address
   - `{{message}}` - Message content
   - `{{subject}}` - Email subject
   - `{{email_body}}` - Pre-formatted email body (optional)

4. **Template Example:**
   ```
   Subject: {{subject}}
   
   From: {{name}} ({{email}})
   
   Message:
   {{message}}
   ```

5. **Save your Template ID** (you'll need this later)

**Important:** Variable names must match exactly:
- `{{name}}` (not `{{from_name}}` or `{{user_name}}`)
- `{{email}}` (not `{{from_email}}` or `{{user_email}}`)
- `{{message}}` (not `{{content}}` or `{{msg}}`)
- `{{subject}}` (optional, for dynamic subject)

#### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. **Copy your Public Key**

#### Step 5: Configure Environment Variables

Add the following to your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Important:**
- Replace placeholder values with your actual IDs from EmailJS
- The `VITE_` prefix is required for Vite to expose these variables to the frontend
- Never commit your `.env` file to version control (it's already in `.gitignore`)

#### Step 6: Test the Configuration

1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Submit the form
4. Check your email inbox for the test message
5. Check EmailJS dashboard → **Logs** to see if the email was sent

### Environment Variables

**Local Development (.env file):**
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Production (GitHub Pages):**
Set these as GitHub Secrets (see [GitHub Pages Deployment](#github-pages))

## Deployment

### GitHub Pages

This project is configured for deployment to GitHub Pages using GitHub Actions.

#### Prerequisites

1. Repository on GitHub
2. GitHub Pages enabled in repository settings
3. EmailJS credentials set up (see [EmailJS Setup](#emailjs-setup))

#### Step 1: Update Repository Name

In `vite.config.ts`, update the base path to match your repository name:

```typescript
base: mode === 'production' ? '/your-repo-name/' : '/',
```

Replace `your-repo-name` with your actual repository name.

#### Step 2: Configure GitHub Secrets

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each variable:
   - **Name:** `VITE_EMAILJS_SERVICE_ID` → **Value:** Your EmailJS Service ID
   - **Name:** `VITE_EMAILJS_TEMPLATE_ID` → **Value:** Your EmailJS Template ID
   - **Name:** `VITE_EMAILJS_PUBLIC_KEY` → **Value:** Your EmailJS Public Key

**Important:** Secret names must match exactly (case-sensitive):
- `VITE_EMAILJS_SERVICE_ID` (not `EMAILJS_SERVICE_ID`)
- `VITE_EMAILJS_TEMPLATE_ID` (not `EMAILJS_TEMPLATE_ID`)
- `VITE_EMAILJS_PUBLIC_KEY` (not `EMAILJS_PUBLIC_KEY`)

#### Step 3: Configure GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **"GitHub Actions"** (not "Deploy from a branch")
3. The workflow file (`.github/workflows/deploy.yml`) is already configured

#### Step 4: Deploy

1. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. GitHub Actions will automatically:
   - Build the site
   - Deploy to GitHub Pages
   - Make it available at `https://your-username.github.io/your-repo-name/`

3. Monitor the deployment:
   - Go to **Actions** tab in your repository
   - Check the workflow run status
   - View build logs if there are any issues

#### What Works on GitHub Pages

✅ Frontend React application  
✅ All UI components and interactions  
✅ Portfolio section with modals  
✅ Navigation and routing (with 404.html configuration)  
✅ Email Contact Form (using EmailJS)  
✅ All animations and transitions  

### Production Build

To build the site for production:

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

**Test the production build locally:**
```bash
npm run build
npm run preview
```

Visit `http://localhost:4173/your-repo-name/` (replace with your repo name)

## User Guide

### Navigation

The navigation bar is fixed at the top of the page and includes:

- **Logo/Brand** - Click to scroll to top
- **Navigation Links** - Smooth scroll to sections:
  - Home
  - Services
  - Portfolio
  - Process
  - Team
  - Testimonials
  - Contact
- **Mobile Menu** - Hamburger menu for mobile devices

**Features:**
- Transparent background when at top of page
- White background with backdrop blur when scrolled
- Text color transitions: white (top) → black (scrolled)
- Smooth color transitions (500ms duration)

### Portfolio Section

The portfolio section displays featured projects in a masonry grid layout.

**Features:**
- **Initial View**: Shows 4 featured projects
- **View All Projects Button**: Opens a modal with all projects
- **Project Cards**: Click any project card to view details
- **Project Details Modal**: 
  - Full project description
  - Multiple images
  - Location and year information
  - Scrollable content
  - Back button to return to all projects view

**Usage:**
1. Browse featured projects on the main page
2. Click "View All Projects" to see the complete portfolio
3. Click any project card to view detailed information
4. Use the back button (←) to return to the projects grid
5. Click outside the modal or the X button to close

### Contact Form

The contact form allows visitors to send inquiries directly via email.

**Form Fields:**
- **Name** (required) - Your full name
- **Email** (required) - Your email address
- **Message** (required) - Your inquiry or message

**Features:**
- Real-time validation
- Loading state during submission
- Success/error notifications
- Automatic form reset on success

**How to Use:**
1. Fill in all required fields
2. Click "Send Message"
3. Wait for confirmation (success or error message)
4. Check your email inbox for the inquiry

**Contact Information:**
- **Studio Location**: Click the map icon to open in Google Maps
- **Phone**: Click the phone icon to call (mobile) or use default phone app
- **Email**: Click the email icon to open default email client
- **Social Media**: Click Instagram or LinkedIn icons to visit profiles

## Project Structure

```
urvi-architects/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   └── 404.html                # 404 handler for GitHub Pages routing
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components (Radix UI)
│   │   ├── ContactSection.tsx  # Contact form and information
│   │   ├── Footer.tsx          # Site footer
│   │   ├── HeroSection.tsx     # Hero/landing section
│   │   ├── Navigation.tsx     # Top navigation bar
│   │   ├── PhilosophySection.tsx
│   │   ├── PortfolioSection.tsx # Portfolio gallery and modals
│   │   ├── ProcessSection.tsx  # Process workflow
│   │   ├── ServicesSection.tsx # Services overview
│   │   ├── StatsSection.tsx    # Statistics display
│   │   ├── TeamSection.tsx     # Team showcase
│   │   └── TestimonialsSection.tsx # Client testimonials
│   ├── config/
│   │   └── email.config.ts     # Email configuration
│   ├── lib/
│   │   └── email.service.ts    # EmailJS integration
│   ├── pages/
│   │   ├── Index.tsx          # Main page
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx                 # Root component with routing
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and Tailwind imports
├── .env                        # Environment variables (not committed)
├── .gitignore                 # Git ignore rules
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server at `http://localhost:8080` with hot module replacement.

### Build

```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

```bash
npm run build:dev
```
Creates a development build (useful for testing).

### Preview

```bash
npm run preview
```
Preview the production build locally. Run `npm run build` first.

### Lint

```bash
npm run lint
```
Run ESLint to check code quality and find potential issues.

## Troubleshooting

### Email Service Issues

#### Issue: "Email service is not configured" Error

**Symptoms:**
- Error message appears when submitting contact form
- Works locally but not on GitHub Pages

**Solutions:**

1. **Verify GitHub Secrets Are Set**
   - Go to repository → **Settings** → **Secrets and variables** → **Actions**
   - Verify exact secret names (case-sensitive):
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`
   - Ensure no extra spaces and values are not empty

2. **Check GitHub Actions Workflow**
   - Go to **Actions** tab → latest workflow run
   - Expand "Verify EmailJS secrets are set" step
   - ❌ errors = secrets not set correctly
   - ✅ = secrets are being read

3. **Verify Secret Values Match Local .env**
   - Local `.env` values should match GitHub Secrets
   - No `VITE_` prefix in the values themselves (only in secret names)

4. **Rebuild and Redeploy**
   - Push a new commit to trigger rebuild
   - Or manually trigger: **Actions** → **Deploy to GitHub Pages** → **Run workflow**

5. **Check Browser Console**
   - Open Developer Tools (F12) → **Console** tab
   - Look for specific error messages
   - Check **Network** tab for failed requests

**Common Issues:**

- **Secret names don't match**: Must be exactly `VITE_EMAILJS_SERVICE_ID` (not `EMAILJS_SERVICE_ID`)
- **Values have extra spaces**: Copy-paste directly from EmailJS dashboard
- **Secrets set after build**: Push new commit to trigger rebuild
- **Service/Template not found**: Verify IDs in EmailJS dashboard

#### Issue: Email Not Sending Locally

**Solutions:**

1. **Check Environment Variables**
   - Ensure `.env` file exists in root directory
   - All three variables are set
   - Variables start with `VITE_` prefix
   - Restart dev server after changing `.env`

2. **Check EmailJS Dashboard**
   - Go to **Logs** to see error messages
   - Verify service is active
   - Check template variables match your template

3. **Check Browser Console**
   - Open DevTools (F12) → **Console** tab
   - Look for error messages

4. **Common Errors:**
   - **"Service not found"**: Check Service ID
   - **"Template not found"**: Check Template ID
   - **"Invalid public key"**: Check Public Key
   - **"Rate limit exceeded"**: Free tier allows 200 emails/month

### GitHub Pages Deployment Issues

#### Issue: White Page on GitHub Pages

**Symptoms:**
- Site loads but shows blank white page
- No errors in console but assets not loading

**Solutions:**

1. **Use GitHub Actions (Recommended)**
   - Go to repository → **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"** (not "Deploy from a branch")
   - Push a commit to trigger deployment

2. **Verify Base Path**
   - Check `vite.config.ts`:
     ```typescript
     base: mode === 'production' ? '/your-repo-name/' : '/',
     ```
   - Replace `your-repo-name` with your actual repository name
   - Rebuild and redeploy

3. **Check Browser Console**
   - Open Developer Tools (F12)
   - **Console** tab: Look for errors
   - **Network** tab: Check if assets are loading (404 = base path issue)

4. **Verify Deployment Files**
   - Check if `dist` folder contents are deployed
   - Verify `index.html` exists in root
   - Check that `404.html` exists (needed for React Router)

5. **Test Production Build Locally**
   ```bash
   npm run build
   npm run preview
   ```
   Visit `http://localhost:4173/your-repo-name/`
   - If it works locally but not on GitHub Pages = deployment config issue
   - If it doesn't work locally = build issue

**Quick Fix Checklist:**
- [ ] Base path in `vite.config.ts` matches repository name
- [ ] Using GitHub Actions for deployment (not branch deployment)
- [ ] `404.html` exists in `public/` folder
- [ ] Build completes without errors
- [ ] Check browser console for specific errors
- [ ] Verify assets are loading (check Network tab)

#### Issue: Assets Not Loading (404 Errors)

**Symptoms:**
- CSS/JS files return 404
- Images not displaying
- Base path mismatch

**Solutions:**

1. **Verify Base Path Configuration**
   - Check `vite.config.ts` base path matches repository name
   - Ensure `NODE_ENV=production` during build

2. **Check GitHub Actions Build Logs**
   - Verify build step completed successfully
   - Check that environment variables were set

3. **Verify Asset Paths**
   - Assets should be prefixed with repository name
   - Example: `/urvi-architects/assets/index.js` (not `/assets/index.js`)

#### Issue: React Router Not Working (404 on Refresh)

**Symptoms:**
- Direct URL access returns 404
- Navigation works but refresh breaks

**Solutions:**

1. **Verify 404.html Exists**
   - Check `public/404.html` file exists
   - Contains JavaScript redirect to `index.html`

2. **Check pathSegmentsToKeep**
   - In `public/404.html`, ensure `pathSegmentsToKeep = 1` (for repo name in URL)
   - For custom domain, set to `0`

### Build and Development Issues

#### Issue: Build Fails

**Solutions:**

1. **Check Node.js Version**
   - Ensure Node.js 20.x or higher
   - Run `node --version`

2. **Clear Cache and Reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check for TypeScript Errors**
   ```bash
   npm run build
   ```
   Fix any TypeScript compilation errors

4. **Check Environment Variables**
   - Ensure all required variables are set
   - Verify `.env` file exists and is properly formatted

#### Issue: Development Server Won't Start

**Solutions:**

1. **Check Port Availability**
   - Default port is 8080
   - Change in `vite.config.ts` if needed:
     ```typescript
     server: {
       port: 8080, // Change to available port
     }
     ```

2. **Clear Cache**
   ```bash
   rm -rf node_modules .vite
   npm install
   ```

3. **Check for Syntax Errors**
   - Review recent changes
   - Check console for error messages

#### Issue: TypeScript Errors

**Solutions:**

1. **Check tsconfig.json**
   - Ensure configuration is correct
   - Verify path aliases match `vite.config.ts`

2. **Update Type Definitions**
   ```bash
   npm install --save-dev @types/node @types/react @types/react-dom
   ```

3. **Restart TypeScript Server**
   - In VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

### General Troubleshooting Tips

1. **Always check browser console** for specific error messages
2. **Verify environment variables** are set correctly (local and production)
3. **Test locally first** before deploying
4. **Check GitHub Actions logs** for deployment issues
5. **Verify file paths** match your repository structure
6. **Clear browser cache** if seeing stale content
7. **Check network tab** for failed requests

### Getting Help

If you've tried all troubleshooting steps and still have issues:

1. Check GitHub Actions workflow logs for detailed error messages
2. Review browser console for client-side errors
3. Verify all configuration files match the documentation
4. Test with a fresh clone of the repository
5. Check EmailJS dashboard logs for email-related issues

## Security Notes

- **EmailJS Public Key** is safe to expose in frontend code
- **Service ID and Template ID** are identifiers, not sensitive credentials
- EmailJS handles authentication server-side
- No backend server or API keys needed in frontend
- Environment variables with `VITE_` prefix are embedded in build (expected behavior)

## License

This project is private and proprietary.

---

**Built with ❤️ for URVI Architectural Services**
