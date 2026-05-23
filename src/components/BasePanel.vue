<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-line-strong bg-paper">
    <div
      class="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-60"
    >
      <span>{{ title }}</span>
    </div>
    <div class="px-5 py-4">
      <slot />
    </div>
  </div>
</template>
