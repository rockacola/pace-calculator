<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  secondsPerKilometer: number;
}>();

const bars = computed(() => {
  const normalizedPace = Math.max(0, Math.min(1, (420 - props.secondsPerKilometer) / (420 - 180)));
  return Array.from({ length: 28 }, (_, i) => {
    const position = i / 27;
    const wave = Math.sin(position * Math.PI * 3 + normalizedPace * Math.PI * 2);
    const barHeight = (0.4 + 0.6 * Math.abs(wave)) * (0.5 + normalizedPace * 0.5);
    return {
      active: position < normalizedPace,
      height: `${Math.max(15, barHeight * 100)}%`,
    };
  });
});
</script>

<template>
  <div class="flex h-9 items-end gap-1">
    <span
      v-for="(bar, i) in bars"
      :key="i"
      class="flex-1 rounded-sm transition-[height,opacity,background] duration-300"
      :class="bar.active ? 'bg-accent opacity-100' : 'bg-ink opacity-35'"
      :style="{ height: bar.height }"
    />
  </div>
</template>
