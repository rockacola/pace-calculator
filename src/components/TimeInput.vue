<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const hours = computed(() => Math.floor(props.modelValue / 3600));
const minutes = computed(() => Math.floor((props.modelValue % 3600) / 60));
const remainingSeconds = computed(() => props.modelValue % 60);

function updateHours(event: Event) {
  const value = Math.max(0, Math.min(23, Number((event.target as HTMLInputElement).value) || 0));
  emit('update:modelValue', value * 3600 + minutes.value * 60 + remainingSeconds.value);
}

function updateMinutes(event: Event) {
  const value = Math.max(0, Math.min(59, Number((event.target as HTMLInputElement).value) || 0));
  emit('update:modelValue', hours.value * 3600 + value * 60 + remainingSeconds.value);
}

function updateSeconds(event: Event) {
  const value = Math.max(0, Math.min(59, Number((event.target as HTMLInputElement).value) || 0));
  emit('update:modelValue', hours.value * 3600 + minutes.value * 60 + value);
}
</script>

<template>
  <div class="flex items-center gap-1.5">
    <input
      class="w-[60px] rounded-lg border border-line-strong bg-paper px-2 py-2.5 text-center font-mono [font-feature-settings:'tnum'] text-lg font-medium text-ink outline-none focus:border-accent"
      type="number"
      :max="23"
      :min="0"
      :value="hours"
      @input="updateHours"
    />
    <span class="font-mono text-ink-60">:</span>
    <input
      class="w-[60px] rounded-lg border border-line-strong bg-paper px-2 py-2.5 text-center font-mono [font-feature-settings:'tnum'] text-lg font-medium text-ink outline-none focus:border-accent"
      type="number"
      :max="59"
      :min="0"
      :value="minutes"
      @input="updateMinutes"
    />
    <span class="font-mono text-ink-60">:</span>
    <input
      class="w-[60px] rounded-lg border border-line-strong bg-paper px-2 py-2.5 text-center font-mono [font-feature-settings:'tnum'] text-lg font-medium text-ink outline-none focus:border-accent"
      type="number"
      :max="59"
      :min="0"
      :value="remainingSeconds"
      @input="updateSeconds"
    />
  </div>
</template>
