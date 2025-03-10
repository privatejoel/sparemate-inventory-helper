
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SparePart } from '@/lib/types';
import { ArrowUpDown, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';

interface SparePartsTableProps {
  data: SparePart[];
}

export const SparePartsTable: React.FC<SparePartsTableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleReorder = (sparePart: SparePart) => {
    navigate(`/reorders/new?partId=${sparePart.id}`);
    toast.info(`Starting reorder process for ${sparePart.name}`);
  };

  const columns: ColumnDef<SparePart>[] = [
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
          <div className="capitalize">{partType.replace(/-/g, ' ')}</div>
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
      cell: ({ row }) => {
        const value = row.getValue("unitPrice");
        const price = typeof value === 'number' ? value : 0;
        return <div className="text-right">₹{price.toFixed(2)}</div>;
      },
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
        const sparePart = row.original;
        const needsReorder = sparePart.stockQuantity <= sparePart.reorderPoint;
        
        return needsReorder && sparePart.status !== 'on-order' ? (
          <Button 
            variant="outline" 
            size="sm"
            className="border-amber-500 text-amber-600 hover:bg-amber-50"
            onClick={() => handleReorder(sparePart)}
          >
            <ShoppingCart className="mr-1 h-3 w-3" />
            Reorder
          </Button>
        ) : null;
      },
    },
  ];

  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchColumn="name"
      searchPlaceholder="Search parts..."
    />
  );
};
