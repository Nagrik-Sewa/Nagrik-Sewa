import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DigiLockerAuth from '../components/DigiLockerAuth';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  HelpCircle, 
  User,
  Search,
  FileText,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  LogIn,
  UserPlus,
  Verified,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Settings,
  Users
} from 'lucide-react';
import { CONTACT_INFO, makePhoneCall, sendEmail } from '../constants/contact';

const CustomerSupport = () => {
  const { user, isAuthenticated } = useAuth();
  const [showDigiLocker, setShowDigiLocker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Pre-populate form data for authenticated users
  const [formData, setFormData] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phone: user?.phone || '',
    category: '',
    subject: '',
    message: '',
    priority: user?.isDigiLockerVerified ? 'high' : 'medium'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support request submitted:', formData);
    alert('Your support request has been submitted! We will get back to you within 24 hours.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const handleDigiLockerVerification = (verificationData: any) => {
    console.log('DigiLocker verification completed:', verificationData);
    setShowDigiLocker(false);
    alert('DigiLocker verification completed successfully! Your support requests will now be prioritized.');
  };

  const supportCategories = [
    { id: 'booking', label: 'Booking Issues', icon: FileText },
    { id: 'payment', label: 'Payment Problems', icon: CreditCard },
    { id: 'worker', label: 'Worker Related', icon: User },
    { id: 'technical', label: 'Technical Issues', icon: Settings },
    { id: 'account', label: 'Account Problems', icon: Shield },
    { id: 'other', label: 'Other', icon: Info }
  ];

  const faqCategories = [
    {
      icon: Users,
      title: "Account & Bookings", 
      color: "text-blue-600",
      faqs: [
        {
          question: "How do I create a customer account?",
          answer: "Creating your customer account is easy! Download our app or visit our website, click 'Sign Up' and enter your mobile number, email, and basic details. Verify your phone number with OTP and complete your profile with your address and preferences. You can then start browsing and booking services immediately."
        },
        {
          question: "How do I book a service?",
          answer: "Browse our service categories like cleaning, repairs, beauty, etc. Select a service and choose from verified providers based on ratings, reviews, pricing, and availability in your area. Pick your preferred date and time, provide specific requirements, and complete your booking with secure payment through our platform."
        },
        {
          question: "Can I cancel or reschedule my booking?",
          answer: "Yes! You can cancel or reschedule your booking up to 2 hours before the scheduled service time through your dashboard or our app. Free cancellation is available within our policy timeframe. For late cancellations, minimal charges may apply as per our terms and service provider policies."
        },
        {
          question: "How do I track my service request?",
          answer: "Once your booking is confirmed, you can track your service provider in real-time through our app. You'll receive SMS and push notifications about your service status, including when the provider is on their way. You can also call our support helpline for live updates on your service request."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Payments & Pricing",
      color: "text-green-600", 
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major payment methods for your convenience: Credit/Debit cards (Visa, Mastercard, RuPay), UPI payments (Google Pay, PhonePe, Paytm, BHIM), Net Banking from all major banks, Digital wallets, and Cash-on-Service for select services. All digital payments are processed through secure, encrypted gateways."
        },
        {
          question: "How is service pricing determined?",
          answer: "Our pricing is transparent and competitive. Each service has base rates displayed upfront, with additional charges for specific requirements or premium services clearly mentioned. Prices may vary based on location, service complexity, time slots, and provider experience. You'll see the total cost before confirming your booking with no hidden charges."
        },
        {
          question: "How do refunds work?",
          answer: "Refunds are processed based on our refund policy. For cancellations within the free cancellation period, you'll receive a full refund within 5-7 business days to your original payment method. Partial refunds may apply for service issues or incomplete work, which are reviewed case-by-case by our support team."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No, we believe in complete transparency! All charges including service fees, taxes, and any additional costs are clearly displayed before you confirm your booking. The price you see at checkout is exactly what you'll pay. We never add surprise charges or hidden fees to your final bill."
        }
      ]
    },
    {
      icon: Shield,
      title: "Safety & Quality",
      color: "text-red-600",
      faqs: [
        {
          question: "Are service providers verified and safe?",
          answer: "Absolutely! Every service provider undergoes comprehensive verification including government ID verification (Aadhaar, PAN), background checks, skill assessments, and reference verification. We also conduct police verification for safety-sensitive services and maintain detailed profiles with ratings and reviews from other customers."
        },
        {
          question: "What if I'm not satisfied with the service?",
          answer: "Your satisfaction is our top priority! If you're not happy with the service, contact us within 24 hours through the app, website, or helpline. We'll investigate your complaint and offer solutions including re-service at no cost, partial/full refunds, or service credits. We also work with providers to prevent similar issues."
        },
        {
          question: "Is my home safe with your service providers?",
          answer: "Yes, we take home security very seriously. All service providers carry ID badges, are covered under our comprehensive insurance policy, and are GPS-tracked during service. We have 24/7 emergency support, and our app includes a panic button feature for immediate assistance during any uncomfortable situations."
        },
        {
          question: "How do you ensure service quality?",
          answer: "We maintain high quality standards through regular training programs for service providers, customer feedback systems, quality audits, and a rating system that helps maintain service excellence. Poor-performing providers are retrained or removed from our platform to ensure consistently high-quality service delivery."
        }
      ]
    },
    {
      icon: Settings,
      title: "Technical Support",
      color: "text-purple-600",
      faqs: [
        {
          question: "The app is not working properly. What should I do?",
          answer: "Try these quick fixes: Close and restart the app completely, check your internet connection, update the app from Google Play Store or Apple App Store, clear app cache in your device settings, or restart your phone. If issues persist, contact our technical support team with your device details for personalized assistance."
        },
        {
          question: "I'm not receiving booking notifications.",
          answer: "Check if notifications are enabled for Nagrik Sewa in your phone's Settings > Apps > Notifications. Ensure the app has permission to send notifications and is not restricted by battery optimization or Do Not Disturb mode. Also verify that your device has a stable internet connection for timely notification delivery."
        },
        {
          question: "Why can't I see available service providers?",
          answer: "This could be due to location settings. Enable GPS/location services in your device settings and allow Nagrik Sewa to access your location. Verify your address is correct and within our service areas. Some services may have limited availability during certain hours - try checking during peak service hours (9 AM - 8 PM)."
        },
        {
          question: "How do I update my profile information?",
          answer: "Go to 'My Profile' section in the app menu or click your profile picture on the website. Click 'Edit Profile' to modify your personal information, address, or preferences. For security, some changes like phone number or email may require OTP verification. Always save your changes to ensure they're updated properly."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our customer support team",
      contact: CONTACT_INFO.CUSTOMER_SUPPORT_PHONE,
      availability: CONTACT_INFO.PHONE_AVAILABILITY,
      color: "bg-blue-50 border-blue-200 text-blue-800",
      action: () => makePhoneCall(CONTACT_INFO.CUSTOMER_SUPPORT_PHONE)
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help through our AI chatbot",
      contact: "Start Chat",
      availability: CONTACT_INFO.CHAT_AVAILABILITY,
      color: "bg-green-50 border-green-200 text-green-800",
      action: () => {
        const chatbotButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
        if (chatbotButton) chatbotButton.click();
      }
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Send us detailed queries",
      contact: CONTACT_INFO.MAIN_EMAIL,
      availability: CONTACT_INFO.EMAIL_RESPONSE_TIME,
      color: "bg-purple-50 border-purple-200 text-purple-800",
      action: () => sendEmail(CONTACT_INFO.MAIN_EMAIL, "Customer Support Request")
    }
  ];

  const emergencyContacts = [
    {
      title: "Customer Emergency",
      number: CONTACT_INFO.EMERGENCY_HELPLINE,
      description: "For immediate assistance during service issues"
    },
    {
      title: "Safety Helpline", 
      number: CONTACT_INFO.SAFETY_HELPLINE,
      description: "Report safety concerns or incidents"
    },
    {
      title: "Booking Emergency",
      number: CONTACT_INFO.TECHNICAL_EMERGENCY,
      description: "Critical booking or payment issues"
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Customer Help & Support</h1>
            <p className="text-xl text-brand-100 mb-8">
              We're here to help you 24/7. Find answers or get in touch with our customer support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
          </div>
        </div>
      </div>

        
        {/* Login Prompt for Non-Authenticated Users */}
        {!isAuthenticated && (
          <section className="mb-16">
            <Card className="border-brand-200 bg-gradient-to-r from-brand-50 to-blue-50">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LogIn className="w-8 h-8 text-brand-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-700 mb-4">
                    Login for Better Support Experience
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    Sign in to your account for faster support, priority assistance, and access to advanced verification options like DigiLocker.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">Priority Support</h3>
                      <p className="text-sm text-gray-600">Get faster responses and dedicated assistance</p>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">DigiLocker Verification</h3>
                      <p className="text-sm text-gray-600">Verify your identity for enhanced security</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/login">
                      <Button size="lg" className="bg-brand-600 hover:bg-brand-700 shadow-lg">
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="lg" variant="outline" className="border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white">
                        <UserPlus className="w-5 h-5 mr-2" />
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* DigiLocker Verification Modal */}
        {showDigiLocker && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">DigiLocker Verification</h2>
                <Button variant="ghost" onClick={() => setShowDigiLocker(false)}>
                  ×
                </Button>
              </div>
              <div className="p-6">
                <DigiLockerAuth 
                  onVerificationComplete={handleDigiLockerVerification}
                  userType="customer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Contact Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Get Instant Help</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className={`p-6 border-2 ${method.color} hover:shadow-lg transition-shadow cursor-pointer`}
                onClick={method.action}
              >
                <div className="text-center">
                  <method.icon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm mb-4">{method.description}</p>
                  <p className="font-bold text-lg mb-2">{method.contact}</p>
                  <div className="flex items-center justify-center text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {method.availability}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-16">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
              <h2 className="text-2xl font-bold text-red-800">Emergency Contacts</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {emergencyContacts.map((contact, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-4 border border-red-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => makePhoneCall(contact.number)}
                >
                  <h3 className="font-semibold text-red-800 mb-1">{contact.title}</h3>
                  <p className="text-2xl font-bold text-red-600 mb-2">{contact.number}</p>
                  <p className="text-sm text-red-700">{contact.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DigiLocker Verification for Authenticated Users */}
        {isAuthenticated && (
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Shield className="w-6 h-6 mr-2" />
                  Enhance Your Support Experience
                </CardTitle>
                <CardDescription>
                  {user?.isDigiLockerVerified ? (
                    <div className="flex items-center text-green-600">
                      <Verified className="w-4 h-4 mr-1" />
                      Your identity is verified with DigiLocker
                    </div>
                  ) : (
                    "Verify your identity with DigiLocker for priority support and faster resolution"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.isDigiLockerVerified ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <div>
                          <p className="font-semibold text-green-800">DigiLocker Verified</p>
                          <p className="text-sm text-green-600">You have priority support access</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-green-700">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Faster Response</span>
                      </div>
                      <div className="flex items-center text-green-700">
                        <User className="w-4 h-4 mr-1" />
                        <span>Dedicated Agent</span>
                      </div>
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>Priority Queue</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">Priority Support</h4>
                        <p className="text-xs text-gray-600">Skip the queue</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">Dedicated Agent</h4>
                        <p className="text-xs text-gray-600">Personal assistance</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">Enhanced Security</h4>
                        <p className="text-xs text-gray-600">Verified identity</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setShowDigiLocker(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Verify with DigiLocker
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          {searchQuery && filteredFaqs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No results found for "{searchQuery}". Try different keywords or contact support.</p>
            </div>
          )}

          <div className="space-y-8">
            {(searchQuery ? filteredFaqs : faqCategories).map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center">
                    <category.icon className={`w-6 h-6 mr-3 ${category.color}`} />
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                </div>
                
                <div className="divide-y">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    return (
                      <div key={faqIndex} className="p-6">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === globalIndex ? null : globalIndex)}
                          className="flex justify-between items-center w-full text-left"
                        >
                          <h4 className="font-medium text-gray-900 pr-4">{faq.question}</h4>
                          {expandedFaq === globalIndex ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        
                        {expandedFaq === globalIndex && (
                          <div className="mt-4 text-gray-700 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 mx-auto mb-4 text-brand-600" />
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-gray-600">Send us a message and we'll get back to you based on priority level.</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              {isAuthenticated && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center text-blue-800">
                    <Info className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      Your account information has been pre-filled for faster support
                    </span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
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
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">Select a category</option>
                  {supportCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                Send Support Request
              </Button>
            </form>
          </div>
        </section>

        {/* Service Status */}
        <section className="mb-16">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-2xl font-bold text-green-800">Service Status</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-green-800 mb-2">All Systems Operational</h3>
                <p className="text-green-700">✅ Website & Mobile App</p>
                <p className="text-green-700">✅ Booking System</p>
                <p className="text-green-700">✅ Payment Gateway</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Support Availability</h3>
                <p className="text-green-700">✅ Phone Support: 24/7</p>
                <p className="text-green-700">✅ Live Chat: 9 AM - 10 PM</p>
                <p className="text-green-700">✅ Email Support: Active</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CustomerSupport;