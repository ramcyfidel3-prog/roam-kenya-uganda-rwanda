import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Smartphone, 
  Wallet, 
  Phone, 
  MessageSquare, 
  User, 
  LogOut,
  Plus,
  Download,
  BarChart3,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock user data
  const userData = {
    name: 'John Doe',
    afriroamNumber: '+254 700 123 456',
    walletBalance: 1250.00,
    localCurrency: 'KES',
    selectedCountry: 'Kenya',
    kycStatus: 'approved',
    activePlan: {
      country: 'Kenya',
      type: 'Pro Plan',
      data: '5GB',
      remaining: '3.2GB',
      expiryDate: '2024-10-15',
      includesCalls: true,
      includesSms: true
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'buy-airtime', label: 'Buy Airtime', icon: Phone },
    { id: 'buy-data', label: 'Buy Data', icon: Smartphone },
    { id: 'call-sms-history', label: 'Call/SMS History', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    // TODO: Implement logout
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border">
          <div className="p-6">
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-safari">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">AfriRoam</span>
            </div>

            {/* User Info */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-gradient-safari flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">{userData.name}</p>
                  <p className="text-sm text-muted-foreground">{userData.afriroamNumber}</p>
                </div>
              </div>
              <Badge className={`${userData.kycStatus === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                KYC {userData.kycStatus === 'approved' ? 'Verified' : 'Pending'}
              </Badge>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Logout */}
            <div className="mt-8 pt-8 border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-muted transition-colors text-muted-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {userData.name.split(' ')[0]}!</h1>
              <p className="text-muted-foreground">Manage your AfriRoam services</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Connected to:</span>
              <Badge variant="outline">{userData.selectedCountry}</Badge>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData.localCurrency} {userData.walletBalance.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">≈ $45.20 USD</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Data Remaining</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userData.activePlan.remaining}</div>
                    <p className="text-xs text-muted-foreground">of {userData.activePlan.data}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Plan Expires</CardTitle>
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Oct 15</div>
                    <p className="text-xs text-muted-foreground">7 days remaining</p>
                  </CardContent>
                </Card>
              </div>

              {/* Active Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{userData.activePlan.type}</h3>
                      <p className="text-muted-foreground">{userData.activePlan.country}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="font-semibold">{userData.activePlan.data}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Calls</p>
                      <p className="font-semibold">{userData.activePlan.includesCalls ? 'Included' : 'Not included'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">SMS</p>
                      <p className="font-semibold">{userData.activePlan.includesSms ? 'Included' : 'Not included'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                      <p className="font-semibold">Assigned</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="btn-hero gap-2">
                      <Download className="h-4 w-4" />
                      Download QR Code
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Top Up Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start gap-2" variant="outline">
                      <Phone className="h-4 w-4" />
                      Buy Airtime
                    </Button>
                    <Button className="w-full justify-start gap-2" variant="outline">
                      <Smartphone className="h-4 w-4" />
                      Buy Data Bundle
                    </Button>
                    <Button className="w-full justify-start gap-2" variant="outline">
                      <MessageSquare className="h-4 w-4" />
                      View Call History
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Data Used</span>
                          <span>1.8GB / 5GB</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '36%' }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">23</p>
                          <p className="text-sm text-muted-foreground">Calls Made</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">47</p>
                          <p className="text-sm text-muted-foreground">SMS Sent</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Other tab contents would go here */}
          {activeTab !== 'dashboard' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">{sidebarItems.find(item => item.id === activeTab)?.label}</h2>
              <p className="text-muted-foreground">This section is coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
