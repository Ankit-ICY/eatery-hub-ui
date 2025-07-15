import { X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
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
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-card rounded-2xl shadow-elegant-xl w-full max-w-md max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-elegant text-white p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Filter by Category</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelectCategory(category.id);
                  onClose();
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 flex items-center gap-3 ${
                  selectedCategory === category.id
                    ? 'border-primary bg-primary/10 text-primary shadow-elegant-sm'
                    : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedCategory === category.id ? 'bg-primary/20' : 'bg-muted/50'
                }`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterModal;