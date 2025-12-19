import { useState, useEffect } from "react";
import { 
  Users, 
  CheckCircle, 
  Star, 
  MapPin, 
  Clock, 
  IndianRupee,
  Shield,
  Smartphone,
  Award,
  TrendingUp,
  ArrowRight,
  Phone,
  Mail,
  UserPlus,
  Search,
  Calendar,
  CreditCard,
  HeadphonesIcon,
  Zap,
  ThumbsUp,
  Target,
  Briefcase,
  Home
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { CONTACT_INFO, makePhoneCall, sendEmail } from "../../constants/contact";
import { statsApi } from "../../lib/api";
import { indianStates } from "../../data/indianLocations";
import { useAuth } from "../../contexts/AuthContext";
import { OTPVerification } from "../../components/OTPVerification";
import { useToast } from "../../hooks/use-toast";

export default function JoinAsWorker() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
    skills: "",
    experience: "",
    aadhar: "",
    message: ""
  });

  const [districtSearch, setDistrictSearch] = useState("");
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPhone, setRegistrationPhone] = useState("");
  
  // Get all districts from all states
  const allDistricts = indianStates.flatMap(state => 
    state.districts.map(district => ({ district, state: state.name }))
  );
  
  // Filter districts based on search
  const filteredDistricts = districtSearch.length > 0
    ? allDistricts.filter(item => 
        item.district.toLowerCase().includes(districtSearch.toLowerCase())
      ).slice(0, 10) // Limit to 10 results
    : [];

  const [platformStats, setPlatformStats] = useState({
    totalWorkers: 0,
    totalBookings: 0,
    averageEarning: 25000,
    workerSatisfaction: 4.8,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statsApi.getPlatformStats();
        const data = response.data;
        setPlatformStats({
          totalWorkers: data.totalWorkers || 0,
          totalBookings: data.totalBookings || 0,
          averageEarning: 25000, // This would need to be calculated separately
          workerSatisfaction: 4.8, // This would need to be calculated separately
          loading: false
        });
      } catch (error) {
        console.error('Error fetching platform stats:', error);
        // Keep default values on error
        setPlatformStats(prev => ({ ...prev, loading: false }));
      }
    };
    
    fetchStats();
  }, []);

  const benefits = [
    {
      icon: IndianRupee,
      title: "High Earning Potential",
      description: "Earn ₹15,000 - ₹50,000+ monthly based on your skills, experience, and availability. Top performers earn even more!"
    },
    {
      icon: Clock,
      title: "Complete Flexibility",
      description: "Set your own schedule and work hours. Perfect work-life balance with the freedom to choose when and where you work."
    },
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Free health insurance, accident coverage, and legal support. Your safety and security are our top priorities."
    },
    {
      icon: Smartphone,
      title: "Smart Technology",
      description: "Advanced mobile app with GPS tracking, instant payments, customer communication, and job management tools."
    },
    {
      icon: Award,
      title: "Skill Development",
      description: "Free training programs, skill certifications, and continuous learning opportunities to boost your expertise and earnings."
    },
    {
      icon: TrendingUp,
      title: "Massive Market Reach",
      description: "Access to 50,000+ active customers across 500+ cities with guaranteed job opportunities and business growth."
    }
  ];



  const customerRequests = [
    { 
      customerName: "Priya Sharma", 
      service: "Home Cleaning", 
      location: "South Delhi", 
      budget: "₹1,500-2,000",
      posted: "2 hours ago",
      priority: "Urgent"
    },
    { 
      customerName: "Amit Patel", 
      service: "Plumbing Repair", 
      location: "Andheri, Mumbai", 
      budget: "₹2,500-3,500",
      posted: "5 hours ago",
      priority: "High"
    },
    { 
      customerName: "Kavita Singh", 
      service: "Electrical Work", 
      location: "Koramangala, Bangalore", 
      budget: "₹3,000-4,000",
      posted: "1 hour ago",
      priority: "Urgent"
    },
    { 
      customerName: "Rahul Verma", 
      service: "House Painting", 
      location: "Sector 62, Noida", 
      budget: "₹15,000-20,000",
      posted: "3 hours ago",
      priority: "Medium"
    },
    { 
      customerName: "Sunita Reddy", 
      service: "AC Repair", 
      location: "Banjara Hills, Hyderabad", 
      budget: "₹2,000-3,000",
      posted: "30 mins ago",
      priority: "Urgent"
    },
    { 
      customerName: "Deepak Kumar", 
      service: "Salon at Home", 
      location: "Park Street, Kolkata", 
      budget: "₹1,200-1,800",
      posted: "4 hours ago",
      priority: "Medium"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      service: "Plumber",
      location: "Delhi",
      rating: 5,
      earning: "₹40,000/month",
      comment: "Nagrik Sewa changed my life! I now earn double what I used to make and have a steady flow of customers every day."
    },
    {
      name: "Sunita Devi",
      service: "House Cleaner",
      location: "Mumbai",
      rating: 5,
      earning: "₹25,000/month",
      comment: "Working with Nagrik Sewa gave me financial independence. The app is easy to use and customers are respectful."
    },
    {
      name: "Mohammed Ali",
      service: "Electrician",
      location: "Bangalore",
      rating: 5,
      earning: "₹50,000/month",
      comment: "Best decision I made was joining Nagrik Sewa. Professional platform with great support and consistent work."
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Apply Online",
      description: "Fill out the application form with your details and skills",
      icon: UserPlus
    },
    {
      step: 2,
      title: "Get Verified",
      description: "Complete document verification and skill assessment",
      icon: Shield
    },
    {
      step: 3,
      title: "Start Receiving Jobs",
      description: "Get job requests from customers in your area",
      icon: Smartphone
    },
    {
      step: 4,
      title: "Earn & Grow",
      description: "Complete jobs, get paid instantly, and build your reputation",
      icon: TrendingUp
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Always maintain +91 prefix
      let phoneValue = value;
      if (!phoneValue.startsWith('+91')) {
        phoneValue = '+91 ' + phoneValue.replace(/^(\+91\s*)/, '');
      }
      // Remove non-digit characters except +91 prefix
      phoneValue = phoneValue.replace(/^(\+91\s*)(.*)$/, (match, prefix, number) => {
        return prefix + number.replace(/[^\d]/g, '');
      });
      setFormData({ ...formData, phone: phoneValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.skills || !formData.experience || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Split name into first and last name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;

    setIsSubmitting(true);

    try {
      const registrationData = {
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: 'worker' as const,
        // Additional worker data can be stored in profile later
        district: formData.city,
        skills: formData.skills,
        experience: formData.experience
      };

      console.log('Submitting worker registration:', registrationData);
      
      // Register the worker - this will send OTP to email and phone
      const response = await register(registrationData);
      
      // Store email and phone for OTP verification
      setRegistrationEmail(formData.email);
      setRegistrationPhone(formData.phone);
      
      // Show OTP verification screen
      setShowOTPVerification(true);
      
    } catch (error: any) {
      console.error('Worker registration failed:', error);
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Unable to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationComplete = () => {
    toast({
      title: "Welcome to Nagrik Sewa!",
      description: "Your worker account has been created successfully. Redirecting to dashboard...",
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  // Show OTP verification if registration was successful
  if (showOTPVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <OTPVerification
          email={registrationEmail}
          phone={registrationPhone}
          onVerificationComplete={handleVerificationComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Join as a Service Provider
              </h1>
              <p className="text-xl md:text-2xl text-brand-100 mb-8">
                Transform your skills into a thriving business. Connect with thousands of customers and earn ₹15,000 - ₹50,000+ monthly on India's most trusted service platform.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Verified Platform</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <IndianRupee className="w-5 h-5 mr-2" />
                  <span>High Earnings</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Flexible Hours</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-4"
                  onClick={() => navigate('/register?role=worker')}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white bg-white/20 text-white hover:bg-white hover:text-brand-600 text-lg px-8 py-4"
                  onClick={() => makePhoneCall(CONTACT_INFO.MAIN_SUPPORT_PHONE)}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: {CONTACT_INFO.MAIN_SUPPORT_PHONE}
                </Button>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Platform Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <span>Active Workers</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {platformStats.loading ? '...' : `${platformStats.totalWorkers.toLocaleString()}+`}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <span>Monthly Jobs</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {platformStats.loading ? '...' : `${platformStats.totalBookings.toLocaleString()}+`}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <span>Average Monthly Earning</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      ₹{platformStats.averageEarning.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <span>Worker Satisfaction</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {platformStats.workerSatisfaction} ⭐
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
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
                <Card key={index} className="hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
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
                <div key={index} className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
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

      {/* Customer Requests */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Customer Requests</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {customerRequests.map((request, index) => (
              <Card key={index} className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{request.customerName}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {request.location}
                      </p>
                    </div>
                    <Badge className={request.priority === "Urgent" ? "bg-red-500" : request.priority === "High" ? "bg-orange-500" : "bg-blue-500"}>
                      {request.priority}
                    </Badge>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <p className="text-sm font-semibold text-brand-600 mb-2">{request.service}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-bold text-green-600">{request.budget}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {request.posted}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-brand-600 hover:bg-brand-700"
              onClick={() => navigate('/find-customers')}
            >
              Find Customers
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories from Our Workers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Badge className="bg-green-100 text-green-800 ml-auto">
                      {testimonial.earning}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.service}</p>
                    </div>
                    <div className="text-right">
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

      {/* Application Form */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Start Your Journey Today</CardTitle>
              <CardDescription>
                Join thousands of successful service providers and transform your skills into income
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
                    <label className="block text-sm font-medium mb-2">Password *</label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter a strong password"
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password *</label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter your password"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      name="phone"
                      value={formData.phone || '+91 '}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">District *</label>
                    <Input
                      name="city"
                      value={districtSearch || formData.city}
                      onChange={(e) => {
                        setDistrictSearch(e.target.value);
                        setFormData({ ...formData, city: e.target.value });
                        setShowDistrictDropdown(true);
                      }}
                      onFocus={() => setShowDistrictDropdown(true)}
                      placeholder="Start typing district name..."
                      required
                      autoComplete="off"
                    />
                    {showDistrictDropdown && filteredDistricts.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredDistricts.map((item, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-brand-50 cursor-pointer border-b last:border-b-0"
                            onClick={() => {
                              setFormData({ ...formData, city: item.district });
                              setDistrictSearch(item.district);
                              setShowDistrictDropdown(false);
                            }}
                          >
                            <div className="font-medium">{item.district}</div>
                            <div className="text-sm text-gray-600">{item.state}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Skill *</label>
                    <select
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    >
                      <option value="">Select your primary skill</option>
                      <option value="cleaning">Home Cleaning</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical Work</option>
                      <option value="painting">Painting</option>
                      <option value="ac-repair">AC Repair</option>
                      <option value="beauty">Beauty & Wellness</option>
                      <option value="carpentry">Carpentry</option>
                      <option value="appliance">Appliance Repair</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Experience *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Information</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your experience, certifications, or special skills..."
                    rows={4}
                  />
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

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                    </>
                  )}
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
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Skills into Income?</h2>
          <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful service providers who earn ₹15,000 - ₹50,000+ monthly with Nagrik Sewa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg"
              onClick={() => navigate('/register?role=worker')}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white bg-white/20 text-white hover:bg-white hover:text-brand-600"
              onClick={() => makePhoneCall(CONTACT_INFO.MAIN_SUPPORT_PHONE)}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: {CONTACT_INFO.MAIN_SUPPORT_PHONE}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
