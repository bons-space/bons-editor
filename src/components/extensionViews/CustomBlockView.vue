<template>
  <node-view-wrapper
    as="div"
    class="custom-block"
    :class="node?.attrs.type"
  >
    <!-- when image is break text or float bubble menu's position is miscalculated use el-popover instead bubble menu -->
    <el-popover
      placement="top"
      :show-arrow="false"
      trigger="hover"
      popper-class="editor-custom-block-popper"
    >
      <CustomBlockBubbleMenu
        :node="node"
        :editor="editor"
        :update-attrs="updateAttributes"
      />
      <template #reference>
        <NodeViewContent />
      </template>
    </el-popover>
  </node-view-wrapper>
</template>

<script setup>
import { defineProps } from 'vue';
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3';
import { ElPopover } from 'element-plus';
import CustomBlockBubbleMenu from '../menuBubble/CustomBlockBubbleMenu.vue'

const props = defineProps(nodeViewProps)

console.log(props.node)
</script>
