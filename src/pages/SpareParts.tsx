
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { mockSpareParts } from '@/lib/mock-data';
import { mockAssets } from '@/lib/mock-data/assets';
import { DataTable } from '@/components/ui/data-table';
import { SparePart, SparePartType } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpDown,
  AlertTriangle,
  CheckCircle,
  ShoppingCart,
  Clock,
  Plus,
  Search,
  Database,
  Grid
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SparePartsPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'matrix' | 'table'>('matrix');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter assets based on search term
  const filteredAssets = mockAssets.filter((asset) => 
    asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.nameplate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleReorder = (sparePart: SparePart) => {
    // Navigate to the new reorder page with the part ID in search params
    navigate(`/reorders/new?partId=${sparePart.id}`);
    toast.info(`Starting reorder process for ${sparePart.name}`);
  };

  // All part types in the ordered shown in the requirements
  const partTypeOrder: SparePartType[] = [
    'cap-tip', 
    'tip-base-moving', 'tip-base-fixed',
    'shank-moving', 'shank-fixed',
    'adapter-moving', 'adapter-fixed',
    'holder-fixed', 'holder-moving',
    'point-holder',
    'arm', 'arm-assy',
    'gun-body', 'gun-body-assy',
    'bush', 'lm-guide',
    'movable-yoke', 'movable-yoke-assy',
    'teflon-hose',
    'attachment-assy',
    'spatter-cover-assy', 'spatter-cover',
    'fulcrum-pin-assy',
    'bracket-assy',
    'stopper-assy',
    'shunt', 'shunt-assy',
    'gear-case-assy',
    'coupler', 'belt',
    'metal-scraper', 'scraper',
    'dust-seal',
    'plug-silencer',
    'hinge-pin-assy',
    'insul-assy',
    'transformer',
    'tr-box-assy',
    'manifold-assy'
  ];
  
  // Function to render stock status indicators
  const renderStockStatus = (status: string) => {
    return (
      <div className="flex items-center justify-center">
        {status === 'in-stock' && (
          <div className="w-4 h-4 rounded-full bg-green-500" title="In Stock" />
        )}
        {status === 'low-stock' && (
          <div className="w-4 h-4 rounded-full bg-amber-500" title="Low Stock" />
        )}
        {status === 'out-of-stock' && (
          <div className="w-4 h-4 rounded-full bg-red-500" title="Out of Stock" />
        )}
        {status === 'on-order' && (
          <div className="w-4 h-4 rounded-full bg-blue-500" title="On Order" />
        )}
      </div>
    );
  };
  
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
      cell: ({ row }) => <div className="text-right">₹{row.getValue("unitPrice").toFixed(2)}</div>,
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
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Obara India - Spare Parts Inventory</h1>
            <p className="text-muted-foreground">Customer spare part reordering tool</p>
          </div>
          <img src="/lovable-uploads/eaf397f7-ad51-4afe-82b3-2cb2f630c294.png" alt="Obara India Logo" className="h-16" />
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
        
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search assets or parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'matrix' | 'table')}>
            <TabsList>
              <TabsTrigger value="matrix">
                <Grid className="mr-2 h-4 w-4" />
                Matrix View
              </TabsTrigger>
              <TabsTrigger value="table">
                <Database className="mr-2 h-4 w-4" />
                Table View
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => navigate('/spare-parts/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Spare Part
          </Button>
        </div>
        
        <TabsContent value="table" className="mt-0">
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
        </TabsContent>
        
        <TabsContent value="matrix" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Spare Parts Matrix</CardTitle>
              <CardDescription>Comprehensive view of all spare parts by type</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <div className="min-w-max">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="border font-medium">Type</TableHead>
                      <TableHead className="border font-medium">Timer</TableHead>
                      <TableHead className="border font-medium">ATD</TableHead>
                      <TableHead className="border font-medium">QTY</TableHead>
                      {partTypeOrder.map((partType) => (
                        <TableHead key={partType} className="border font-medium text-center capitalize whitespace-nowrap px-3 py-2">
                          {partType.replace(/-/g, ' ')}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssets.map((asset) => (
                      <TableRow key={asset.id} className="hover:bg-muted/50">
                        <TableCell className="border font-medium whitespace-nowrap">
                          {asset.serialNumber}
                        </TableCell>
                        <TableCell className="border">
                          {new Date(asset.lastMaintenance).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="border">
                          {new Date(asset.nextMaintenance).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="border text-center">
                          {asset.spareParts.length}
                        </TableCell>
                        {partTypeOrder.map((partType) => {
                          // Find spare parts of this type for this asset
                          const partsOfType = asset.spareParts.filter(
                            (sp) => sp.partType === partType
                          );
                          
                          return (
                            <TableCell key={`${asset.id}-${partType}`} className="border text-center p-2">
                              {partsOfType.length > 0 ? (
                                <div>
                                  {partsOfType.map((part) => {
                                    // Find the full spare part details
                                    const fullPart = mockSpareParts.find(sp => sp.id === part.partId);
                                    
                                    return (
                                      <div 
                                        key={part.id} 
                                        className="mb-1 p-1 rounded border hover:bg-accent cursor-pointer text-xs"
                                        title={`${part.partName} - Qty: ${part.quantity}`}
                                        onClick={() => fullPart && handleReorder(fullPart)}
                                      >
                                        <div className="font-medium truncate max-w-[100px]">{part.partName}</div>
                                        <div className="text-xs">{`Qty: ${part.quantity}`}</div>
                                        {fullPart && (
                                          <div className="mt-1">
                                            {renderStockStatus(fullPart.status)}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-xs">N/A</span>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 border p-3 rounded-md bg-muted/20">
                <div className="text-sm font-medium mb-2">Legend:</div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm">In Stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Low Stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm">Out of Stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm">On Order</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </AppLayout>
  );
};

export default SparePartsPage;
