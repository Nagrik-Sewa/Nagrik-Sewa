import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const isWorker = user.role === 'worker';
  const isAdmin = user.role === 'admin';

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            {isWorker 
              ? 'Manage your services and bookings'
              : isAdmin
                ? 'Admin dashboard overview'
                : 'Track your bookings and services'
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={user.isEmailVerified ? "default" : "destructive"}>
            {user.isEmailVerified ? "Verified" : "Unverified"}
          </Badge>
          {user.role === 'worker' && (
            <Badge variant="outline">Worker</Badge>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isWorker ? 'Total Bookings' : 'Active Bookings'}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isWorker ? 'Earnings' : 'Total Spent'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{isWorker ? '45,231' : '12,340'}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isWorker ? 'Rating' : 'Reviews Given'}
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isWorker ? '4.8' : '15'}
            </div>
            <p className="text-xs text-muted-foreground">
              {isWorker ? 'Based on 127 reviews' : '+2 this month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isWorker ? 'Completion Rate' : 'Saved Services'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isWorker ? '98%' : '8'}
            </div>
            <p className="text-xs text-muted-foreground">
              {isWorker ? '+2% from last month' : '3 new this week'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest {isWorker ? 'bookings and updates' : 'service requests'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {isWorker ? 'Plumbing service completed' : 'AC repair completed'}
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {isWorker ? 'New booking received' : 'Cleaning service scheduled'}
                </p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-2 rounded-full">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Payment pending review
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isWorker ? (
              <>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Update Availability
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  View Pending Bookings
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Withdrawal Request
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Service
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Find Workers
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="mr-2 h-4 w-4" />
                  Rate Recent Services
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      {!user.isEmailVerified && (
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">Complete Your Profile</CardTitle>
            <CardDescription className="text-yellow-700">
              Verify your email to access all features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="border-yellow-300 text-yellow-800 hover:bg-yellow-100">
              Verify Email
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
