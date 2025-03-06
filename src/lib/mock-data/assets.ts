
import { Asset } from '../types';

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
