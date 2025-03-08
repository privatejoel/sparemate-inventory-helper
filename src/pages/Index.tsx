
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package,
  AlertCircle,
  Wrench,
  ShoppingCart,
  TrendingDown,
  ArrowUpRight,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { mockAssets, mockSpareParts, mockReorders, mockDashboardStats } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

// Calculate counts for dashboard
const lowStockItems = mockSpareParts.filter(part => 
  part.status === 'low-stock' || part.status === 'out-of-stock'
);

const pendingReorders = mockReorders.filter(reorder => 
  reorder.status === 'pending' || reorder.status === 'approved'
);

const assetsNeedingMaintenance = mockAssets.filter(asset => 
  asset.status === 'maintenance' || asset.status === 'repair'
);

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your spare parts inventory and asset status
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button onClick={() => navigate('/spare-parts/new')}>
            <Package className="mr-2 h-4 w-4" />
            Add Spare Part
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Assets"
          value={mockDashboardStats.totalAssets}
          icon={<Wrench />}
          description="Tracked machines and equipment"
        />
        <StatCard
          title="Spare Parts"
          value={mockDashboardStats.totalSparePartsCount}
          icon={<Package />}
          description="Total unique parts in inventory"
        />
        <StatCard
          title="Low Stock Items"
          value={mockDashboardStats.lowStockItems}
          icon={<TrendingDown />}
          description="Parts below reorder threshold"
          change={-12.5}
        />
        <StatCard
          title="Pending Reorders"
          value={mockDashboardStats.pendingReorders}
          icon={<ShoppingCart />}
          description="Orders awaiting processing"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Inventory Alerts</AlertTitle>
          <AlertDescription>
            {lowStockItems.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {lowStockItems.slice(0, 3).map(part => (
                  <li key={part.id} className="flex items-center justify-between">
                    <span>{part.name}</span>
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      part.status === 'out-of-stock' 
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                    )}>
                      {part.status === 'out-of-stock' ? 'Out of Stock' : `${part.stockQuantity} remaining`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2">No critical inventory alerts at this time.</p>
            )}
          </AlertDescription>
        </Alert>

        <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300">Asset Maintenance</AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400">
            {assetsNeedingMaintenance.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {assetsNeedingMaintenance.slice(0, 3).map(asset => (
                  <li key={asset.id} className="flex items-center justify-between">
                    <span>{asset.serialNumber}</span>
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      asset.status === 'repair' 
                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300" 
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    )}>
                      {asset.status === 'repair' ? 'Repair' : 'Maintenance'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2">No assets currently need maintenance.</p>
            )}
          </AlertDescription>
        </Alert>
      </div>

      <Tabs defaultValue="recentReorders" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <TabsList>
            <TabsTrigger value="recentReorders">Reorders</TabsTrigger>
            <TabsTrigger value="recentParts">Parts Usage</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="recentReorders" className="animate-fade-in">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Reorders</CardTitle>
              <CardDescription>
                Latest spare part orders and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReorders.slice(0, 4).map(reorder => (
                  <div key={reorder.id} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      reorder.status === 'delivered' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      reorder.status === 'ordered' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                      reorder.status === 'approved' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    )}>
                      <Package size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{reorder.partName}</div>
                      <div className="text-sm text-muted-foreground">
                        Qty: {reorder.quantity} • ${reorder.totalPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-xs font-medium inline-block px-2 py-1 rounded-full",
                        reorder.status === 'delivered' ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                        reorder.status === 'ordered' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                        reorder.status === 'approved' ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      )}>
                        {reorder.status.charAt(0).toUpperCase() + reorder.status.slice(1)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {reorder.dateRequested ? new Date(reorder.dateRequested).toLocaleDateString() : ""}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/reorders">
                  <Button variant="outline" size="sm">
                    View All Reorders
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recentParts" className="animate-fade-in">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Part Usage</CardTitle>
              <CardDescription>
                Latest spare part consumption across assets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4">
                <p className="text-muted-foreground">Coming soon in the next update</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Dashboard;
