import React from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import { 



function GovtSchemes() {import { Card } from "../../components/ui/card";

  return (

    <div className="min-h-screen bg-gray-50">import { Button } from "../../components/ui/button";import { 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="text-center">import { Input } from "../../components/ui/input";

          <h1 className="text-4xl font-bold mb-4">Government Schemes 2025</h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">import { Badge } from "../../components/ui/badge";  Building2,import { 

            Discover the latest government schemes and programs designed to empower workers, 

            enhance skills, and boost employment opportunities across India.

          </p>

          <div className="bg-white rounded-lg shadow-md p-8">export default function GovtSchemes() {  GraduationCap,

            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>

            <p className="text-gray-600">  const [searchTerm, setSearchTerm] = useState("");

              We're working on bringing you comprehensive information about government schemes.

              This feature will be available soon with detailed scheme information,   CreditCard,  Building2,import {   Building2, 

              eligibility criteria, and application processes.

            </p>  const schemes = [

          </div>

        </div>    {  Shield,

      </div>

    </div>      id: 1,

  );

}      title: "Pradhan Mantri Kaushal Vikas Yojana 4.0",  Briefcase,  GraduationCap,



export default GovtSchemes;      department: "Ministry of Skill Development & Entrepreneurship",

      description: "Enhanced skill training program with AI and digital focus for Industry 4.0 readiness",  FileText,

      status: "Active",

      category: "Skills"  ExternalLink,  CreditCard,  GraduationCap,   GraduationCap, 

    },

    {  Download,

      id: 2,

      title: "Digital India Mission 2.0",  CheckCircle,  Shield,

      department: "Ministry of Electronics & IT",

      description: "Advanced digital transformation initiative with AI, 5G, and quantum computing focus",  Clock,

      status: "Active",

      category: "Digital"  Star,  Briefcase,  CreditCard,   CreditCard, 

    },

    {  Phone,

      id: 3,

      title: "Startup India 3.0 - Unicorn Mission",  Mail,  Heart,

      department: "Department for Promotion of Industry and Internal Trade",

      description: "Advanced startup ecosystem development with focus on creating new unicorns",  TrendingUp,

      status: "Active",

      category: "Employment"  Zap,  Home,  Shield,  Shield,

    }

  ];  Users



  const filteredSchemes = schemes.filter(scheme =>} from "lucide-react";  Users,

    scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||

    scheme.description.toLowerCase().includes(searchTerm.toLowerCase())

  );

import { Button } from "../../components/ui/button";  FileText,  Briefcase,  Heart,

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">import { Input } from "../../components/ui/input";

      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">import { Card } from "../../components/ui/card";  ExternalLink,

          <div className="text-center">

            <h1 className="text-4xl md:text-5xl font-bold mb-4">import { Badge } from "../../components/ui/badge";

              Government Schemes 2025

            </h1>import { CONTACT_INFO, makePhoneCall, sendEmail } from "../../constants/contact";  Download,  FileText,  Home,

            <p className="text-xl md:text-2xl mb-8 text-blue-100">

              Discover opportunities for skill development, employment, and financial support

            </p>

          </div>export default function GovtSchemes() {  CheckCircle,

        </div>

      </div>  const [selectedCategory, setSelectedCategory] = useState("all");



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  const [searchTerm, setSearchTerm] = useState("");  Clock,  ExternalLink,  Briefcase,

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="flex-1">

              <Input  const schemeCategories = [  Star,

                placeholder="Search schemes by name or description..."

                value={searchTerm}    {

                onChange={(e) => setSearchTerm(e.target.value)}

                className="w-full"      id: "all",  Phone,  Download,  Users,

              />

            </div>      title: "All Schemes",

            <Button variant="outline">

              Export List      description: "Browse all available government schemes",  Mail,

            </Button>

          </div>      icon: Building2,

        </div>

      count: 75,  TrendingUp,  CheckCircle,  FileText,

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {filteredSchemes.map((scheme) => (      color: "bg-gray-100 text-gray-700"

            <Card key={scheme.id} className="p-6 hover:shadow-lg transition-shadow duration-300">

              <div className="flex justify-between items-start mb-4">    },  Zap,

                <div className="flex-1">

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">    {

                    {scheme.title}

                  </h3>      id: "skills",  Award,  Clock,  ExternalLink,

                  <p className="text-sm text-blue-600 mb-2 font-medium">{scheme.department}</p>

                  <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>      title: "Skill Development",

                </div>

                <Badge className="bg-green-100 text-green-800">      description: "Training programs and certification courses",  Target

                  {scheme.status}

                </Badge>      icon: GraduationCap,

              </div>

              <div className="flex gap-2">      count: 15,} from "lucide-react";  Star,  Download,

                <Button variant="default" size="sm" className="flex-1">

                  Apply Now      color: "bg-blue-100 text-blue-700"

                </Button>

                <Button variant="outline" size="sm">    },

                  Details

                </Button>    {

              </div>

            </Card>      id: "financial",import { Button } from "../../components/ui/button";  Phone,  CheckCircle,

          ))}

        </div>      title: "Financial Assistance",



        {filteredSchemes.length === 0 && (      description: "Loans, subsidies, and financial support",import { Input } from "../../components/ui/input";

          <div className="text-center py-12">

            <h3 className="text-xl font-semibold text-gray-600 mb-2">No schemes found</h3>      icon: CreditCard,

            <p className="text-gray-500 mb-4">Try adjusting your search terms</p>

            <Button onClick={() => setSearchTerm("")}>      count: 12,import { Card } from "../../components/ui/card";  Mail,  Clock,

              Clear Search

            </Button>      color: "bg-green-100 text-green-700"

          </div>

        )}    },import { Badge } from "../../components/ui/badge";

      </div>

    </div>    {

  );

}      id: "social",import { CONTACT_INFO, makePhoneCall, sendEmail } from "../../constants/contact";  TrendingUp,  Star,

      title: "Social Security",

      description: "Insurance, healthcare, and welfare schemes",

      icon: Shield,

      count: 18,export default function GovtSchemes() {  Zap,  Phone,

      color: "bg-purple-100 text-purple-700"

    },  const [selectedCategory, setSelectedCategory] = useState("all");

    {

      id: "employment",  const [searchTerm, setSearchTerm] = useState("");  Award,  Mail,

      title: "Employment Generation",

      description: "Job creation and startup support programs",

      icon: Briefcase,

      count: 20,  const schemeCategories = [  Target  TrendingUp,

      color: "bg-orange-100 text-orange-700"

    },    {

    {

      id: "digital",      id: "all",} from "lucide-react";  Zap,

      title: "Digital India",

      description: "Technology adoption and digital literacy",      title: "All Schemes",

      icon: Zap,

      count: 10,      description: "Browse all available government schemes",import { Button } from "../../components/ui/button";  Award,

      color: "bg-cyan-100 text-cyan-700"

    }      icon: Building2,

  ];

      count: 75,import { Input } from "../../components/ui/input";  Target

  const featuredSchemes = [

    {      color: "bg-gray-100 text-gray-700"

      id: 1,

      title: "Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY 4.0)",    },import { Card } from "../../components/ui/card";} from "lucide-react";

      department: "Ministry of Skill Development & Entrepreneurship",

      description: "Enhanced skill training program with AI and digital focus for Industry 4.0 readiness",    {

      benefits: [

        "Free skill training for 3-12 months",      id: "skills",import { Badge } from "../../components/ui/badge";import { Button } from "../../components/ui/button";

        "₹10,000 monetary reward on certification",

        "Digital skill modules included",      title: "Skill Development",

        "Industry 4.0 certification",

        "Startup support post-training",      description: "Training programs and certification courses",import { CONTACT_INFO, makePhoneCall, sendEmail } from "../../constants/contact";import { Input } from "../../components/ui/input";

        "International certification pathways"

      ],      icon: GraduationCap,

      eligibility: "Age 18-45, any educational background",

      deadline: "Ongoing enrollment throughout 2025",      count: 15,import { Card } from "../../components/ui/card";

      status: "Active",

      link: "https://pmkvyofficial.org",      color: "bg-blue-100 text-blue-700"

      category: "skills",

      featured: true,    },export default function GovtSchemes() {import { Badge } from "../../components/ui/badge";

      rating: 4.8,

      applicants: "2.5M+"    {

    },

    {      id: "financial",  const [searchTerm, setSearchTerm] = useState("");import { CONTACT_INFO, makePhoneCall, sendEmail } from "../../constants/contact";

      id: 2,

      title: "Digital India Mission 2.0",      title: "Financial Assistance",

      department: "Ministry of Electronics & IT",

      description: "Advanced digital transformation initiative with AI, 5G, and quantum computing focus",      description: "Loans, subsidies, and financial support",  const [selectedCategory, setSelectedCategory] = useState("all");import { useState } from "react";

      benefits: [

        "Free digital literacy certification",      icon: CreditCard,

        "₹25,000 startup grant for digital solutions",

        "AI/ML skill development programs",      count: 12,

        "5G technology training",

        "Quantum computing awareness",      color: "bg-green-100 text-green-700"

        "Digital entrepreneur incubation"

      ],    },  const schemeCategories = [export default function GovtSchemes() {

      eligibility: "Indian citizens, basic computer knowledge",

      deadline: "December 2025",    {

      status: "Active",

      link: "https://digitalindia.gov.in",      id: "social",    {  const [searchTerm, setSearchTerm] = useState("");

      category: "digital",

      featured: true,      title: "Social Security",

      rating: 4.7,

      applicants: "1.8M+"      description: "Insurance, healthcare, and welfare schemes",      id: "skills",  const [selectedCategory, setSelectedCategory] = useState("all");

    },

    {      icon: Shield,

      id: 3,

      title: "Startup India 3.0 - Unicorn Mission",      count: 18,      title: "Skill Development",

      department: "Department for Promotion of Industry and Internal Trade",

      description: "Advanced startup ecosystem development with focus on creating new unicorns",      color: "bg-purple-100 text-purple-700"

      benefits: [

        "Up to ₹50 lakh seed funding",    },      description: "Training programs and certification courses",  const schemeCategories = [

        "Tax exemptions for 5 years",

        "Fast-track patent registration",    {

        "Mentor network access",

        "International market support",      id: "employment",      icon: GraduationCap,    {

        "IPR fast-track facility"

      ],      title: "Employment Generation",

      eligibility: "Startups registered within 10 years",

      deadline: "Rolling basis throughout 2025",      description: "Job creation and startup support programs",      count: 18,      id: "skills",

      status: "Active",

      link: "https://startupindia.gov.in",      icon: Briefcase,

      category: "employment",

      featured: true,      count: 20,      color: "bg-blue-100 text-blue-700"      title: "Skill Development",

      rating: 4.9,

      applicants: "500K+"      color: "bg-orange-100 text-orange-700"

    }

  ];    },    },      description: "Training programs and certification courses",



  const filteredSchemes = featuredSchemes.filter(scheme => {    {

    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;

    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||      id: "digital",    {      icon: GraduationCap,

                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||

                         scheme.department.toLowerCase().includes(searchTerm.toLowerCase());      title: "Digital India",

    return matchesCategory && matchesSearch;

  });      description: "Technology adoption and digital literacy",      id: "financial",      count: 18,



  const SchemeCard = ({ scheme }: { scheme: any }) => (      icon: Zap,

    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200">

      <div className="flex justify-between items-start mb-4">      count: 10,      title: "Financial Assistance",      color: "bg-blue-100 text-blue-700"

        <div className="flex-1">

          <div className="flex items-center gap-2 mb-2">      color: "bg-cyan-100 text-cyan-700"

            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">

              {scheme.title}    }      description: "Loans, subsidies, and financial support",    },

            </h3>

            {scheme.featured && (  ];

              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">

                <Star className="w-3 h-3 mr-1" />      icon: CreditCard,    {

                Featured

              </Badge>  // Updated government schemes for 2025

            )}

          </div>  const featuredSchemes = [      count: 12,      id: "financial",

          <p className="text-sm text-blue-600 mb-2 font-medium">{scheme.department}</p>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{scheme.description}</p>    {

        </div>

        <Badge       id: 1,      color: "bg-green-100 text-green-700"      title: "Financial Assistance",

          variant={scheme.status === 'Active' ? 'default' : 'secondary'}

          className={scheme.status === 'Active' ? 'bg-green-100 text-green-800' : ''}      title: "Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY 4.0)",

        >

          <CheckCircle className="w-3 h-3 mr-1" />      department: "Ministry of Skill Development & Entrepreneurship",    },      description: "Loans, subsidies, and financial support",

          {scheme.status}

        </Badge>      description: "Enhanced skill training program with AI and digital focus for Industry 4.0 readiness",

      </div>

      benefits: [    {      icon: CreditCard,

      {scheme.benefits && (

        <div className="mb-4">        "Free skill training for 3-12 months",

          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</h4>

          <ul className="text-sm text-gray-600 space-y-1">        "₹10,000 monetary reward on certification",      id: "social",      count: 12,

            {scheme.benefits.slice(0, 3).map((benefit: string, index: number) => (

              <li key={index} className="flex items-center gap-2">        "Digital skill modules included",

                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />

                {benefit}        "Industry 4.0 certification",      title: "Social Security",      color: "bg-green-100 text-green-700"

              </li>

            ))}        "Startup support post-training",

            {scheme.benefits.length > 3 && (

              <li className="text-blue-600 text-xs">+{scheme.benefits.length - 3} more benefits</li>        "International certification pathways"      description: "Insurance, healthcare, and welfare schemes",    },

            )}

          </ul>      ],

        </div>

      )}      eligibility: "Age 18-45, any educational background",      icon: Shield,    {



      <div className="flex gap-2">      deadline: "Ongoing enrollment throughout 2025",

        <Button 

          variant="default"       status: "Active",      count: 20,      id: "social",

          size="sm" 

          className="flex-1"      link: "https://pmkvyofficial.org",

          onClick={() => window.open(scheme.link, '_blank')}

        >      category: "skills",      color: "bg-purple-100 text-purple-700"      title: "Social Security",

          <ExternalLink className="w-4 h-4 mr-2" />

          Apply Now      featured: true,

        </Button>

        <Button       rating: 4.8,    },      description: "Insurance, healthcare, and welfare schemes",

          variant="outline" 

          size="sm"      applicants: "2.5M+"

        >

          <FileText className="w-4 h-4 mr-2" />    },    {      icon: Shield,

          Details

        </Button>    {

      </div>

    </Card>      id: 2,      id: "employment",      count: 20,

  );

      title: "Digital India Mission 2.0",

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">      department: "Ministry of Electronics & IT",      title: "Employment Generation",      color: "bg-purple-100 text-purple-700"

      {/* Header Section */}

      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">      description: "Advanced digital transformation initiative with AI, 5G, and quantum computing focus",

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">      benefits: [      description: "Job creation and startup support programs",    },

            <h1 className="text-4xl md:text-5xl font-bold mb-4">

              Government Schemes 2025        "Free digital literacy certification",

            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100">        "₹25,000 startup grant for digital solutions",      icon: Briefcase,    {

              Discover opportunities for skill development, employment, and financial support

            </p>        "AI/ML skill development programs",

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">        "5G technology training",      count: 15,      id: "employment",

                <CheckCircle className="w-5 h-5" />

                <span>75+ Active Schemes</span>        "Quantum computing awareness",

              </div>

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">        "Digital entrepreneur incubation"      color: "bg-orange-100 text-orange-700"      title: "Employment Generation",

                <Users className="w-5 h-5" />

                <span>20M+ Beneficiaries</span>      ],

              </div>

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">      eligibility: "Indian citizens, basic computer knowledge",    },      description: "Job creation and startup support programs",

                <TrendingUp className="w-5 h-5" />

                <span>Updated for 2025</span>      deadline: "December 2025",

              </div>

            </div>      status: "Active",    {      icon: Briefcase,

          </div>

        </div>      link: "https://digitalindia.gov.in",

      </div>

      category: "digital",      id: "digital",      count: 15,

      {/* Search and Filter Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">      featured: true,

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">

          <div className="flex flex-col lg:flex-row gap-4">      rating: 4.7,      title: "Digital India",      color: "bg-orange-100 text-orange-700"

            <div className="flex-1">

              <Input      applicants: "1.8M+"

                placeholder="Search schemes by name, department, or keywords..."

                value={searchTerm}    },      description: "Technology adoption and digital literacy",    },

                onChange={(e) => setSearchTerm(e.target.value)}

                className="w-full"    {

              />

            </div>      id: 3,      icon: Zap,    {

            <div className="flex gap-2">

              <Button variant="outline">      title: "Startup India 3.0 - Unicorn Mission",

                <Download className="w-4 h-4 mr-2" />

                Export List      department: "Department for Promotion of Industry and Internal Trade",      count: 10,      id: "digital",

              </Button>

              <Button      description: "Advanced startup ecosystem development with focus on creating new unicorns",

                variant="outline"

                onClick={() => sendEmail(CONTACT_INFO.support, "Government Schemes Inquiry")}      benefits: [      color: "bg-cyan-100 text-cyan-700"      title: "Digital India",

              >

                <Mail className="w-4 h-4 mr-2" />        "Up to ₹50 lakh seed funding",

                Get Help

              </Button>        "Tax exemptions for 5 years",    }      description: "Technology adoption and digital literacy",

            </div>

          </div>        "Fast-track patent registration",

        </div>

        "Mentor network access",  ];      icon: Zap,

        {/* Category Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">        "International market support",

          {schemeCategories.map((category) => {

            const IconComponent = category.icon;        "IPR fast-track facility"      count: 10,

            return (

              <Card       ],

                key={category.id}

                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${      eligibility: "Startups registered within 10 years",  // Updated government schemes for 2025      color: "bg-cyan-100 text-cyan-700"

                  selectedCategory === category.id 

                    ? 'border-blue-500 bg-blue-50'       deadline: "Rolling basis throughout 2025",

                    : 'border-gray-200 hover:border-blue-300'

                }`}      status: "Active",  const featuredSchemes = [    }

                onClick={() => setSelectedCategory(category.id)}

              >      link: "https://startupindia.gov.in",

                <div className="flex items-center gap-4 mb-3">

                  <div className={`p-3 rounded-lg ${category.color}`}>      category: "employment",    {  ];

                    <IconComponent className="w-6 h-6" />

                  </div>      featured: true,

                  <div>

                    <h3 className="font-semibold text-gray-800">{category.title}</h3>      rating: 4.9,      id: 1,

                    <p className="text-sm text-gray-600">{category.count} schemes</p>

                  </div>      applicants: "500K+"

                </div>

                <p className="text-sm text-gray-600">{category.description}</p>    },      title: "Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY 4.0)",  // Updated government schemes for 2025

              </Card>

            );    {

          })}

        </div>      id: 4,      department: "Ministry of Skill Development & Entrepreneurship",  const featuredSchemes = [



        {/* Results Summary */}      title: "Ayushman Bharat Health Account Plus",

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-gray-800">      department: "Ministry of Health and Family Welfare",      description: "Enhanced skill training program with AI and digital focus for Industry 4.0 readiness",    {

            {selectedCategory === "all" ? "All Schemes" : schemeCategories.find(cat => cat.id === selectedCategory)?.title}

            <span className="text-lg font-normal text-gray-600 ml-2">      description: "Enhanced healthcare coverage with digital health records and AI-driven diagnostics",

              ({filteredSchemes.length} schemes found)

            </span>      benefits: [      benefits: [      id: 1,

          </h2>

          <div className="text-sm text-gray-500">        "₹10 lakh annual health coverage",

            Updated: September 2025

          </div>        "Digital health ID and records",        "Free skill training for 3-12 months",      title: "Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY 4.0)",

        </div>

        "AI-powered health screening",

        {/* Schemes Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">        "Telemedicine access",        "₹10,000 monetary reward on certification",      department: "Ministry of Skill Development & Entrepreneurship",

          {filteredSchemes.map((scheme) => (

            <SchemeCard key={scheme.id} scheme={scheme} />        "Preventive care programs",

          ))}

        </div>        "Mental health support"        "Digital skill modules included",      description: "Enhanced skill training program with AI and digital focus for Industry 4.0 readiness",



        {filteredSchemes.length === 0 && (      ],

          <div className="text-center py-12">

            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />      eligibility: "All Indian families (income-based criteria)",        "Industry 4.0 certification",      benefits: [

            <h3 className="text-xl font-semibold text-gray-600 mb-2">No schemes found</h3>

            <p className="text-gray-500 mb-4">      deadline: "Ongoing enrollment",

              Try adjusting your search terms or category filter

            </p>      status: "Active",        "Startup support post-training",        "Free skill training for 3-12 months",

            <Button onClick={() => {setSearchTerm(""); setSelectedCategory("all");}}>

              Clear Filters      link: "https://pmjay.gov.in",

            </Button>

          </div>      category: "social",        "International certification pathways"        "₹10,000 monetary reward on certification",

        )}

      featured: true,

        {/* Support Section */}

        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 text-center">      rating: 4.6,      ],        "Digital skill modules included",

          <h3 className="text-2xl font-bold mb-4">Need Help with Applications?</h3>

          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">      applicants: "12M+"

            Our experts can guide you through the application process and help you find the most suitable schemes for your needs.

          </p>    },      eligibility: "Age 18-45, any educational background",        "Industry 4.0 certification",

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button    {

              variant="secondary"

              onClick={() => makePhoneCall(CONTACT_INFO.helpline)}      id: 5,      deadline: "Ongoing enrollment throughout 2025",        "Startup support post-training",

              className="bg-white text-blue-600 hover:bg-blue-50"

            >      title: "PM SVANidhi Plus - Street Vendor Empowerment",

              <Phone className="w-4 h-4 mr-2" />

              Call Helpline      department: "Ministry of Housing and Urban Affairs",      status: "Active",        "International certification pathways"

            </Button>

            <Button      description: "Enhanced credit support for street vendors with digital payment integration",

              variant="outline"

              onClick={() => sendEmail(CONTACT_INFO.support, "Scheme Application Assistance")}      benefits: [      link: "https://pmkvyofficial.org",      ],

              className="border-white text-white hover:bg-white/10"

            >        "Collateral-free loans up to ₹50,000",

              <Mail className="w-4 h-4 mr-2" />

              Email Support        "Digital payment cashback",      category: "skills",      eligibility: "Age 18-45, any educational background",

            </Button>

          </div>        "QR code setup support",

        </div>

      </div>        "Financial literacy training",      popular: true,      deadline: "Ongoing enrollment throughout 2025",

    </div>

  );        "Insurance coverage",

}
        "Market linkage support"      new: true      status: "Active",

      ],

      eligibility: "Street vendors with valid certificate",    },      link: "https://pmkvyofficial.org",

      deadline: "March 2026",

      status: "Active",    {      category: "skills",

      link: "https://pmsvanidhi.mohua.gov.in",

      category: "financial",      id: 2,      popular: true,

      featured: true,

      rating: 4.5,      title: "Viksit Bharat Sankalp Yatra 2025",      new: true

      applicants: "3.2M+"

    },      department: "Multiple Ministries",    },

    {

      id: 6,      description: "Comprehensive development program for rural and semi-urban areas",    {

      title: "National Apprenticeship Promotion Scheme 2025",

      department: "Ministry of Skill Development & Entrepreneurship",      benefits: [      id: 2,

      description: "Industry-integrated apprenticeship with focus on emerging technologies",

      benefits: [        "Direct benefit transfer of ₹25,000/year",      title: "Viksit Bharat Sankalp Yatra 2025",

        "Stipend up to ₹25,000/month",

        "Industry certification",        "Health insurance up to ₹5 lakh",      department: "Multiple Ministries",

        "Job guarantee post-completion",

        "Skill development in AI/IoT",        "Skill development opportunities",      description: "Comprehensive development program for rural and semi-urban areas",

        "Foreign exchange programs",

        "Startup incubation support"        "Housing assistance",      benefits: [

      ],

      eligibility: "Age 18-27, minimum 10th pass",        "Financial literacy programs"        "Direct benefit transfer of ₹25,000/year",

      deadline: "Quarterly intake",

      status: "Active",      ],        "Health insurance up to ₹5 lakh",

      link: "https://apprenticeshipindia.gov.in",

      category: "skills",      eligibility: "BPL families, rural workers",        "Skill development opportunities",

      featured: false,

      rating: 4.4,      deadline: "March 2025",        "Housing assistance",

      applicants: "800K+"

    }      status: "Active",        "Financial literacy programs"

  ];

      link: "https://viksitbharat.gov.in",      ],

  const additionalSchemes = [

    {      category: "social",      eligibility: "BPL families, rural workers",

      id: 7,

      title: "PM Mudra Yojana 2.0",      popular: true,      deadline: "March 2025",

      department: "Ministry of Finance",

      description: "Enhanced micro-credit scheme for small businesses",      new: true      status: "Active",

      category: "financial",

      status: "Active",    },      link: "https://viksitbharat.gov.in",

      rating: 4.3

    },    {      category: "social",

    {

      id: 8,      id: 3,      popular: true,

      title: "National Solar Mission Plus",

      department: "Ministry of New and Renewable Energy",      title: "PM Vishwakarma Yojana Enhanced",      new: true

      description: "Solar energy adoption with subsidies and financing",

      category: "digital",      department: "Ministry of Micro, Small & Medium Enterprises",    },

      status: "Active",

      rating: 4.2      description: "Enhanced support for traditional artisans and craftspeople with digital integration",    {

    },

    {      benefits: [      id: 3,

      id: 9,

      title: "Skill India Digital Platform",        "₹3 lakh collateral-free loan",      title: "PM Vishwakarma Yojana Enhanced",

      department: "Ministry of Skill Development",

      description: "Online skill development with AI-powered learning",        "₹15,000 for toolkit purchase",      department: "Ministry of Micro, Small & Medium Enterprises",

      category: "skills",

      status: "Active",        "Digital platform for selling products",      description: "Enhanced support for traditional artisans and craftspeople with digital integration",

      rating: 4.6

    },        "Skill upgradation training",      benefits: [

    {

      id: 10,        "Brand development support",        "₹3 lakh collateral-free loan",

      title: "Jan Aushadhi Plus",

      department: "Department of Pharmaceuticals",        "Export facilitation"        "₹15,000 for toolkit purchase",

      description: "Affordable generic medicines with home delivery",

      category: "social",      ],        "Digital platform for selling products",

      status: "Active",

      rating: 4.1      eligibility: "Traditional artisans and craftspeople",        "Skill upgradation training",

    }

  ];      deadline: "Ongoing until December 2025",        "Brand development support",



  const allSchemes = [...featuredSchemes, ...additionalSchemes];      status: "Active",        "Export facilitation"



  const filteredSchemes = allSchemes.filter(scheme => {      link: "https://pmvishwakarma.gov.in",      ],

    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;

    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||      category: "financial",      eligibility: "Traditional artisans and craftspeople",

                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||

                         scheme.department.toLowerCase().includes(searchTerm.toLowerCase());      popular: true,      deadline: "Ongoing until December 2025",

    return matchesCategory && matchesSearch;

  });      new: false      status: "Active",



  const SchemeCard = ({ scheme }: { scheme: any }) => (    },      link: "https://pmvishwakarma.gov.in",

    <Card className="p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200">

      <div className="flex justify-between items-start mb-4">    {      category: "financial",

        <div className="flex-1">

          <div className="flex items-center gap-2 mb-2">      id: 4,      popular: true,

            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">

              {scheme.title}      title: "Digital India Workers Initiative 2025",      new: false

            </h3>

            {scheme.featured && (      department: "Ministry of Electronics & IT",    },

              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">

                <Star className="w-3 h-3 mr-1" />      description: "Digital literacy and employment program for gig workers",    {

                Featured

              </Badge>      benefits: [      id: 4,

            )}

          </div>        "Free digital certification courses",      title: "Digital India Workers Initiative 2025",

          <p className="text-sm text-blue-600 mb-2 font-medium">{scheme.department}</p>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{scheme.description}</p>        "Laptop/tablet subsidy up to ₹30,000",      department: "Ministry of Electronics & IT",

        </div>

        <Badge         "Internet connectivity support",      description: "Digital literacy and employment program for gig workers",

          variant={scheme.status === 'Active' ? 'default' : 'secondary'}

          className={scheme.status === 'Active' ? 'bg-green-100 text-green-800' : ''}        "Digital payment training",      benefits: [

        >

          <CheckCircle className="w-3 h-3 mr-1" />        "Online marketplace access",        "Free digital certification courses",

          {scheme.status}

        </Badge>        "Cyber security awareness"        "Laptop/tablet subsidy up to ₹30,000",

      </div>

      ],        "Internet connectivity support",

      {scheme.benefits && (

        <div className="mb-4">      eligibility: "Age 18-50, basic smartphone usage",        "Digital payment training",

          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</h4>

          <ul className="text-sm text-gray-600 space-y-1">      deadline: "September 2025",        "Online marketplace access",

            {scheme.benefits.slice(0, 3).map((benefit: string, index: number) => (

              <li key={index} className="flex items-center gap-2">      status: "Active",        "Cyber security awareness"

                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />

                {benefit}      link: "https://digitalindia.gov.in/workers",      ],

              </li>

            ))}      category: "digital",      eligibility: "Age 18-50, basic smartphone usage",

            {scheme.benefits.length > 3 && (

              <li className="text-blue-600 text-xs">+{scheme.benefits.length - 3} more benefits</li>      popular: false,      deadline: "September 2025",

            )}

          </ul>      new: true      status: "Active",

        </div>

      )}    },      link: "https://digitalindia.gov.in/workers",



      {scheme.eligibility && (    {      category: "digital",

        <div className="mb-4 p-3 bg-blue-50 rounded-lg">

          <h4 className="text-sm font-semibold text-gray-700 mb-1">Eligibility:</h4>      id: 5,      popular: false,

          <p className="text-sm text-gray-600">{scheme.eligibility}</p>

        </div>      title: "Atmanirbhar Bharat Rojgar Yojana Plus",      new: true

      )}

      department: "Ministry of Labour & Employment",    },

      <div className="flex justify-between items-center mb-4">

        {scheme.deadline && (      description: "Enhanced employment generation with focus on formal sector jobs",    {

          <div className="flex items-center gap-1 text-sm text-gray-500">

            <Clock className="w-4 h-4" />      benefits: [      id: 5,

            <span>Deadline: {scheme.deadline}</span>

          </div>        "12% EPF contribution by government for 3 years",      title: "Atmanirbhar Bharat Rojgar Yojana Plus",

        )}

        {scheme.rating && (        "₹1,000/month additional benefit",      department: "Ministry of Labour & Employment",

          <div className="flex items-center gap-1 text-sm">

            <Star className="w-4 h-4 text-yellow-500 fill-current" />        "Skills matching platform access",      description: "Enhanced employment generation with focus on formal sector jobs",

            <span className="font-medium">{scheme.rating}</span>

            {scheme.applicants && (        "Career counseling support",      benefits: [

              <span className="text-gray-500">({scheme.applicants})</span>

            )}        "Job guarantee for 100 days minimum"        "12% EPF contribution by government for 3 years",

          </div>

        )}      ],        "₹1,000/month additional benefit",

      </div>

      eligibility: "Age 18-65, unemployed or underemployed",        "Skills matching platform access",

      <div className="flex gap-2">

        {scheme.link && (      deadline: "Ongoing program",        "Career counseling support",

          <Button 

            variant="default"       status: "Active",        "Job guarantee for 100 days minimum"

            size="sm" 

            className="flex-1"      link: "https://atmanirbharrojgar.gov.in",      ],

            onClick={() => window.open(scheme.link, '_blank')}

          >      category: "employment",      eligibility: "Age 18-65, unemployed or underemployed",

            <ExternalLink className="w-4 h-4 mr-2" />

            Apply Now      popular: true,      deadline: "Ongoing program",

          </Button>

        )}      new: false      status: "Active",

        <Button 

          variant="outline"     }      link: "https://atmanirbharrojgar.gov.in",

          size="sm"

          onClick={() => {/* Open details modal */}}  ];      category: "employment",

        >

          <FileText className="w-4 h-4 mr-2" />      popular: true,

          Details

        </Button>  // Filter schemes based on search and category      new: false

      </div>

    </Card>  const filteredSchemes = featuredSchemes.filter(scheme => {    },

  );

    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||    {

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||      id: 6,

      {/* Header Section */}

      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">                         scheme.department.toLowerCase().includes(searchTerm.toLowerCase());      title: "Mahila Shakti Udyamita Yojana",

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;      department: "Ministry of Women & Child Development",

            <h1 className="text-4xl md:text-5xl font-bold mb-4">

              Government Schemes 2025    return matchesSearch && matchesCategory;      description: "Women-focused entrepreneurship and skill development program",

            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100">  });      benefits: [

              Discover opportunities for skill development, employment, and financial support

            </p>        "₹5 lakh loan with 50% subsidy",

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">  const getStatusColor = (status: string) => {        "Free business development training",

                <CheckCircle className="w-5 h-5" />

                <span>75+ Active Schemes</span>    switch (status) {        "Mentorship program",

              </div>

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">      case "Active": return "bg-green-100 text-green-800";        "Market linkage support",

                <Users className="w-5 h-5" />

                <span>20M+ Beneficiaries</span>      case "Upcoming": return "bg-blue-100 text-blue-800";        "Childcare facilities during training",

              </div>

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">      case "Ending Soon": return "bg-red-100 text-red-800";        "Legal aid for business setup"

                <TrendingUp className="w-5 h-5" />

                <span>Updated for 2025</span>      default: return "bg-gray-100 text-gray-800";      ],

              </div>

            </div>    }      eligibility: "Women aged 18-55, any background",

          </div>

        </div>  };      deadline: "December 2025",

      </div>

      status: "Active",

      {/* Search and Filter Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  return (      link: "https://wcd.gov.in/mahilashakti",

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">

          <div className="flex flex-col lg:flex-row gap-4">    <div className="min-h-screen bg-gray-50">      category: "employment",

            <div className="flex-1">

              <Input      {/* Hero Section */}      popular: true,

                placeholder="Search schemes by name, department, or keywords..."

                value={searchTerm}      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">      new: true

                onChange={(e) => setSearchTerm(e.target.value)}

                className="w-full"        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">    },

              />

            </div>          <div className="text-center">    {

            <div className="flex gap-2">

              <Button            <h1 className="text-4xl font-bold mb-4">      id: 7,

                variant="outline"

                onClick={() => {/* Export functionality */}}              Government Schemes 2025      title: "Green Jobs Mission 2025",

              >

                <Download className="w-4 h-4 mr-2" />            </h1>      department: "Ministry of Environment & Climate Change",

                Export List

              </Button>            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">      description: "Employment opportunities in renewable energy and environmental conservation",

              <Button

                variant="outline"              Discover the latest government schemes and programs designed to empower workers,       benefits: [

                onClick={() => sendEmail(CONTACT_INFO.support, "Government Schemes Inquiry")}

              >              enhance skills, and boost employment opportunities across India        "Green skills certification",

                <Mail className="w-4 h-4 mr-2" />

                Get Help            </p>        "₹2 lakh loan for green startups",

              </Button>

            </div>            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">        "Solar technician training",

          </div>

        </div>              <div className="relative max-w-md w-full">        "Waste management entrepreneurship",



        {/* Category Grid */}                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />        "Carbon credit trading training"

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          {schemeCategories.map((category) => {                <Input      ],

            const IconComponent = category.icon;

            return (                  type="text"      eligibility: "Age 18-40, interest in environmental work",

              <Card 

                key={category.id}                  placeholder="Search schemes..."      deadline: "June 2025",

                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${

                  selectedCategory === category.id                   value={searchTerm}      status: "Active",

                    ? 'border-blue-500 bg-blue-50' 

                    : 'border-gray-200 hover:border-blue-300'                  onChange={(e) => setSearchTerm(e.target.value)}      link: "https://greenjobs.gov.in",

                }`}

                onClick={() => setSelectedCategory(category.id)}                  className="pl-10 pr-4 py-3 w-full text-gray-900"      category: "skills",

              >

                <div className="flex items-center gap-4 mb-3">                />      popular: false,

                  <div className={`p-3 rounded-lg ${category.color}`}>

                    <IconComponent className="w-6 h-6" />              </div>      new: true

                  </div>

                  <div>              <Button     },

                    <h3 className="font-semibold text-gray-800">{category.title}</h3>

                    <p className="text-sm text-gray-600">{category.count} schemes</p>                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"    {

                  </div>

                </div>                onClick={() => document.getElementById('schemes-grid')?.scrollIntoView({ behavior: 'smooth' })}      id: 8,

                <p className="text-sm text-gray-600">{category.description}</p>

              </Card>              >      title: "Ayushman Bharat Health Workers Scheme",

            );

          })}                <TrendingUp className="h-5 w-5 mr-2" />      department: "Ministry of Health & Family Welfare",

        </div>

                Explore Schemes      description: "Healthcare sector employment with comprehensive training",

        {/* Results Summary */}

        <div className="flex justify-between items-center mb-6">              </Button>      benefits: [

          <h2 className="text-2xl font-bold text-gray-800">

            {selectedCategory === "all" ? "All Schemes" : schemeCategories.find(cat => cat.id === selectedCategory)?.title}            </div>        "Free medical training and certification",

            <span className="text-lg font-normal text-gray-600 ml-2">

              ({filteredSchemes.length} schemes found)          </div>        "₹15,000/month guaranteed salary",

            </span>

          </h2>        </div>        "Health insurance for family",

          <div className="text-sm text-gray-500">

            Updated: September 2025      </div>        "Career progression pathways",

          </div>

        </div>        "Continuing education support"



        {/* Schemes Grid */}      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">      ],

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {filteredSchemes.map((scheme) => (        {/* Statistics Section */}      eligibility: "12th pass, age 18-35",

            <SchemeCard key={scheme.id} scheme={scheme} />

          ))}        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">      deadline: "October 2025",

        </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">      status: "Active",

        {filteredSchemes.length === 0 && (

          <div className="text-center py-12">            <div className="text-3xl font-bold text-blue-600 mb-2">75+</div>      link: "https://ayushmanbharat.pm",

            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />

            <h3 className="text-xl font-semibold text-gray-600 mb-2">No schemes found</h3>            <div className="text-gray-600">Active Schemes</div>      category: "skills",

            <p className="text-gray-500 mb-4">

              Try adjusting your search terms or category filter            <div className="text-sm text-green-600 mt-1">↑ 15 new in 2025</div>      popular: true,

            </p>

            <Button onClick={() => {setSearchTerm(""); setSelectedCategory("all");}}>          </div>      new: false

              Clear Filters

            </Button>          <div className="bg-white rounded-lg shadow-md p-6 text-center">    }

          </div>

        )}            <div className="text-3xl font-bold text-green-600 mb-2">₹2.5L Cr</div>  ];



        {/* Support Section */}            <div className="text-gray-600">Total Budget</div>

        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 text-center">

          <h3 className="text-2xl font-bold mb-4">Need Help with Applications?</h3>            <div className="text-sm text-green-600 mt-1">↑ 20% increase</div>  // Filter schemes based on search and category

          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">

            Our experts can guide you through the application process and help you find the most suitable schemes for your needs.          </div>  const filteredSchemes = featuredSchemes.filter(scheme => {

          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">          <div className="bg-white rounded-lg shadow-md p-6 text-center">    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||

            <Button

              variant="secondary"            <div className="text-3xl font-bold text-purple-600 mb-2">10M+</div>                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||

              onClick={() => makePhoneCall(CONTACT_INFO.helpline)}

              className="bg-white text-blue-600 hover:bg-blue-50"            <div className="text-gray-600">Beneficiaries</div>                         scheme.department.toLowerCase().includes(searchTerm.toLowerCase());

            >

              <Phone className="w-4 h-4 mr-2" />            <div className="text-sm text-green-600 mt-1">Target for 2025</div>    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;

              Call Helpline

            </Button>          </div>    return matchesSearch && matchesCategory;

            <Button

              variant="outline"          <div className="bg-white rounded-lg shadow-md p-6 text-center">  });

              onClick={() => sendEmail(CONTACT_INFO.support, "Scheme Application Assistance")}

              className="border-white text-white hover:bg-white/10"            <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>

            >

              <Mail className="w-4 h-4 mr-2" />            <div className="text-gray-600">Training Centers</div>  const getStatusColor = (status: string) => {

              Email Support

            </Button>            <div className="text-sm text-green-600 mt-1">Across India</div>    switch (status) {

          </div>

        </div>          </div>      case "Active": return "bg-green-100 text-green-800";

      </div>

    </div>        </div>      case "Upcoming": return "bg-blue-100 text-blue-800";

  );

}      case "Ending Soon": return "bg-red-100 text-red-800";

        {/* Category Filter */}      default: return "bg-gray-100 text-gray-800";

        <div className="mb-8">    }

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Scheme Categories</h2>  };

          <div className="flex flex-wrap gap-3 mb-6">

            <Button  return (

              variant={selectedCategory === "all" ? "default" : "outline"}    <div className="min-h-screen bg-gray-50">

              onClick={() => setSelectedCategory("all")}      {/* Hero Section */}

              className="flex items-center gap-2"      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

            >        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

              <Target className="h-4 w-4" />          <div className="text-center">

              All Categories            <h1 className="text-4xl font-bold mb-4">

            </Button>              Government Schemes 2025

            {schemeCategories.map((category) => {            </h1>

              const IconComponent = category.icon;            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">

              return (              Discover the latest government schemes and programs designed to empower workers, 

                <Button              enhance skills, and boost employment opportunities across India

                  key={category.id}            </p>

                  variant={selectedCategory === category.id ? "default" : "outline"}            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                  onClick={() => setSelectedCategory(category.id)}              <div className="relative max-w-md w-full">

                  className="flex items-center gap-2"                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

                >                <Input

                  <IconComponent className="h-4 w-4" />                  type="text"

                  {category.title}                  placeholder="Search schemes..."

                  <Badge variant="secondary" className="ml-1">                  value={searchTerm}

                    {category.count}                  onChange={(e) => setSearchTerm(e.target.value)}

                  </Badge>                  className="pl-10 pr-4 py-3 w-full text-gray-900"

                </Button>                />

              );              </div>

            })}              <Button 

          </div>                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"

                          onClick={() => document.getElementById('schemes-grid')?.scrollIntoView({ behavior: 'smooth' })}

          {/* Category Cards Grid */}              >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">                <TrendingUp className="h-5 w-5 mr-2" />

            {schemeCategories.map((category) => {                Explore Schemes

              const IconComponent = category.icon;              </Button>

              return (            </div>

                <Card           </div>

                  key={category.id}         </div>

                  className={`p-6 cursor-pointer transition-all hover:shadow-lg border-l-4 ${      </div>

                    selectedCategory === category.id ? 'border-l-blue-500 bg-blue-50' : 'border-l-gray-200'

                  }`}      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                  onClick={() => setSelectedCategory(category.id)}        {/* Statistics Section */}

                >        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

                  <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>          <div className="bg-white rounded-lg shadow-md p-6 text-center">

                    <IconComponent className="h-6 w-6" />            <div className="text-3xl font-bold text-blue-600 mb-2">75+</div>

                  </div>            <div className="text-gray-600">Active Schemes</div>

                  <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>            <div className="text-sm text-green-600 mt-1">↑ 15 new in 2025</div>

                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>          </div>

                  <div className="flex items-center justify-between">          <div className="bg-white rounded-lg shadow-md p-6 text-center">

                    <span className="text-2xl font-bold text-gray-900">{category.count}</span>            <div className="text-3xl font-bold text-green-600 mb-2">₹2.5L Cr</div>

                    <span className="text-sm text-gray-500">schemes</span>            <div className="text-gray-600">Total Budget</div>

                  </div>            <div className="text-sm text-green-600 mt-1">↑ 20% increase</div>

                </Card>          </div>

              );          <div className="bg-white rounded-lg shadow-md p-6 text-center">

            })}            <div className="text-3xl font-bold text-purple-600 mb-2">10M+</div>

          </div>            <div className="text-gray-600">Beneficiaries</div>

        </div>            <div className="text-sm text-green-600 mt-1">Target for 2025</div>

          </div>

        {/* Featured Schemes Grid */}          <div className="bg-white rounded-lg shadow-md p-6 text-center">

        <div id="schemes-grid">            <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>

          <div className="flex items-center justify-between mb-6">            <div className="text-gray-600">Training Centers</div>

            <h2 className="text-2xl font-bold text-gray-900">            <div className="text-sm text-green-600 mt-1">Across India</div>

              {selectedCategory === "all" ? "All Schemes" :           </div>

               schemeCategories.find(cat => cat.id === selectedCategory)?.title + " Schemes"}        </div>

              <span className="text-sm font-normal text-gray-500 ml-2">

                ({filteredSchemes.length} schemes found)        {/* Category Filter */}

              </span>        <div className="mb-8">

            </h2>          <h2 className="text-2xl font-bold text-gray-900 mb-6">Scheme Categories</h2>

            <div className="flex gap-2">          <div className="flex flex-wrap gap-3 mb-6">

              <Badge variant="outline" className="bg-green-50 text-green-700">            <Button

                <CheckCircle className="h-3 w-3 mr-1" />              variant={selectedCategory === "all" ? "default" : "outline"}

                {filteredSchemes.filter(s => s.status === "Active").length} Active              onClick={() => setSelectedCategory("all")}

              </Badge>              className="flex items-center gap-2"

              <Badge variant="outline" className="bg-blue-50 text-blue-700">            >

                <Star className="h-3 w-3 mr-1" />              <Target className="h-4 w-4" />

                {filteredSchemes.filter(s => s.new).length} New in 2025              All Categories

              </Badge>            </Button>

            </div>            {schemeCategories.map((category) => {

          </div>              const IconComponent = category.icon;

              return (

          {filteredSchemes.length === 0 ? (                <Button

            <div className="text-center py-12">                  key={category.id}

              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />                  variant={selectedCategory === category.id ? "default" : "outline"}

              <h3 className="text-lg font-semibold text-gray-900 mb-2">No schemes found</h3>                  onClick={() => setSelectedCategory(category.id)}

              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>                  className="flex items-center gap-2"

            </div>                >

          ) : (                  <IconComponent className="h-4 w-4" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">                  {category.title}

              {filteredSchemes.map((scheme) => (                  <Badge variant="secondary" className="ml-1">

                <Card key={scheme.id} className="border border-gray-200 hover:shadow-lg transition-shadow">                    {category.count}

                  <div className="p-6">                  </Badge>

                    <div className="flex items-start justify-between mb-4">                </Button>

                      <div className="flex-1">              );

                        <div className="flex items-center gap-2 mb-2">            })}

                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">          </div>

                            {scheme.title}          

                          </h3>          {/* Category Cards Grid */}

                          {scheme.popular && (          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">

                            <Badge className="bg-orange-100 text-orange-800">            {schemeCategories.map((category) => {

                              <Star className="h-3 w-3 mr-1" />              const IconComponent = category.icon;

                              Popular              return (

                            </Badge>                <Card 

                          )}                  key={category.id} 

                          {scheme.new && (                  className={`p-6 cursor-pointer transition-all hover:shadow-lg border-l-4 ${

                            <Badge className="bg-blue-100 text-blue-800">                    selectedCategory === category.id ? 'border-l-blue-500 bg-blue-50' : 'border-l-gray-200'

                              <Zap className="h-3 w-3 mr-1" />                  }`}

                              New 2025                  onClick={() => setSelectedCategory(category.id)}

                            </Badge>                >

                          )}                  <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>

                        </div>                    <IconComponent className="h-6 w-6" />

                        <p className="text-sm text-blue-600 font-medium mb-2">{scheme.department}</p>                  </div>

                      </div>                  <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>

                      <Badge className={getStatusColor(scheme.status)}>                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>

                        {scheme.status}                  <div className="flex items-center justify-between">

                      </Badge>                    <span className="text-2xl font-bold text-gray-900">{category.count}</span>

                    </div>                    <span className="text-sm text-gray-500">schemes</span>

                                      </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{scheme.description}</p>                </Card>

                                  );

                    <div className="mb-4">            })}

                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">          </div>

                        <Award className="h-4 w-4 mr-1" />        </div>

                        Key Benefits:

                      </h4>        {/* Featured Schemes Grid */}

                      <ul className="space-y-1">        <div id="schemes-grid">

                        {scheme.benefits.slice(0, 3).map((benefit, index) => (          <div className="flex items-center justify-between mb-6">

                          <li key={index} className="text-sm text-gray-600 flex items-start">            <h2 className="text-2xl font-bold text-gray-900">

                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />              {selectedCategory === "all" ? "All Schemes" : 

                            {benefit}               schemeCategories.find(cat => cat.id === selectedCategory)?.title + " Schemes"}

                          </li>              <span className="text-sm font-normal text-gray-500 ml-2">

                        ))}                ({filteredSchemes.length} schemes found)

                        {scheme.benefits.length > 3 && (              </span>

                          <li className="text-sm text-blue-600">            </h2>

                            +{scheme.benefits.length - 3} more benefits            <div className="flex gap-2">

                          </li>              <Badge variant="outline" className="bg-green-50 text-green-700">

                        )}                <CheckCircle className="h-3 w-3 mr-1" />

                      </ul>                {filteredSchemes.filter(s => s.status === "Active").length} Active

                    </div>              </Badge>

                                  <Badge variant="outline" className="bg-blue-50 text-blue-700">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">                <Star className="h-3 w-3 mr-1" />

                      <div>                {filteredSchemes.filter(s => s.new).length} New in 2025

                        <span className="font-semibold text-gray-700">Eligibility:</span>              </Badge>

                        <p className="text-gray-600 mt-1">{scheme.eligibility}</p>            </div>

                      </div>          </div>

                      <div>

                        <span className="font-semibold text-gray-700 flex items-center">          {filteredSchemes.length === 0 ? (

                          <Clock className="h-4 w-4 mr-1" />            <div className="text-center py-12">

                          Deadline:              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />

                        </span>              <h3 className="text-lg font-semibold text-gray-900 mb-2">No schemes found</h3>

                        <p className="text-gray-600 mt-1">{scheme.deadline}</p>              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>

                      </div>            </div>

                    </div>          ) : (

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="flex flex-col sm:flex-row gap-3">              {filteredSchemes.map((scheme) => (

                      <Button                 <Card key={scheme.id} className="border border-gray-200 hover:shadow-lg transition-shadow">

                        className="flex-1 flex items-center justify-center gap-2"                  <div className="p-6">

                        onClick={() => window.open(scheme.link, '_blank')}                    <div className="flex items-start justify-between mb-4">

                      >                      <div className="flex-1">

                        <ExternalLink className="h-4 w-4" />                        <div className="flex items-center gap-2 mb-2">

                        Apply Now                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">

                      </Button>                            {scheme.title}

                      <Button                           </h3>

                        variant="outline"                           {scheme.popular && (

                        className="flex items-center justify-center gap-2"                            <Badge className="bg-orange-100 text-orange-800">

                        onClick={() => {                              <Star className="h-3 w-3 mr-1" />

                          const info = `${scheme.title}\n${scheme.description}\nEligibility: ${scheme.eligibility}\nDeadline: ${scheme.deadline}\nMore info: ${scheme.link}`;                              Popular

                          navigator.clipboard.writeText(info);                            </Badge>

                        }}                          )}

                      >                          {scheme.new && (

                        <Download className="h-4 w-4" />                            <Badge className="bg-blue-100 text-blue-800">

                        Share Info                              <Zap className="h-3 w-3 mr-1" />

                      </Button>                              New 2025

                    </div>                            </Badge>

                  </div>                          )}

                </Card>                        </div>

              ))}                        <p className="text-sm text-blue-600 font-medium mb-2">{scheme.department}</p>

            </div>                      </div>

          )}                      <Badge className={getStatusColor(scheme.status)}>

        </div>                        {scheme.status}

                      </Badge>

        {/* Additional Resources */}                    </div>

        <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">                    

          <div className="text-center mb-8">                    <p className="text-gray-600 mb-4 line-clamp-2">{scheme.description}</p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Applications?</h2>                    

            <p className="text-gray-600 max-w-2xl mx-auto">                    <div className="mb-4">

              Our team of experts can help you navigate through government schemes,                       <h4 className="font-semibold text-gray-900 mb-2 flex items-center">

              understand eligibility criteria, and assist with the application process.                        <Award className="h-4 w-4 mr-1" />

            </p>                        Key Benefits:

          </div>                      </h4>

                                <ul className="space-y-1">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">                        {scheme.benefits.slice(0, 3).map((benefit, index) => (

            <Card className="text-center p-6 bg-white">                          <li key={index} className="text-sm text-gray-600 flex items-start">

              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />

              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>                            {benefit}

              <p className="text-gray-600 mb-4">Speak with our scheme experts</p>                          </li>

              <Button                         ))}

                onClick={() => makePhoneCall(CONTACT_INFO.phone)}                        {scheme.benefits.length > 3 && (

                className="w-full"                          <li className="text-sm text-blue-600">

              >                            +{scheme.benefits.length - 3} more benefits

                Call {CONTACT_INFO.phone}                          </li>

              </Button>                        )}

            </Card>                      </ul>

                                </div>

            <Card className="text-center p-6 bg-white">                    

              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">

              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>                      <div>

              <p className="text-gray-600 mb-4">Get detailed guidance via email</p>                        <span className="font-semibold text-gray-700">Eligibility:</span>

              <Button                         <p className="text-gray-600 mt-1">{scheme.eligibility}</p>

                variant="outline"                      </div>

                onClick={() => sendEmail(CONTACT_INFO.email, 'Government Scheme Inquiry', 'Hi, I need help with government schemes...')}                      <div>

                className="w-full"                        <span className="font-semibold text-gray-700 flex items-center">

              >                          <Clock className="h-4 w-4 mr-1" />

                Email Us                          Deadline:

              </Button>                        </span>

            </Card>                        <p className="text-gray-600 mt-1">{scheme.deadline}</p>

                                  </div>

            <Card className="text-center p-6 bg-white">                    </div>

              <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />                    

              <h3 className="font-semibold text-gray-900 mb-2">Document Help</h3>                    <div className="flex flex-col sm:flex-row gap-3">

              <p className="text-gray-600 mb-4">Assistance with application documents</p>                      <Button 

              <Button variant="outline" className="w-full">                        className="flex-1 flex items-center justify-center gap-2"

                Get Document Help                        onClick={() => window.open(scheme.link, '_blank')}

              </Button>                      >

            </Card>                        <ExternalLink className="h-4 w-4" />

          </div>                        Apply Now

        </div>                      </Button>

                      <Button 

        {/* Scheme Updates Subscription */}                        variant="outline" 

        <div className="mt-12 bg-blue-600 rounded-xl p-8 text-white text-center">                        className="flex items-center justify-center gap-2"

          <h2 className="text-2xl font-bold mb-4">Stay Updated with New Schemes</h2>                        onClick={() => {

          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">                          // Generate scheme info for sharing

            Subscribe to get notifications about new government schemes, application deadlines,                           const info = `${scheme.title}\n${scheme.description}\nEligibility: ${scheme.eligibility}\nDeadline: ${scheme.deadline}\nMore info: ${scheme.link}`;

            and important updates delivered to your inbox.                          navigator.clipboard.writeText(info);

          </p>                        }}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">                      >

            <Input                        <Download className="h-4 w-4" />

              type="email"                        Share Info

              placeholder="Enter your email"                      </Button>

              className="flex-1 text-gray-900"                    </div>

            />                  </div>

            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8">                </Card>

              Subscribe              ))}

            </Button>            </div>

          </div>          )}

          <p className="text-xs text-blue-200 mt-4">        </div>

            We respect your privacy. Unsubscribe at any time.

          </p>        {/* Additional Resources */}

        </div>        <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">

      </div>          <div className="text-center mb-8">

    </div>            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Applications?</h2>

  );            <p className="text-gray-600 max-w-2xl mx-auto">

}              Our team of experts can help you navigate through government schemes, 
              understand eligibility criteria, and assist with the application process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6 bg-white">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak with our scheme experts</p>
              <Button 
                onClick={() => makePhoneCall(CONTACT_INFO.phone)}
                className="w-full"
              >
                Call {CONTACT_INFO.phone}
              </Button>
            </Card>
            
            <Card className="text-center p-6 bg-white">
              <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed guidance via email</p>
              <Button 
                variant="outline"
                onClick={() => sendEmail(CONTACT_INFO.email, 'Government Scheme Inquiry', 'Hi, I need help with government schemes...')}
                className="w-full"
              >
                Email Us
              </Button>
            </Card>
            
            <Card className="text-center p-6 bg-white">
              <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Document Help</h3>
              <p className="text-gray-600 mb-4">Assistance with application documents</p>
              <Button variant="outline" className="w-full">
                Get Document Help
              </Button>
            </Card>
          </div>
        </div>

        {/* Scheme Updates Subscription */}
        <div className="mt-12 bg-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with New Schemes</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to get notifications about new government schemes, application deadlines, 
            and important updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 text-gray-900"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-blue-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
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
