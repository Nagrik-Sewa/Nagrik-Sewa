import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/contexts/LocationContext";
import { indianStates } from "@/data/indianLocations";
import { 
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
  Shield,
  Award,
  RefreshCw
} from "lucide-react";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [locationChanged, setLocationChanged] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState("All");
  const [availability, setAvailability] = useState("All");
  const { selectedState, selectedDistrict } = useLocation();
  const navigate = useNavigate();

  // Get current location name
  const currentLocation = selectedState 
    ? indianStates.find(state => state.code === selectedState)?.name || "India"
    : "India";
  
  const displayLocation = selectedDistrict ? `${selectedDistrict}, ${currentLocation}` : currentLocation;

  // Show animation when location changes
  useEffect(() => {
    setLocationChanged(true);
    const timer = setTimeout(() => setLocationChanged(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedState, selectedDistrict]);

  const categories = ["All", "Home Services", "Construction", "Technical", "Personal Care", "Event Services"];

  const services = [
    {
      id: 1,
      title: "House Cleaning",
      category: "Home Services",
      icon: "🏠",
      description: "Professional home cleaning services with verified cleaners",
      workers: 1250,
      avgRating: 4.8,
      avgPrice: "₹300-500",
      availability: "Same day",
      features: ["Deep cleaning", "Regular maintenance", "Eco-friendly products"]
    },
    {
      id: 2,
      title: "Plumbing Services",
      category: "Technical",
      icon: "🔧",
      description: "Expert plumbers for all your water and drainage needs",
      workers: 850,
      avgRating: 4.7,
      avgPrice: "₹200-800",
      availability: "24/7 Emergency",
      features: ["Pipe repair", "Installation", "Emergency fixes"]
    },
    {
      id: 3,
      title: "Electrical Work",
      category: "Technical", 
      icon: "⚡",
      description: "Licensed electricians for safe electrical solutions",
      workers: 680,
      avgRating: 4.9,
      avgPrice: "₹250-1000",
      availability: "Same day",
      features: ["Wiring", "Appliance repair", "Safety checks"]
    },
    {
      id: 4,
      title: "House Painting",
      category: "Home Services",
      icon: "🎨",
      description: "Professional painters for interior and exterior work",
      workers: 520,
      avgRating: 4.6,
      avgPrice: "₹15-25/sq ft",
      availability: "2-3 days",
      features: ["Interior painting", "Exterior painting", "Texture work"]
    },
    {
      id: 5,
      title: "Carpentry",
      category: "Construction",
      icon: "🔨",
      description: "Skilled carpenters for furniture and woodwork",
      workers: 420,
      avgRating: 4.8,
      avgPrice: "₹400-1200",
      availability: "1-2 days",
      features: ["Furniture repair", "Custom work", "Installation"]
    },
    {
      id: 6,
      title: "Gardening",
      category: "Home Services",
      icon: "🌱",
      description: "Garden maintenance and landscaping experts",
      workers: 280,
      avgRating: 4.5,
      avgPrice: "₹300-600",
      availability: "Next day",
      features: ["Plant care", "Landscaping", "Pest control"]
    },
    {
      id: 7,
      title: "AC Repair",
      category: "Technical",
      icon: "❄️",
      description: "Professional AC installation and repair services",
      workers: 340,
      avgRating: 4.7,
      avgPrice: "₹350-1500",
      availability: "Same day",
      features: ["Repair", "Installation", "Maintenance"]
    },
    {
      id: 8,
      title: "Construction Labor",
      category: "Construction",
      icon: "🏗️",
      description: "Skilled construction workers for all building needs",
      workers: 920,
      avgRating: 4.6,
      avgPrice: "₹500-800/day",
      availability: "2-3 days",
      features: ["Skilled labor", "Team available", "Tools included"]
    },
    {
      id: 9,
      title: "Beauty Services",
      category: "Personal Care",
      icon: "💄",
      description: "Professional beauty and grooming services at home",
      workers: 180,
      avgRating: 4.8,
      avgPrice: "₹500-2000",
      availability: "Same day",
      features: ["Hair styling", "Makeup", "Skincare"]
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    const matchesRating = service.avgRating >= minRating;
    const matchesPrice = maxPrice === "All" || (() => {
      const priceNum = parseInt(service.avgPrice.replace(/[^0-9]/g, ''));
      switch(maxPrice) {
        case "Under 500": return priceNum <= 500;
        case "500-1000": return priceNum > 500 && priceNum <= 1000;
        case "1000-2000": return priceNum > 1000 && priceNum <= 2000;
        case "Above 2000": return priceNum > 2000;
        default: return true;
      }
    })();
    const matchesAvailability = availability === "All" || service.availability.toLowerCase().includes(availability.toLowerCase());
    return matchesSearch && matchesCategory && matchesRating && matchesPrice && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-brand-600 to-brand-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              All Services
            </h1>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Browse our complete catalog of verified workers across all service categories
            </p>
            
            {/* Location Notice */}
            {!selectedState && (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center text-yellow-800">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    Select your location from the navigation bar to see services in your area
                  </span>
                </div>
              </div>
            )}

            {/* Location Active Notice */}
            {selectedState && (
              <div className={`bg-green-100 border border-green-300 rounded-lg p-3 mb-6 max-w-2xl mx-auto transition-all duration-500 ${
                locationChanged ? 'scale-105 shadow-lg' : 'scale-100'
              }`}>
                <div className="flex items-center justify-center text-green-800">
                  <MapPin className={`w-5 h-5 mr-2 ${locationChanged ? 'animate-pulse' : ''}`} />
                  <span className="font-medium">
                    Showing services available in {displayLocation}
                  </span>
                  {locationChanged && (
                    <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                  )}
                </div>
              </div>
            )}
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ${
                locationChanged ? 'ring-2 ring-green-400' : ''
              }`}>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="relative md:col-span-2">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search services..."
                      className="pl-10 h-12 text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select 
                    className="h-12 px-4 rounded-md border border-gray-300 text-lg bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className={`h-12 px-4 rounded-md border-2 text-lg flex items-center transition-all duration-300 overflow-hidden ${
                    selectedState 
                      ? 'bg-green-50 border-green-400' 
                      : 'bg-gray-50 border-gray-300'
                  }`}>
                    <MapPin className={`w-4 h-4 mr-2 flex-shrink-0 ${
                      selectedState ? 'text-green-600' : 'text-gray-500'
                    }`} />
                    <span className={`font-medium truncate ${
                      selectedState ? 'text-green-700' : 'text-gray-700'
                    }`} title={displayLocation}>
                      {displayLocation}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <h2 className={`text-2xl font-bold text-gray-900 transition-all duration-300 ${
                locationChanged ? 'scale-105' : 'scale-100'
              }`}>
                {filteredServices.length} Services Available in {displayLocation}
              </h2>
              {selectedState && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  <MapPin className="w-3 h-3 mr-1" />
                  Location Active
                </Badge>
              )}
            </div>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </Button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-gray-300"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                  >
                    <option value={0}>All Ratings</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={4.7}>4.7+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-gray-300"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  >
                    <option value="All">All Prices</option>
                    <option value="Under 500">Under ₹500</option>
                    <option value="500-1000">₹500 - ₹1000</option>
                    <option value="1000-2000">₹1000 - ₹2000</option>
                    <option value="Above 2000">Above ₹2000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-gray-300"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Same day">Same Day</option>
                    <option value="24/7">24/7 Emergency</option>
                    <option value="Next day">Next Day</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setMinRating(0);
                      setMaxPrice("All");
                      setAvailability("All");
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                {minRating > 0 && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-800">
                    ⭐ {minRating}+ Rating
                    <button 
                      onClick={() => setMinRating(0)}
                      className="ml-2 hover:text-brand-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {maxPrice !== "All" && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-800">
                    💰 {maxPrice}
                    <button 
                      onClick={() => setMaxPrice("All")}
                      className="ml-2 hover:text-brand-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {availability !== "All" && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-800">
                    🕐 {availability}
                    <button 
                      onClick={() => setAvailability("All")}
                      className="ml-2 hover:text-brand-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "All" && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-800">
                    🏷️ {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory("All")}
                      className="ml-2 hover:text-brand-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="border-2 border-gray-100 hover:border-brand-200 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{service.avgRating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{service.workers} workers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{service.availability}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-900">{service.avgPrice}</span>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 text-xs">Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-brand-500 hover:bg-brand-600"
                    onClick={() => {
                      // Navigate to workers page and scroll to top
                      navigate('/workers');
                      // The ScrollToTop component will handle scrolling automatically
                    }}
                  >
                    View Workers
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Why Choose Our Services?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Verified</h3>
                <p className="text-gray-600 text-center">All workers undergo thorough background checks and KYC verification</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
                <p className="text-gray-600 text-center">Rated by thousands of customers with transparent reviews</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Money Back Guarantee</h3>
                <p className="text-gray-600 text-center">Not satisfied? Get your money back with our guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
