
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Asset } from '@/lib/types';
import { mockAssets } from '@/lib/mock-data';
import { mockSpareParts } from '@/lib/mock-data';
import { ColumnDef } from '@tanstack/react-table';
import { Wrench, Plus, Search, FileText, ArrowUpDown, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'table' | 'cards' | 'matrix'>('table');
  const navigate = useNavigate();

  // Filter assets based on search term
  const filteredAssets = mockAssets.filter((asset) => 
    asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.nameplate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table columns definition
  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: 'serialNumber',
      header: ({ column }) => (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serial Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue('serialNumber')}</div>,
    },
    {
      accessorKey: 'nameplate',
      header: 'Nameplate',
    },
    {
      accessorKey: 'robotMake',
      header: 'Robot Make',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            className={cn(
              status === 'operational' && 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40',
              status === 'maintenance' && 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40',
              status === 'repair' && 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/40',
              status === 'retired' && 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:hover:bg-gray-900/40'
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'nextMaintenance',
      header: 'Next Maintenance',
      cell: ({ row }) => {
        const date = new Date(row.getValue('nextMaintenance'));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: 'actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Wrench className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Function to render asset status badges
  const renderStatusBadge = (status: string) => {
    return (
      <Badge
        className={cn(
          status === 'operational' && 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40',
          status === 'maintenance' && 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40',
          status === 'repair' && 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/40',
          status === 'retired' && 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:hover:bg-gray-900/40'
        )}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

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

  // Get unique part types from spare parts for matrix headers
  const partTypes = Array.from(new Set(mockSpareParts.map(part => part.partType)));

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your equipment
          </p>
        </div>
        <Button onClick={() => navigate('/assets/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'table' | 'cards' | 'matrix')}>
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
            <TabsTrigger value="matrix">Spare Matrix</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-6">
        {viewType === 'table' && (
          <div className="animate-fade-in">
            <DataTable columns={columns} data={filteredAssets} />
          </div>
        )}
        
        {viewType === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{asset.serialNumber}</CardTitle>
                    {renderStatusBadge(asset.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Nameplate</div>
                      <div className="text-sm font-medium text-right">{asset.nameplate}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Robot Number</div>
                      <div className="text-sm font-medium text-right">{asset.robotNumber}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="text-sm font-medium text-right">{asset.location}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Next Maintenance</div>
                      <div className="text-sm font-medium text-right">
                        {new Date(asset.nextMaintenance).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        <FileText className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                      <Button size="sm">
                        <Wrench className="mr-2 h-4 w-4" />
                        Maintain
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {viewType === 'matrix' && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Spare Parts Matrix</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <div className="min-w-max">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-3 text-left font-medium border">Asset / Part Type</th>
                      {partTypes.map((partType) => (
                        <th key={partType} className="p-3 text-center font-medium border capitalize">
                          {partType.replace('-', ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id} className="hover:bg-muted/50">
                        <td className="p-3 border">
                          <div className="font-medium">{asset.serialNumber}</div>
                          <div className="text-sm text-muted-foreground">{asset.nameplate}</div>
                          <div className="mt-1">{renderStatusBadge(asset.status)}</div>
                        </td>
                        {partTypes.map((partType) => {
                          // Find spare parts of this type for this asset
                          const partsOfType = asset.spareParts.filter(
                            (sp) => sp.partType === partType
                          );
                          
                          return (
                            <td key={`${asset.id}-${partType}`} className="p-3 border text-center">
                              {partsOfType.length > 0 ? (
                                <div>
                                  {partsOfType.map((part) => {
                                    // Find the full spare part details
                                    const fullPart = mockSpareParts.find(sp => sp.id === part.partId);
                                    
                                    return (
                                      <div 
                                        key={part.id} 
                                        className="mb-2 p-2 rounded border hover:bg-accent cursor-pointer"
                                        title={`${part.partName} - Qty: ${part.quantity}`}
                                      >
                                        <div className="font-medium">{part.partName}</div>
                                        <div className="text-sm">{`Qty: ${part.quantity}`}</div>
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
                                <span className="text-muted-foreground">N/A</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 border p-4 rounded-md bg-muted/20">
                <div className="text-sm font-medium mb-2">Legend:</div>
                <div className="flex gap-6">
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
        )}
      </div>
    </AppLayout>
  );
};

export default Assets;
