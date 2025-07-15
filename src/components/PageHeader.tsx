import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: React.ReactNode;
  icon?: React.ComponentType<any>;
}

const PageHeader = ({ title, subtitle, onBack, action, icon: Icon }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-3 rounded-xl hover:bg-muted/80 transition-colors group"
            >
              <ArrowLeft className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
            </button>
          )}
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground bg-gradient-elegant bg-clip-text text-transparent">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-sm sm:text-base mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;