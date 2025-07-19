import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  icon?: any;
  action?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, onBack, icon: Icon, action }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-muted-foreground" />
            </button>
          )}
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-base sm:text-lg mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        {action && action}
      </div>
    </div>
  );
};

export default PageHeader;