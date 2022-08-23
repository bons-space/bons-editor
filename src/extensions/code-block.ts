import type { Editor } from '@tiptap/core';
import { VueNodeViewRenderer } from '@tiptap/vue-3'
// import TiptapCodeBlock from '@tiptap/extension-code-block';
import TiptapCodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import CommandButton from '@/components/menuCommands/CommandButton.vue';
import CodeBlockLanguageSelect from '@/components/menuCommands/CodeBlockLanguageSelect.vue'

// @ts-ignore
const CodeBlock = TiptapCodeBlockLowlight.extend({
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockLanguageSelect)
  },
  addOptions() {
    return {
      ...this.parent?.(),
      languageClassPrefix: 'language-',
      defaultLanguage: 'plaintext',
      button({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleCodeBlock();
            },
            isActive: editor.isActive('codeBlock'),
            icon: 'code',
            tooltip: t('editor.extensions.CodeBlock.tooltip'),
          },
        };
      },
    };
  },
});

export default CodeBlock;
