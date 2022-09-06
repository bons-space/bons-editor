import {
  Editor, Node, mergeAttributes,
} from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import CommandButton from '@/components/menuCommands/CommandButton.vue';
import CustomBlockView from '@/components/extensionViews/CustomBlockView.vue';

export interface CustomBlockOptions {
    HTMLAttributes: Record<string, any>,
    types: string[],
}

export type Type = 'tips' | 'info' | 'warning' | 'success' | 'color1' | 'color2' | 'color3' | 'color4' | 'color5'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customBlock: {
            setCustomBlock: (attributes: { type: Type }) => ReturnType,
            toggleCustomBlock: (attributes: { type: Type }) => ReturnType,
            unsetCustomBlock: () => ReturnType,
        }
    }
}

export const inputRegex = /(?:^|\s)((?:[^:]+))(?::)$/
export const pasteRegex = /(?:^|\s)((?:[^:]+))(?::)/g

const CustomBlock = Node.create<CustomBlockOptions>({
  name: 'custom-block',
  priority: 100,
  addOptions() {
    return {
      HTMLAttributes: {},
      types: ['tips', 'info', 'warning', 'success', 'color1', 'color2', 'color3', 'color4', 'color5'],
      button({ editor }: { editor: Editor; t: (...args: any[]) => string }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleCustomBlock({ type: 'tips' });
            },
            isActive: editor.isActive('customBlock'),
            icon: 'custom-block',
            tooltip: '高亮块',
          },
        };
      },
    }
  },
  group: 'block',
  content: 'block+',
  defining: true,
  isolating: true,
  addAttributes() {
    return {
      type: {
        default: 'tips',
        parseHTML: (element) => element.getAttribute('custom-block-type'),
        renderHTML: (attributes) => ({
          'custom-block-type': attributes.type,
          class: `custom-block ${attributes.type}`,
        }),
      },
    }
  },
  addCommands() {
    return {
      setCustomBlock: (attributes) => ({ commands }) => {
        if (!this.options.types.includes(attributes.type)) {
          return false
        }
        return commands.wrapIn(this.name, attributes)
      },
      toggleCustomBlock: (attributes) => ({ commands }) => {
        if (!this.options.types.includes(attributes.type)) {
          return false
        }
        return commands.toggleWrap(this.name, attributes)
      },
      unsetCustomBlock: () => ({ commands }) => commands.lift(this.name),
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(CustomBlockView);
  },
  parseHTML() {
    return [
      { tag: 'custom-block' },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['custom-block', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
  // addInputRules() {
  //   return [
  //     nodeInputRule({
  //       find: inputRegex,
  //       type: this.type,
  //     }),
  //   ]
  // },
  //
  // addPasteRules() {
  //   return [
  //     nodePasteRule({
  //       find: pasteRegex,
  //       type: this.type,
  //     }),
  //   ]
  // },
})

export default CustomBlock;
