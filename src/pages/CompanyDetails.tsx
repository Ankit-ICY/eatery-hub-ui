import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit3, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Shield, 
  FileText,
  Building2,
  Menu,
  UserPlus,
  BarChart3,
  Trash2,
  Users,
  QrCode,
  Star
} from 'lucide-react';
import DeleteCompanyModal from '../components/DeleteCompanyModal';

// Mock data - replace with actual API calls
const mockCompany = {
  id: '1',
  name: 'Cafe Delights',
  company_type: 'cafe',
  gst_number: '29ABCDE1234F1Z5',
  fssai_license: '12345678901234',
  contact_number: '+91-9876543210',
  email: 'info@cafedelights.com',
  address_line1: '123 Coffee Street',
  address_line2: 'Near Central Park',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  logo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
  created_at: '2024-01-15T10:30:00Z',
  url: 'https://cafedelights.com',
  staff_count: 8,
  food_items_count: 45,
  qr_code_image: 'https://images.unsplash.com/photo-1606166187734-a4cb2c2b7a8b?w=300&h=300&fit=crop'
};

const CompanyDetails = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [company] = useState(mockCompany);

  const handleBack = () => {
    navigate('/companies');
  };

  const handleViewItems = () => {
    navigate(`/company/${companyId}/items`);
  };

  const handleAddStaff = () => {
    navigate(`/company/${companyId}/add-staff`);
  };

  const handleViewStats = () => {
    // Future implementation
    console.log('View Stats - Coming Soon');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const actionButtons = [
    {
      title: 'View Items',
      description: 'Manage your menu items',
      icon: Menu,
      onClick: handleViewItems,
      gradient: 'bg-gradient-primary',
      hoverGradient: 'hover:bg-gradient-primary',
      iconBg: 'bg-primary/20',
      iconColor: 'text-primary'
    },
    {
      title: 'Add Staff',
      description: 'Invite team members',
      icon: UserPlus,
      onClick: handleAddStaff,
      gradient: 'bg-gradient-gold',
      hoverGradient: 'hover:bg-gradient-gold',
      iconBg: 'bg-gold/20',
      iconColor: 'text-gold'
    },
    {
      title: 'View Stats',
      description: 'Analytics & reports',
      icon: BarChart3,
      onClick: handleViewStats,
      gradient: 'bg-gradient-to-r from-success to-accent',
      hoverGradient: 'hover:from-success hover:to-accent',
      iconBg: 'bg-success/20',
      iconColor: 'text-success'
    },
    {
      title: 'Delete Company',
      description: 'Remove permanently',
      icon: Trash2,
      onClick: () => setShowDeleteModal(true),
      gradient: 'bg-gradient-danger',
      hoverGradient: 'hover:bg-gradient-danger',
      iconBg: 'bg-destructive/20',
      iconColor: 'text-destructive'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="p-2 rounded-xl hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
            <p className="text-muted-foreground">
              {company.company_type.charAt(0).toUpperCase() + company.company_type.slice(1)} • 
              Since {formatDate(company.created_at)}
            </p>
          </div>
        </div>

        {/* Company Info Card */}
        <div className="bg-gradient-card rounded-3xl overflow-hidden shadow-elegant-lg mb-8">
          <div className="relative h-64 md:h-80">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit Details
              </button>
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{company.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {company.company_type.charAt(0).toUpperCase() + company.company_type.slice(1)}
                    </span>
                    <span className="bg-success/80 text-success-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{company.contact_number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{company.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a href={company.url} className="font-medium text-primary hover:text-primary-hover">
                        {company.url}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Address</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <div className="font-medium text-foreground">
                      <p>{company.address_line1}</p>
                      {company.address_line2 && <p>{company.address_line2}</p>}
                      <p>{company.city}, {company.state} {company.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Legal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GST Number</p>
                      <p className="font-medium text-foreground">{company.gst_number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">FSSAI License</p>
                      <p className="font-medium text-foreground">{company.fssai_license}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <QrCode className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">QR Code</p>
                      <img 
                        src={company.qr_code_image} 
                        alt="QR Code" 
                        className="w-16 h-16 rounded-lg mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{company.staff_count}</p>
                <p className="text-sm text-muted-foreground">Staff Members</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Menu className="h-6 w-6 text-gold-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">{company.food_items_count}</p>
                <p className="text-sm text-muted-foreground">Menu Items</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="h-6 w-6 text-success-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">4.8</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-warning rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actionButtons.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.gradient} ${action.hoverGradient} text-white rounded-2xl p-6 shadow-elegant-md hover:shadow-elegant-lg transition-all duration-300 hover:scale-105 group`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${action.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className={`h-8 w-8 ${action.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteCompanyModal
          companyName={company.name}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            console.log('Company deleted');
            setShowDeleteModal(false);
            navigate('/companies');
          }}
        />
      )}
    </div>
  );
};

export default CompanyDetails;