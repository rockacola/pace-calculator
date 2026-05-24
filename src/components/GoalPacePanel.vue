<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';

import BasePanel from '@/components/BasePanel.vue';
import { ZONES } from '@/constants/zones';
import { formatTime, showPace } from '@/utils/paceUtils';

const props = defineProps<{
  adjusted: number;
  altitudePenalty: number;
  distanceAbbreviation: string;
  goalSeconds: number;
  heatPenalty: number;
  secondsPerKilometer: number;
  showAdvanced: boolean;
  thresholdPace: number;
  unit: 'km' | 'mi';
  unitLabel: string;
}>();

const pulseActive = ref(false);

watch([() => props.secondsPerKilometer, () => props.unit], () => {
  pulseActive.value = false;
  nextTick(() => {
    pulseActive.value = true;
  });
});

// Pace spectrum strip
// A horizontal colored band (zone colors fast→slow), white tick at goal pace position.
const zonesSlowToFast = computed(() => [...ZONES].reverse());
const stripPosition = computed(() => {
  if (!props.thresholdPace) {
    return 50;
  }
  const ratio = props.secondsPerKilometer / props.thresholdPace;
  const pos = ((ratio - 0.86) / (1.55 - 0.86)) * 100;
  return Math.min(Math.max(pos, 2), 98);
});
</script>

<template>
  <BasePanel title="Goal pace">
    <div :class="['mb-4 flex items-end justify-between py-1', { 'pulse-active': pulseActive }]">
      <div class="flex items-baseline gap-3">
        <span
          class="font-mono text-6xl font-medium tabular-nums leading-none tracking-tight text-ink"
        >
          {{ showPace(secondsPerKilometer, unit) }}
        </span>
        <span class="font-mono text-sm text-ink-60">{{ unitLabel }}</span>
      </div>
      <div class="text-right">
        <div
          class="font-mono text-2xl font-medium tabular-nums leading-none tracking-tight text-ink"
        >
          {{ formatTime(goalSeconds) }}
        </div>
        <div class="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-60">
          total time
        </div>
      </div>
    </div>
    <div
      v-if="showAdvanced && (heatPenalty > 0 || altitudePenalty > 0)"
      class="mb-6 font-mono text-xs text-accent-ink"
    >
      Adjusted: {{ showPace(adjusted, unit) }} {{ unitLabel }}
    </div>
    <div v-else class="mb-6" />

    <!-- Pace spectrum strip -->
    <div class="relative h-3 overflow-hidden rounded-full">
      <div class="flex h-full">
        <div
          v-for="zone in zonesSlowToFast"
          :key="zone.id"
          class="flex-1"
          :style="{ background: zone.color }"
        />
      </div>
      <div
        class="absolute inset-y-0 w-0.5 rounded-full bg-white shadow"
        :style="{ left: `${stripPosition}%`, transform: 'translateX(-50%)' }"
      />
    </div>
    <div class="mt-1.5 flex justify-between font-mono text-[10px] text-ink-60">
      <span>Fast</span>
      <span>Easy</span>
    </div>
  </BasePanel>
</template>
