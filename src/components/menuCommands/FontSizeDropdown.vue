<template>
  <el-dropdown
    placement="bottom"
    trigger="click"
    @command="toggleFontSize"
  >
    <command-button
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.FontSize.tooltip')"
      :readonly="isCodeViewMode"
      icon="font-size"
    />

    <template #dropdown>
      <el-dropdown-menu class="editor-dropdown-menu">
        <!-- default size -->
        <el-dropdown-item
          :command="defaultSize"
          :class="{
            'editor-dropdown-menu__item--active':
              activeFontSize === defaultSize,
          }"
          class="editor-dropdown-menu__item"
        >
          <span data-font-size="default">{{
            t('editor.extensions.FontSize.default')
          }}</span>
        </el-dropdown-item>

        <el-dropdown-item
          v-for="fontSize in fontSizes"
          :key="fontSize"
          :command="fontSize"
          :class="{
            'editor-dropdown-menu__item--active':
              fontSize === activeFontSize,
          }"
          class="editor-dropdown-menu__item"
        >
          <span :data-font-size="fontSize">{{ fontSize }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { Editor, getMarkAttributes } from '@tiptap/vue-3';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { DEFAULT_FONT_SIZE } from '@/utils/font-size';
import CommandButton from './CommandButton.vue';

export default defineComponent({
  name: 'FontSizeDropdown',

  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    CommandButton,
  },

  props: {
    editor: {
      type: Object as PropType<Editor>,
      required: true,
    },
  },

  setup() {
    const t = inject('t') as any;
    const enableTooltip = inject('enableTooltip', true);
    const isCodeViewMode = inject('isCodeViewMode', false);

    return {
      t, enableTooltip, isCodeViewMode, defaultSize: DEFAULT_FONT_SIZE,
    };
  },

  computed: {
    fontSizes(): string[] {
      const fontSizeOptions = this.editor.extensionManager.extensions.find(
        (e) => e.name === 'fontSize',
      )!.options;
      return fontSizeOptions.fontSizes;
    },

    activeFontSize() {
      return getMarkAttributes(this.editor.state, 'textStyle').fontSize || '';
    },
  },

  methods: {
    toggleFontSize(size: string) {
      if (size === this.activeFontSize) {
        this.editor.commands.unsetFontSize();
      } else {
        this.editor.commands.setFontSize(size);
      }
    },
  },
});
</script>
