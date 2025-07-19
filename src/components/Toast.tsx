import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  onRemove: (id: string) => void;
}

const Toast = ({ id, title, description, variant = 'default', onRemove }: ToastProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-success/90 text-success-foreground border-success/20';
      case 'error':
        return 'bg-destructive/90 text-destructive-foreground border-destructive/20';
      case 'warning':
        return 'bg-warning/90 text-warning-foreground border-warning/20';
      default:
        return 'bg-gradient-card text-foreground border-border';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className={`${getVariantStyles()} rounded-xl border shadow-elegant-md p-4 mb-3 animate-slide-in-right`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold text-sm">{title}</p>}
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
        <button
          onClick={() => onRemove(id)}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;