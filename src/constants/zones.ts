import type { Zone } from '@/types/zone';

export const ZONES: Zone[] = [
  {
    color: '#9FBFE8',
    description: 'Conversational, very easy. 60-70% effort.',
    id: 'recovery',
    label: 'Recovery',
    range: [1.42, 1.55],
  },
  {
    color: '#7EB8D9',
    description: 'Aerobic base building. 65-75% effort.',
    id: 'easy',
    label: 'Easy',
    range: [1.28, 1.42],
  },
  {
    color: '#5A9DC2',
    description: 'Distance focus, sustainable. 70-78% effort.',
    id: 'long',
    label: 'Long run',
    range: [1.2, 1.3],
  },
  {
    color: '#3F7EA1',
    description: 'Race pace for FM. ~85% effort.',
    id: 'marathon',
    label: 'Marathon',
    range: [1.08, 1.13],
  },
  {
    color: '#1F3A52',
    description: 'Lactate threshold. Comfortably hard.',
    id: 'threshold',
    label: 'Threshold',
    range: [1.0, 1.04],
  },
  {
    color: 'var(--ink)',
    description: 'VO2max work. 3-5 min reps.',
    id: 'interval',
    label: 'Interval',
    range: [0.92, 0.96],
  },
  {
    color: 'var(--accent-ink)',
    description: 'Speed/form. Short, fast, full recovery.',
    id: 'repetition',
    label: 'Repetition',
    range: [0.86, 0.9],
  },
];
