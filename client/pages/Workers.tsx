import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock,
  Filter,
  Verified,
  Phone,
  MessageCircle
} from 'lucide-react';

interface Worker {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  skills: string[];
  rating: number;
  totalReviews: number;
  location: {
    address: string;
    city: string;
  };
  pricing: {
    hourlyRate: number;
  };
  availability: {
    isAvailable: boolean;
  };
  isVerified: boolean;
  completedJobs: number;
  joinedDate: string;
}

// Mock data - in real app, this would come from API
const mockWorkers: Worker[] = [
  {
    _id: '1',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    avatar: '',
    skills: ['Plumbing', 'Electrical'],
    rating: 4.8,
    totalReviews: 127,
    location: {
      address: 'Sector 15',
      city: 'Gurgaon'
    },
    pricing: {
      hourlyRate: 500
    },
    availability: {
      isAvailable: true
    },
    isVerified: true,
    completedJobs: 89,
    joinedDate: '2023-01-15'
  },
  {
    _id: '2',
    firstName: 'Priya',
    lastName: 'Sharma',
    avatar: '',
    skills: ['House Cleaning', 'Cooking'],
    rating: 4.9,
    totalReviews: 203,
    location: {
      address: 'Koramangala',
      city: 'Bangalore'
    },
    pricing: {
      hourlyRate: 300
    },
    availability: {
      isAvailable: true
    },
    isVerified: true,
    completedJobs: 156,
    joinedDate: '2022-11-20'
  },
  {
    _id: '3',
    firstName: 'Mohammed',
    lastName: 'Ali',
    avatar: '',
    skills: ['AC Repair', 'Refrigerator Repair'],
    rating: 4.7,
    totalReviews: 89,
    location: {
      address: 'Andheri West',
      city: 'Mumbai'
    },
    pricing: {
      hourlyRate: 600
    },
    availability: {
      isAvailable: false
    },
    isVerified: true,
    completedJobs: 67,
    joinedDate: '2023-03-10'
  }
];

const Workers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const cities = ['All Cities', 'Gurgaon', 'Bangalore', 'Mumbai', 'Delhi', 'Pune'];
  const skills = ['All Skills', 'Plumbing', 'Electrical', 'House Cleaning', 'Cooking', 'AC Repair', 'Refrigerator Repair'];

  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = 
      worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCity = !selectedCity || selectedCity === 'All Cities' || worker.location.city === selectedCity;
    const matchesSkill = !selectedSkill || selectedSkill === 'All Skills' || worker.skills.includes(selectedSkill);

    return matchesSearch && matchesCity && matchesSkill;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Workers</h1>
        <p className="text-gray-600">Browse and hire verified professionals in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search workers or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
          <SelectTrigger>
            <SelectValue placeholder="Select skill" />
          </SelectTrigger>
          <SelectContent>
            {skills.map(skill => (
              <SelectItem key={skill} value={skill}>{skill}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map(worker => (
          <Card key={worker._id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={worker.avatar} />
                    <AvatarFallback>
                      {worker.firstName[0]}{worker.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {worker.firstName} {worker.lastName}
                      </h3>
                      {worker.isVerified && (
                        <Verified className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      {worker.location.city}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {worker.availability.isAvailable ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <Clock className="h-3 w-3 mr-1" />
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Busy
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Skills */}
              <div>
                <div className="flex flex-wrap gap-1">
                  {worker.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {worker.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{worker.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Rating and Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{worker.rating}</span>
                  <span className="text-gray-500">({worker.totalReviews})</span>
                </div>
                <span className="text-gray-500">{worker.completedJobs} jobs</span>
              </div>

              {/* Pricing */}
              <div className="text-lg font-semibold text-primary">
                ₹{worker.pricing.hourlyRate}/hour
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={`/workers/${worker._id}`}>
                    View Profile
                  </Link>
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No workers found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedCity('');
              setSelectedSkill('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Workers;
