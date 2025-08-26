import { 
  Building2, 
  GraduationCap, 
  CreditCard, 
  Shield,
  Heart,
  Home,
  Briefcase,
  Users,
  FileText,
  ExternalLink,
  Download,
  CheckCircle,
  Clock,
  Star,
  Phone,
  Mail
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { CONTACT_INFO, makePhoneCall, sendEmail } from "../../constants/contact";

export default function GovtSchemes() {
  const schemeCategories = [
    {
      id: "skills",
      title: "Skill Development",
      description: "Training programs and certification courses",
      icon: GraduationCap,
      count: 12,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "financial",
      title: "Financial Assistance",
      description: "Loans, subsidies, and financial support",
      icon: CreditCard,
      count: 8,
      color: "bg-green-100 text-green-700"
    },
    {
      id: "social",
      title: "Social Security",
      description: "Insurance, healthcare, and welfare schemes",
      icon: Shield,
      count: 15,
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: "housing",
      title: "Housing & Infrastructure",
      description: "Housing schemes and infrastructure support",
      icon: Home,
      count: 6,
      color: "bg-orange-100 text-orange-700"
    },
    {
      id: "employment",
      title: "Employment Generation",
      description: "Job creation and self-employment schemes",
      icon: Briefcase,
      count: 10,
      color: "bg-teal-100 text-teal-700"
    },
    {
      id: "women",
      title: "Women Empowerment",
      description: "Special schemes for women workers",
      icon: Users,
      count: 7,
      color: "bg-pink-100 text-pink-700"
    }
  ];

  const featuredSchemes = [
    {
      id: 1,
      title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
      department: "Ministry of Skill Development",
      description: "Free skill training with monetary rewards and certification for youth",
      benefits: [
        "Free skill training for 3-6 months",
        "₹8,000 monetary reward on certification",
        "Job placement assistance",
        "Industry-recognized certification"
      ],
      eligibility: "Age 18-35, any educational background",
      deadline: "Ongoing enrollment",
      status: "Active",
      link: "https://pmkvyofficial.org",
      popular: true
    },
    {
      id: 2,
      title: "Mudra Loan Scheme",
      department: "Ministry of Finance",
      description: "Collateral-free loans for micro-enterprises and small businesses",
      benefits: [
        "Loans up to ₹10 lakh without collateral",
        "Low interest rates (7-12%)",
        "Flexible repayment terms",
        "No processing fees"
      ],
      eligibility: "Indian citizen, business plan required",
      deadline: "No deadline",
      status: "Active",
      link: "https://mudra.org.in",
      popular: true
    },
    {
      id: 3,
      title: "Atal Pension Yojana (APY)",
      department: "Ministry of Finance",
      description: "Pension scheme for unorganized sector workers",
      benefits: [
        "Guaranteed pension ₹1,000-5,000/month",
        "Government co-contribution",
        "Spouse pension benefit",
        "Nominee benefit"
      ],
      eligibility: "Age 18-40, bank account holder",
      deadline: "Ongoing",
      status: "Active",
      link: "https://npscra.nsdl.co.in",
      popular: false
    },
    {
      id: 4,
      title: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
      department: "Ministry of Housing & Urban Affairs",
      description: "Micro-credit scheme for street vendors",
      benefits: [
        "Loan up to ₹10,000 initially",
        "No collateral required",
        "Cashback on digital transactions",
        "Interest subsidy of 7%"
      ],
      eligibility: "Street vendors with valid certificate",
      deadline: "March 2024",
      status: "Active",
      link: "https://pmsvanidhi.mohua.gov.in",
      popular: true
    },
    {
      id: 5,
      title: "Ayushman Bharat Health Insurance",
      department: "National Health Authority",
      description: "Health insurance for economically vulnerable families",
      benefits: [
        "₹5 lakh annual coverage",
        "Cashless treatment",
        "25,000+ empaneled hospitals",
        "No premium payment"
      ],
      eligibility: "SECC database or state-defined criteria",
      deadline: "Ongoing enrollment",
      status: "Active",
      link: "https://pmjay.gov.in",
      popular: true
    },
    {
      id: 6,
      title: "Stand Up India Scheme",
      department: "Department of Financial Services",
      description: "Bank loans for SC/ST and women entrepreneurs",
      benefits: [
        "Loans ₹10 lakh to ₹1 crore",
        "Preferential lending rates",
        "Handholding support",
        "Credit guarantee coverage"
      ],
      eligibility: "SC/ST or women, 18+ years",
      deadline: "Ongoing",
      status: "Active",
      link: "https://standupmitra.in",
      popular: false
    }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Check Eligibility",
      description: "Verify if you meet the scheme requirements",
      icon: CheckCircle
    },
    {
      step: 2,
      title: "Gather Documents",
      description: "Collect required documents and certificates",
      icon: FileText
    },
    {
      step: 3,
      title: "Apply Online/Offline",
      description: "Submit application through official portal or office",
      icon: ExternalLink
    },
    {
      step: 4,
      title: "Track Application",
      description: "Monitor application status and follow up",
      icon: Clock
    }
  ];

  const benefits = [
    {
      title: "Skill Enhancement",
      description: "Free training and certification programs",
      icon: GraduationCap,
      schemes: 25
    },
    {
      title: "Financial Support",
      description: "Loans, subsidies, and monetary assistance",
      icon: CreditCard,
      schemes: 18
    },
    {
      title: "Healthcare Coverage",
      description: "Medical insurance and health benefits",
      icon: Heart,
      schemes: 12
    },
    {
      title: "Social Security",
      description: "Pension, insurance, and welfare schemes",
      icon: Shield,
      schemes: 20
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Building2 className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Government Schemes</h1>
            <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Explore government schemes and benefits designed specifically for workers like you. Access free training, financial assistance, healthcare, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                Find Schemes for You
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600">
                Download Scheme Guide
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Overview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits Available for Workers</h2>
            <p className="text-xl text-gray-600">Government support across multiple areas</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <benefit.icon className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                <div className="text-brand-600 font-semibold">{benefit.schemes} Schemes</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scheme Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find schemes that match your needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemeCategories.map((category) => (
              <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${category.color} mr-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{category.title}</h3>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                        {category.count} schemes
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <Button variant="outline" size="sm">
                      Explore Schemes
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Government Schemes</h2>
            <p className="text-xl text-gray-600">Most popular and beneficial schemes for workers</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredSchemes.map((scheme) => (
              <Card key={scheme.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{scheme.title}</h3>
                      {scheme.popular && (
                        <span className="bg-brand-600 text-white text-xs font-medium px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{scheme.department}</p>
                    <p className="text-gray-700 text-sm mb-4">{scheme.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {scheme.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Eligibility:</span>
                    <p className="text-gray-600">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Deadline:</span>
                    <p className="text-gray-600">{scheme.deadline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      scheme.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {scheme.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Apply</h2>
            <p className="text-xl text-gray-600">Simple steps to access government benefits</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {applicationSteps.map((step) => (
              <Card key={step.step} className="p-6 text-center">
                <div className="bg-brand-100 text-brand-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">{step.step}</span>
                </div>
                <step.icon className="w-8 h-8 text-brand-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="py-16 bg-brand-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Help with Applications?</h2>
            <p className="text-xl text-gray-600">Our team is here to guide you through the process</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <Phone className="w-10 h-10 text-brand-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">Speak with our scheme advisors</p>
              <Button 
                onClick={() => makePhoneCall(CONTACT_INFO.MAIN_SUPPORT_PHONE)}
                className="w-full"
                size="sm"
              >
                Call {CONTACT_INFO.MAIN_SUPPORT_PHONE}
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <Mail className="w-10 h-10 text-brand-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">Get detailed guidance via email</p>
              <Button 
                onClick={() => sendEmail(CONTACT_INFO.MAIN_EMAIL, "Government Scheme Inquiry")}
                variant="outline"
                className="w-full"
                size="sm"
              >
                Send Email
              </Button>
            </Card>

            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-brand-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Document Help</h3>
              <p className="text-gray-600 text-sm mb-4">Assistance with application documents</p>
              <Button variant="outline" className="w-full" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Document Guide
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Schemes by Keywords</h2>
            <p className="text-xl text-gray-600">Search for specific schemes or benefits</p>
          </div>
          
          <Card className="p-6">
            <div className="flex gap-4">
              <Input 
                type="text" 
                placeholder="Search schemes (e.g., loan, training, healthcare)..."
                className="flex-1"
              />
              <Button>
                Search Schemes
              </Button>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {["PMKVY", "Mudra Loan", "Ayushman Bharat", "Street Vendor", "Skill Training", "Women Schemes"].map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
