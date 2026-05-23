<script setup lang="ts">
import { computed } from 'vue';

import type { Equivalent } from '@/composables/usePaceCalculator';
import { formatTime, predict } from '@/utils/paceUtils';

const props = defineProps<{
  equivalents: Equivalent[];
  goalDist: number;
  goalSeconds: number;
}>();

const SVG_WIDTH = 600;
const SVG_HEIGHT = 220;
const SVG_PADDING = 40;
const baselineY = SVG_HEIGHT - SVG_PADDING + 10;
const gridYs = [0.25, 0.5, 0.75].map(
  (fraction) => baselineY - fraction * (SVG_HEIGHT - SVG_PADDING * 1.5)
);

const svgData = computed(() => {
  const xValues = props.equivalents.map((equivalent) => equivalent.km);
  const yValues = props.equivalents.map((equivalent) => equivalent.seconds);
  const xMin = Math.min(...xValues, props.goalDist) * 0.9;
  const xMax = Math.max(...xValues, props.goalDist) * 1.05;
  const yMax = Math.max(...yValues, props.goalSeconds) * 1.1;

  function toPixelX(value: number) {
    return (
      SVG_PADDING +
      ((Math.log(value) - Math.log(xMin)) / (Math.log(xMax) - Math.log(xMin))) *
        (SVG_WIDTH - SVG_PADDING * 1.5)
    );
  }
  function toPixelY(value: number) {
    return baselineY - (value / yMax) * (SVG_HEIGHT - SVG_PADDING * 1.5);
  }

  const samples: { km: number; seconds: number }[] = [];
  for (let km = xMin; km <= xMax; km *= 1.05) {
    samples.push({ km, seconds: predict(props.goalSeconds, props.goalDist, km) });
  }

  const path = samples
    .map(
      (sample, i) =>
        `${i === 0 ? 'M' : 'L'} ${toPixelX(sample.km).toFixed(1)} ${toPixelY(sample.seconds).toFixed(1)}`
    )
    .join(' ');

  const points = props.equivalents.map((equivalent) => ({
    abbreviation: equivalent.abbreviation,
    id: equivalent.id,
    isGoal: equivalent.km === props.goalDist,
    km: equivalent.km,
    pixelX: toPixelX(equivalent.km),
    pixelY: toPixelY(equivalent.seconds),
    seconds: equivalent.seconds,
  }));

  return { path, points };
});
</script>

<template>
  <svg
    class="block h-auto w-full rounded-[8px] border border-line bg-paper-2"
    viewBox="0 0 600 220"
  >
    <line
      v-for="(y, i) in gridYs"
      :key="i"
      :x1="SVG_PADDING"
      :x2="SVG_WIDTH - SVG_PADDING * 0.5"
      :y1="y"
      :y2="y"
      stroke="var(--line)"
      stroke-dasharray="2 3"
    />
    <line
      :x1="SVG_PADDING"
      :x2="SVG_WIDTH - SVG_PADDING * 0.5"
      :y1="baselineY"
      :y2="baselineY"
      stroke="var(--line-strong)"
    />
    <path :d="svgData.path" fill="none" stroke="var(--ink)" stroke-width="1.6" />
    <g v-for="pt in svgData.points" :key="pt.id">
      <circle
        :cx="pt.pixelX"
        :cy="pt.pixelY"
        :fill="pt.isGoal ? 'var(--accent)' : 'var(--paper)'"
        :r="pt.isGoal ? 6 : 4"
        stroke="var(--ink)"
        :stroke-width="pt.isGoal ? 1.5 : 1.2"
      />
      <text
        class="font-mono text-xs"
        fill="var(--ink-60)"
        text-anchor="middle"
        :x="pt.pixelX"
        :y="baselineY + 16"
      >
        {{ pt.abbreviation }}
      </text>
      <text
        class="font-mono text-[10px] font-medium"
        :fill="pt.isGoal ? 'var(--ink)' : 'var(--ink-80)'"
        text-anchor="middle"
        :x="pt.pixelX"
        :y="pt.pixelY - 10"
      >
        {{ formatTime(pt.seconds) }}
      </text>
    </g>
  </svg>
</template>
