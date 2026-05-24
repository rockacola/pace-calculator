import { computed, ref, watch } from 'vue';

import { ALL_DISTANCES, KM_DISTANCES, MI_DISTANCES } from '@/constants/distances';
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
    () => ALL_DISTANCES.find((distance) => distance.id === distanceId.value)!
  );

  watch(unit, (newUnit) => {
    const validIds = (newUnit === 'km' ? KM_DISTANCES : MI_DISTANCES).map((d) => d.id);
    if (!validIds.includes(distanceId.value)) {
      distanceId.value = 'marathon';
    }
  });
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

  const equivalents = computed<Equivalent[]>(() => {
    const distances = unit.value === 'km' ? KM_DISTANCES : MI_DISTANCES;
    return distances
      .filter((d) => d.km !== null)
      .map((d) => ({
        abbreviation: d.abbreviation,
        id: d.id,
        km: d.km as number,
        pace: predict(goalSeconds.value, goalKilometers.value, d.km as number) / (d.km as number),
        seconds: predict(goalSeconds.value, goalKilometers.value, d.km as number),
      }));
  });

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
