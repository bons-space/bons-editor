<template>
  <div class="image-bubble-menu">
    <image-display-command-button
      :node="node"
      :update-attrs="updateAttrs"
    />

    <edit-image-command-button
      :node="node"
      :update-attrs="updateAttrs"
    />

    <remove-image-command-button :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { nodeViewProps } from '@tiptap/vue-3';
import ImageDisplayCommandButton from '../menuCommands/image/ImageDisplayCommandButton.vue';
import EditImageCommandButton from '../menuCommands/image/EditImageCommandButton.vue';
import RemoveImageCommandButton from '../menuCommands/image/RemoveImageCommandButton.vue';

defineProps({
  editor: nodeViewProps.editor,
  node: nodeViewProps.node,
  updateAttrs: nodeViewProps.updateAttributes,
})
</script>
