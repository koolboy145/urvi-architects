# Unused Dependencies Analysis

This document lists dependencies that can be removed to reduce bundle size.

## ✅ Already Removed/Optimized

1. **Removed `next-themes` dependency** - Was only used in `sonner.tsx` for theme switching, but the site doesn't have theme switching. Updated `sonner.tsx` to use fixed `theme="light"`.

2. **Removed `@tanstack/react-query`** - Was imported in `App.tsx` but never actually used for any data fetching. Removed `QueryClientProvider` wrapper.

3. **Optimized Vite build config** - Improved code splitting to better separate vendor chunks.

## 📦 Dependencies That Can Be Removed

These dependencies are installed but not used anywhere in the codebase:

### Form Libraries (Not Used)
- `react-hook-form` - Form library, not used
- `zod` - Schema validation, not used
- `@hookform/resolvers` - Form validation resolvers, not used

### Date/Time Libraries (Not Used)
- `date-fns` - Date utility library, not used
- `react-day-picker` - Date picker component, only in unused `calendar.tsx`

### Chart/Data Visualization (Not Used)
- `recharts` - Charting library, only in unused `chart.tsx`

### UI Component Libraries (Not Used)
- `embla-carousel-react` - Carousel component, only in unused `carousel.tsx`
- `cmdk` - Command menu, only in unused `command.tsx`
- `input-otp` - OTP input, only in unused `input-otp.tsx`
- `vaul` - Drawer component, only in unused `drawer.tsx`
- `react-resizable-panels` - Resizable panels, only in unused `resizable.tsx`

### Unused Radix UI Components

These Radix UI components are in the `src/components/ui/` folder but are never imported:

- `@radix-ui/react-accordion` - accordion.tsx
- `@radix-ui/react-alert-dialog` - alert-dialog.tsx (not used)
- `@radix-ui/react-aspect-ratio` - aspect-ratio.tsx
- `@radix-ui/react-avatar` - avatar.tsx
- `@radix-ui/react-checkbox` - checkbox.tsx
- `@radix-ui/react-collapsible` - collapsible.tsx
- `@radix-ui/react-context-menu` - context-menu.tsx
- `@radix-ui/react-dropdown-menu` - dropdown-menu.tsx
- `@radix-ui/react-hover-card` - hover-card.tsx
- `@radix-ui/react-menubar` - menubar.tsx
- `@radix-ui/react-navigation-menu` - navigation-menu.tsx
- `@radix-ui/react-popover` - popover.tsx
- `@radix-ui/react-progress` - progress.tsx
- `@radix-ui/react-radio-group` - radio-group.tsx
- `@radix-ui/react-scroll-area` - scroll-area.tsx
- `@radix-ui/react-select` - select.tsx
- `@radix-ui/react-separator` - separator.tsx
- `@radix-ui/react-slider` - slider.tsx
- `@radix-ui/react-switch` - switch.tsx
- `@radix-ui/react-tabs` - tabs.tsx
- `@radix-ui/react-toggle` - toggle.tsx
- `@radix-ui/react-toggle-group` - toggle-group.tsx

## ✅ Actually Used Dependencies

These are the only dependencies that are actually used:

### Core
- `react`, `react-dom` - Core React
- `react-router-dom` - Routing

### UI Components (Used)
- `@radix-ui/react-dialog` - Used in PortfolioSection
- `@radix-ui/react-toast` - Used for toast notifications
- `@radix-ui/react-tooltip` - Used in App.tsx
- `@radix-ui/react-slot` - Used in button.tsx and other components

### Utilities
- `lucide-react` - Icons (extensively used)
- `clsx` - Class name utility
- `tailwind-merge` - Tailwind class merging
- `class-variance-authority` - Used in UI components

### Email
- `@emailjs/browser` - Email service

### Toast Notifications
- `sonner` - Toast library (used, but can remove next-themes dependency)

## 🚀 How to Remove Unused Dependencies

To remove unused dependencies, run:

```bash
npm uninstall react-hook-form zod @hookform/resolvers date-fns react-day-picker recharts embla-carousel-react cmdk input-otp vaul react-resizable-panels next-themes @tanstack/react-query
```

Then remove the unused Radix UI components:

```bash
npm uninstall @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group
```

**Note:** You can also delete the unused component files from `src/components/ui/` to further reduce bundle size, but Vite's tree-shaking should already exclude them if they're not imported.

## 📊 Expected Bundle Size Reduction

Removing these unused dependencies should reduce the bundle size by approximately:
- **~200-300 KB** (uncompressed)
- **~50-80 KB** (gzipped)

This will improve:
- Initial page load time
- Time to Interactive (TTI)
- Lighthouse performance score

## ⚠️ Before Removing

1. **Test the build** - Make sure everything still works after removal
2. **Check for dynamic imports** - Some components might be loaded dynamically
3. **Verify tree-shaking** - Vite should already tree-shake unused code, but removing dependencies ensures they're not included at all

