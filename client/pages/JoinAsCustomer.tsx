import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  CheckCircle, 
  Clock, 
  Shield, 
  Star,
  Phone,
  Users,
  Zap,
  ThumbsUp,
  Search,
  Calendar,
  CreditCard,
  HeadphonesIcon,
  ArrowRight,
  MapPin
} from 'lucide-react';

const JoinAsCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    interests: [],
    referralSource: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Customer registration:', formData);
    alert('Welcome to Nagrik Sewa! Your account has been created successfully.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      interests: [],
      referralSource: ''
    });
  };

  const benefits = [
    {
      icon: Search,
      title: "Easy Service Discovery",
      description: "Find the right service provider for your needs in seconds with our smart search and filtering system."
    },
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All our service providers are background checked and skill verified for your safety and peace of mind."
    },
    {
      icon: Clock,
      title: "Quick Booking",
      description: "Book services instantly or schedule them for later with our flexible booking system."
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Rate and review services to help maintain high standards and help other customers choose better."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple payment options with secure, encrypted transactions. Pay only after service completion."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any issues or questions you might have."
    }
  ];

  const serviceCategories = [
    { name: "Home Services", count: "500+ providers", icon: "🏠" },
    { name: "Cleaning", count: "300+ providers", icon: "🧹" },
    { name: "Electrical", count: "200+ providers", icon: "⚡" },
    { name: "Plumbing", count: "250+ providers", icon: "🔧" },
    { name: "Construction", count: "400+ providers", icon: "🏗️" },
    { name: "Gardening", count: "150+ providers", icon: "🌱" }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Search & Browse",
      description: "Search for services or browse categories to find what you need",
      icon: Search
    },
    {
      step: 2,
      title: "Choose Provider",
      description: "Compare profiles, ratings, and prices to select the best provider",
      icon: Users
    },
    {
      step: 3,
      title: "Book Service",
      description: "Schedule your service at a convenient time and location",
      icon: Calendar
    },
    {
      step: 4,
      title: "Get Service",
      description: "Professional arrives on time and completes the work to your satisfaction",
      icon: CheckCircle
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      comment: "Found an excellent electrician through Nagrik Sewa. Professional service and fair pricing!"
    },
    {
      name: "Raj Kumar",
      location: "Mumbai",
      rating: 5,
      comment: "The cleaning service was amazing. Very thorough and reliable. Will definitely book again."
    },
    {
      name: "Anita Singh",
      location: "Bangalore",
      rating: 5,
      comment: "Great platform for finding home services. The booking process is so simple and convenient."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Join as a Customer
              </h1>
              <p className="text-xl md:text-2xl text-brand-100 mb-8">
                Connect with trusted service providers in your area. Get quality services at fair prices, delivered right to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Verified Professionals</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Quick Booking</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-4">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600 text-lg px-8 py-4">
                    Browse Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Customers</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">50,000+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service Providers</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">2,000+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Services Completed</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">100,000+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Rating</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">4.8 ⭐</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Service Categories</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link to="/services">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Nagrik Sewa?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <IconComponent className="w-12 h-12 text-brand-600 mb-4" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <IconComponent className="w-8 h-8 text-brand-600 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Get Started Today</CardTitle>
              <CardDescription>
                Create your account and start booking services in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location *</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Your city/area"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">How did you hear about us?</label>
                  <select
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Family</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the{' '}
                    <Link to="/terms" className="text-brand-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-brand-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create Account
                </Button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brand-600 hover:underline font-medium">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Nagrik Sewa for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg">
                <UserPlus className="w-5 h-5 mr-2" />
                Join Now
              </Button>
            </Link>
            <Link to="/workers">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600">
                <Search className="w-5 h-5 mr-2" />
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAsCustomer;