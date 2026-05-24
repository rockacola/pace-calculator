<script setup lang="ts">
import AdjustmentsPanel from '@/components/AdjustmentsPanel.vue';
import Icon from '@/components/BaseIcon.vue';
import BasePanel from '@/components/BasePanel.vue';
import EquivalentsTable from '@/components/EquivalentsTable.vue';
import GoalPacePanel from '@/components/GoalPacePanel.vue';
import InputsPanel from '@/components/InputsPanel.vue';
import PaceCurve from '@/components/PaceCurve.vue';
import TrainingZonesPanel from '@/components/TrainingZonesPanel.vue';
import { usePaceCalculator } from '@/composables/usePaceCalculator';

const appVersion = __APP_VERSION__;

const {
  adjusted,
  adjustedGoalSeconds,
  altitudeMeters,
  altitudePenalty,
  customKilometers,
  distanceAbbreviation,
  distanceId,
  equivalents,
  goalKilometers,
  goalSeconds,
  heatPenalty,
  showAdvanced,
  temperatureCelsius,
  thresholdPace,
  unit,
  unitLabel,
} = usePaceCalculator();
</script>

<template>
  <div class="mx-auto max-w-[1180px] px-6 pb-24 pt-14">
    <!-- Top bar -->
    <div class="mb-9 flex flex-wrap items-center justify-end gap-4">
      <div class="flex gap-0.5 rounded-full border border-line-strong bg-paper p-1">
        <button
          :class="[
            'cursor-pointer rounded-2xl border-0 font-mono text-xs font-semibold tracking-wider px-3 py-1 transition-[background,color] duration-150',
            unit === 'km' ? 'bg-accent text-white' : 'bg-transparent text-ink-60 hover:text-ink',
          ]"
          @click="unit = 'km'"
        >
          KM
        </button>
        <button
          :class="[
            'cursor-pointer rounded-2xl border-0 font-mono text-xs font-semibold tracking-wider px-3 py-1 transition-[background,color] duration-150',
            unit === 'mi' ? 'bg-accent text-white' : 'bg-transparent text-ink-60 hover:text-ink',
          ]"
          @click="unit = 'mi'"
        >
          MI
        </button>
      </div>
    </div>

    <!-- Header -->
    <header class="mb-10">
      <h1
        class="m-0 text-4xl font-medium leading-none tracking-tight text-ink md:text-5xl lg:text-6xl"
      >
        Translate a goal into a
        <em class="font-serif italic">plan</em>.
      </h1>
      <p class="mt-3.5 max-w-[580px] text-base leading-relaxed text-ink-80">
        Enter a target race distance and finish time. We'll surface your goal pace, equivalent times
        across distances, and the seven training paces you should actually run in the lead-up.
      </p>
    </header>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 gap-5 min-[860px]:grid-cols-2">
      <!-- Left: inputs -->
      <div class="flex flex-col gap-5">
        <InputsPanel
          v-model:distance-id="distanceId"
          v-model:custom-kilometers="customKilometers"
          v-model:goal-seconds="goalSeconds"
          :goal-kilometers="goalKilometers"
          :unit="unit"
        />
        <AdjustmentsPanel
          v-model:show-advanced="showAdvanced"
          v-model:temperature-celsius="temperatureCelsius"
          v-model:altitude-meters="altitudeMeters"
          :altitude-penalty="altitudePenalty"
          :heat-penalty="heatPenalty"
          :unit="unit"
        />
        <div class="overflow-hidden rounded-xl border border-line-strong bg-paper">
          <div
            class="border-b border-line px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-60"
          >
            How it works
          </div>
          <div class="divide-y divide-line">
            <div class="px-4 py-3.5">
              <p class="mb-1 flex items-center gap-1.5 font-mono text-xs font-semibold text-ink">
                <Icon name="braces" class="h-3 w-3 shrink-0 text-ink-60" />
                The formula
              </p>
              <p class="text-xs leading-relaxed text-ink-60">
                Predictions use the Riegel (1977) formula:
                <span class="font-mono text-ink-80">T₂ = T₁ × (D₂/D₁)<sup>1.06</sup></span
                >. The exponent 1.06 captures the non-linear slowdown as distance grows. Pace
                degrades, it does not scale linearly.
              </p>
            </div>
            <div class="px-4 py-3.5">
              <p class="mb-1 flex items-center gap-1.5 font-mono text-xs font-semibold text-ink">
                <Icon name="circle-check" class="h-3 w-3 shrink-0 text-ink-60" />
                Accuracy
              </p>
              <p class="text-xs leading-relaxed text-ink-60">
                The formula assumes a recent, all-out race effort as input, not a training run or
                time trial. It tends to be optimistic at the marathon for first-timers; add a 3–5%
                buffer if you haven't run the distance before.
              </p>
            </div>
            <div class="px-4 py-3.5">
              <p class="mb-1 flex items-center gap-1.5 font-mono text-xs font-semibold text-ink">
                <Icon name="circle-alert" class="h-3 w-3 shrink-0 text-ink-60" />
                Limitations
              </p>
              <p class="text-xs leading-relaxed text-ink-60">
                Heat, wind, and elevation are not modelled. Beyond the marathon, reliability drops
                further due to fuelling and pacing complexity. Training zones are estimated from
                your predicted 1-hour race pace (threshold), not a lab test.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: results -->
      <div class="flex flex-col gap-5">
        <GoalPacePanel
          :distance-abbreviation="distanceAbbreviation"
          :goal-seconds="adjustedGoalSeconds"
          :seconds-per-kilometer="adjusted"
          :threshold-pace="thresholdPace"
          :unit="unit"
          :unit-label="unitLabel"
        />
        <BasePanel title="Equivalent performances">
          <PaceCurve
            :equivalents="equivalents"
            :goal-dist="goalKilometers"
            :goal-seconds="adjustedGoalSeconds"
          />
          <EquivalentsTable
            class="-mx-5 -mb-4 mt-4 border-t border-line"
            :equivalents="equivalents"
            :goal-km="goalKilometers"
            :unit="unit"
            :unit-label="unitLabel"
          />
        </BasePanel>
        <TrainingZonesPanel :threshold-pace="thresholdPace" :unit="unit" />
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-ink-60"
    >
      <span>Pace Calculator · v{{ appVersion }}</span>
    </footer>
  </div>
</template>
