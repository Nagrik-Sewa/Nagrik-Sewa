import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Mail, 
  User,
  Calendar,
  Filter,
  TrendingUp,
  Target,
  Users,
  Briefcase
} from "lucide-react";

const customerRequests = [
  {
    id: 1,
    title: "Need Plumber for Kitchen Repair",
    customer: "Priya Sharma",
    location: "Connaught Place, New Delhi",
    category: "Plumbing",
    budget: "₹2,000 - ₹3,500",
    urgency: "High",
    postedDate: "2 hours ago",
    description: "Kitchen sink is leaking and faucet needs replacement. Need experienced plumber immediately.",
    rating: 4.8,
    completedJobs: 23,
    verified: true
  },
  {
    id: 2,
    title: "House Cleaning Service Required",
    customer: "Rajesh Kumar",
    location: "Bandra West, Mumbai",
    category: "Cleaning",
    budget: "₹1,500 - ₹2,000",
    urgency: "Medium",
    postedDate: "4 hours ago",
    description: "Deep cleaning required for 3BHK apartment. Regular weekly service preferred.",
    rating: 4.6,
    completedJobs: 15,
    verified: true
  },
  {
    id: 3,
    title: "Electrical Wiring for New Office",
    customer: "Tech Solutions Pvt Ltd",
    location: "Electronic City, Bangalore",
    category: "Electrical",
    budget: "₹15,000 - ₹25,000",
    urgency: "Medium",
    postedDate: "6 hours ago",
    description: "Complete electrical wiring for 2000 sq ft office space. Need certified electrician.",
    rating: 4.9,
    completedJobs: 45,
    verified: true
  },
  {
    id: 4,
    title: "AC Installation and Repair",
    customer: "Sunita Patel",
    location: "Satellite, Ahmedabad",
    category: "AC Repair",
    budget: "₹3,000 - ₹5,000",
    urgency: "High",
    postedDate: "8 hours ago",
    description: "Split AC installation in bedroom and servicing of 2 existing units.",
    rating: 4.7,
    completedJobs: 31,
    verified: false
  },
  {
    id: 5,
    title: "Interior Painting Work",
    customer: "Mohammed Ali",
    location: "Jubilee Hills, Hyderabad",
    category: "Painting",
    budget: "₹8,000 - ₹12,000",
    urgency: "Low",
    postedDate: "1 day ago",
    description: "Interior painting for 2BHK flat. Quality work with good paint required.",
    rating: 4.5,
    completedJobs: 19,
    verified: true
  },
  {
    id: 6,
    title: "Furniture Assembly Service",
    customer: "Neha Gupta",
    location: "Salt Lake, Kolkata",
    category: "Carpentry",
    budget: "₹1,000 - ₹1,500",
    urgency: "Medium",
    postedDate: "1 day ago",
    description: "Assembly of IKEA furniture - wardrobe, bed, and study table.",
    rating: 4.4,
    completedJobs: 12,
    verified: true
  }
];

const categories = [
  "All Categories",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "AC Repair",
  "Painting",
  "Carpentry",
  "Gardening",
  "Beauty & Wellness"
];

const urgencyLevels = ["All Urgency", "High", "Medium", "Low"];
const budgetRanges = ["All Budgets", "Under ₹1,000", "₹1,000 - ₹5,000", "₹5,000 - ₹15,000", "Above ₹15,000"];

// Extract unique cities from customer requests
const getCitiesFromRequests = () => {
  const cities = customerRequests.map(request => {
    // Extract city from location string (assuming format: "Area, City")
    const locationParts = request.location.split(',');
    return locationParts.length > 1 ? locationParts[1].trim() : locationParts[0].trim();
  });
  
  // Remove duplicates and add "All Cities" option
  const uniqueCities = [...new Set(cities)];
  return ["All Cities", ...uniqueCities.sort()];
};

const cities = getCitiesFromRequests();

export default function FindCustomers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedUrgency, setSelectedUrgency] = useState("All Urgency");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");
  const [selectedCity, setSelectedCity] = useState("All Cities");

  const filteredRequests = customerRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || request.category === selectedCategory;
    const matchesUrgency = selectedUrgency === "All Urgency" || request.urgency === selectedUrgency;
    
    // City filtering - extract city from location string and match with selected city
    const requestCity = request.location.split(',').length > 1 
      ? request.location.split(',')[1].trim() 
      : request.location.split(',')[0].trim();
    const matchesCity = selectedCity === "All Cities" || requestCity === selectedCity;
    
    return matchesSearch && matchesCategory && matchesUrgency && matchesCity;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Plumbing": return "🔧";
      case "Electrical": return "⚡";
      case "Cleaning": return "🧹";
      case "AC Repair": return "❄️";
      case "Painting": return "🎨";
      case "Carpentry": return "🔨";
      case "Gardening": return "🌱";
      case "Beauty & Wellness": return "💆";
      default: return "🛠️";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Target className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Find Customers Near You</h1>
            <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Connect with customers who need your services. Browse active job requests and grow your business.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-brand-100">Active Requests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">₹15,000</div>
                <div className="text-brand-100">Avg. Monthly Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-brand-100">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by service, location, or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city === "All Cities" ? "🌍 All Cities" : `📍 ${city}`}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedUrgency}
                onChange={(e) => setSelectedUrgency(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {urgencyLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Available Requests ({filteredRequests.length})
              </h2>
              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCity !== "All Cities" && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-800">
                    📍 {selectedCity}
                    <button 
                      onClick={() => setSelectedCity("All Cities")}
                      className="ml-1 hover:text-brand-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "All Categories" && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-800">
                    🏷️ {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory("All Categories")}
                      className="ml-1 hover:text-brand-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedUrgency !== "All Urgency" && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-800">
                    ⚡ {selectedUrgency} Priority
                    <button 
                      onClick={() => setSelectedUrgency("All Urgency")}
                      className="ml-1 hover:text-brand-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {searchTerm && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-800">
                    🔍 "{searchTerm}"
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="ml-1 hover:text-brand-900"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCity("All Cities");
                  setSelectedCategory("All Categories");
                  setSelectedUrgency("All Urgency");
                  setSelectedBudget("All Budgets");
                }}
              >
                Clear All Filters
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Sort by Priority
              </Button>
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No requests found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or check back later for new requests.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getCategoryIcon(request.category)}</span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{request.title}</h3>
                              <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center text-sm text-gray-600">
                                  <User className="w-4 h-4 mr-1" />
                                  {request.customer}
                                  {request.verified && <Badge className="ml-2 bg-green-100 text-green-800">Verified</Badge>}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                  {request.rating} ({request.completedJobs} jobs)
                                </div>
                              </div>
                            </div>
                          </div>
                          <Badge className={getUrgencyColor(request.urgency)}>
                            {request.urgency} Priority
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{request.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {request.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {request.category}
                          </div>
                          <div className="flex items-center font-semibold text-green-600">
                            💰 {request.budget}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {request.postedDate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:w-48">
                        <Button className="bg-brand-600 hover:bg-brand-700 w-full">
                          Send Proposal
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Mail className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of service providers earning more by connecting with customers who need their expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
              <Users className="w-5 h-5 mr-2" />
              Join as Service Provider
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}