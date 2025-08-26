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
  Mail
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card } from "../../components/ui/card";
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
      title: "Earn ₹15,000 - ₹50,000/month",
      description: "Competitive earnings based on your skills and availability"
    },
    {
      icon: Clock,
      title: "Flexible Working Hours",
      description: "Work when you want, where you want. You control your schedule"
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "Free health and accident insurance for all verified workers"
    },
    {
      icon: Smartphone,
      title: "Easy Mobile App",
      description: "Manage bookings, payments, and customer communication easily"
    },
    {
      icon: Award,
      title: "Skill Certification",
      description: "Get certified in your skills and earn premium rates"
    },
    {
      icon: TrendingUp,
      title: "Growing Customer Base",
      description: "Access to thousands of customers across 500+ cities"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Apply Online",
      description: "Fill out the application form with your details and skills",
      icon: Users
    },
    {
      step: "2", 
      title: "Document Verification",
      description: "Submit Aadhar, PAN, and skill certificates for verification",
      icon: Shield
    },
    {
      step: "3",
      title: "Skill Assessment",
      description: "Complete online or in-person skill assessment test",
      icon: Award
    },
    {
      step: "4",
      title: "Start Earning",
      description: "Get verified and start receiving customer bookings",
      icon: TrendingUp
    }
  ];

  const serviceCategories = [
    "Home Cleaning", "Plumbing", "Electrical Work", "Painting", 
    "AC Repair", "Appliance Repair", "Pest Control", "Carpentry",
    "Beauty & Wellness", "Massage Therapy", "Salon Services", "Yoga Training",
    "Tutoring", "Computer Repair", "Mobile Repair", "Interior Design"
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Join as a Service Provider</h1>
            <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Become part of India's largest home services platform. Connect with thousands of customers and grow your business with Nagrik Sewa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                Apply Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-brand-600"
                onClick={() => makePhoneCall(CONTACT_INFO.MAIN_SUPPORT_PHONE)}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us: {CONTACT_INFO.MAIN_SUPPORT_PHONE}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Join Nagrik Sewa?</h2>
            <p className="text-xl text-gray-600">Unlock your earning potential with India's most trusted service platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <benefit.icon className="w-12 h-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How to Get Started</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to become a verified service provider</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <step.icon className="w-8 h-8 text-brand-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Service Categories</h2>
            <p className="text-xl text-gray-600">Choose from 15+ service categories to offer your expertise</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceCategories.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow border hover:border-brand-300 transition-colors text-center">
                <p className="font-medium text-gray-800">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Apply to Join</h2>
            <p className="text-xl text-gray-600">Start your journey as a verified service provider today</p>
          </div>
          
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Your city"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills/Services *
                  </label>
                  <Input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Plumbing, Electrical, Cleaning"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (Years) *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhar Number *
                </label>
                <Input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleInputChange}
                  required
                  placeholder="XXXX XXXX XXXX"
                  maxLength={14}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your previous work experience, certifications, or any additional skills..."
                  rows={4}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> After submitting this application, our team will contact you within 24 hours to schedule your verification process and skill assessment.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full bg-brand-600 hover:bg-brand-700">
                Submit Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-xl text-gray-300 mb-8">Our team is here to help you get started</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-brand-600 hover:bg-brand-700"
                onClick={() => makePhoneCall(CONTACT_INFO.MAIN_SUPPORT_PHONE)}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: {CONTACT_INFO.MAIN_SUPPORT_PHONE}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-800"
                onClick={() => sendEmail(CONTACT_INFO.MAIN_EMAIL, "Worker Application Inquiry")}
              >
                <Mail className="w-5 h-5 mr-2" />
                Email: {CONTACT_INFO.MAIN_EMAIL}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
