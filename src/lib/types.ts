// Asset Management Types
export interface Asset {
  id: string;
  serialNumber: string;
  nameplate: string;
  stationName: string;
  lineName: string;
  robotNumber: string;
  robotMake: string;
  location: string;
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
  partType: 'cap-tip' | 'tip-base' | 'shank' | 'adapter';
  quantity: number;
  lastReplaced?: string;
  notes?: string;
}

// Spare Parts Inventory Types
export interface SparePart {
  id: string;
  name: string;
  partNumber: string;
  partType: 'cap-tip' | 'tip-base' | 'shank' | 'adapter';
  description: string;
  compatibleRobots: string[];
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
  partType: 'cap-tip' | 'tip-base' | 'shank' | 'adapter';
  supplier: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'pending' | 'approved' | 'ordered' | 'in-transit' | 'delivered' | 'cancelled';
  dateRequested: string;
  dateApproved?: string;
  dateOrdered?: string;
  expectedDelivery?: string;
  dateDelivered?: string;
  purchaseOrderNumber?: string;
  invoiceNumber?: string;
  grnNumber?: string;
  paymentStatus?: 'paid' | 'pending' | 'issue';
  notes?: string;
  supportRequests?: SupportRequest[];
}

// Support Request Types
export interface SupportRequest {
  id: string;
  orderId: string;
  type: 'cancellation' | 'modification' | 'urgent-delivery' | 'supplier-delay' | 'warranty-claim';
  notes?: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  dateSubmitted: string;
  dateResolved?: string;
  responseNotes?: string;
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
