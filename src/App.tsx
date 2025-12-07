import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Get base path from environment or default to '/'
// Remove trailing slash for React Router (it expects no trailing slash)
const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

// Debug logging in development
if (import.meta.env.DEV) {
  console.log('App initializing. Base URL:', import.meta.env.BASE_URL, 'Base Path:', basePath);
}

const App = () => {
  try {
    return (
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basePath}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    );
  } catch (error) {
    console.error('Error rendering App:', error);
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Application Error</h1>
        <p>Failed to render the application.</p>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    );
  }
};

export default App;
