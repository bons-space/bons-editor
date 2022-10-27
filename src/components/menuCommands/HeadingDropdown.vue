<template>
  <el-dropdown
    placement="bottom"
    trigger="click"
    popper-class="editor-dropdown-popper"
    @command="toggleHeading"
  >
    <command-button
      :enable-tooltip="enableTooltip"
      :is-active="editor.isActive('heading')"
      :tooltip="t('editor.extensions.Heading.tooltip')"
      :disabled="isCodeViewMode"
      icon="heading"
    />
    <template #dropdown>
      <el-dropdown-menu class="editor-dropdown-menu">
        <el-dropdown-item
          v-for="level in [0, ...levels]"
          :key="level"
          :command="level"
        >
          <div
            :class="[
              {
                'editor-dropdown-menu__item--active':
                  level > 0
                    ? editor.isActive('heading', {
                      level,
                    })
                    : editor.isActive('paragraph'),
              },
              'editor-dropdown-menu__item',
            ]"
          >
            <template v-if="level > 0">
              <component
                :is="'h' + level"
                data-item-type="heading"
              >
                {{ t('editor.extensions.Heading.buttons.heading') }} {{ level }}
              </component>
            </template>
            <span v-else>{{
              t('editor.extensions.Heading.buttons.paragraph')
            }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { Editor } from '@tiptap/core';
import type { Level } from '@/extensions/heading';
import CommandButton from './CommandButton.vue';

export default defineComponent({
  name: 'HeadingDropdown',

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

    levels: {
      type: Array as PropType<Array<number>>,
      required: true,
      default: () => [],
    },
  },

  setup() {
    const t = inject('t') as any;
    const enableTooltip = inject('enableTooltip', true);
    const isCodeViewMode = inject('isCodeViewMode', false);

    return { t, enableTooltip, isCodeViewMode };
  },

  methods: {
    toggleHeading(level: Level) {
      if (level > 0) {
        this.editor.commands.toggleHeading({ level });
      } else {
        this.editor.commands.setParagraph();
      }
    },
  },
});
</script>
