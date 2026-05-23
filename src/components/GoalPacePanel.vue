<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';

import BasePanel from '@/components/BasePanel.vue';
import PaceRibbon from '@/components/PaceRibbon.vue';
import { formatPace, showPace } from '@/utils/paceUtils';

const props = defineProps<{
  adjusted: number;
  altitudePenalty: number;
  distanceAbbreviation: string;
  goalSeconds: number;
  heatPenalty: number;
  secondsPerKilometer: number;
  secondsPerMile: number;
  showAdvanced: boolean;
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
</script>

<template>
  <BasePanel title="Goal pace">
    <div
      :class="['mb-4 flex items-baseline gap-3 rounded-lg py-1', { 'pulse-active': pulseActive }]"
    >
      <span
        class="font-mono text-6xl font-medium tabular-nums leading-none tracking-tight text-ink"
      >
        {{ showPace(secondsPerKilometer, unit) }}
      </span>
      <span class="font-mono text-sm text-ink-60">{{ unitLabel }}</span>
    </div>
    <div class="mb-3.5 flex justify-between font-mono text-xs text-ink-80">
      <span>
        {{
          unit === 'km'
            ? `${formatPace(secondsPerMile)} / mi`
            : `${formatPace(secondsPerKilometer)} / km`
        }}
      </span>
      <span v-if="showAdvanced && (heatPenalty > 0 || altitudePenalty > 0)" class="text-accent-ink">
        Adjusted: {{ showPace(adjusted, unit) }} {{ unitLabel }}
      </span>
    </div>
    <PaceRibbon :seconds-per-kilometer="secondsPerKilometer" />
  </BasePanel>
</template>
