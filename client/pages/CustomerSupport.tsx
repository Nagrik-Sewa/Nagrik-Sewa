import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Verified
} from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';

const CustomerSupport = () => {
  const { user, isAuthenticated } = useAuth();
  const [showDigiLocker, setShowDigiLocker] = useState(false);
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
    { id: 'payment', label: 'Payment Problems', icon: AlertCircle },
    { id: 'worker', label: 'Worker Related', icon: User },
    { id: 'technical', label: 'Technical Issues', icon: HelpCircle },
    { id: 'account', label: 'Account Problems', icon: Shield },
    { id: 'other', label: 'Other', icon: Info }
  ];

  const faqItems = [
    {
      question: "How do I book a service?",
      answer: "You can book a service by browsing our workers, selecting one, and clicking 'Book Service'. Fill in your requirements and confirm the booking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      question: "How do I cancel a booking?",
      answer: "You can cancel a booking from your dashboard up to 2 hours before the scheduled time. Cancellation charges may apply based on the timing."
    },
    {
      question: "Are workers verified?",
      answer: "Yes, all our workers go through a thorough verification process including ID verification, skill assessment, and background checks."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "If you're not satisfied, please contact us within 24 hours. We offer service guarantees and will work to resolve any issues."
    },
    {
      question: "How do I track my service request?",
      answer: "You can track your service request in real-time through your dashboard or by calling our support number."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Support</h1>
            <p className="text-xl md:text-2xl text-brand-100 mb-8 max-w-3xl mx-auto">
              We're here to help! Get support 24/7 for all your service needs
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <Clock className="w-5 h-5 mr-2" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <Shield className="w-5 h-5 mr-2" />
                <span>Secure Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt for Non-Authenticated Users */}
      {!isAuthenticated && (
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
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
          </div>
        </div>
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
                userType={user?.role === 'worker' ? 'worker' : 'customer'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact Methods */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                <CardTitle>Call Us</CardTitle>
                <CardDescription>Speak with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-brand-600 mb-2">{CONTACT_INFO.CUSTOMER_SUPPORT_PHONE}</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
                <Button className="mt-4" onClick={() => window.open(`tel:${CONTACT_INFO.CUSTOMER_SUPPORT_PHONE}`)}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                <CardTitle>Email Us</CardTitle>
                <CardDescription>Send us your queries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-brand-600 mb-2">{CONTACT_INFO.MAIN_EMAIL}</p>
                <p className="text-sm text-gray-600">Response within 2 hours</p>
                <Button className="mt-4" onClick={() => window.open(`mailto:${CONTACT_INFO.MAIN_EMAIL}`)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Chat with our AI assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-brand-600 mb-2">AI Chat Bot</p>
                <p className="text-sm text-gray-600">Instant responses</p>
                <Button className="mt-4" onClick={() => {
                  // Trigger chatbot widget
                  const chatbotButton = document.querySelector('[data-chatbot-trigger]') as HTMLElement;
                  if (chatbotButton) chatbotButton.click();
                }}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* DigiLocker Verification for Authenticated Users */}
          {isAuthenticated && (
            <div className="mb-12">
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
            </div>
          )}

          {/* Support Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Submit a Support Request
                    {isAuthenticated && user?.isDigiLockerVerified && (
                      <Badge className="ml-2 bg-green-100 text-green-800 border-green-300">
                        <Shield className="w-3 h-3 mr-1" />
                        Priority
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {isAuthenticated ? (
                      user?.isDigiLockerVerified ? (
                        "Your request will be prioritized and assigned to a dedicated agent"
                      ) : (
                        "As a registered user, you'll receive faster support. Consider DigiLocker verification for priority assistance."
                      )
                    ) : (
                      "Fill out the form below and we'll get back to you as soon as possible"
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isAuthenticated && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center text-blue-800">
                        <Info className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Your account information has been pre-filled for faster support
                        </span>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
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
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9876543210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Priority</label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        required
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
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your issue in detail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Submit Support Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-brand-50 rounded-lg">
                    <h4 className="font-semibold text-brand-700 mb-2">Still need help?</h4>
                    <p className="text-brand-600 text-sm mb-3">
                      Can't find what you're looking for? Our support team is here to help!
                    </p>
                    <Button variant="outline" size="sm" className="border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white">
                      <Search className="w-4 h-4 mr-2" />
                      Search More FAQs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Support Categories */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Support Categories</CardTitle>
                  <CardDescription>What can we help you with today?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {supportCategories.map(category => {
                      const IconComponent = category.icon;
                      return (
                        <div key={category.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <IconComponent className="w-5 h-5 text-brand-600 mr-2" />
                          <span className="text-sm font-medium">{category.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Response Time Info */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-brand-600 to-brand-700 text-white">
              <CardContent className="py-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Our Response Times</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                        Urgent
                      </Badge>
                      <p className="font-semibold">Within 30 minutes</p>
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                        High
                      </Badge>
                      <p className="font-semibold">Within 2 hours</p>
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                        Medium
                      </Badge>
                      <p className="font-semibold">Within 8 hours</p>
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                        Low
                      </Badge>
                      <p className="font-semibold">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;