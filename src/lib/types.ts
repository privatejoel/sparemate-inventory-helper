
// Asset Management Types
export interface Asset {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  location: string;
  category: string;
  status: 'operational' | 'maintenance' | 'repair' | 'retired';
  installDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  notes: string;
  spareParts: AssetSparePart[];
}

export interface AssetSparePart {
  id: string;
  partId: string;
  partName: string;
  quantity: number;
  lastReplaced?: string;
  notes?: string;
}

// Spare Parts Inventory Types
export interface SparePart {
  id: string;
  name: string;
  partNumber: string;
  description: string;
  category: string;
  manufacturer: string;
  supplier: string;
  unitPrice: number;
  stockQuantity: number;
  minStockLevel: number;
  reorderPoint: number;
  reorderQuantity: number;
  location: string;
  leadTime: number; // in days
  lastOrdered?: string;
  lastRestocked?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'on-order';
  notes?: string;
}

// Reorder Types
export interface Reorder {
  id: string;
  partId: string;
  partName: string;
  partNumber: string;
  supplier: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'pending' | 'approved' | 'ordered' | 'delivered' | 'cancelled';
  dateRequested: string;
  dateApproved?: string;
  dateOrdered?: string;
  expectedDelivery?: string;
  dateDelivered?: string;
  purchaseOrderNumber?: string;
  invoiceNumber?: string;
  notes?: string;
}

// Dashboard & Report Types
export interface DashboardStats {
  totalAssets: number;
  assetsInMaintenance: number;
  totalSparePartsCount: number;
  lowStockItems: number;
  pendingReorders: number;
  recentReorderCost: number;
}

export interface Report {
  id: string;
  name: string;
  type: 'assetUtilization' | 'sparePartUsage' | 'reorderAnalysis' | 'costAnalysis';
  dateGenerated: string;
  summary: string;
  data: any;
}
