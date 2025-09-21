import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
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
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    bookings: 0,
    totalSpent: 0,
    reviewsGiven: 0,
    savedServices: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user's bookings
        const bookingsResponse = await api.get('/bookings/my-bookings');
        const bookings = bookingsResponse.data.data?.bookings || [];
        
        setDashboardData({
          bookings: bookings.length,
          totalSpent: 0, // We'll calculate this from bookings if needed
          reviewsGiven: 0, // We'll add reviews later
          savedServices: 0, // We'll add saved services later
          recentActivity: bookings.slice(0, 3) // Show last 3 bookings
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set default values for testing
        setDashboardData({
          bookings: 0,
          totalSpent: 0,
          reviewsGiven: 0,
          savedServices: 0,
          recentActivity: []
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

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
            <div className="text-2xl font-bold">
              {loading ? '...' : dashboardData.bookings}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.bookings === 0 ? 'No bookings yet' : 'Total bookings'}
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
            <div className="text-2xl font-bold">
              ₹{loading ? '...' : dashboardData.totalSpent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.totalSpent === 0 ? 'No transactions yet' : 'Total amount'}
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
              {loading ? '...' : (isWorker ? '5.0' : dashboardData.reviewsGiven)}
            </div>
            <p className="text-xs text-muted-foreground">
              {isWorker ? 'No reviews yet' : (dashboardData.reviewsGiven === 0 ? 'No reviews yet' : 'Total reviews')}
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
              {loading ? '...' : (isWorker ? '100%' : dashboardData.savedServices)}
            </div>
            <p className="text-xs text-muted-foreground">
              {isWorker ? 'Perfect record' : (dashboardData.savedServices === 0 ? 'No saved services' : 'Total saved')}
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
            {loading ? (
              <div className="text-center text-gray-500">Loading activity...</div>
            ) : dashboardData.recentActivity.length > 0 ? (
              dashboardData.recentActivity.map((activity: any, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Booking #{activity._id?.slice(-4) || 'New'} - {activity.status || 'Pending'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'Recent'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No recent activity</p>
                <p className="text-xs text-gray-400">
                  {isWorker ? 'Start accepting bookings to see activity' : 'Book a service to see activity here'}
                </p>
              </div>
            )}
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
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/workers/profile')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Update Availability
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/bookings')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  View Pending Bookings
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/workers/earnings')}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Withdrawal Request
                </Button>
              </>
            ) : (
              <>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/services')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Service
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/workers')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Find Workers
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/bookings')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  View My Bookings
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion - Removed for testing */}
      {/* Email verification requirement removed to allow full functionality testing */}
    </div>
  );
};

export default Dashboard;
