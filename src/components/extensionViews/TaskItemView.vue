<template>
  <node-view-wrapper class="task-item-wrapper">
    <li
      :data-type="node?.type.name"
      :data-done="done.toString()"
      data-drag-handle
    >
      <span contenteditable="false">
        <el-checkbox v-model="done" />
      </span>

      <node-view-content class="todo-content" />
    </li>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from '@tiptap/vue-3';
import { ElCheckbox } from 'element-plus';

const props = defineProps(nodeViewProps)
const done = computed({
  get(): boolean {
    return props.node?.attrs.done;
  },
  set(done: boolean) {
    props.updateAttributes?.({
      done,
    });
  },
})

</script>
