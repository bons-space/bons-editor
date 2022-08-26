import { Editor } from '@tiptap/core';
import TiptapColor from '@tiptap/extension-color';
import { COLOR_SET } from '@/utils/color';
import ColorPopover from '@/components/menuCommands/ColorPopover.vue';

const Color = TiptapColor.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      colors: COLOR_SET,
      button({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) {
        return {
          component: ColorPopover,
          componentProps: {
            editor,
          },
        };
      },
    };
  },
});

export default Color;
