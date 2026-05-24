import type { Distance } from '@/types/distance';

export const KM_DISTANCES: Distance[] = [
  { abbreviation: '5K', id: '5k', km: 5, label: '5K' },
  { abbreviation: '10K', id: '10k', km: 10, label: '10K' },
  { abbreviation: '15K', id: '15k', km: 15, label: '15K' },
  { abbreviation: 'HM', id: 'half', km: 21.0975, label: 'Half' },
  { abbreviation: 'FM', id: 'marathon', km: 42.195, label: 'Marathon' },
  { abbreviation: 'Custom', id: 'custom', km: null, label: 'Custom' },
];

export const MI_DISTANCES: Distance[] = [
  { abbreviation: '3 mi', id: '3mi', km: 3 * 1.609344, label: '3 mi' },
  { abbreviation: '5 mi', id: '5mi', km: 5 * 1.609344, label: '5 mi' },
  { abbreviation: '10 mi', id: '10mi', km: 10 * 1.609344, label: '10 mi' },
  { abbreviation: 'HM', id: 'half', km: 21.0975, label: 'Half' },
  { abbreviation: 'FM', id: 'marathon', km: 42.195, label: 'Marathon' },
  { abbreviation: 'Custom', id: 'custom', km: null, label: 'Custom' },
];

export const ALL_DISTANCES: Distance[] = [
  ...KM_DISTANCES,
  ...MI_DISTANCES.filter((d) => !KM_DISTANCES.some((k) => k.id === d.id)),
];

export const DISTANCES = KM_DISTANCES;
