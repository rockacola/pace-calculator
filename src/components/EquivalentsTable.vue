<script setup lang="ts">
import BasePanel from '@/components/BasePanel.vue';
import type { Equivalent } from '@/composables/usePaceCalculator';
import { formatTime, isGoalDistance, showPace } from '@/utils/paceUtils';

defineProps<{
  equivalents: Equivalent[];
  goalKm: number;
  unit: 'km' | 'mi';
  unitLabel: string;
}>();
</script>

<template>
  <BasePanel title="Race equivalents · table">
    <div class="grid gap-px bg-line">
      <div
        v-for="equivalent in equivalents"
        :key="equivalent.id"
        class="grid grid-cols-[1fr_1fr_1fr_24px] items-center gap-3 px-5 py-3"
        :class="isGoalDistance(equivalent.km, goalKm) ? 'bg-accent-soft' : 'bg-paper'"
      >
        <span
          class="text-sm font-medium"
          :class="isGoalDistance(equivalent.km, goalKm) ? 'text-accent-ink' : 'text-ink'"
        >
          {{ equivalent.abbreviation }}
          <span class="ml-2 font-mono text-xs font-normal text-ink-60">
            {{ equivalent.km.toFixed(1) }} km
          </span>
        </span>
        <span class="font-mono text-sm tabular-nums text-ink">{{
          formatTime(equivalent.seconds)
        }}</span>
        <span class="font-mono text-sm tabular-nums text-ink-80">
          {{ showPace(equivalent.pace, unit) }} {{ unitLabel }}
        </span>
        <span class="font-mono text-xs text-brand-ink">
          {{ isGoalDistance(equivalent.km, goalKm) ? '◆' : '' }}
        </span>
      </div>
    </div>
  </BasePanel>
</template>
