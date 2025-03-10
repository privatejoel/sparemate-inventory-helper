
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Asset, SparePart, SparePartType } from '@/lib/types';
import { mockSpareParts } from '@/lib/mock-data';

interface SparePartsMatrixProps {
  assets: Asset[];
  partTypes: SparePartType[];
}

export const SparePartsMatrix: React.FC<SparePartsMatrixProps> = ({ assets, partTypes }) => {
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

  return (
    <div className="min-w-max">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="border font-medium">Type</TableHead>
            <TableHead className="border font-medium">Timer</TableHead>
            <TableHead className="border font-medium">ATD</TableHead>
            <TableHead className="border font-medium">QTY</TableHead>
            {partTypes.map((partType) => (
              <TableHead key={partType} className="border font-medium text-center capitalize whitespace-nowrap px-3 py-2">
                {partType.replace(/-/g, ' ')}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
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
              {partTypes.map((partType) => {
                const partsOfType = asset.spareParts.filter(
                  (sp) => sp.partType === partType
                );
                
                return (
                  <TableCell key={`${asset.id}-${partType}`} className="border text-center p-2">
                    {partsOfType.length > 0 ? (
                      <div>
                        {partsOfType.map((part) => {
                          const fullPart = mockSpareParts.find(sp => sp.id === part.partId);
                          
                          return (
                            <div 
                              key={part.id} 
                              className="mb-1 p-1 rounded border hover:bg-accent cursor-pointer text-xs"
                              title={`${part.partName} - Qty: ${part.quantity}`}
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
  );
};
