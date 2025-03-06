
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reorder } from '@/lib/types';
import { mockReorders } from '@/lib/mock-data';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Plus, 
  Search, 
  ArrowUpDown, 
  FileText,
  CheckCircle2,
  Clock,
  ShoppingCart,
  PackageCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Reorders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Filter reorders based on search term and status filter
  const filteredReorders = mockReorders.filter((reorder) => {
    const matchesSearch = 
      reorder.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reorder.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reorder.purchaseOrderNumber && reorder.purchaseOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus ? reorder.status === filterStatus : true;
    
    return matchesSearch && matchesFilter;
  });

  // Get counts for filter badges
  const pendingCount = mockReorders.filter(r => r.status === 'pending').length;
  const approvedCount = mockReorders.filter(r => r.status === 'approved').length;
  const orderedCount = mockReorders.filter(r => r.status === 'ordered').length;
  const deliveredCount = mockReorders.filter(r => r.status === 'delivered').length;

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Table columns definition
  const columns: ColumnDef<Reorder>[] = [
    {
      accessorKey: 'partName',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Part Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <div className="ml-2 font-medium">
              {row.getValue('partName')}
              <div className="text-xs text-muted-foreground">
                {row.original.partNumber}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Qty',
      cell: ({ row }) => {
        return <div className="font-medium text-center">{row.getValue('quantity')}</div>;
      },
    },
    {
      accessorKey: 'totalPrice',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return <div>{formatCurrency(row.getValue('totalPrice'))}</div>;
      },
    },
    {
      accessorKey: 'dateRequested',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Requested
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return <div>{new Date(row.getValue('dateRequested')).toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            className={cn(
              status === 'pending' && 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/40',
              status === 'approved' && 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/40',
              status === 'ordered' && 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40',
              status === 'delivered' && 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40',
              status === 'cancelled' && 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40'
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'expectedDelivery',
      header: 'Expected Delivery',
      cell: ({ row }) => {
        const deliveryDate = row.getValue('expectedDelivery');
        return deliveryDate ? <div>{new Date(deliveryDate as string).toLocaleDateString()}</div> : <div>-</div>;
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Details
            </Button>
            {status === 'pending' && (
              <Button size="sm">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Approve
              </Button>
            )}
            {status === 'approved' && (
              <Button size="sm">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Order
              </Button>
            )}
            {status === 'ordered' && (
              <Button size="sm">
                <PackageCheck className="mr-2 h-4 w-4" />
                Receive
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reorders</h1>
          <p className="text-muted-foreground mt-1">
            Manage spare part reorder requests
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Reorder
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search reorders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterStatus === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(null)}
            className="transition-all duration-200"
          >
            All ({mockReorders.length})
          </Button>
          <Button
            variant={filterStatus === 'pending' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus('pending')}
            className="transition-all duration-200"
          >
            <Clock className="mr-1 h-4 w-4 text-amber-500" />
            Pending ({pendingCount})
          </Button>
          <Button
            variant={filterStatus === 'approved' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus('approved')}
            className="transition-all duration-200"
          >
            <CheckCircle2 className="mr-1 h-4 w-4 text-purple-500" />
            Approved ({approvedCount})
          </Button>
          <Button
            variant={filterStatus === 'ordered' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus('ordered')}
            className="transition-all duration-200"
          >
            <ShoppingCart className="mr-1 h-4 w-4 text-blue-500" />
            Ordered ({orderedCount})
          </Button>
          <Button
            variant={filterStatus === 'delivered' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus('delivered')}
            className="transition-all duration-200"
          >
            <PackageCheck className="mr-1 h-4 w-4 text-green-500" />
            Delivered ({deliveredCount})
          </Button>
        </div>
      </div>
      
      <Card className="border-border animate-scale-in">
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredReorders}
            searchColumn="partName"
          />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Reorders;
