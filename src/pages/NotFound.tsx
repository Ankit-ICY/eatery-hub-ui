import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-6xl font-bold text-primary-foreground">404</span>
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
          >
            <Home className="h-5 w-5" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
