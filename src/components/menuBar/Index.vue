<template>
  <div class="bons-editor__menu-bar">
    <component
      :is="spec.component"
      v-for="(spec, i) in generateCommandButtonComponentSpecs()"
      :key="'command-button' + i"
      :enable-tooltip="enableTooltip"
      v-bind="spec.componentProps"
      :readonly="isCodeViewMode"
      v-on="spec.componentEvents || {}"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, inject } from 'vue';
import { Editor } from '@tiptap/core';

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
})

const t = inject('t') as any;
const enableTooltip = inject('enableTooltip', true);
const isCodeViewMode = inject('isCodeViewMode', false);

const generateCommandButtonComponentSpecs = () => {
  const extensionManager = props.editor.extensionManager;
  return extensionManager.extensions.reduce((acc:any, extension:any) => {
    const { button } = extension.options;
    if (!button || typeof button !== 'function') return acc;

    const menuBtnComponentSpec = button({
      editor: props.editor,
      t,
      extension,
    });

    if (Array.isArray(menuBtnComponentSpec)) {
      return [...acc, ...menuBtnComponentSpec];
    }

    return [...acc, menuBtnComponentSpec];
  }, []);
}
</script>
