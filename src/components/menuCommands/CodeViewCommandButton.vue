<template>
  <div>
    <command-button
      :command="() => toggleIsCodeViewMode(!isCodeViewMode)"
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.CodeView.tooltip')"
      icon="file-code"
      :is-active="isCodeViewMode"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import CommandButton from './CommandButton.vue';

export default defineComponent({
  name: 'CodeViewCommandButton',

  components: {
    CommandButton,
  },

  setup() {
    const t = inject('t') as any;
    const enableTooltip = inject('enableTooltip', true);
    const isCodeViewMode = inject('isCodeViewMode', false);
    const toggleIsCodeViewMode = inject('toggleIsCodeViewMode') as any;

    return {
      t, enableTooltip, isCodeViewMode, toggleIsCodeViewMode,
    };
  },
});
</script>
