import { Extension } from '@tiptap/core';
import type { Editor } from '@tiptap/core';
import { extendCodemirror } from '@/utils/code-view';
import Logger from '@/utils/logger';
import CodeViewCommandButton from '@/components/menuCommands/CodeViewCommandButton.vue';

export const DEFAULT_CODEMIRROR_OPTIONS = {
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2,
  tabMode: 'indent',
  mode: 'text/html',
};

export interface CodeViewOptions {
  codemirror: any;
  codemirrorOptions: any;
}

const CodeView = Extension.create<CodeViewOptions>({
  name: 'codeView',
  // addOptions(){
  //   return {
  //     codemirror: null,
  //     codemirrorOptions: {
  //       ...DEFAULT_CODEMIRROR_OPTIONS,
  //     },
  //   }
  // },

  onBeforeCreate() {
    if (!this.options.codemirror) {
      Logger.warn('"CodeView" extension requires the CodeMirror library.');
      return;
    }

    extendCodemirror(this.options.codemirror);
    this.options.codemirrorOptions = {
      ...DEFAULT_CODEMIRROR_OPTIONS,
      ...this.options.codemirrorOptions,
    };
  },

  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }: { editor: Editor }) {
        return {
          component: CodeViewCommandButton,
        };
      },
      codemirror: null,
      codemirrorOptions: {
        ...DEFAULT_CODEMIRROR_OPTIONS,
      },
    };
  },
});

export default CodeView;
