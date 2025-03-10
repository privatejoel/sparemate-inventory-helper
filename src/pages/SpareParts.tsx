import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { mockSpareParts } from '@/lib/mock-data';
import { mockAssets } from '@/lib/mock-data/assets';
import { SparePartsTable } from '@/components/spare-parts/SparePartsTable';
import { SparePartsMatrix } from '@/components/spare-parts/SparePartsMatrix';
import { StockStatusLegend } from '@/components/spare-parts/StockStatusLegend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Database, Grid, CheckCircle, AlertTriangle } from 'lucide-react';
import { SparePartType } from '@/lib/types';

const SparePartsPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<'matrix' | 'table'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAssets = mockAssets.filter((asset) => 
    asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.nameplate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const partTypeOrder: SparePartType[] = [
    'cap-tip', 'tip-base-moving', 'tip-base-fixed',
    'shank-moving', 'shank-fixed', 'adapter-moving', 'adapter-fixed',
    'holder-fixed', 'holder-moving', 'point-holder',
    'arm', 'arm-assy', 'gun-body', 'gun-body-assy',
    'bush', 'lm-guide', 'movable-yoke', 'movable-yoke-assy',
    'teflon-hose', 'attachment-assy', 'spatter-cover-assy', 'spatter-cover',
    'fulcrum-pin-assy', 'bracket-assy', 'stopper-assy',
    'shunt', 'shunt-assy', 'gear-case-assy',
    'coupler', 'belt', 'metal-scraper', 'scraper',
    'dust-seal', 'plug-silencer', 'hinge-pin-assy',
    'insul-assy', 'transformer', 'tr-box-assy', 'manifold-assy'
  ];

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Spare Parts Inventory</h1>
            <p className="text-muted-foreground">Customer spare part reordering tool</p>
          </div>
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
              <SparePartsTable data={mockSpareParts} />
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
              <SparePartsMatrix assets={filteredAssets} partTypes={partTypeOrder} />
              <StockStatusLegend />
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </AppLayout>
  );
};

export default SparePartsPage;
