<template>
  <node-view-wrapper
    as="div"
    class="iframe"
  >
    <iframe
      class="iframe__embed"
      :src="node?.attrs.src"
    />
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';

defineProps(nodeViewProps)
</script>
