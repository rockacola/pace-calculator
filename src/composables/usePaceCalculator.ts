import { computed, ref } from 'vue';

import { DISTANCES } from '@/constants/distances';
import { predict } from '@/utils/paceUtils';

export interface Equivalent {
  abbreviation: string;
  id: string;
  km: number;
  pace: number;
  seconds: number;
}

export function usePaceCalculator() {
  const altitudeMeters = ref(0);
  const customKilometers = ref(15);
  const distanceId = ref('marathon');
  const goalSeconds = ref(3 * 3600 + 30 * 60);
  const showAdvanced = ref(false);
  const temperatureCelsius = ref(15);
  const unit = ref<'km' | 'mi'>('km');

  const selectedDistance = computed(
    () => DISTANCES.find((distance) => distance.id === distanceId.value)!
  );
  const goalKilometers = computed(() =>
    distanceId.value === 'custom' ? customKilometers.value : (selectedDistance.value.km as number)
  );

  const secondsPerKilometer = computed(() =>
    goalSeconds.value > 0 && goalKilometers.value > 0 ? goalSeconds.value / goalKilometers.value : 0
  );
  const secondsPerMile = computed(() => secondsPerKilometer.value * 1.609344);

  const heatPenalty = computed(() => Math.max(0, (temperatureCelsius.value - 12) * 2));
  const altitudePenalty = computed(
    () => Math.max(0, (altitudeMeters.value - 500) / 300) * 0.015 * secondsPerKilometer.value
  );
  const adjusted = computed(() =>
    showAdvanced.value
      ? secondsPerKilometer.value + heatPenalty.value + altitudePenalty.value
      : secondsPerKilometer.value
  );

  const equivalents = computed<Equivalent[]>(() =>
    [
      { abbreviation: '5K', id: '5k', km: 5 },
      { abbreviation: '10K', id: '10k', km: 10 },
      { abbreviation: '15K', id: '15k', km: 15 },
      { abbreviation: 'HM', id: 'hm', km: 21.0975 },
      { abbreviation: 'FM', id: 'fm', km: 42.195 },
    ].map((entry) => ({
      abbreviation: entry.abbreviation,
      id: entry.id,
      km: entry.km,
      pace: predict(goalSeconds.value, goalKilometers.value, entry.km) / entry.km,
      seconds: predict(goalSeconds.value, goalKilometers.value, entry.km),
    }))
  );

  const thresholdKm = computed(() => {
    let low = 5;
    let high = 30;
    for (let i = 0; i < 30; i++) {
      const mid = (low + high) / 2;
      if (predict(goalSeconds.value, goalKilometers.value, mid) > 3600) {
        high = mid;
      } else {
        low = mid;
      }
    }
    return (low + high) / 2;
  });

  const thresholdPace = computed(() => 3600 / thresholdKm.value);

  const distanceAbbreviation = computed(() =>
    distanceId.value === 'custom'
      ? `${customKilometers.value}K`
      : selectedDistance.value.abbreviation
  );

  const unitLabel = computed(() => (unit.value === 'km' ? '/ km' : '/ mi'));

  return {
    adjusted,
    altitudeMeters,
    altitudePenalty,
    customKilometers,
    distanceAbbreviation,
    distanceId,
    equivalents,
    goalKilometers,
    goalSeconds,
    heatPenalty,
    secondsPerKilometer,
    secondsPerMile,
    showAdvanced,
    temperatureCelsius,
    thresholdPace,
    unit,
    unitLabel,
  };
}
