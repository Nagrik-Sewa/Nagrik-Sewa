import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  MapPin,
  Star,
  Shield,
  Clock,
  Users,
  Zap,
  Heart,
  Award,
  ChevronRight,
  Play,
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Brain,
  FileText,
  Navigation,
  UserCheck,
  AlertTriangle,
  GraduationCap,
  Building,
  Activity,
  Blocks
} from "lucide-react";
import { useState } from "react";

export default function Index() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const navigate = useNavigate();

  const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];

  const popularServices = [
    { name: t ('House Cleaning'), icon: "🏠", demand: "High" },
    { name: t ('Plumbing'), icon: "🔧", demand: "Medium" },
    { name: t ('Electrical Work'), icon: "⚡", demand: "High" },
    { name: t ('Painting'), icon: "🎨", demand: "Medium" },
    { name: t ('Carpentry'), icon: "🔨", demand: "Medium" },
    { name: t ('Gardening'), icon: "🌱", demand: "Low" },
  ];

  const features = [
    {
      icon: Brain,
      title: t ("AI-Powered Matching"),
      description: t ("Smart algorithm matches you with the best workers based on location, skills, and ratings."),
      color: "text-blue-600"
    },
    {
      icon: Globe,
      title: t ("Multi-Language Support"),
      description: t ("Platform available in 11+ Indian languages with voice assistant support."),
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: t ("Verified Workers"),
      description: t ("All workers undergo KYC, Aadhaar verification, and background checks."),
      color: "text-purple-600"
    },
    {
      icon: Navigation,
      title: t ("Real-Time Tracking"),
      description: t ("Track your worker's location and job progress in real-time with GPS."),
      color: "text-orange-600"
    },
    {
      icon: FileText,
      title: t ("Digital Resume Builder"),
      description: t ("Workers can build professional resumes showcasing skills and ratings."),
      color: "text-indigo-600"
    },
    {
      icon: AlertTriangle,
      title: t("Emergency SOS"),
      description: t("One-click emergency button for immediate help and safety alerts."),
      color: "text-red-600"
    }
  ];

  const advancedFeatures = [
    {
      icon: GraduationCap,
      title: t ("Skill Training & Upskilling"),
      description: t("Access to government-certified training programs and skill development courses."),
    },
    {
      icon: Building,
      title: t ("Government Schemes"),
      description: t ("Discover and apply for relevant government schemes and benefits."),
    },
    {
      icon: Activity,
      title: t("Performance Analytics"),
      description: t("Track your service history, earnings, and customer feedback."),
    },
    {
      icon: Users,
      title: t ("Worker Community"),
      description: t ("Connect with fellow workers, share experiences, and learn together."),
    }
  ];

  const stats = [
    { number: "50,000+", label: t("Active Workers"), icon: Users },
    { number: "1M+", label: t("Services Completed"), icon: CheckCircle },
    { number: "25+", label: t("Cities Covered"), icon: MapPin },
    { number: "4.8/5", label: t("Average Rating"), icon: Star },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      text: "Found a reliable house cleaning service within 30 minutes. The worker was verified and did an excellent job!",
      avatar: "P"
    },
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 5,
      text: "As a plumber, this platform helped me get regular work and build my reputation. The payment system is transparent.",
      avatar: "R"
    },
    {
      name: "Anita Patel",
      location: "Bangalore",
      rating: 5,
      text: "The emergency SOS feature saved me when I had a water leak emergency. Got help within 20 minutes!",
      avatar: "A"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-100 text-brand-800 border-brand-200">
              {t ('🚀 Now Available in 25+ Cities Across India')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t ('AI-Powered Home Services')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-500"> {t ('Made Simple')} </span>
              {t ('for Everyone')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t( "India's premier digital platform connecting customers with verified service professionals through advanced AI technology.")}
              <span className="font-semibold text-brand-600">{t ('Expert AI assistance')}</span>,
              <span className="font-semibold text-orange-600"> {t ('multilingual support')}</span>, and
              <span className="font-semibold text-purple-600"> {t ('intelligent matching')}</span> - {t ('all in your native language')}.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder={t('home.searchPlaceholder') || "What service do you need?"}
                      className="pl-10 h-12 text-lg border-gray-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      className="pl-10 h-12 w-full rounded-md border border-gray-300 text-lg bg-white"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <Button 
                    size="lg" 
                    className="h-12 text-lg bg-brand-600 hover:bg-brand-700 shadow-md"
                    onClick={() => {
                      navigate('/workers');
                      // ScrollToTop component will handle scrolling automatically
                    }}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    {t('home.findWorkers') || 'Find Workers'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Popular Services */}
            <div className="mb-12">
              <p className="text-gray-600 mb-4">{t('home.popularServices') || 'Popular services:'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {popularServices.map((service, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="rounded-full border-gray-300 hover:border-brand-400 hover:bg-brand-50"
                    onClick={() => {
                      navigate('/services');
                      // ScrollToTop component will handle scrolling automatically
                    }}
                  >
                    <span className="mr-2">{service.icon}</span>
                    {service.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {service.demand}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-700 text-white text-lg px-8 py-4 shadow-lg"
                onClick={() => {
                  navigate('/join-as-worker');
                  // ScrollToTop component will handle scrolling automatically
                }}
              >
                <Users className="w-5 h-5 mr-2" />
                Join as Worker
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-brand-600 hover:bg-brand-700 text-white text-lg px-8 py-4 shadow-lg"
                onClick={() => {
                  navigate('/join-as-customer');
                  // ScrollToTop component will handle scrolling automatically
                }}
              >
                <Users className="w-5 h-5 mr-2" />
                Join as Customer
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-lg px-8 py-4"
                onClick={() => {
                  navigate('/demo');
                  // ScrollToTop component will handle scrolling automatically
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-brand-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">
              ✨ Powered by Advanced Technology
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('home.featuresTitle') || 'Why Choose Nagrik Sewa?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.featuresSubtitle') || "We're revolutionizing how India connects workers and customers with cutting-edge technology and deep local understanding."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-brand-200 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mr-4`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('How It Works') || 'How It Works'}
            </h2>
            <p className="text-xl text-gray-600">
              {t('Get connected with verified workers in just 3 simple steps') || 'Get connected with verified workers in just 3 simple steps'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t ('Search & Select')}</h3>
              <p className="text-gray-600">
                {t ('Search for the service you need, view worker profiles, ratings, and reviews. Our AI matches you with the best options.')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t ('Book & Track')}</h3>
              <p className="text-gray-600">
                {t ('Book your preferred worker, make secure payments, and track their location in real-time as they arrive.')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t ('Get Work Done')}</h3>
              <p className="text-gray-600">
                {t ('Your verified worker completes the job professionally. Rate your experience and help others find great workers.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              🔮 Future-Ready Platform
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {t ('Advanced Features')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t ('We\'re building the future of work with innovative features that empower both workers and customers.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              {t ('What People Say')}
            </h2>
            <p className="text-xl text-gray-600">
              {t ('Trusted by thousands of customers and workers across India')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-600 to-brand-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and workers. Connect instantly and grow your business today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/workers">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-gray-50 hover:text-brand-600 hover:shadow-lg text-lg px-8 py-4 font-semibold transition-all duration-300 w-[200px]">
                <Search className="w-5 h-5 mr-2" />
                Find Workers
              </Button>
            </Link>
            <Link to="/find-customers">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-gray-50 hover:text-brand-600 hover:shadow-lg text-lg px-8 py-4 font-semibold transition-all duration-300 w-[200px]">
                <Search className="w-5 h-5 mr-2" />
                Find Customers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
