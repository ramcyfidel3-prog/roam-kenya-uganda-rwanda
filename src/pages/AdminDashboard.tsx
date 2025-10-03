import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Users, Shield, Activity, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface UserWithRole {
  id: string;
  user_id: string;
  full_name: string | null;
  email?: string;
  phone_number?: string | null;
  nationality?: string | null;
  id_number?: string | null;
  kyc_status?: string | null;
  afriroam_number?: string | null;
  wallet_balance?: number | null;
  created_at: string;
  updated_at?: string;
  roles: string[];
}

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    adminUsers: 0
  });
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchStats();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine profiles with their roles
      const usersWithRoles = profiles?.map(profile => ({
        ...profile,
        roles: roles?.filter(r => r.user_id === profile.user_id).map(r => r.role) || []
      })) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('created_at');

      const { data: adminRoles } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const newToday = profiles?.filter(p => 
        new Date(p.created_at) >= today
      ).length || 0;

      setStats({
        totalUsers: profiles?.length || 0,
        newUsersToday: newToday,
        adminUsers: adminRoles?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const makeAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' });

      if (error && !error.message.includes('duplicate')) {
        throw error;
      }

      await fetchUsers();
      await fetchStats();
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  if (loading || loadingUsers) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and monitor platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="card-gradient animate-fade-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered accounts
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient animate-fade-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{stats.newUsersToday}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Signups in last 24h
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient animate-fade-up" style={{ animationDelay: '300ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{stats.adminUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Admin users
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="card-gradient animate-fade-up" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              All Registered Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No users registered yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name || 'N/A'}</TableCell>
                        <TableCell>{user.email || 'N/A'}</TableCell>
                        <TableCell>{user.phone_number || 'N/A'}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {user.roles.includes('admin') ? (
                              <Badge variant="default" className="bg-primary">Admin</Badge>
                            ) : (
                              <Badge variant="secondary">User</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {!user.roles.includes('admin') && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => makeAdmin(user.user_id)}
                            >
                              Make Admin
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
