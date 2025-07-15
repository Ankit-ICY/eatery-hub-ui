import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Filter,
  Search,
  Leaf,
  Beef,
  Coffee,
  Cake,
  UtensilsCrossed,
  Star,
  Eye,
  EyeOff,
  Tag
} from 'lucide-react';
import CategoryFilterModal from '../components/CategoryFilterModal';
import PageHeader from '../components/PageHeader';

// Mock data for food items
const mockFoodItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Fresh tomato sauce, mozzarella cheese, basil leaves',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    category: { id: '1', name: 'Italian' },
    group: 'food',
    food_type: 'veg',
    price: 299,
    is_available: true,
    special_tag: 'special',
    visibility: 'public'
  },
  {
    id: '2',
    name: 'Chicken Tikka',
    description: 'Marinated chicken grilled to perfection',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    category: { id: '2', name: 'Indian' },
    group: 'food',
    food_type: 'non_veg',
    price: 399,
    is_available: true,
    special_tag: 'food_of_day',
    visibility: 'public'
  },
  {
    id: '3',
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk foam',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    category: { id: '3', name: 'Coffee' },
    group: 'drink',
    food_type: 'veg',
    price: 149,
    is_available: true,
    special_tag: 'none',
    visibility: 'public'
  },
  {
    id: '4',
    name: 'Chocolate Brownie',
    description: 'Warm chocolate brownie with vanilla ice cream',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
    category: { id: '4', name: 'Desserts' },
    group: 'dessert',
    food_type: 'veg',
    price: 199,
    is_available: false,
    special_tag: 'limited',
    visibility: 'public'
  },
  {
    id: '5',
    name: 'Dal Makhani',
    description: 'Creamy black lentils cooked with butter and cream',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    category: { id: '5', name: 'Dal' },
    group: 'food',
    food_type: 'veg',
    price: 249,
    is_available: true,
    special_tag: 'none',
    visibility: 'public'
  },
  {
    id: '6',
    name: 'Iced Tea',
    description: 'Refreshing lemon iced tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
    category: { id: '6', name: 'Beverages' },
    group: 'drink',
    food_type: 'veg',
    price: 99,
    is_available: true,
    special_tag: 'none',
    visibility: 'public'
  }
];

const categories = [
  { id: 'all', name: 'All Categories', icon: UtensilsCrossed },
  { id: '1', name: 'Italian', icon: UtensilsCrossed },
  { id: '2', name: 'Indian', icon: UtensilsCrossed },
  { id: '3', name: 'Coffee', icon: Coffee },
  { id: '4', name: 'Desserts', icon: Cake },
  { id: '5', name: 'Dal', icon: UtensilsCrossed },
  { id: '6', name: 'Beverages', icon: Coffee }
];

const FoodItems = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  
  const [activeGroup, setActiveGroup] = useState<'food' | 'drink' | 'dessert'>('food');
  const [foodType, setFoodType] = useState<'all' | 'veg' | 'non_veg'>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const filteredItems = useMemo(() => {
    return mockFoodItems.filter(item => {
      const matchesGroup = item.group === activeGroup;
      const matchesFoodType = foodType === 'all' || item.food_type === foodType;
      const matchesCategory = selectedCategory === 'all' || item.category.id === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesGroup && matchesFoodType && matchesCategory && matchesSearch;
    });
  }, [activeGroup, foodType, selectedCategory, searchQuery]);

  const handleBack = () => {
    navigate(`/company/${companyId}`);
  };

  const getSpecialTagColor = (tag: string) => {
    switch (tag) {
      case 'special':
        return 'bg-gradient-gold text-gold-foreground';
      case 'food_of_day':
        return 'bg-gradient-primary text-primary-foreground';
      case 'limited':
        return 'bg-gradient-danger text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSpecialTagText = (tag: string) => {
    switch (tag) {
      case 'special':
        return 'Chef Special';
      case 'food_of_day':
        return 'Food of the Day';
      case 'limited':
        return 'Limited Edition';
      default:
        return '';
    }
  };

  const groupTabs = [
    { id: 'food', label: 'Food', icon: UtensilsCrossed, count: mockFoodItems.filter(i => i.group === 'food').length },
    { id: 'drink', label: 'Drinks', icon: Coffee, count: mockFoodItems.filter(i => i.group === 'drink').length },
    { id: 'dessert', label: 'Desserts', icon: Cake, count: mockFoodItems.filter(i => i.group === 'dessert').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <PageHeader
          title="Menu Items"
          subtitle="Manage your food and beverage offerings"
          onBack={handleBack}
          icon={UtensilsCrossed}
          action={
            <button className="bg-gradient-primary text-primary-foreground px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-elegant-md hover:shadow-elegant-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Add Item</span>
              <span className="sm:hidden">Add</span>
            </button>
          }
        />

        {/* Controls */}
        <div className="bg-gradient-card rounded-2xl p-4 sm:p-6 shadow-elegant-md mb-8">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
            </div>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="bg-muted hover:bg-muted/80 text-foreground px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 justify-center sm:justify-start"
            >
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">Category</span>
              <span className="sm:hidden">Filter</span>
            </button>
          </div>

          {/* Veg/Non-Veg Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
            <span className="text-sm font-medium text-foreground">Food Type:</span>
            <div className="flex bg-muted/50 rounded-xl p-1">
              {[
                { id: 'all', label: 'All', icon: UtensilsCrossed },
                { id: 'veg', label: 'Veg', icon: Leaf },
                { id: 'non_veg', label: 'Non-Veg', icon: Beef }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFoodType(type.id as any)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm ${
                    foodType === type.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <type.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{type.label}</span>
                  <span className="sm:hidden">{type.label.substring(0, 1)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Group Tabs */}
        <div className="flex gap-1 mb-8 bg-muted/50 rounded-2xl p-1">
          {groupTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveGroup(tab.id as any)}
              className={`flex-1 py-3 px-2 sm:py-4 sm:px-6 rounded-xl flex items-center justify-center gap-1 sm:gap-3 transition-all duration-300 ${
                activeGroup === tab.id
                  ? 'bg-primary text-primary-foreground shadow-elegant-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-sm sm:text-base">{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeGroup === tab.id ? 'bg-primary-foreground/20' : 'bg-muted'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gradient-card rounded-2xl overflow-hidden shadow-elegant-md hover:shadow-elegant-lg transition-all duration-300 hover:scale-105">
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Food Type Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                    item.food_type === 'veg' ? 'bg-success' : 'bg-destructive'
                  }`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                    item.is_available 
                      ? 'bg-success/80 text-success-foreground' 
                      : 'bg-muted/80 text-muted-foreground'
                  }`}>
                    {item.is_available ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    <span className="hidden sm:inline">{item.is_available ? 'Available' : 'Unavailable'}</span>
                  </span>
                </div>

                {/* Special Tag */}
                {item.special_tag !== 'none' && (
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getSpecialTagColor(item.special_tag)}`}>
                      <Star className="h-3 w-3" />
                      <span className="hidden sm:inline">{getSpecialTagText(item.special_tag)}</span>
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
                  <span className="bg-black/80 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                    ₹{item.price}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground text-base sm:text-lg">{item.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    <span className="hidden sm:inline">{item.category.name}</span>
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3 sm:mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary py-2 px-3 sm:px-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm">
                    <Edit3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button className="flex-1 bg-destructive/10 hover:bg-destructive/20 text-destructive py-2 px-3 sm:px-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm">
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try adjusting your search or filters' : 'Add your first menu item to get started'}
            </p>
            <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl shadow-elegant-md hover:shadow-elegant-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
              <Plus className="h-5 w-5" />
              Add Menu Item
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Modal */}
      {showCategoryModal && (
        <CategoryFilterModal
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
    </div>
  );
};

export default FoodItems;