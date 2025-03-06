
import { Report } from '../types';

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
