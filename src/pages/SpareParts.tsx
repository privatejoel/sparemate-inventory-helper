
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SparePart } from '@/lib/types';
import { mockSpareParts } from '@/lib/mock-data';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Plus, 
  Search, 
  Package, 
  ShoppingCart, 
  ArrowUpDown,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SpareParts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Filter spare parts based on search term and status filter
  const filteredParts = mockSpareParts.filter((part) => {
    const matchesSearch = 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus ? part.status === filterStatus : true;
    
    return matchesSearch && matchesFilter;
  });

  // Get counts for filter badges
  const inStockCount = mockSpareParts.filter(p => p.status === 'in-stock').length;
  const lowStockCount = mockSpareParts.filter(p => p.status === 'low-stock').length;
  const outOfStockCount = mockSpareParts.filter(p => p.status === 'out-of-stock').length;
  const onOrderCount = mockSpareParts.filter(p => p.status === 'on-order').length;

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Table columns definition
  const columns: ColumnDef<SparePart>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <div className="ml-2 font-medium">
              {row.getValue('name')}
              <div className="text-xs text-muted-foreground">
                {row.original.partNumber}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'stockQuantity',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const stockQty = parseInt(row.getValue('stockQuantity'));
        const reorderPoint = row.original.reorderPoint;
        
        return (
          <div className="flex items-center">
            <div className="font-medium">{stockQty}</div>
            {stockQty <= reorderPoint && stockQty > 0 && (
              <AlertTriangle className="ml-2 h-4 w-4 text-amber-500" />
            )}
            {stockQty === 0 && (
              <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ row }) => {
        return <div>{row.getValue('supplier')}</div>;
      },
    },
    {
      accessorKey: 'unitPrice',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        return <div>{formatCurrency(row.getValue('unitPrice'))}</div>;
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => <div>{row.getValue('location')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            className={cn(
              status === 'in-stock' && 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40',
              status === 'low-stock' && 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/40',
              status === 'out-of-stock' && 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40',
              status === 'on-order' && 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40'
            )}
          >
            {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const isLowOrOut = row.original.status === 'low-stock' || row.original.status === 'out-of-stock';
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Package className="mr-2 h-4 w-4" />
              Details
            </Button>
            {isLowOrOut && (
              <Button size="sm">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Reorder
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
          <h1 className="text-3xl font-bold tracking-tight">Spare Parts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your spare parts inventory
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Spare Part
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search spare parts..."
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
            All ({mockSpareParts.length})
          </Button>
          <Button
            variant={filterStatus === 'in-stock' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus('in-stock')}
            className="transition-all duration-200"
          >
            <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
            In Stock ({inStockCount})
          </Button>
          <Button
            variant={filterStatus === 'low-stock' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus('low-stock')}
            className="transition-all duration-200"
          >
            <AlertTriangle className="mr-1 h-4 w-4 text-amber-500" />
            Low Stock ({lowStockCount})
          </Button>
          <Button
            variant={filterStatus === 'out-of-stock' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus('out-of-stock')}
            className="transition-all duration-200"
          >
            <AlertTriangle className="mr-1 h-4 w-4 text-red-500" />
            Out of Stock ({outOfStockCount})
          </Button>
          <Button
            variant={filterStatus === 'on-order' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus('on-order')}
            className="transition-all duration-200"
          >
            <Clock className="mr-1 h-4 w-4 text-blue-500" />
            On Order ({onOrderCount})
          </Button>
        </div>
      </div>
      
      <Card className="border-border animate-scale-in">
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredParts}
            searchColumn="name"
          />
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default SpareParts;
