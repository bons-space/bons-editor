<template>
  <el-popover
    ref="popoverRef"
    placement="top"
    trigger="click"
    popper-class="editor-popper"
  >
    <div class="editor-popper__menu">
      <div
        v-for="display in displayCollection"
        :key="display"
        :class="{
          'editor-popper__menu__item--active': display === currDisplay,
        }"
        class="editor-popper__menu__item"
        @mousedown="hidePopover"
        @click="updateAttrs({ display })"
      >
        <span>{{
          t(`editor.extensions.Image.buttons.display.${display}`)
        }}</span>
      </div>
    </div>

    <template #reference>
      <span>
        <command-button
          :enable-tooltip="enableTooltip"
          :tooltip="t('editor.extensions.Image.buttons.display.tooltip')"
          icon="image-align"
        />
      </span>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { nodeViewProps } from '@tiptap/vue-3';
import { ElPopover } from 'element-plus';
import { ImageDisplay } from '@/utils/image';
import CommandButton from '../CommandButton.vue';

export default defineComponent({
  name: 'ImageDisplayCommandButton',

  components: {
    ElPopover,
    CommandButton,
  },
  props: {
    node: nodeViewProps.node,
    updateAttrs: nodeViewProps.updateAttributes,
  },

  setup() {
    const t = inject('t') as any;
    const enableTooltip = inject('enableTooltip', true);

    return { t, enableTooltip };
  },

  data() {
    return {
      displayCollection: [
        ImageDisplay.INLINE,
        ImageDisplay.BREAK_TEXT,
        ImageDisplay.FLOAT_LEFT,
        ImageDisplay.FLOAT_RIGHT,
      ],
    };
  },

  computed: {
    currDisplay() {
      return this.node?.attrs.display;
    },
  },

  methods: {
    hidePopover() {
      if (this.$refs.popoverRef) {
        (this.$refs.popoverRef as any).hide();
      }
    },
  },
});
</script>
