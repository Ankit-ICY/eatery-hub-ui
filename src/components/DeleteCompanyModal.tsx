import { AlertTriangle, X } from 'lucide-react';

interface DeleteCompanyModalProps {
  companyName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteCompanyModal = ({ companyName, onClose, onConfirm }: DeleteCompanyModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-card rounded-2xl shadow-elegant-xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Delete Company</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted/80 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground mb-6">
            Are you sure you want to delete <span className="font-semibold text-foreground">{companyName}</span>? 
            This action cannot be undone and will permanently remove all associated data including staff members, menu items, and analytics.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 px-4 rounded-xl transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-gradient-danger text-white py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 font-medium"
            >
              Delete Company
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCompanyModal;