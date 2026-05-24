<script setup lang="ts">
import BasePanel from '@/components/BasePanel.vue';
import { ZONES } from '@/constants/zones';
import { showPace } from '@/utils/paceUtils';

defineProps<{
  thresholdPace: number;
  unit: 'km' | 'mi';
}>();
</script>

<template>
  <BasePanel title="Training paces">
    <!-- Zone color bar -->
    <div class="mb-4 flex h-8 overflow-hidden rounded-md border border-line">
      <div
        v-for="(zone, i) in ZONES"
        :key="zone.id"
        class="flex-1"
        :class="{ 'border-l border-white/40': i > 0 }"
        :style="{ background: zone.color }"
        :title="zone.label"
      />
    </div>
    <!-- Zone rows -->
    <div class="grid gap-px bg-line">
      <div
        v-for="zone in ZONES"
        :key="zone.id"
        class="grid grid-cols-[12px_1fr_1.4fr_1fr] items-center gap-3 bg-paper px-4 py-3"
      >
        <span class="inline-block h-2 w-2 rounded-sm" :style="{ background: zone.color }" />
        <span class="text-sm font-medium text-ink">{{ zone.label }}</span>
        <span class="text-xs leading-snug text-ink-60">{{ zone.description }}</span>
        <span class="text-right font-mono text-xs tabular-nums text-ink whitespace-nowrap">
          {{ showPace(thresholdPace * zone.range[1], unit) }}–{{
            showPace(thresholdPace * zone.range[0], unit)
          }}
          <span class="text-ink-60">/ {{ unit }}</span>
        </span>
      </div>
    </div>
  </BasePanel>
</template>
