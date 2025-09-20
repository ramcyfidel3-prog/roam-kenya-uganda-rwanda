import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  CreditCard, 
  Globe, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Eye,
  UserCheck,
  UserX,
  Download,
  Search,
  Filter,
  BarChart3,
  DollarSign,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [userFilter, setUserFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = {
    totalUsers: 2847,
    verifiedUsers: 2156,
    totalTransactions: 5432,
    totalRevenue: 287500,
    activeEsims: 1923
  };

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254 700 123 456',
      country: 'Kenya',
      kycStatus: 'pending',
      joinDate: '2024-12-01',
      lastActive: '2024-12-15'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+256 701 234 567',
      country: 'Uganda',
      kycStatus: 'verified',
      joinDate: '2024-11-28',
      lastActive: '2024-12-14'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+250 702 345 678',
      country: 'Rwanda',
      kycStatus: 'rejected',
      joinDate: '2024-12-03',
      lastActive: '2024-12-13'
    }
  ];

  const mockTransactions = [
    {
      id: 'TXN001',
      user: 'John Doe',
      country: 'Kenya',
      plan: 'Pro',
      amount: 1200,
      currency: 'KES',
      date: '2024-12-15',
      status: 'completed'
    },
    {
      id: 'TXN002',
      user: 'Sarah Wilson',
      country: 'Uganda',
      plan: 'Starter',
      amount: 15000,
      currency: 'UGX',
      date: '2024-12-14',
      status: 'completed'
    }
  ];

  const getKycStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleKycAction = (userId: number, action: 'approve' | 'reject') => {
    console.log(`${action} KYC for user ${userId}`);
    // TODO: Implement KYC approval/rejection
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesFilter = userFilter === 'all' || user.kycStatus === userFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Admin Header */}
      <div className="bg-white border-b border-border p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient">AfriRoam Admin</h1>
            <p className="text-muted-foreground">System Administration Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-100 text-blue-800">Admin Panel</Badge>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Back to Site
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Admin Sidebar */}
        <div className="w-64 bg-white border-r border-border h-screen sticky top-0">
          <nav className="p-4 space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'transactions', label: 'Transactions', icon: CreditCard },
              { id: 'esims', label: 'eSIM Management', icon: Globe },
              { id: 'support', label: 'Support Inbox', icon: AlertCircle },
              { id: 'settings', label: 'Admin Settings', icon: Activity }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  selectedTab === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Verified Users</p>
                        <p className="text-2xl font-bold">{stats.verifiedUsers.toLocaleString()}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Transactions</p>
                        <p className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</p>
                      </div>
                      <CreditCard className="h-8 w-8 text-secondary" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue (USD)</p>
                        <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-accent" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active eSIMs</p>
                        <p className="text-2xl font-bold">{stats.activeEsims.toLocaleString()}</p>
                      </div>
                      <Globe className="h-8 w-8 text-tertiary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle>Recent Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUsers.slice(0, 3).map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          {getKycStatusBadge(user.kycStatus)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle>Revenue by Country</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>🇰🇪 Kenya</span>
                        <span className="font-semibold">$85,200</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🇺🇬 Uganda</span>
                        <span className="font-semibold">$67,800</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🇷🇼 Rwanda</span>
                        <span className="font-semibold">$52,300</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>🇹🇿 Tanzania</span>
                        <span className="font-semibold">$48,900</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">User Management</h2>
                <Button className="btn-hero">
                  <Download className="h-4 w-4 mr-2" />
                  Export Users
                </Button>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="pending">KYC Pending</SelectItem>
                    <SelectItem value="verified">KYC Verified</SelectItem>
                    <SelectItem value="rejected">KYC Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <Card className="card-gradient">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="text-left p-4 font-medium">User</th>
                          <th className="text-left p-4 font-medium">Country</th>
                          <th className="text-left p-4 font-medium">KYC Status</th>
                          <th className="text-left p-4 font-medium">Join Date</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-border last:border-0">
                            <td className="p-4">
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                <p className="text-sm text-muted-foreground">{user.phone}</p>
                              </div>
                            </td>
                            <td className="p-4">{user.country}</td>
                            <td className="p-4">{getKycStatusBadge(user.kycStatus)}</td>
                            <td className="p-4">{user.joinDate}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {user.kycStatus === 'pending' && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleKycAction(user.id, 'approve')}
                                    >
                                      <UserCheck className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => handleKycAction(user.id, 'reject')}
                                    >
                                      <UserX className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === 'transactions' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Transaction History</h2>
              
              <Card className="card-gradient">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="text-left p-4 font-medium">Transaction ID</th>
                          <th className="text-left p-4 font-medium">User</th>
                          <th className="text-left p-4 font-medium">Country/Plan</th>
                          <th className="text-left p-4 font-medium">Amount</th>
                          <th className="text-left p-4 font-medium">Date</th>
                          <th className="text-left p-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTransactions.map((txn) => (
                          <tr key={txn.id} className="border-b border-border last:border-0">
                            <td className="p-4 font-mono text-sm">{txn.id}</td>
                            <td className="p-4">{txn.user}</td>
                            <td className="p-4">{txn.country} - {txn.plan}</td>
                            <td className="p-4 font-semibold">{txn.currency} {txn.amount.toLocaleString()}</td>
                            <td className="p-4">{txn.date}</td>
                            <td className="p-4">
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {selectedTab !== 'overview' && selectedTab !== 'users' && selectedTab !== 'transactions' && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">This section is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
