import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  UserPlus, 
  Eye, 
  EyeOff,
  AtSign,
  CheckCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

const AddStaff = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    password: ''
  });
  
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBack = () => {
    navigate(`/company/${companyId}`);
  };

  const handleContactChange = (value: string) => {
    setFormData(prev => ({ ...prev, contact: value }));
    
    // Auto-detect contact type
    const isEmail = value.includes('@');
    const isPhone = /^\d+$/.test(value.replace(/[\s\-\(\)]/g, ''));
    
    if (isEmail) {
      setContactType('email');
    } else if (isPhone) {
      setContactType('phone');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: '', contact: '', password: '' });
    }, 2000);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    return /^\d{10}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.contact.trim() && 
           formData.password.trim() &&
           (contactType === 'email' ? isValidEmail(formData.contact) : isValidPhone(formData.contact));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <PageHeader
          title="Add Staff Member"
          subtitle="Invite a new team member to your company"
          onBack={handleBack}
          icon={UserPlus}
        />

        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {success && (
            <div className="bg-gradient-to-r from-success/10 to-success/20 border border-success/20 rounded-2xl p-4 sm:p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-success">Staff Member Added Successfully!</h3>
                  <p className="text-success/80 text-sm">
                    An invitation has been sent to {formData.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-gradient-card rounded-3xl shadow-elegant-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-primary text-primary-foreground p-4 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                  <UserPlus className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">Staff Information</h2>
                  <p className="opacity-90 text-sm sm:text-base">Fill in the details to add a new staff member</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter staff member's full name"
                      className="w-full pl-10 pr-4 py-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Contact Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email or Phone Number <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      {contactType === 'email' ? (
                        <Mail className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Phone className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <input
                      type={contactType === 'email' ? 'email' : 'tel'}
                      value={formData.contact}
                      onChange={(e) => handleContactChange(e.target.value)}
                      placeholder="Enter email address or phone number"
                      className="w-full pl-10 pr-20 sm:pr-16 py-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setContactType('email')}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            contactType === 'email' 
                              ? 'bg-primary/20 text-primary' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <AtSign className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactType('phone')}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            contactType === 'phone' 
                              ? 'bg-primary/20 text-primary' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {contactType === 'email' ? (
                      <span>Staff member will receive an email invitation</span>
                    ) : (
                      <span>Staff member will receive an SMS invitation</span>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Temporary Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter a temporary password"
                      className="w-full pl-10 pr-12 py-4 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Staff member will be asked to change this password on first login
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid() || isLoading}
                  className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Adding Staff Member...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" />
                      Add Staff Member
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-card rounded-2xl p-4 sm:p-6 shadow-elegant-md mt-8">
            <h3 className="font-bold text-foreground mb-4">What happens next?</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">1</span>
                </div>
                <p>Staff member receives an invitation with login credentials</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">2</span>
                </div>
                <p>They can log in and will be prompted to change their password</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">3</span>
                </div>
                <p>Staff member gains access to company dashboard and assigned permissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;