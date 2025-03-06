
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { mockSpareParts } from '@/lib/mock-data';
import { DataTable } from '@/components/ui/data-table';
import { SparePart } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpDown,
  AlertTriangle,
  CheckCircle,
  ShoppingCart,
  Clock
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const SparePartsPage: React.FC = () => {
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div className="flex items-center">
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "partNumber",
      header: "Part Number",
    },
    {
      accessorKey: "partType",
      header: "Part Type",
      cell: ({ row }) => {
        const partType = row.getValue("partType") as string;
        return (
          <div className="capitalize">{partType.replace('-', ' ')}</div>
        );
      },
    },
    {
      accessorKey: "stockQuantity",
      header: ({ column }) => (
        <div className="flex items-center">
          Stock Qty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => <div className="text-center">{row.getValue("stockQuantity")}</div>,
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Price",
      cell: ({ row }) => <div className="text-right">${row.getValue("unitPrice").toFixed(2)}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as SparePart['status'];
        
        return (
          <Badge
            className={cn(
              "capitalize",
              status === "in-stock" && "bg-green-100 text-green-800 hover:bg-green-100",
              status === "low-stock" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
              status === "out-of-stock" && "bg-red-100 text-red-800 hover:bg-red-100",
              status === "on-order" && "bg-blue-100 text-blue-800 hover:bg-blue-100"
            )}
          >
            {status === "in-stock" && <CheckCircle className="mr-1 h-3 w-3" />}
            {status === "low-stock" && <AlertTriangle className="mr-1 h-3 w-3" />}
            {status === "out-of-stock" && <AlertTriangle className="mr-1 h-3 w-3" />}
            {status === "on-order" && <Clock className="mr-1 h-3 w-3" />}
            {status.replace('-', ' ')}
          </Badge>
        );
      },
    },
    {
      accessorKey: "reorderPoint",
      header: "Reorder Point",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const sparePart = row.original as SparePart;
        const needsReorder = sparePart.stockQuantity <= sparePart.reorderPoint;
        
        return needsReorder && sparePart.status !== 'on-order' ? (
          <Badge variant="outline" className="cursor-pointer border-amber-500 text-amber-600 hover:bg-amber-50">
            <ShoppingCart className="mr-1 h-3 w-3" />
            Reorder
          </Badge>
        ) : null;
      },
    },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Spare Parts Inventory</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Parts</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSpareParts.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockSpareParts.filter(part => part.status === 'in-stock').length} in stock
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockSpareParts.filter(part => part.status === 'low-stock').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need attention soon
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockSpareParts.filter(part => part.status === 'out-of-stock').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Critical attention required
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Spare Parts Inventory</CardTitle>
            <CardDescription>
              Manage your spare parts inventory, check stock levels, and reorder when needed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={mockSpareParts} 
              searchColumn="name"
              searchPlaceholder="Search parts..."
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SparePartsPage;
