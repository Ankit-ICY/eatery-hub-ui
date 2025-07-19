import { useToast } from '@/hooks/use-toast';
import Toast from './Toast';

const Toaster = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};

export default Toaster;