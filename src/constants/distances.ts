import type { Distance } from '@/types/distance';

export const DISTANCES: Distance[] = [
  { abbreviation: '5K', id: '5k', km: 5, label: '5K' },
  { abbreviation: '10K', id: '10k', km: 10, label: '10K' },
  { abbreviation: '15K', id: '15k', km: 15, label: '15K' },
  { abbreviation: 'HM', id: 'half', km: 21.0975, label: 'Half' },
  { abbreviation: 'FM', id: 'marathon', km: 42.195, label: 'Marathon' },
  { abbreviation: 'Custom', id: 'custom', km: null, label: 'Custom' },
];
