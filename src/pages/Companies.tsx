import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, MapPin, Phone, Mail, Users, Edit3 } from 'lucide-react';

// Mock data - replace with actual API calls
const mockCompanies = [
  {
    id: '1',
    name: 'Cafe Delights',
    company_type: 'cafe',
    contact_number: '+91-9876543210',
    email: 'info@cafedelights.com',
    address_line1: '123 Coffee Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    created_at: '2024-01-15T10:30:00Z',
    staff_count: 8,
    food_items_count: 45
  },
  {
    id: '2',
    name: 'Royal Restaurant',
    company_type: 'restaurant',
    contact_number: '+91-9876543211',
    email: 'contact@royalrestaurant.com',
    address_line1: '456 Food Plaza',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    logo: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=400&fit=crop',
    created_at: '2024-02-20T14:15:00Z',
    staff_count: 15,
    food_items_count: 120
  },
  {
    id: '3',
    name: 'Green Leaf Cafe',
    company_type: 'cafe',
    contact_number: '+91-9876543212',
    email: 'hello@greenleafcafe.com',
    address_line1: '789 Garden Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    logo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=400&fit=crop',
    created_at: '2024-03-10T09:45:00Z',
    staff_count: 6,
    food_items_count: 35
  }
];

const Companies = () => {
  const [companies] = useState(mockCompanies);
  const navigate = useNavigate();

  const handleCompanyClick = (companyId: string) => {
    navigate(`/company/${companyId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                My Companies
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your restaurants and cafes
              </p>
            </div>
            <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl shadow-elegant-md hover:shadow-elegant-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Company
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-card rounded-2xl p-6 shadow-elegant-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total Companies</p>
                  <p className="text-2xl font-bold text-foreground">{companies.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-card rounded-2xl p-6 shadow-elegant-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-gold-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total Staff</p>
                  <p className="text-2xl font-bold text-foreground">
                    {companies.reduce((sum, company) => sum + company.staff_count, 0)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-card rounded-2xl p-6 shadow-elegant-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                  <Edit3 className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total Menu Items</p>
                  <p className="text-2xl font-bold text-foreground">
                    {companies.reduce((sum, company) => sum + company.food_items_count, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              onClick={() => handleCompanyClick(company.id)}
              className="bg-gradient-card rounded-2xl overflow-hidden shadow-elegant-md hover:shadow-elegant-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              {/* Company Logo */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    company.company_type === 'cafe' 
                      ? 'bg-accent/90 text-accent-foreground' 
                      : 'bg-primary/90 text-primary-foreground'
                  }`}>
                    {company.company_type.charAt(0).toUpperCase() + company.company_type.slice(1)}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white mb-1">{company.name}</h3>
                  <p className="text-white/80 text-sm">Since {formatDate(company.created_at)}</p>
                </div>
              </div>

              {/* Company Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{company.address_line1}, {company.city}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{company.contact_number}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{company.email}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-foreground">{company.staff_count}</p>
                    <p className="text-xs text-muted-foreground">Staff Members</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-foreground">{company.food_items_count}</p>
                    <p className="text-xs text-muted-foreground">Menu Items</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {companies.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Companies Yet</h3>
            <p className="text-muted-foreground mb-6">Get started by adding your first company</p>
            <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl shadow-elegant-md hover:shadow-elegant-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
              <Plus className="h-5 w-5" />
              Add Your First Company
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;