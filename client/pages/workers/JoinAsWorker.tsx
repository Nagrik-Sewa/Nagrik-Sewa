import { useState } from "react";
import { 
  Users, 
  CheckCircle, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
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
import { Link } from "react-router-dom";
import { CONTACT_INFO, makePhoneCall, sendEmail } from "../../constants/contact";

export default function JoinAsWorker() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    skills: "",
    experience: "",
    aadhar: "",
    message: ""
  });

  const benefits = [
    {
      icon: DollarSign,
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



  const serviceCategories = [
    { name: "Home Cleaning", demand: "High Demand", icon: "🧹", earning: "₹20,000/mo" },
    { name: "Plumbing", demand: "Very High", icon: "🔧", earning: "₹35,000/mo" },
    { name: "Electrical Work", demand: "High Demand", icon: "⚡", earning: "₹40,000/mo" },
    { name: "Painting", demand: "Moderate", icon: "🎨", earning: "₹25,000/mo" },
    { name: "AC Repair", demand: "Very High", icon: "❄️", earning: "₹45,000/mo" },
    { name: "Beauty & Wellness", demand: "Growing", icon: "💄", earning: "₹30,000/mo" }
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Worker application submitted:", formData);
    alert("Thank you for your application! We'll contact you within 24 hours for the next steps.");
  };

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
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Verified Platform</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span>High Earnings</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Flexible Hours</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-4">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600 text-lg px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  Call: {CONTACT_INFO.MAIN_SUPPORT_PHONE}
                </Button>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Platform Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Workers</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">10,000+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Jobs</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">50,000+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Monthly Earning</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">₹25,000</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Worker Satisfaction</span>
                    <Badge variant="secondary" className="bg-white/20 text-white">4.8 ⭐</Badge>
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

      {/* Service Categories */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">High-Demand Service Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-green-600 font-medium mb-1">{category.demand}</p>
                  <p className="text-sm text-brand-600 font-bold">Avg: {category.earning}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
              View All Categories
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
              <Card key={index} className="hover:shadow-lg transition-shadow">
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
                    <label className="block text-sm font-medium mb-2">City *</label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your city/area"
                      required
                    />
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

                <Button type="submit" size="lg" className="w-full">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Submit Application
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
            <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg">
              <UserPlus className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-brand-600"
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
