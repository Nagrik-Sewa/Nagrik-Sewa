import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock,
  Verified,
  Phone,
  MessageCircle,
  Shield,
  Award,
  Users
} from 'lucide-react';

const WorkerDetails: React.FC = () => {
  const { id } = useParams();

  // Mock data - in real app, this would be fetched based on ID
  const worker = {
    _id: id,
    firstName: 'Rajesh',
    lastName: 'Kumar',
    avatar: '',
    bio: 'Experienced plumber and electrician with over 8 years in the field. Specialized in residential and commercial repairs. Available for emergency services.',
    skills: ['Plumbing', 'Electrical', 'Pipe Fitting', 'Wiring'],
    rating: 4.8,
    totalReviews: 127,
    location: {
      address: 'Sector 15, Gurgaon',
      city: 'Gurgaon',
      state: 'Haryana'
    },
    pricing: {
      hourlyRate: 500,
      minimumCharge: 200
    },
    availability: {
      isAvailable: true,
      nextAvailable: '2024-01-15'
    },
    isVerified: true,
    completedJobs: 89,
    joinedDate: '2023-01-15',
    languages: ['Hindi', 'English'],
    experience: '8+ years',
    certifications: ['Licensed Plumber', 'Electrical Safety Certificate']
  };

  const reviews = [
    {
      id: 1,
      customerName: 'Amit Sharma',
      rating: 5,
      comment: 'Excellent work! Fixed my plumbing issue quickly and professionally.',
      date: '2024-01-10',
      service: 'Plumbing'
    },
    {
      id: 2,
      customerName: 'Priya Singh',
      rating: 4,
      comment: 'Good service, arrived on time and completed the work efficiently.',
      date: '2024-01-08',
      service: 'Electrical'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={worker.avatar} />
                  <AvatarFallback className="text-lg">
                    {worker.firstName[0]}{worker.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">
                      {worker.firstName} {worker.lastName}
                    </h1>
                    {worker.isVerified && (
                      <Verified className="h-5 w-5 text-blue-500" />
                    )}
                    <Badge variant={worker.availability.isAvailable ? "default" : "secondary"}>
                      {worker.availability.isAvailable ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {worker.location.city}, {worker.location.state}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {worker.experience} experience
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{worker.rating}</span>
                    <span className="text-gray-500">({worker.totalReviews} reviews)</span>
                    <span className="text-gray-500">• {worker.completedJobs} jobs completed</span>
                  </div>
                  <p className="text-gray-700">{worker.bio}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.map(skill => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {worker.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {reviews.map(review => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{review.customerName}</h4>
                        <p className="text-sm text-gray-500">{review.service} • {review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="portfolio">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-500">Portfolio images coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Hourly Rate:</span>
                  <span className="font-semibold">₹{worker.pricing.hourlyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum Charge:</span>
                  <span className="font-semibold">₹{worker.pricing.minimumCharge}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Book Service
              </Button>
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Member since:</span>
                <span>{new Date(worker.joinedDate).getFullYear()}</span>
              </div>
              <div className="flex justify-between">
                <span>Languages:</span>
                <span>{worker.languages.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Response time:</span>
                <span>~30 minutes</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
