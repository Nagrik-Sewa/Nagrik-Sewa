import { useState } from "react";
import { 
  BookOpen, 
  Award, 
  Video, 
  Users, 
  Clock, 
  CheckCircle,
  Star,
  Play,
  Download,
  FileText,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export default function SkillTraining() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const trainingPrograms = [
    {
      id: 1,
      title: "Professional Home Cleaning",
      category: "cleaning",
      duration: "2 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 1250,
      price: "Free",
      image: "/api/placeholder/300/200",
      modules: [
        "Basic cleaning techniques",
        "Equipment and chemical usage",
        "Safety protocols",
        "Customer service skills"
      ],
      certification: true,
      instructor: "Priya Sharma - 10 years experience"
    },
    {
      id: 2,
      title: "Basic Plumbing Skills",
      category: "plumbing",
      duration: "3 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 890,
      price: "₹999",
      image: "/api/placeholder/300/200",
      modules: [
        "Pipe fitting and repair",
        "Fixture installation",
        "Leak detection",
        "Tool usage and safety"
      ],
      certification: true,
      instructor: "Rajesh Kumar - Certified Plumber"
    },
    {
      id: 3,
      title: "Electrical Basics & Safety",
      category: "electrical",
      duration: "4 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 675,
      price: "₹1,499",
      image: "/api/placeholder/300/200",
      modules: [
        "Electrical circuits basics",
        "Wiring and connections",
        "Safety regulations",
        "Troubleshooting common issues"
      ],
      certification: true,
      instructor: "Amit Patel - Licensed Electrician"
    },
    {
      id: 4,
      title: "Beauty & Wellness Services",
      category: "beauty",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.9,
      students: 2100,
      price: "₹2,999",
      image: "/api/placeholder/300/200",
      modules: [
        "Facial and skincare",
        "Hair styling techniques",
        "Nail art and manicure",
        "Hygiene and sanitation"
      ],
      certification: true,
      instructor: "Sunita Devi - Professional Beautician"
    },
    {
      id: 5,
      title: "AC Repair & Maintenance",
      category: "appliance",
      duration: "3 weeks",
      level: "Advanced",
      rating: 4.8,
      students: 450,
      price: "₹1,999",
      image: "/api/placeholder/300/200",
      modules: [
        "AC components and working",
        "Repair techniques",
        "Gas charging",
        "Preventive maintenance"
      ],
      certification: true,
      instructor: "Mohit Singh - HVAC Specialist"
    },
    {
      id: 6,
      title: "Customer Service Excellence",
      category: "soft-skills",
      duration: "1 week",
      level: "Beginner",
      rating: 4.6,
      students: 3200,
      price: "Free",
      image: "/api/placeholder/300/200",
      modules: [
        "Communication skills",
        "Handling difficult customers",
        "Professional etiquette",
        "Problem-solving"
      ],
      certification: true,
      instructor: "Dr. Kavita Sharma - Soft Skills Expert"
    }
  ];

  const categories = [
    { id: "all", name: "All Courses", count: trainingPrograms.length },
    { id: "cleaning", name: "Cleaning", count: 1 },
    { id: "plumbing", name: "Plumbing", count: 1 },
    { id: "electrical", name: "Electrical", count: 1 },
    { id: "beauty", name: "Beauty & Wellness", count: 1 },
    { id: "appliance", name: "Appliance Repair", count: 1 },
    { id: "soft-skills", name: "Soft Skills", count: 1 }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Industry-Recognized Certificates",
      description: "Get certificates that are valued by customers and employers"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from experienced professionals with real-world expertise"
    },
    {
      icon: Video,
      title: "Video-Based Learning",
      description: "High-quality video content with practical demonstrations"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Learn at your own pace with lifetime access to content"
    },
    {
      icon: TrendingUp,
      title: "Skill Upgradation",
      description: "Continuous learning opportunities to advance your career"
    },
    {
      icon: Target,
      title: "Job Placement Support",
      description: "Get priority placement on our platform after certification"
    }
  ];

  const filteredPrograms = selectedCategory === "all" 
    ? trainingPrograms 
    : trainingPrograms.filter(program => program.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Skill Training Center</h1>
            <p className="text-xl text-brand-100 mb-8 max-w-3xl mx-auto">
              Enhance your skills with our comprehensive training programs. Get certified and increase your earning potential on Nagrik Sewa platform.
            </p>
            <div className="flex items-center justify-center space-x-8 text-brand-100">
              <div className="text-center">
                <div className="text-3xl font-bold">25+</div>
                <div className="text-sm">Training Programs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-sm">Certified Workers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm">Job Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Training?</h2>
            <p className="text-xl text-gray-600">Professional development that leads to real career growth</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <benefit.icon className="w-12 h-12 text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Training Programs</h2>
            <p className="text-xl text-gray-600">Choose from our wide range of skill development courses</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="mb-2"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                      {program.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                    <Play className="w-4 h-4 text-brand-600" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-brand-600">{program.price}</span>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {program.rating} ({program.students})
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{program.instructor}</p>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {program.duration}
                    {program.certification && (
                      <>
                        <FileText className="w-4 h-4 ml-4 mr-1" />
                        Certificate
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium">What you'll learn:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {program.modules.slice(0, 3).map((module, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {module}
                        </li>
                      ))}
                      {program.modules.length > 3 && (
                        <li className="text-brand-600 text-sm">+{program.modules.length - 3} more modules</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full">
                      {program.price === "Free" ? "Enroll Free" : "Enroll Now"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download Curriculum
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Certification Process</h2>
            <p className="text-xl text-gray-600">How to get your skill certificate</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <Video className="w-8 h-8 text-brand-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Complete Course</h3>
              <p className="text-gray-600">Watch all video lessons and complete practical exercises</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <BookOpen className="w-8 h-8 text-brand-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Take Assessment</h3>
              <p className="text-gray-600">Pass the online assessment test with 80% or higher</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <Zap className="w-8 h-8 text-brand-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Practical Demo</h3>
              <p className="text-gray-600">Demonstrate your skills in a real-world scenario</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <Award className="w-8 h-8 text-brand-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Get Certified</h3>
              <p className="text-gray-600">Receive your digital certificate and skill badge</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Upgrade Your Skills?</h2>
          <p className="text-xl text-brand-100 mb-8">
            Join thousands of successful service providers who have advanced their careers through our training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
              Browse All Courses
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600">
              Download Training Catalog
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
