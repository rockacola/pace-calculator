<script setup lang="ts">
defineProps<{
  altitudeMeters: number;
  altitudePenalty: number;
  heatPenalty: number;
  temperatureCelsius: number;
}>();

const emit = defineEmits<{
  'update:altitudeMeters': [value: number];
  'update:temperatureCelsius': [value: number];
}>();

const showAdvanced = defineModel<boolean>('showAdvanced');
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
        <span
          class="inline-block text-xs transition-transform duration-200"
          :class="{ 'rotate-45': showAdvanced }"
          >+</span
        >
      </div>
    </button>
    <div
      class="overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(.3,.7,.4,1)]"
      :class="showAdvanced ? 'max-h-[400px]' : 'max-h-0'"
    >
      <div class="px-5 py-4">
        <div class="mb-4">
          <div class="mb-2 flex items-baseline justify-between">
            <label class="block font-mono text-xs uppercase tracking-wider text-ink-60">
              Heat · race day
            </label>
            <span class="font-mono text-xs tabular-nums text-ink">{{ temperatureCelsius }}°C</span>
          </div>
          <input
            class="block w-full cursor-pointer accent-accent"
            type="range"
            :min="0"
            :max="35"
            :step="1"
            :value="temperatureCelsius"
            @input="
              emit('update:temperatureCelsius', Number(($event.target as HTMLInputElement).value))
            "
          />
          <div class="mt-1.5 font-mono text-xs text-ink-60">
            {{
              heatPenalty > 0
                ? `+${heatPenalty.toFixed(0)} sec/km (above 12°C reference)`
                : 'No heat penalty'
            }}
          </div>
        </div>
        <div>
          <div class="mb-2 flex items-baseline justify-between">
            <label class="block font-mono text-xs uppercase tracking-wider text-ink-60">
              Altitude
            </label>
            <span class="font-mono text-xs tabular-nums text-ink">{{ altitudeMeters }}m</span>
          </div>
          <input
            class="block w-full cursor-pointer accent-accent"
            type="range"
            :min="0"
            :max="3500"
            :step="50"
            :value="altitudeMeters"
            @input="
              emit('update:altitudeMeters', Number(($event.target as HTMLInputElement).value))
            "
          />
          <div class="mt-1.5 font-mono text-xs text-ink-60">
            {{
              altitudePenalty > 0
                ? `+${altitudePenalty.toFixed(0)} sec/km (above 500m reference)`
                : 'No altitude penalty'
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
