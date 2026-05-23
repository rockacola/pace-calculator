<script setup lang="ts">
defineProps<{
  active?: boolean;
}>();
</script>

<template>
  <button
    :class="[
      'cursor-pointer rounded-full border font-mono text-xs font-medium px-3 py-1.5 transition-[background,border-color,color] duration-150',
      active
        ? 'border-accent bg-accent text-white'
        : 'border-line-strong bg-paper-2 text-ink-80 hover:bg-paper hover:border-ink-60',
    ]"
  >
    <slot />
  </button>
</template>
