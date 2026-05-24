<script setup lang="ts">
import { computed } from 'vue';

import BaseChip from '@/components/BaseChip.vue';
import Icon from '@/components/BaseIcon.vue';
import BasePanel from '@/components/BasePanel.vue';
import TimeInput from '@/components/TimeInput.vue';
import { KM_DISTANCES, MI_DISTANCES } from '@/constants/distances';
import { formatTime } from '@/utils/paceUtils';

const props = defineProps<{
  customKilometers: number;
  distanceId: string;
  goalKilometers: number;
  goalSeconds: number;
  unit: 'km' | 'mi';
}>();

const distances = computed(() => (props.unit === 'km' ? KM_DISTANCES : MI_DISTANCES));

const emit = defineEmits<{
  'update:customKilometers': [value: number];
  'update:distanceId': [value: string];
  'update:goalSeconds': [value: number];
}>();

function onCustomKilometersInput(event: Event) {
  emit(
    'update:customKilometers',
    Math.max(0.5, Number((event.target as HTMLInputElement).value) || 0.5)
  );
}
</script>

<template>
  <BasePanel title="Inputs">
    <label
      class="mb-2.5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-60"
    >
      <Icon name="ruler" class="h-3 w-3 shrink-0" />
      Race distance
    </label>
    <div class="flex flex-wrap gap-1.5" :class="distanceId === 'custom' ? 'mb-3' : 'mb-0'">
      <BaseChip
        v-for="distance in distances"
        :key="distance.id"
        :active="distanceId === distance.id"
        @click="emit('update:distanceId', distance.id)"
      >
        {{ distance.label }}
      </BaseChip>
    </div>
    <div v-if="distanceId === 'custom'" class="mt-3 flex items-center gap-2">
      <input
        class="w-[100px] rounded-lg border border-line-strong bg-paper px-2.5 py-2 text-center font-mono text-sm text-ink outline-none focus:border-accent"
        type="number"
        :max="200"
        :min="0.5"
        :step="0.5"
        :value="customKilometers"
        @input="onCustomKilometersInput"
      />
      <span class="font-mono text-xs text-ink-60">km</span>
    </div>

    <div class="h-6" />
    <label
      class="mb-2.5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-60"
    >
      <Icon name="clock" class="h-3 w-3 shrink-0" />
      Goal time
    </label>
    <TimeInput
      :model-value="goalSeconds"
      @update:model-value="emit('update:goalSeconds', $event)"
    />
    <input
      class="mt-3 w-full accent-[var(--accent)]"
      type="range"
      :min="60"
      :max="36000"
      :step="60"
      :value="Math.min(Math.max(goalSeconds, 60), 36000)"
      @input="emit('update:goalSeconds', Number(($event.target as HTMLInputElement).value))"
    />

    <div
      class="mt-5 flex justify-between rounded-lg border border-line bg-paper-2 px-3.5 py-3 font-mono text-xs text-ink-80"
    >
      <span
        >{{ goalKilometers.toFixed(2) }} km · {{ (goalKilometers / 1.609344).toFixed(2) }} mi</span
      >
      <span>{{ formatTime(goalSeconds) }} total</span>
    </div>
  </BasePanel>
</template>
