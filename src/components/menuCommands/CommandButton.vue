<template>
  <el-tooltip
    :content="tooltip"
    :show-after="350"
    :disabled="!enableTooltip || readonly"
    effect="dark"
    placement="top"
  >
    <div
      :class="commandButtonClass"
      @mousedown.prevent
      @click="onClick"
    >
      <v-icon :name="icon" />
    </div>
  </el-tooltip>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { ElTooltip } from 'element-plus';
import { noop } from '@/utils/shared';
import VIcon from '../Icon/Icon.vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },

  tooltip: {
    type: String,
    default: '',
    required: true,
  },

  enableTooltip: {
    type: Boolean,
    required: true,
  },

  command: {
    type: Function,
    default: noop,
  },

  readonly: {
    type: Boolean,
    default: false,
  },
})

const commandButtonClass = computed(() => ({
  'bons-editor__command-button': true,
  'bons-editor__command-button--active': props.isActive,
  'bons-editor__command-button--readonly': props.readonly,
}))

const onClick = () => {
  if (!props.readonly) props.command();
}
</script>
