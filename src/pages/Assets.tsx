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
import { ColumnDef } from '@tanstack/react-table';
import { Wrench, Plus, Search, FileText, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'table' | 'cards'>('table');
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
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'table' | 'cards')}>
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-6">
        {viewType === 'table' ? (
          <div className="animate-fade-in">
            <DataTable columns={columns} data={filteredAssets} />
          </div>
        ) : (
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
      </div>
    </AppLayout>
  );
};

export default Assets;
