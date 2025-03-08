import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { mockReorders } from '@/lib/mock-data';
import { DataTable } from '@/components/ui/data-table';
import { Reorder } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpDown,
  ShoppingCart,
  CheckCircle,
  Clock,
  Package,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ReordersPage: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: "partName",
      header: ({ column }) => (
        <div className="flex items-center">
          Part Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium cursor-pointer hover:underline" onClick={() => navigate(`/reorders/${row.original.id}`)}>
          {row.getValue("partName")}
        </div>
      ),
    },
    {
      accessorKey: "partNumber",
      header: "Part Number",
    },
    {
      accessorKey: "supplier",
      header: "Supplier",
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => <div className="text-center">{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "unitPrice",
      header: "Unit Price",
      cell: ({ row }) => <div className="text-right">${row.getValue("unitPrice").toFixed(2)}</div>,
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => <div className="text-right">${row.getValue("totalPrice").toFixed(2)}</div>,
    },
    {
      accessorKey: "dateRequested",
      header: "Date Requested",
      cell: ({ row }) => {
        const date = new Date(row.getValue("dateRequested"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Reorder['status'];
        
        return (
          <Badge
            className={cn(
              "capitalize",
              status === "ordered" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
              status === "approved" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
              status === "pending" && "bg-gray-100 text-gray-800 hover:bg-gray-100",
              status === "delivered" && "bg-green-100 text-green-800 hover:bg-green-100",
              status === "cancelled" && "bg-red-100 text-red-800 hover:bg-red-100"
            )}
          >
            {status === "ordered" && <Clock className="mr-1 h-3 w-3" />}
            {status === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
            {status === "pending" && <AlertTriangle className="mr-1 h-3 w-3" />}
            {status === "delivered" && <Package className="mr-1 h-3 w-3" />}
            {status === "cancelled" && <XCircle className="mr-1 h-3 w-3" />}
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "expectedDelivery",
      header: "Expected Delivery",
      cell: ({ row }) => {
        const date = row.getValue("expectedDelivery");
        return date ? <div>{new Date(date as string).toLocaleDateString()}</div> : <div>-</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const reorder = row.original as Reorder;
        
        return reorder.status === 'pending' ? (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="cursor-pointer border-green-500 text-green-600 hover:bg-green-50">
              <CheckCircle className="mr-1 h-3 w-3" />
              Approve
            </Badge>
            <Badge variant="outline" className="cursor-pointer border-red-500 text-red-600 hover:bg-red-50">
              <XCircle className="mr-1 h-3 w-3" />
              Reject
            </Badge>
          </div>
        ) : null;
      },
    },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Spare Parts Reorders</h1>
          <Button onClick={() => navigate('/reorders/new')}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            New Reorder
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reorders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReorders.length}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockReorders.filter(reorder => reorder.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Needs approval
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ordered</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockReorders.filter(reorder => reorder.status === 'ordered').length}
              </div>
              <p className="text-xs text-muted-foreground">
                In transit
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockReorders.filter(reorder => reorder.status === 'delivered').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Completed
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Reorder Management</CardTitle>
            <CardDescription>
              Track and manage part reorders, approvals, and deliveries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={mockReorders} 
              searchColumn="partName"
              searchPlaceholder="Search reorders..."
            />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ReordersPage;
