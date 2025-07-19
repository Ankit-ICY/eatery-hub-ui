import { X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: any;
}

interface CategoryFilterModalProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onClose: () => void;
}

const CategoryFilterModal = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  onClose 
}: CategoryFilterModalProps) => {
  const handleCategorySelect = (categoryId: string) => {
    onSelectCategory(categoryId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-card rounded-2xl shadow-elegant-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Select Category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted/80 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Categories */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-elegant-sm'
                    : 'bg-muted/50 hover:bg-muted text-foreground'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span className="font-medium">{category.name}</span>
                {selectedCategory === category.id && (
                  <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterModal;