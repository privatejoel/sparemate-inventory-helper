
import React from 'react';

export const StockStatusLegend = () => {
  return (
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
  );
};
