import { Outlet, useLocation } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  History, 
  MessageSquare, 
  LogOut,
  Home,
  Smartphone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { NavLink, useNavigate } from 'react-router-dom';

const DashboardSidebar = () => {
  const sidebar = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
    { id: 'buy-airtime', label: 'Buy Airtime', icon: CreditCard, path: '/dashboard/buy-airtime' },
    { id: 'transactions', label: 'Transactions', icon: History, path: '/dashboard/transactions' },
    { id: 'support', label: 'Support', icon: MessageSquare, path: '/dashboard/support' },
  ];

  const handleLogout = () => {
    // TODO: Implement logout
    navigate('/');
  };

  return (
    <Sidebar className={sidebar.isMobile ? "w-64" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-safari">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">AfriRoam</span>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-safari flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-muted-foreground">+254 700 123 456</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              KYC Verified ✅
            </Badge>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto p-6 pt-8 border-t border-border">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 bg-card border-b border-border">
            <SidebarTrigger />
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Connected to:</span>
              <Badge variant="outline" className="gap-1">
                🇰🇪 Kenya
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gradient-earth">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;