import { Plugin } from 'vue';
import Editor from './components/BonsEditor.vue';

const EditorPlugin: Plugin = {
  install(app) {
    app.component('BonsEditor', Editor);
  },
};

export * from './extensions';

export { EditorPlugin, Editor };

export default EditorPlugin;
