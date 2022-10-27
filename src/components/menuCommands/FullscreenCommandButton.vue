<template>
  <div>
    <command-button
      :command="() => toggleFullscreen(!isFullscreen)"
      :enable-tooltip="enableTooltip"
      :tooltip="buttonTooltip"
      :icon="isFullscreen ? 'compress' : 'expand'"
      :is-active="isFullscreen"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import CommandButton from './CommandButton.vue';

const t = inject('t') as any;
const enableTooltip = inject('enableTooltip', true);
const isFullscreen = inject('isFullscreen', false) as any;
const toggleFullscreen = inject('toggleFullscreen') as any;

const buttonTooltip = computed(() => (isFullscreen.value ? t('editor.extensions.Fullscreen.tooltip.exit_fullscreen') : t('editor.extensions.Fullscreen.tooltip.fullscreen')))
</script>
