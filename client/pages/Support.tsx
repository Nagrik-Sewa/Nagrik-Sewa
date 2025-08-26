import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  HelpCircle, 
  Search,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  Users,
  Shield,
  CreditCard,
  Settings
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";
import { CONTACT_INFO, makePhoneCall, sendEmail } from "../constants/contact";

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: ""
  });

  const faqCategories = [
    {
      icon: Users,
      title: "Account & Profile",
      color: "text-blue-600",
      faqs: [
        {
          question: "How do I create an account on Nagrik Sewa?",
          answer: "You can create an account by downloading our mobile app or visiting our website. Click on 'Sign Up' and provide your phone number, email, and basic details. We'll send you an OTP for verification."
        },
        {
          question: "How can I update my profile information?",
          answer: "Go to your profile section in the app or website, click 'Edit Profile', update your information, and save changes. Some changes may require re-verification."
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer: "Click on 'Forgot Password' on the login page, enter your registered email or phone number, and follow the instructions sent to you."
        }
      ]
    },
    {
      icon: CreditCard,
      title: "Bookings & Payments",
      color: "text-green-600",
      faqs: [
        {
          question: "How do I book a service?",
          answer: "Browse services by category, select your preferred service provider, choose date and time, provide service details, and confirm booking with payment."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit/debit cards, UPI, net banking, digital wallets, and cash payments (for select services)."
        },
        {
          question: "Can I cancel or reschedule my booking?",
          answer: "Yes, you can cancel or reschedule up to 2 hours before the scheduled time. Cancellation charges may apply based on the service provider's policy."
        },
        {
          question: "How do refunds work?",
          answer: "Refunds are processed within 5-7 business days to your original payment method. The refund amount depends on the cancellation policy and timing."
        }
      ]
    },
    {
      icon: Shield,
      title: "Safety & Quality",
      color: "text-red-600",
      faqs: [
        {
          question: "Are service providers verified?",
          answer: "Yes, all service providers undergo background verification, document checks, and skill assessments before joining our platform."
        },
        {
          question: "What if I'm not satisfied with the service?",
          answer: "Contact our support team within 24 hours. We'll investigate and provide appropriate resolution, including re-service or refund if needed."
        },
        {
          question: "Is my home safe with your service providers?",
          answer: "We conduct thorough background checks and provide insurance coverage. You can also track service providers in real-time during their visit."
        }
      ]
    },
    {
      icon: Settings,
      title: "Technical Issues",
      color: "text-purple-600",
      faqs: [
        {
          question: "The app is not working properly. What should I do?",
          answer: "Try clearing the app cache, restarting your device, or updating to the latest version. If issues persist, contact our technical support."
        },
        {
          question: "I'm not receiving notifications.",
          answer: "Check your notification settings in the app and ensure notifications are enabled in your device settings. Also check if Do Not Disturb mode is active."
        },
        {
          question: "Why can't I see service providers in my area?",
          answer: "Ensure location services are enabled and you've entered the correct address. We're continuously expanding our network to cover more areas."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: CONTACT_INFO.MAIN_SUPPORT_PHONE,
      availability: CONTACT_INFO.PHONE_AVAILABILITY,
      color: "bg-blue-50 border-blue-200 text-blue-800",
      action: () => makePhoneCall(CONTACT_INFO.MAIN_SUPPORT_PHONE)
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help through chat",
      contact: "Start Chat",
      availability: CONTACT_INFO.CHAT_AVAILABILITY,
      color: "bg-green-50 border-green-200 text-green-800",
      action: () => console.log("Start chat") // You can implement chat functionality here
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed queries",
      contact: CONTACT_INFO.MAIN_EMAIL,
      availability: CONTACT_INFO.EMAIL_RESPONSE_TIME,
      color: "bg-purple-50 border-purple-200 text-purple-800",
      action: () => sendEmail(CONTACT_INFO.MAIN_EMAIL, "Support Request")
    }
  ];

  const emergencyContacts = [
    {
      title: "Emergency Helpline",
      number: CONTACT_INFO.EMERGENCY_HELPLINE,
      description: "For immediate emergency assistance"
    },
    {
      title: "Safety Helpline",
      number: CONTACT_INFO.SAFETY_HELPLINE,
      description: "Report safety concerns or incidents"
    },
    {
      title: "Technical Emergency",
      number: CONTACT_INFO.TECHNICAL_EMERGENCY,
      description: "Critical technical issues during service"
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Support form submitted:", formData);
    alert("Thank you for contacting us! We'll get back to you within 4 hours.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
            <p className="text-xl text-brand-100 mb-8">
              We're here to help you 24/7. Find answers or get in touch with our support team.
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
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
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
              <p className="text-gray-600">Send us a message and we'll get back to you within 4 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
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
                  <option value="account">Account & Profile</option>
                  <option value="booking">Booking & Payment</option>
                  <option value="safety">Safety & Quality</option>
                  <option value="technical">Technical Issues</option>
                  <option value="refund">Refund & Cancellation</option>
                  <option value="provider">Service Provider</option>
                  <option value="other">Other</option>
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
                Send Message
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
}
