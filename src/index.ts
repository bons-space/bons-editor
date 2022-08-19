import { Plugin } from 'vue';
import Editor from '@/components/Editor.vue';

const EditorPlugin: Plugin = {
    install(app) {
        app.component('BonsTiptap', Editor);
    },
};

export * from '@/extensions';

export { EditorPlugin, Editor };

export default EditorPlugin;
