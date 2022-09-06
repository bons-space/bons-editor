import type { Editor, Extension } from '@tiptap/core';
import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/core'
import HeadingDropdown from '@/components/menuCommands/HeadingDropdown.vue';
import { genNonDuplicateID } from '@/utils/common';

export type Level = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingOptions {
  levels: Level[],
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    heading: {
      /**
       * Set a heading node
       */
      setHeading: (attributes: { level: Level, id?:string }) => ReturnType,
      /**
       * Toggle a heading node
       */
      toggleHeading: (attributes: { level: Level, id?:string}) => ReturnType,
    }
  }
}

export const Heading = Node.create<HeadingOptions>({
  name: 'heading',

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {},
      button({
        editor,
        extension,
      }: {
        editor: Editor;
        extension: Extension;
        t: (...args: any[]) => string;
      }) {
        return {
          component: HeadingDropdown,
          componentProps: {
            levels: (extension.options as HeadingOptions).levels,
            editor,
          },
        };
      },
    }
  },

  content: 'inline*',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
      id: {
        default: '',
        parseHTML: (element) => element.getAttribute('id'),
        renderHTML: (attributes) => ({
          id: attributes.id,
        }),
      },
    }
  },

  parseHTML() {
    return this.options.levels
      .map((level: Level) => ({
        tag: `h${level}`,
        attrs: { level },
      }))
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level = hasLevel
      ? node.attrs.level
      : this.options.levels[0]

    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false
        }
        attributes.id = genNonDuplicateID()
        return commands.setNode(this.name, attributes)
      },
      toggleHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false
        }
        attributes.id = genNonDuplicateID()
        return commands.toggleNode(this.name, 'paragraph', attributes)
      },
    }
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce((items, level) => ({
      ...items,
      ...{
        [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level }),
      },
    }), {})
  },

  addInputRules() {
    return this.options.levels.map((level) => textblockTypeInputRule({
      find: new RegExp(`^(#{1,${level}})\\s$`),
      type: this.type,
      getAttributes: {
        level,
        id: genNonDuplicateID(),
      },
    }))
  },
})

export default Heading;
