
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
    name: 'CNC Machine XL500',
    model: 'XL500',
    manufacturer: 'MachineWorks',
    serialNumber: 'MW-XL500-789321',
    location: 'Building A, Floor 1',
    category: 'CNC Machine',
    status: 'operational',
    installDate: '2022-03-15',
    lastMaintenance: '2023-10-05',
    nextMaintenance: '2024-01-05',
    notes: 'Performs regular calibration checks monthly',
    spareParts: [
      { id: 'sp-001', partId: 'pt-001', partName: 'Cutting Tool Set', quantity: 2, lastReplaced: '2023-09-12' },
      { id: 'sp-002', partId: 'pt-003', partName: 'Spindle Motor', quantity: 1, lastReplaced: '2023-07-28' }
    ]
  },
  {
    id: 'ast-002',
    name: 'Injection Molding Machine IMM300',
    model: 'IMM300',
    manufacturer: 'PlastiTech',
    serialNumber: 'PT-IMM300-456789',
    location: 'Building B, Floor 2',
    category: 'Injection Molding',
    status: 'maintenance',
    installDate: '2021-08-22',
    lastMaintenance: '2023-11-12',
    nextMaintenance: '2024-02-12',
    notes: 'Currently undergoing maintenance due to temperature control issues',
    spareParts: [
      { id: 'sp-003', partId: 'pt-007', partName: 'Hydraulic Pump', quantity: 1, lastReplaced: '2023-01-15' },
      { id: 'sp-004', partId: 'pt-009', partName: 'Temperature Sensor', quantity: 3, lastReplaced: '2023-11-12' }
    ]
  },
  {
    id: 'ast-003',
    name: 'Industrial Robot AR-500',
    model: 'AR-500',
    manufacturer: 'AutoRobotics',
    serialNumber: 'AR-500-123456',
    location: 'Building A, Floor 3',
    category: 'Robotics',
    status: 'operational',
    installDate: '2022-05-10',
    lastMaintenance: '2023-09-28',
    nextMaintenance: '2024-03-28',
    notes: 'Performs at optimal efficiency after last software update',
    spareParts: [
      { id: 'sp-005', partId: 'pt-012', partName: 'Servo Motor', quantity: 6, lastReplaced: '2023-09-28' },
      { id: 'sp-006', partId: 'pt-015', partName: 'Control Board', quantity: 1, lastReplaced: '2023-04-17' }
    ]
  },
  {
    id: 'ast-004',
    name: 'Laser Cutting System LC-1000',
    model: 'LC-1000',
    manufacturer: 'PrecisionCut',
    serialNumber: 'PC-LC1000-789012',
    location: 'Building C, Floor 1',
    category: 'Laser Cutting',
    status: 'repair',
    installDate: '2020-11-03',
    lastMaintenance: '2023-08-14',
    nextMaintenance: '2024-02-14',
    notes: 'Currently under repair due to laser calibration issues',
    spareParts: [
      { id: 'sp-007', partId: 'pt-022', partName: 'Laser Tube', quantity: 1, lastReplaced: '2022-12-05' },
      { id: 'sp-008', partId: 'pt-025', partName: 'Mirror Assembly', quantity: 3, lastReplaced: '2023-05-22' }
    ]
  },
  {
    id: 'ast-005',
    name: 'Packaging Machine PM-200',
    model: 'PM-200',
    manufacturer: 'PackTech',
    serialNumber: 'PT-PM200-345678',
    location: 'Building B, Floor 1',
    category: 'Packaging',
    status: 'operational',
    installDate: '2021-09-17',
    lastMaintenance: '2023-10-30',
    nextMaintenance: '2024-04-30',
    notes: 'Runs at 95% efficiency after last maintenance',
    spareParts: [
      { id: 'sp-009', partId: 'pt-031', partName: 'Conveyor Belt', quantity: 2, lastReplaced: '2023-10-30' },
      { id: 'sp-010', partId: 'pt-035', partName: 'Packaging Sensor', quantity: 5, lastReplaced: '2023-07-12' }
    ]
  }
];

// Generate mock spare parts
export const mockSpareParts: SparePart[] = [
  {
    id: 'pt-001',
    name: 'Cutting Tool Set',
    partNumber: 'CTS-500X',
    description: 'High precision carbide cutting tool set for CNC machines',
    category: 'Cutting Tools',
    manufacturer: 'ToolMaster',
    supplier: 'Industrial Supplies Co.',
    unitPrice: 249.99,
    stockQuantity: 5,
    minStockLevel: 2,
    reorderPoint: 3,
    reorderQuantity: 5,
    location: 'Warehouse A, Shelf B3',
    leadTime: 14,
    lastOrdered: '2023-08-15',
    lastRestocked: '2023-08-29',
    status: 'in-stock',
    notes: 'Critical component for CNC machine operation'
  },
  {
    id: 'pt-003',
    name: 'Spindle Motor',
    partNumber: 'SM-XL55',
    description: '5.5kW spindle motor for CNC machines',
    category: 'Motors',
    manufacturer: 'PowerDrive',
    supplier: 'Industrial Supplies Co.',
    unitPrice: 1299.99,
    stockQuantity: 1,
    minStockLevel: 1,
    reorderPoint: 1,
    reorderQuantity: 2,
    location: 'Warehouse A, Shelf D2',
    leadTime: 21,
    lastOrdered: '2023-06-10',
    lastRestocked: '2023-07-01',
    status: 'low-stock',
    notes: 'High priority item, essential for CNC operation'
  },
  {
    id: 'pt-007',
    name: 'Hydraulic Pump',
    partNumber: 'HP-300A',
    description: 'Industrial hydraulic pump for molding machines',
    category: 'Hydraulics',
    manufacturer: 'HydroTech',
    supplier: 'FluidPower Solutions',
    unitPrice: 875.50,
    stockQuantity: 3,
    minStockLevel: 1,
    reorderPoint: 2,
    reorderQuantity: 3,
    location: 'Warehouse B, Shelf A1',
    leadTime: 14,
    lastOrdered: '2023-09-05',
    lastRestocked: '2023-09-19',
    status: 'in-stock',
    notes: 'Requires special handling during installation'
  },
  {
    id: 'pt-009',
    name: 'Temperature Sensor',
    partNumber: 'TS-100K',
    description: 'K-type temperature sensor for molding machines',
    category: 'Sensors',
    manufacturer: 'SensorTech',
    supplier: 'Electronic Supplies Ltd.',
    unitPrice: 42.75,
    stockQuantity: 12,
    minStockLevel: 5,
    reorderPoint: 8,
    reorderQuantity: 10,
    location: 'Warehouse A, Shelf C4',
    leadTime: 7,
    lastOrdered: '2023-10-12',
    lastRestocked: '2023-10-19',
    status: 'in-stock',
    notes: 'Calibration required before installation'
  },
  {
    id: 'pt-012',
    name: 'Servo Motor',
    partNumber: 'SM-AR500',
    description: 'Precision servo motor for industrial robots',
    category: 'Motors',
    manufacturer: 'AutoRobotics',
    supplier: 'RoboParts Inc.',
    unitPrice: 529.99,
    stockQuantity: 6,
    minStockLevel: 3,
    reorderPoint: 4,
    reorderQuantity: 6,
    location: 'Warehouse B, Shelf B2',
    leadTime: 14,
    lastOrdered: '2023-07-22',
    lastRestocked: '2023-08-05',
    status: 'in-stock',
    notes: 'Used in multiple robot models'
  },
  {
    id: 'pt-015',
    name: 'Control Board',
    partNumber: 'CB-AR500',
    description: 'Main control board for AR-500 robots',
    category: 'Electronics',
    manufacturer: 'AutoRobotics',
    supplier: 'RoboParts Inc.',
    unitPrice: 1850.00,
    stockQuantity: 0,
    minStockLevel: 1,
    reorderPoint: 1,
    reorderQuantity: 2,
    location: 'Warehouse B, Shelf E1',
    leadTime: 30,
    lastOrdered: '2023-11-05',
    status: 'on-order',
    notes: 'Critical component, requires specialized installation'
  },
  {
    id: 'pt-022',
    name: 'Laser Tube',
    partNumber: 'LT-1000W',
    description: '1000W CO2 laser tube for laser cutting systems',
    category: 'Laser Components',
    manufacturer: 'PrecisionCut',
    supplier: 'Laser Systems Supply',
    unitPrice: 2499.99,
    stockQuantity: 0,
    minStockLevel: 1,
    reorderPoint: 1,
    reorderQuantity: 1,
    location: 'Warehouse C, Shelf A1',
    leadTime: 45,
    lastOrdered: '2023-10-15',
    status: 'out-of-stock',
    notes: 'Fragile item, requires special handling'
  },
  {
    id: 'pt-025',
    name: 'Mirror Assembly',
    partNumber: 'MA-LC1000',
    description: 'Reflection mirror assembly for laser cutting systems',
    category: 'Laser Components',
    manufacturer: 'PrecisionCut',
    supplier: 'Laser Systems Supply',
    unitPrice: 349.99,
    stockQuantity: 4,
    minStockLevel: 2,
    reorderPoint: 3,
    reorderQuantity: 5,
    location: 'Warehouse C, Shelf A2',
    leadTime: 21,
    lastOrdered: '2023-09-01',
    lastRestocked: '2023-09-22',
    status: 'in-stock',
    notes: 'Requires calibration after installation'
  },
  {
    id: 'pt-031',
    name: 'Conveyor Belt',
    partNumber: 'CB-PM200',
    description: 'Conveyor belt for PM-200 packaging machines',
    category: 'Conveyor Components',
    manufacturer: 'PackTech',
    supplier: 'Packaging Supplies Co.',
    unitPrice: 189.50,
    stockQuantity: 1,
    minStockLevel: 2,
    reorderPoint: 2,
    reorderQuantity: 3,
    location: 'Warehouse B, Shelf C3',
    leadTime: 10,
    lastOrdered: '2023-10-08',
    lastRestocked: '2023-10-18',
    status: 'low-stock',
    notes: 'Standard replacement during maintenance'
  },
  {
    id: 'pt-035',
    name: 'Packaging Sensor',
    partNumber: 'PS-PM200',
    description: 'Optical sensor for packaging detection',
    category: 'Sensors',
    manufacturer: 'SensorTech',
    supplier: 'Packaging Supplies Co.',
    unitPrice: 59.99,
    stockQuantity: 8,
    minStockLevel: 4,
    reorderPoint: 5,
    reorderQuantity: 10,
    location: 'Warehouse B, Shelf C4',
    leadTime: 7,
    lastOrdered: '2023-10-25',
    lastRestocked: '2023-11-01',
    status: 'in-stock',
    notes: 'Regularly replaced during maintenance'
  }
];

// Generate mock reorders
export const mockReorders: Reorder[] = [
  {
    id: 'ro-001',
    partId: 'pt-015',
    partName: 'Control Board',
    partNumber: 'CB-AR500',
    supplier: 'RoboParts Inc.',
    quantity: 2,
    unitPrice: 1850.00,
    totalPrice: 3700.00,
    status: 'ordered',
    dateRequested: '2023-11-05',
    dateApproved: '2023-11-06',
    dateOrdered: '2023-11-07',
    expectedDelivery: '2023-12-07',
    purchaseOrderNumber: 'PO-2023-1105',
    notes: 'Expedited shipping requested'
  },
  {
    id: 'ro-002',
    partId: 'pt-022',
    partName: 'Laser Tube',
    partNumber: 'LT-1000W',
    supplier: 'Laser Systems Supply',
    quantity: 1,
    unitPrice: 2499.99,
    totalPrice: 2499.99,
    status: 'approved',
    dateRequested: '2023-10-15',
    dateApproved: '2023-10-17',
    expectedDelivery: '2023-11-30',
    notes: 'Waiting for supplier confirmation'
  },
  {
    id: 'ro-003',
    partId: 'pt-031',
    partName: 'Conveyor Belt',
    partNumber: 'CB-PM200',
    supplier: 'Packaging Supplies Co.',
    quantity: 3,
    unitPrice: 189.50,
    totalPrice: 568.50,
    status: 'pending',
    dateRequested: '2023-11-15',
    notes: 'Anticipating upcoming scheduled maintenance'
  },
  {
    id: 'ro-004',
    partId: 'pt-003',
    partName: 'Spindle Motor',
    partNumber: 'SM-XL55',
    supplier: 'Industrial Supplies Co.',
    quantity: 2,
    unitPrice: 1299.99,
    totalPrice: 2599.98,
    status: 'delivered',
    dateRequested: '2023-10-01',
    dateApproved: '2023-10-02',
    dateOrdered: '2023-10-03',
    expectedDelivery: '2023-10-24',
    dateDelivered: '2023-10-22',
    purchaseOrderNumber: 'PO-2023-1001',
    invoiceNumber: 'INV-IS-78542',
    notes: 'Delivered ahead of schedule'
  },
  {
    id: 'ro-005',
    partId: 'pt-009',
    partName: 'Temperature Sensor',
    partNumber: 'TS-100K',
    supplier: 'Electronic Supplies Ltd.',
    quantity: 10,
    unitPrice: 42.75,
    totalPrice: 427.50,
    status: 'delivered',
    dateRequested: '2023-10-10',
    dateApproved: '2023-10-11',
    dateOrdered: '2023-10-12',
    expectedDelivery: '2023-10-19',
    dateDelivered: '2023-10-19',
    purchaseOrderNumber: 'PO-2023-1010',
    invoiceNumber: 'INV-ES-45321',
    notes: 'Regular restock order'
  }
];

// Generate mock reports
export const mockReports: Report[] = [
  {
    id: 'rpt-001',
    name: 'Monthly Asset Utilization - October 2023',
    type: 'assetUtilization',
    dateGenerated: '2023-11-01',
    summary: 'Overview of asset utilization for October 2023. Overall utilization rate at 82%, slight decrease from September.',
    data: {
      utilizationRate: 82,
      previousRate: 85,
      assetBreakdown: [
        { assetId: 'ast-001', utilization: 90 },
        { assetId: 'ast-002', utilization: 65 },
        { assetId: 'ast-003', utilization: 88 },
        { assetId: 'ast-004', utilization: 70 },
        { assetId: 'ast-005', utilization: 95 }
      ]
    }
  },
  {
    id: 'rpt-002',
    name: 'Quarterly Spare Part Usage - Q3 2023',
    type: 'sparePartUsage',
    dateGenerated: '2023-10-05',
    summary: 'Analysis of spare part consumption for Q3 2023. Temperature Sensors showing highest usage rate.',
    data: {
      totalPartsUsed: 47,
      costOfPartsUsed: 8752.23,
      topUsedParts: [
        { partId: 'pt-009', quantity: 15, cost: 641.25 },
        { partId: 'pt-035', quantity: 12, cost: 719.88 },
        { partId: 'pt-012', quantity: 8, cost: 4239.92 }
      ]
    }
  },
  {
    id: 'rpt-003',
    name: 'Reorder Analysis - YTD 2023',
    type: 'reorderAnalysis',
    dateGenerated: '2023-11-10',
    summary: 'Year-to-date analysis of part reordering patterns. Average lead time improved by 2.3 days compared to 2022.',
    data: {
      totalReorders: 42,
      totalSpent: 57892.45,
      averageLeadTime: 15.7,
      previousYearLeadTime: 18,
      supplierPerformance: [
        { supplier: 'Industrial Supplies Co.', onTimeDelivery: 92, qualityScore: 95 },
        { supplier: 'Laser Systems Supply', onTimeDelivery: 78, qualityScore: 97 },
        { supplier: 'RoboParts Inc.', onTimeDelivery: 85, qualityScore: 93 }
      ]
    }
  }
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalAssets: 5,
  assetsInMaintenance: 2,
  totalSparePartsCount: 10,
  lowStockItems: 3,
  pendingReorders: 3,
  recentReorderCost: 6768.49
};
