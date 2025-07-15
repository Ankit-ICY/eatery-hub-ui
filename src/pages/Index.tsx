import { useNavigate } from 'react-router-dom';
import { Building2, Users, ChefHat, BarChart3, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/companies');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Building2 className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Restaurant & Cafe
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Management System
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Streamline your restaurant operations with our comprehensive platform. 
            Manage companies, staff, menus, and analytics all in one place.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-2xl text-lg font-medium shadow-elegant-lg hover:shadow-elegant-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Building2,
              title: 'Multi-Company Management',
              description: 'Manage multiple restaurants and cafes from a single dashboard',
              gradient: 'bg-gradient-primary'
            },
            {
              icon: Users,
              title: 'Staff Management',
              description: 'Add, manage, and track your team members across all locations',
              gradient: 'bg-gradient-gold'
            },
            {
              icon: ChefHat,
              title: 'Menu Management',
              description: 'Create and organize your menu with categories, pricing, and availability',
              gradient: 'bg-gradient-to-r from-success to-accent'
            },
            {
              icon: BarChart3,
              title: 'Analytics & Reports',
              description: 'Track performance with detailed insights and reporting tools',
              gradient: 'bg-gradient-danger'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gradient-card rounded-2xl p-8 shadow-elegant-md hover:shadow-elegant-lg transition-all duration-300 hover:scale-105">
              <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-card rounded-3xl p-8 shadow-elegant-lg mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Restaurants' },
              { number: '10k+', label: 'Menu Items' },
              { number: '5k+', label: 'Staff Members' },
              { number: '99.9%', label: 'Uptime' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Restaurant Business?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of restaurant owners who trust our platform to manage their operations efficiently.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-primary px-8 py-4 rounded-2xl text-lg font-medium shadow-elegant-lg hover:shadow-elegant-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
            >
              Start Managing Your Companies
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
