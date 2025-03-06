
import { 
  Asset, 
  SparePart, 
  Reorder, 
  Report,
  DashboardStats 
} from './types';

// Helper to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Generate mock assets
export const mockAssets: Asset[] = [
  {
    id: 'ast-001',
    serialNumber: 'WG-2023-001',
    nameplate: 'X-150-A',
    stationName: 'Body Shop Station 1',
    lineName: 'Main Assembly Line',
    robotNumber: 'R01',
    robotMake: 'FANUC',
    location: 'Bay A, Cell 1',
    status: 'operational',
    installDate: '2022-06-15',
    lastMaintenance: '2023-10-05',
    nextMaintenance: '2024-01-05',
    notes: 'Regular maintenance performed, all parts functioning well',
    spareParts: [
      { id: 'sp-001', partId: 'pt-001', partName: 'Copper Cap Tip', partType: 'cap-tip', quantity: 4, lastReplaced: '2023-09-12' },
      { id: 'sp-002', partId: 'pt-003', partName: 'Heavy Duty Shank', partType: 'shank', quantity: 1, lastReplaced: '2023-07-28' }
    ]
  },
  {
    id: 'ast-002',
    serialNumber: 'WG-2023-002',
    nameplate: 'X-150-B',
    stationName: 'Door Assembly Station',
    lineName: 'Door Assembly Line',
    robotNumber: 'R05',
    robotMake: 'ABB',
    location: 'Bay B, Cell 3',
    status: 'maintenance',
    installDate: '2021-11-22',
    lastMaintenance: '2023-11-12',
    nextMaintenance: '2024-02-12',
    notes: 'Currently undergoing maintenance due to inconsistent weld quality',
    spareParts: [
      { id: 'sp-003', partId: 'pt-002', partName: 'Standard Tip Base', partType: 'tip-base', quantity: 2, lastReplaced: '2023-01-15' },
      { id: 'sp-004', partId: 'pt-004', partName: 'Universal Adapter', partType: 'adapter', quantity: 1, lastReplaced: '2023-11-12' }
    ]
  },
  {
    id: 'ast-003',
    serialNumber: 'WG-2022-100',
    nameplate: 'X-200-C',
    stationName: 'Underbody Station',
    lineName: 'Chassis Line',
    robotNumber: 'R12',
    robotMake: 'KUKA',
    location: 'Bay C, Cell 2',
    status: 'operational',
    installDate: '2022-05-10',
    lastMaintenance: '2023-09-28',
    nextMaintenance: '2024-03-28',
    notes: 'Operating at optimal performance after electrode replacement',
    spareParts: [
      { id: 'sp-005', partId: 'pt-001', partName: 'Copper Cap Tip', partType: 'cap-tip', quantity: 6, lastReplaced: '2023-09-28' },
      { id: 'sp-006', partId: 'pt-005', partName: 'Heavy Duty Adapter', partType: 'adapter', quantity: 1, lastReplaced: '2023-04-17' }
    ]
  },
  {
    id: 'ast-004',
    serialNumber: 'WG-2022-101',
    nameplate: 'X-200-C',
    stationName: 'Roof Assembly',
    lineName: 'Body Structure Line',
    robotNumber: 'R08',
    robotMake: 'FANUC',
    location: 'Bay A, Cell 4',
    status: 'repair',
    installDate: '2020-11-03',
    lastMaintenance: '2023-08-14',
    nextMaintenance: '2024-02-14',
    notes: 'Under repair due to water cooling system issues',
    spareParts: [
      { id: 'sp-007', partId: 'pt-002', partName: 'Standard Tip Base', partType: 'tip-base', quantity: 2, lastReplaced: '2022-12-05' },
      { id: 'sp-008', partId: 'pt-003', partName: 'Heavy Duty Shank', partType: 'shank', quantity: 1, lastReplaced: '2023-05-22' }
    ]
  },
  {
    id: 'ast-005',
    serialNumber: 'WG-2023-050',
    nameplate: 'X-175-A',
    stationName: 'Side Panel Station',
    lineName: 'Main Assembly Line',
    robotNumber: 'R03',
    robotMake: 'ABB',
    location: 'Bay B, Cell 1',
    status: 'operational',
    installDate: '2021-09-17',
    lastMaintenance: '2023-10-30',
    nextMaintenance: '2024-04-30',
    notes: 'Performs consistently with high weld quality',
    spareParts: [
      { id: 'sp-009', partId: 'pt-001', partName: 'Copper Cap Tip', partType: 'cap-tip', quantity: 8, lastReplaced: '2023-10-30' },
      { id: 'sp-010', partId: 'pt-004', partName: 'Universal Adapter', partType: 'adapter', quantity: 1, lastReplaced: '2023-07-12' }
    ]
  }
];

// Generate mock spare parts
export const mockSpareParts: SparePart[] = [
  {
    id: 'pt-001',
    name: 'Copper Cap Tip',
    partNumber: 'CCT-5000',
    partType: 'cap-tip',
    description: 'High conductivity copper cap tip for standard welding applications',
    compatibleRobots: ['FANUC', 'ABB', 'KUKA'],
    manufacturer: 'WeldTech',
    supplier: 'Industrial Welding Supplies',
    unitPrice: 24.99,
    stockQuantity: 45,
    minStockLevel: 20,
    reorderPoint: 25,
    reorderQuantity: 50,
    location: 'Warehouse A, Shelf B3',
    leadTime: 7,
    lastOrdered: '2023-08-15',
    lastRestocked: '2023-08-22',
    status: 'in-stock',
    notes: 'High-wear component, needs frequent replacement'
  },
  {
    id: 'pt-002',
    name: 'Standard Tip Base',
    partNumber: 'STB-3000',
    partType: 'tip-base',
    description: 'Standard tip base compatible with most cap tips',
    compatibleRobots: ['FANUC', 'ABB', 'KUKA'],
    manufacturer: 'WeldTech',
    supplier: 'Industrial Welding Supplies',
    unitPrice: 89.99,
    stockQuantity: 18,
    minStockLevel: 10,
    reorderPoint: 15,
    reorderQuantity: 20,
    location: 'Warehouse A, Shelf C2',
    leadTime: 10,
    lastOrdered: '2023-09-10',
    lastRestocked: '2023-09-20',
    status: 'in-stock',
    notes: 'Medium-wear component'
  },
  {
    id: 'pt-003',
    name: 'Heavy Duty Shank',
    partNumber: 'HDS-7500',
    partType: 'shank',
    description: 'Reinforced shank for high-pressure welding applications',
    compatibleRobots: ['FANUC', 'KUKA'],
    manufacturer: 'RoboWeld',
    supplier: 'RoboWeld Direct',
    unitPrice: 159.99,
    stockQuantity: 8,
    minStockLevel: 5,
    reorderPoint: 7,
    reorderQuantity: 10,
    location: 'Warehouse B, Shelf A1',
    leadTime: 14,
    lastOrdered: '2023-10-05',
    lastRestocked: '2023-10-19',
    status: 'in-stock',
    notes: 'Low-wear component, check for cooling line integrity'
  },
  {
    id: 'pt-004',
    name: 'Universal Adapter',
    partNumber: 'UA-2000',
    partType: 'adapter',
    description: 'Universal adapter compatible with multiple robot makes',
    compatibleRobots: ['FANUC', 'ABB', 'KUKA', 'Yaskawa'],
    manufacturer: 'RoboWeld',
    supplier: 'RoboWeld Direct',
    unitPrice: 129.50,
    stockQuantity: 3,
    minStockLevel: 2,
    reorderPoint: 3,
    reorderQuantity: 5,
    location: 'Warehouse B, Shelf B4',
    leadTime: 21,
    lastOrdered: '2023-11-01',
    status: 'low-stock',
    notes: 'Check compatibility with robot model before installation'
  },
  {
    id: 'pt-005',
    name: 'Heavy Duty Adapter',
    partNumber: 'HDA-5000',
    partType: 'adapter',
    description: 'Reinforced adapter for high-stress welding applications',
    compatibleRobots: ['FANUC', 'KUKA'],
    manufacturer: 'WeldTech',
    supplier: 'Industrial Welding Supplies',
    unitPrice: 199.99,
    stockQuantity: 0,
    minStockLevel: 1,
    reorderPoint: 2,
    reorderQuantity: 3,
    location: 'Warehouse A, Shelf D1',
    leadTime: 30,
    lastOrdered: '2023-11-10',
    status: 'on-order',
    notes: 'Critical component for high-volume production lines'
  },
  {
    id: 'pt-006',
    name: 'Extended Reach Cap Tip',
    partNumber: 'ERCT-8000',
    partType: 'cap-tip',
    description: 'Extended length cap tip for hard-to-reach weld points',
    compatibleRobots: ['FANUC', 'ABB'],
    manufacturer: 'WeldTech',
    supplier: 'Industrial Welding Supplies',
    unitPrice: 34.99,
    stockQuantity: 22,
    minStockLevel: 10,
    reorderPoint: 12,
    reorderQuantity: 25,
    location: 'Warehouse A, Shelf B4',
    leadTime: 7,
    lastOrdered: '2023-09-25',
    lastRestocked: '2023-10-02',
    status: 'in-stock',
    notes: 'Prone to bending under high pressure'
  },
  {
    id: 'pt-007',
    name: 'Offset Tip Base',
    partNumber: 'OTB-4000',
    partType: 'tip-base',
    description: 'Offset design for angled welding applications',
    compatibleRobots: ['FANUC', 'ABB', 'KUKA'],
    manufacturer: 'RoboWeld',
    supplier: 'RoboWeld Direct',
    unitPrice: 109.99,
    stockQuantity: 5,
    minStockLevel: 3,
    reorderPoint: 4,
    reorderQuantity: 8,
    location: 'Warehouse B, Shelf C1',
    leadTime: 10,
    lastOrdered: '2023-10-18',
    lastRestocked: '2023-10-28',
    status: 'in-stock',
    notes: 'Verify angle requirements before installation'
  },
  {
    id: 'pt-008',
    name: 'Articulating Shank',
    partNumber: 'AS-6000',
    partType: 'shank',
    description: 'Flexible shank for complex weld geometries',
    compatibleRobots: ['ABB', 'KUKA'],
    manufacturer: 'RoboWeld',
    supplier: 'RoboWeld Direct',
    unitPrice: 259.99,
    stockQuantity: 0,
    minStockLevel: 1,
    reorderPoint: 1,
    reorderQuantity: 2,
    location: 'Warehouse B, Shelf A2',
    leadTime: 28,
    lastOrdered: '2023-11-05',
    status: 'out-of-stock',
    notes: 'Special order item, requires engineering approval'
  },
  {
    id: 'pt-009',
    name: 'KUKA-Specific Adapter',
    partNumber: 'KSA-9000',
    partType: 'adapter',
    description: 'Adapter specifically designed for KUKA robots',
    compatibleRobots: ['KUKA'],
    manufacturer: 'RoboWeld',
    supplier: 'RoboWeld Direct',
    unitPrice: 179.99,
    stockQuantity: 4,
    minStockLevel: 2,
    reorderPoint: 3,
    reorderQuantity: 5,
    location: 'Warehouse B, Shelf B3',
    leadTime: 14,
    lastOrdered: '2023-08-20',
    lastRestocked: '2023-09-03',
    status: 'in-stock',
    notes: 'Only compatible with KUKA robots'
  },
  {
    id: 'pt-010',
    name: 'High-Conductivity Cap Tip',
    partNumber: 'HCCT-7000',
    partType: 'cap-tip',
    description: 'Premium copper-alloy cap tip for high-current applications',
    compatibleRobots: ['FANUC', 'ABB', 'KUKA', 'Yaskawa'],
    manufacturer: 'WeldTech',
    supplier: 'Industrial Welding Supplies',
    unitPrice: 45.99,
    stockQuantity: 15,
    minStockLevel: 10,
    reorderPoint: 12,
    reorderQuantity: 25,
    location: 'Warehouse A, Shelf B2',
    leadTime: 10,
    lastOrdered: '2023-10-08',
    lastRestocked: '2023-10-18',
    status: 'in-stock',
    notes: 'Recommended for high-amperage welding'
  }
];

// Generate mock reorders
export const mockReorders: Reorder[] = [
  {
    id: 'ro-001',
    partId: 'pt-005',
    partName: 'Heavy Duty Adapter',
    partNumber: 'HDA-5000',
    partType: 'adapter',
    supplier: 'Industrial Welding Supplies',
    quantity: 3,
    unitPrice: 199.99,
    totalPrice: 599.97,
    status: 'ordered',
    dateRequested: '2023-11-10',
    dateApproved: '2023-11-11',
    dateOrdered: '2023-11-12',
    expectedDelivery: '2023-12-12',
    purchaseOrderNumber: 'PO-2023-1110',
    notes: 'Expedited shipping requested'
  },
  {
    id: 'ro-002',
    partId: 'pt-008',
    partName: 'Articulating Shank',
    partNumber: 'AS-6000',
    partType: 'shank',
    supplier: 'RoboWeld Direct',
    quantity: 2,
    unitPrice: 259.99,
    totalPrice: 519.98,
    status: 'approved',
    dateRequested: '2023-11-05',
    dateApproved: '2023-11-07',
    expectedDelivery: '2023-12-05',
    notes: 'Waiting for supplier confirmation'
  },
  {
    id: 'ro-003',
    partId: 'pt-004',
    partName: 'Universal Adapter',
    partNumber: 'UA-2000',
    partType: 'adapter',
    supplier: 'RoboWeld Direct',
    quantity: 5,
    unitPrice: 129.50,
    totalPrice: 647.50,
    status: 'pending',
    dateRequested: '2023-11-18',
    notes: 'Standard shipping'
  },
  {
    id: 'ro-004',
    partId: 'pt-001',
    partName: 'Copper Cap Tip',
    partNumber: 'CCT-5000',
    partType: 'cap-tip',
    supplier: 'Industrial Welding Supplies',
    quantity: 50,
    unitPrice: 24.99,
    totalPrice: 1249.50,
    status: 'delivered',
    dateRequested: '2023-10-20',
    dateApproved: '2023-10-21',
    dateOrdered: '2023-10-22',
    expectedDelivery: '2023-10-29',
    dateDelivered: '2023-10-28',
    purchaseOrderNumber: 'PO-2023-1020',
    invoiceNumber: 'INV-IWS-45678',
    notes: 'Regular reorder'
  },
  {
    id: 'ro-005',
    partId: 'pt-002',
    partName: 'Standard Tip Base',
    partNumber: 'STB-3000',
    partType: 'tip-base',
    supplier: 'Industrial Welding Supplies',
    quantity: 10,
    unitPrice: 89.99,
    totalPrice: 899.90,
    status: 'delivered',
    dateRequested: '2023-09-08',
    dateApproved: '2023-09-09',
    dateOrdered: '2023-09-10',
    expectedDelivery: '2023-09-20',
    dateDelivered: '2023-09-20',
    purchaseOrderNumber: 'PO-2023-0908',
    invoiceNumber: 'INV-IWS-45321',
    notes: 'Regular restock order'
  }
];

// Generate mock reports
export const mockReports: Report[] = [
  {
    id: 'rpt-001',
    name: 'Monthly Welding Gun Utilization - October 2023',
    type: 'assetUtilization',
    dateGenerated: '2023-11-01',
    summary: 'Overview of welding gun utilization for October 2023. Overall utilization rate at 79%, slight increase from September.',
    data: {
      utilizationRate: 79,
      previousRate: 76,
      assetBreakdown: [
        { assetId: 'ast-001', utilization: 82 },
        { assetId: 'ast-002', utilization: 65 },
        { assetId: 'ast-003', utilization: 91 },
        { assetId: 'ast-004', utilization: 60 },
        { assetId: 'ast-005', utilization: 88 }
      ]
    }
  },
  {
    id: 'rpt-002',
    name: 'Quarterly Cap Tip Usage - Q3 2023',
    type: 'sparePartUsage',
    dateGenerated: '2023-10-05',
    summary: 'Analysis of cap tip consumption for Q3 2023. Copper Cap Tips showing highest usage rate.',
    data: {
      totalPartsUsed: 142,
      costOfPartsUsed: 4678.52,
      topUsedParts: [
        { partId: 'pt-001', quantity: 86, cost: 2149.14 },
        { partId: 'pt-010', quantity: 32, cost: 1471.68 },
        { partId: 'pt-006', quantity: 24, cost: 839.76 }
      ]
    }
  },
  {
    id: 'rpt-003',
    name: 'Adapter Reorder Analysis - YTD 2023',
    type: 'reorderAnalysis',
    dateGenerated: '2023-11-10',
    summary: 'Year-to-date analysis of adapter reordering patterns. Average lead time reduced to 18.3 days from 22.1 days in 2022.',
    data: {
      totalReorders: 28,
      totalSpent: 12756.32,
      averageLeadTime: 18.3,
      previousYearLeadTime: 22.1,
      supplierPerformance: [
        { supplier: 'Industrial Welding Supplies', onTimeDelivery: 94, qualityScore: 92 },
        { supplier: 'RoboWeld Direct', onTimeDelivery: 87, qualityScore: 96 }
      ]
    }
  }
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalAssets: 5,
  assetsInMaintenance: 2,
  totalSparePartsCount: 10,
  lowStockItems: 2,
  pendingReorders: 3,
  recentReorderCost: 1767.45
};
