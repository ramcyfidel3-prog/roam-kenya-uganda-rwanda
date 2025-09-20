import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet, 
  BarChart3, 
  Clock, 
  Phone, 
  MessageSquare, 
  Smartphone,
  Download,
  Plus,
  TrendingUp,
  Users,
  CreditCard
} from 'lucide-react';

const DashboardHome = () => {
  const userData = {
    name: 'John Doe',
    walletBalance: 1250.00,
    localCurrency: 'KES',
    usdBalance: 8.50,
    activePlan: {
      country: 'Kenya',
      type: 'Pro Plan',
      data: '5GB',
      dataUsed: '1.8GB',
      remaining: '3.2GB',
      expiryDate: '2024-12-15',
      includesCalls: true,
      includesSms: true,
      callsUsed: 23,
      smsUsed: 47
    }
  };

  const quickStats = [
    {
      title: 'Wallet Balance',
      value: `${userData.localCurrency} ${userData.walletBalance.toLocaleString()}`,
      subtitle: `≈ $${userData.usdBalance} USD`,
      icon: Wallet,
      color: 'text-green-600'
    },
    {
      title: 'Data Remaining',
      value: userData.activePlan?.remaining || '0GB',
      subtitle: `of ${userData.activePlan?.data || '0GB'}`,
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Plan Expires',
      value: 'Dec 15',
      subtitle: '25 days remaining',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const recentActivity = [
    { type: 'Data', description: 'Used 150MB browsing', time: '2 hours ago', icon: Smartphone },
    { type: 'Call', description: 'Called +254 712 345 678', time: '5 hours ago', icon: Phone },
    { type: 'SMS', description: 'Sent SMS to +254 798 123 456', time: '1 day ago', icon: MessageSquare },
    { type: 'Top-up', description: 'Wallet top-up KES 500', time: '2 days ago', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {userData.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your AfriRoam account</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="card-gradient hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              {stat.title === 'Data Remaining' && (
                <div className="mt-3">
                  <Progress value={36} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Plan */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Active Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{userData.activePlan.type}</h3>
                  <p className="text-muted-foreground">🇰🇪 {userData.activePlan.country}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Active
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Data</p>
                  <p className="font-semibold">{userData.activePlan.data}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Calls</p>
                  <p className="font-semibold">{userData.activePlan.includesCalls ? 'Included' : 'Not included'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">SMS</p>
                  <p className="font-semibold">{userData.activePlan.includesSms ? 'Included' : 'Not included'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone Number</p>
                  <p className="font-semibold">+254 700 123 456</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 btn-hero gap-2">
                  <Download className="h-4 w-4" />
                  Download QR
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Plus className="h-4 w-4" />
                  Top Up
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <CreditCard className="h-5 w-5" />
              <span>Buy Airtime</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Smartphone className="h-5 w-5" />
              <span>Buy Data</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Contact Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;