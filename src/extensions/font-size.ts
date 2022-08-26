import { Editor, Extension } from '@tiptap/core';
import {
  DEFAULT_FONT_SIZES,
  convertToPX,
  DEFAULT_FONT_SIZE,
} from '@/utils/font-size';
import FontSizeDropdown from '@/components/menuCommands/FontSizeDropdown.vue';

export type FontSizeOptions = {
  types: string[];
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (fontSize: string) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
      fontSizes: DEFAULT_FONT_SIZES,
      button({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) {
        return {
          component: FontSizeDropdown,
          componentProps: {
            editor,
          },
        };
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => convertToPX(element.style.fontSize) || '',
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) => ({ chain }) => chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () => ({ chain }) => chain()
          .setMark('textStyle', { fontSize: DEFAULT_FONT_SIZE })
          .removeEmptyTextStyle()
          .run(),
    };
  },

});

export default FontSize;
