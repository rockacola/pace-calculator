<script setup lang="ts">
import { computed, ref } from 'vue';

import Icon from '@/components/BaseIcon.vue';

const props = defineProps<{
  altitudeMeters: number;
  altitudePenalty: number;
  heatPenalty: number;
  temperatureCelsius: number;
  unit: 'km' | 'mi';
}>();

const emit = defineEmits<{
  'update:altitudeMeters': [value: number];
  'update:temperatureCelsius': [value: number];
}>();

const showAdvanced = defineModel<boolean>('showAdvanced');

const tempUnit = ref<'C' | 'F'>('C');

const displayTemp = computed(() =>
  tempUnit.value === 'C'
    ? `${props.temperatureCelsius}°C`
    : `${Math.round((props.temperatureCelsius * 9) / 5 + 32)}°F`
);

const optimalTempDisplay = computed(() => (tempUnit.value === 'C' ? '12°C' : '54°F'));

const displayAltitude = computed(() =>
  props.unit === 'km'
    ? `${props.altitudeMeters}m`
    : `${Math.round(props.altitudeMeters * 3.28084)}ft`
);

const optimalAltDisplay = computed(() => (props.unit === 'km' ? '1000m' : '3281ft'));

const heatPenaltyPercent = computed(() => Math.max(0, (props.temperatureCelsius - 12) * 0.4));

const altitudePenaltyPercent = computed(
  () => Math.max(0, (props.altitudeMeters - 1000) / 300) * 1.5
);
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-line-strong bg-paper">
    <button
      class="w-full cursor-pointer border-none bg-transparent p-0 text-left"
      @click="showAdvanced = !showAdvanced"
    >
      <div
        class="flex items-center justify-between border-line px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-60"
        :class="{ 'border-b': showAdvanced }"
      >
        <span>Adjustments</span>
        <Icon
          name="chevron-down"
          class="h-3.5 w-3.5 transition-transform duration-200"
          :class="{ 'rotate-180': showAdvanced }"
        />
      </div>
    </button>
    <div
      class="overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(.3,.7,.4,1)]"
      :class="showAdvanced ? 'max-h-[400px]' : 'max-h-0'"
    >
      <div class="px-5 py-4">
        <div class="mb-4">
          <div class="mb-2 flex items-center justify-between">
            <label
              class="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-ink-60"
            >
              <Icon name="thermometer" class="h-3 w-3 shrink-0" />
              Heat · race day
            </label>
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs tabular-nums text-ink">{{ displayTemp }}</span>
              <div class="flex gap-0.5 rounded-full border border-line-strong bg-paper-2 p-0.5">
                <button
                  :class="[
                    'cursor-pointer rounded-full border-0 px-1.5 py-0.5 font-mono text-[10px] font-semibold transition-[background,color] duration-150',
                    tempUnit === 'C'
                      ? 'bg-accent text-white'
                      : 'bg-transparent text-ink-60 hover:text-ink',
                  ]"
                  @click.stop="tempUnit = 'C'"
                >
                  °C
                </button>
                <button
                  :class="[
                    'cursor-pointer rounded-full border-0 px-1.5 py-0.5 font-mono text-[10px] font-semibold transition-[background,color] duration-150',
                    tempUnit === 'F'
                      ? 'bg-accent text-white'
                      : 'bg-transparent text-ink-60 hover:text-ink',
                  ]"
                  @click.stop="tempUnit = 'F'"
                >
                  °F
                </button>
              </div>
            </div>
          </div>
          <input
            class="block w-full cursor-pointer accent-accent"
            type="range"
            :min="0"
            :max="40"
            :step="1"
            :value="temperatureCelsius"
            @input="
              emit('update:temperatureCelsius', Number(($event.target as HTMLInputElement).value))
            "
          />
          <div class="mt-1.5 font-mono text-xs text-ink-60">
            <span v-if="heatPenalty > 0">
              +{{ heatPenalty.toFixed(1) }} sec/km · {{ heatPenaltyPercent.toFixed(1) }}% slower
            </span>
            <span v-else>Optimal below {{ optimalTempDisplay }}, no penalty</span>
          </div>
        </div>
        <div>
          <div class="mb-2 flex items-baseline justify-between">
            <label
              class="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-ink-60"
            >
              <Icon name="mountain" class="h-3 w-3 shrink-0" />
              Altitude
            </label>
            <span class="font-mono text-xs tabular-nums text-ink">{{ displayAltitude }}</span>
          </div>
          <input
            class="block w-full cursor-pointer accent-accent"
            type="range"
            :min="0"
            :max="4500"
            :step="50"
            :value="altitudeMeters"
            @input="
              emit('update:altitudeMeters', Number(($event.target as HTMLInputElement).value))
            "
          />
          <div class="mt-1.5 font-mono text-xs text-ink-60">
            <span v-if="altitudePenalty > 0">
              +{{ altitudePenalty.toFixed(1) }} sec/km · {{ altitudePenaltyPercent.toFixed(1) }}%
              slower
            </span>
            <span v-else>Optimal below {{ optimalAltDisplay }}, no penalty</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
