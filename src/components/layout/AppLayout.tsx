
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Wrench, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal px-3 py-6 transition-all duration-200",
          active 
            ? "bg-accent text-accent-foreground font-medium" 
            : "hover:bg-secondary hover:text-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/assets', icon: <Wrench size={20} />, label: 'Assets' },
    { to: '/spare-parts', icon: <Package size={20} />, label: 'Spare Parts' },
    { to: '/reorders', icon: <ShoppingCart size={20} />, label: 'Reorders' },
    { to: '/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed lg:relative inset-y-0 left-0 flex flex-col w-64 border-r border-border bg-card z-40 transition-transform duration-300 ease-in-out",
          isMobile && !sidebarOpen && "-translate-x-full",
          isMobile && sidebarOpen && "translate-x-0"
        )}
      >
        <div className="p-6 border-b border-border flex items-center justify-center">
          <div className="text-xl font-bold">Spare Parts</div>
        </div>
        <div className="mt-2 px-6">
          <h2 className="text-base font-medium text-center">Spare Parts Management System</h2>
        </div>
        <div className="flex flex-col gap-1 p-3 flex-grow">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
            />
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#9b87f5] flex items-center justify-center text-primary-foreground">
              <span className="text-sm font-medium">SP</span>
            </div>
            <div>
              <div className="text-sm font-medium">Spare Parts</div>
              <div className="text-xs text-muted-foreground">Customer Portal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        <main className="flex-1 p-6 lg:px-8 animate-fade-in">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;
