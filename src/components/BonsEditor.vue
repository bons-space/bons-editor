<template>
  <div
    v-if="editor"
    :style="editorStyle"
    :class="[
      {
        'bons-editor': true,
        'bons-editor--fullscreen': isFullscreen,
        'bons-editor--with-footer': showFooter,
      },
      editorClass,
    ]"
  >
    <menu-bubble
      v-if="!readonly"
      :editor="editor"
      :class="editorBubbleMenuClass"
    />

    <menu-bar
      v-if="!readonly"
      :editor="editor"
      :class="editorMenubarClass"
    />

    <div
      v-if="isCodeViewMode"
      :class="{
        'bons-editor__codemirror': true,
        'border-bottom-radius': isCodeViewMode,
      }"
    >
      <textarea ref="cmTextAreaRef" />
    </div>

    <editor-content
      v-show="!isCodeViewMode"
      :editor="editor"
      :class="[
        {
          'bons-editor__content': true,
        },
        editorContentClass,
      ]"
    />

    <div
      v-if="showFooter"
      :class="[
        {
          'bons-editor__footer': true,
        },
        editorFooterClass,
      ]"
    >
      <span class="bons-editor__characters">
        {{ t('editor.characters') }}: {{ characters }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  provide,
  ref,
  toRaw,
  unref,
  watchEffect,
  PropType,
  shallowRef,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { Editor as TiptapEditor, Extensions } from '@tiptap/core';
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3';
import TiptapPlaceholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Trans } from '@/i18n';
import { useCodeView, useCharacterCount, useEditorStyle } from '@/hooks';

import MenuBar from './menuBar/Index.vue';
import MenuBubble from './menuBubble/Index.vue';
import zh from '@/i18n/locales/zh';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  extensions: {
    type: Array as PropType<Extensions>,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  lang: {
    type: String,
    default: 'en',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  output: {
    type: String,
    default: 'html',
    validator(output: string): boolean {
      return ['html', 'json'].includes(output);
    },
  },
  spellcheck: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  tooltip: {
    type: Boolean,
    default: true,
  },
  enableCharCount: {
    type: Boolean,
    default: true,
  },
  charCountMax: {
    type: Number,
    default: undefined,
  },
  // ----- I18n -----
  locale: {
    type: Object,
    default: zh,
  },
  // ----- Editor Class -----
  editorClass: {
    type: [String, Array, Object],
    default: undefined,
  },
  editorContentClass: {
    type: [String, Array, Object],
    default: undefined,
  },
  editorMenubarClass: {
    type: [String, Array, Object],
    default: undefined,
  },
  editorBubbleMenuClass: {
    type: [String, Array, Object],
    default: undefined,
  },
  editorFooterClass: {
    type: [String, Array, Object],
    default: undefined,
  },
})

const emit = defineEmits([
  'update:content',
  'onUpdate',
  'onCreate',
  'onTransaction',
  'onFocus',
  'onBlur',
  'onDestroy',
])

const extensions = props.extensions
  .concat([
    TiptapPlaceholder.configure({
      emptyEditorClass: 'bons-editor--empty',
      emptyNodeClass: 'bons-editor__placeholder',
      showOnlyCurrent: false,
      placeholder: () => props.placeholder,
    }),
    props.enableCharCount
      ? CharacterCount.configure({
        limit: props.charCountMax,
      })
      : null as any,
  ])
  .filter(Boolean);

const onUpdate = ({ editor }: { editor: TiptapEditor }) => {
  let output;
  if (props.output === 'html') {
    output = editor.getHTML();
  } else {
    output = editor.getJSON();
  }

  emit('update:content', output);

  emit('onUpdate', output, editor);
};

const editor = shallowRef<Editor>()

onMounted(() => {
  editor.value = new Editor({
    content: props.content,
    extensions,
    editable: !props.readonly,
    onCreate: (options) => {
      emit('onCreate', options);
    },
    onTransaction: (options) => {
      emit('onTransaction', options);
    },
    onFocus: (options) => {
      emit('onFocus', options);
    },
    onBlur: (options) => {
      emit('onBlur', options);
    },
    onDestroy: (options) => {
      emit('onDestroy', options);
    },
    onUpdate,
  });
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

watchEffect(() => {
  unref(editor)?.setOptions({
    editorProps: {
      attributes: {
        spellcheck: String(props.spellcheck),
      },
    },
  });
});

// i18n
const i18nHandler = Trans.buildI18nHandler(toRaw(props.locale));
const t = (...args: any[]): string => i18nHandler.apply(Trans, args);

const isFullscreen = ref(false);
const toggleFullscreen = (val: boolean) => {
  isFullscreen.value = val;
};
provide('isFullscreen', isFullscreen);
provide('toggleFullscreen', toggleFullscreen);

provide('enableTooltip', props.tooltip);

const { isCodeViewMode, cmTextAreaRef } = useCodeView(editor);

provide('isCodeViewMode', isCodeViewMode);

const { characters } = useCharacterCount(editor);

const showFooter = computed(() => props.enableCharCount && !unref(isCodeViewMode));

const editorStyle = useEditorStyle({
  width: props.width,
  height: props.height,
});

provide('t', t);

</script>

<style lang="scss">
@import '../styles/editor.scss';
@import '../styles/command-button.scss';
@import 'prism-themes/themes/prism-one-dark.css';

</style>
