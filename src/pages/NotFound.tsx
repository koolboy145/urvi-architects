import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-dark">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="mb-4 font-serif text-6xl md:text-7xl text-foreground">404</h1>
        <p className="mb-2 text-xl md:text-2xl text-foreground font-medium">Page Not Found</p>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-cream font-medium text-sm uppercase tracking-wider hover:bg-gold transition-colors duration-500"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
