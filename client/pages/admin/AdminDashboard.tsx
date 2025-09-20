import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  DollarSign, 
  Activity,
  TrendingUp,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  Shield,
  Calendar
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - would be fetched from API
  const stats = {
    totalUsers: 15420,
    totalWorkers: 2340,
    totalBookings: 8921,
    revenue: 1234567,
    activeUsers: 3421,
    pendingVerifications: 45,
    disputeCount: 12,
    todayRevenue: 25678
  };

  const recentBookings = [
    {
      id: 'B001',
      customer: 'John Doe',
      worker: 'Priya Sharma',
      service: 'House Cleaning',
      amount: 500,
      status: 'completed',
      date: '2024-01-15',
      time: '10:00 AM'
    },
    {
      id: 'B002',
      customer: 'Sarah Wilson',
      worker: 'Rajesh Kumar',
      service: 'Plumbing',
      amount: 800,
      status: 'in-progress',
      date: '2024-01-15',
      time: '2:00 PM'
    },
    {
      id: 'B003',
      customer: 'Mike Johnson',
      worker: 'Anita Singh',
      service: 'Electrical Work',
      amount: 1200,
      status: 'pending',
      date: '2024-01-15',
      time: '4:00 PM'
    }
  ];

  const pendingWorkers = [
    {
      id: 'W001',
      name: 'Ravi Patel',
      skills: ['Carpentry', 'Painting'],
      phone: '+91 9876543210',
      location: 'Mumbai',
      documents: 'Complete',
      appliedDate: '2024-01-10'
    },
    {
      id: 'W002',
      name: 'Sunita Devi',
      skills: ['Cleaning', 'Cooking'],
      phone: '+91 9876543211',
      location: 'Delhi',
      documents: 'Pending Aadhar',
      appliedDate: '2024-01-12'
    }
  ];

  const disputes = [
    {
      id: 'D001',
      bookingId: 'B045',
      customer: 'Arun Kumar',
      worker: 'Meera Shah',
      issue: 'Service quality concern',
      status: 'open',
      priority: 'high',
      date: '2024-01-14'
    },
    {
      id: 'D002',
      bookingId: 'B032',
      customer: 'Lisa Chen',
      worker: 'Amit Verma',
      issue: 'Payment dispute',
      status: 'investigating',
      priority: 'medium',
      date: '2024-01-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your platform efficiently</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWorkers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-800">Pending Verifications</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingVerifications}</p>
                <p className="text-sm text-yellow-700">Workers awaiting approval</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">Open Disputes</p>
                <p className="text-2xl font-bold text-red-600">{stats.disputeCount}</p>
                <p className="text-sm text-red-700">Require immediate attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Today's Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.todayRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-700">+15% from yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="workers">Worker Approvals</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Recent Bookings */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Bookings</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search bookings..." 
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">#{booking.id}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                      </div>
                      <div>
                        <p className="text-sm">Customer: <span className="font-medium">{booking.customer}</span></p>
                        <p className="text-sm">Worker: <span className="font-medium">{booking.worker}</span></p>
                      </div>
                      <div>
                        <p className="text-sm">{booking.date} at {booking.time}</p>
                        <p className="font-semibold">₹{booking.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Worker Approvals */}
        <TabsContent value="workers">
          <Card>
            <CardHeader>
              <CardTitle>Pending Worker Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingWorkers.map((worker) => (
                  <div key={worker.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{worker.name}</p>
                        <p className="text-sm text-gray-600">{worker.phone}</p>
                        <p className="text-sm text-gray-600">{worker.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Skills:</p>
                        <div className="flex gap-1 mt-1">
                          {worker.skills.map(skill => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm">Documents: <span className="font-medium">{worker.documents}</span></p>
                        <p className="text-sm text-gray-600">Applied: {worker.appliedDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Ban className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disputes */}
        <TabsContent value="disputes">
          <Card>
            <CardHeader>
              <CardTitle>Open Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">#{dispute.id}</p>
                        <p className="text-sm text-gray-600">Booking: {dispute.bookingId}</p>
                      </div>
                      <div>
                        <p className="text-sm">Customer: <span className="font-medium">{dispute.customer}</span></p>
                        <p className="text-sm">Worker: <span className="font-medium">{dispute.worker}</span></p>
                      </div>
                      <div>
                        <p className="font-medium">{dispute.issue}</p>
                        <p className="text-sm text-gray-600">{dispute.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(dispute.priority)}>
                        {dispute.priority}
                      </Badge>
                      <Badge className={getStatusColor(dispute.status)}>
                        {dispute.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Investigate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">User Management Panel</h3>
                <p className="text-gray-600 mb-4">View and manage all registered users, workers, and their activities.</p>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  View All Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 mb-4">Comprehensive insights into platform performance, user behavior, and revenue trends.</p>
                <Button>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;