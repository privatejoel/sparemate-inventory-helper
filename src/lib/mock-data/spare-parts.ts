
import { SparePart } from '../types';

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
    partType: 'tip-base-moving',
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
    partType: 'shank-moving',
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
    partType: 'adapter-moving',
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
    partType: 'adapter-fixed',
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
  }
];
