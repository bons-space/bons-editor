<template>
  <div class="container">
    <Editor
      :content="content"
      :extensions="extensions"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// TODO codemirror升级6版本
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'; // import base style
import 'codemirror/mode/xml/xml.js'; // language
import 'codemirror/addon/selection/active-line.js'; // require active-line.js
import 'codemirror/addon/edit/closetag.js';
// load all highlight.js languages
import { lowlight } from 'lowlight'
import {
  Editor,
  Document,
  Text,
  Paragraph,
  Blockquote,
  Code,
  HardBreak,
  Heading,
  CodeView,
  History,
  Bold,
  Underline,
  Italic,
  Strike,
  Color,
  Link,
  FontFamily,
  FontSize,
  Highlight,
  HorizontalRule,
  TextAlign,
  Indent,
  LineHeight,
  FormatClear,
  Fullscreen, SelectAll, CodeBlock, BulletList, OrderedList, Image, TaskList,
  Table,
  Iframe, Gapcursor, TextStyle, CustomBlock, PrismCodeBlock,
} from '../../src/index'

const content = ref('<pre class="language-json v-pre><code><span class="token punctuation">{</span>\n'
    + '    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"SELF_POSITION"</span><span class="token punctuation">,</span>\n'
    + '    <span class="token property">"operation"</span><span class="token operator">:</span> <span class="token string">"script"</span><span class="token punctuation">,</span>\n'
    + '    <span class="token property">"script_name"</span><span class="token operator">:</span> <span class="token string">"ctuTask.py"</span><span class="token punctuation">,</span>\n'
    + '    <span class="token property">"script_args"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n'
    + '        <span class="token property">"binId"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>\n'
    + '        <span class="token property">"opType"</span><span class="token operator">:</span> <span class="token string">"put"</span><span class="token punctuation">,</span>\n'
    + '        <span class="token property">"operation"</span><span class="token operator">:</span> <span class="token string">"external_opt"</span><span class="token punctuation">,</span>\n'
    + '        <span class="token property">"targetHeight"</span><span class="token operator">:</span> <span class="token number">1380</span><span class="token punctuation">,</span>\n'
    + '        <span class="token property">"targetPosition"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n'
    + '            <span class="token property">"theta"</span><span class="token operator">:</span> <span class="token number">1.5708</span><span class="token punctuation">,</span>\n'
    + '            <span class="token property">"x"</span><span class="token operator">:</span> <span class="token number">71.1</span><span class="token punctuation">,</span>\n'
    + '            <span class="token property">"y"</span><span class="token operator">:</span> <span class="token number">26.3</span>\n'
    + '        <span class="token punctuation">}</span>\n'
    + '    <span class="token punctuation">}</span>\n'
    + '<span class="token punctuation">}</span>\n'
    + '</code></pre>')

const extensions = [
  Document, Text, Paragraph, Heading, Blockquote, Bold, Underline, Italic, Strike, Link, History, TextStyle,
  Color, FontFamily, FontSize, Highlight, Code, HardBreak, HorizontalRule, TextAlign, Indent,
  LineHeight, FormatClear, Fullscreen, SelectAll, BulletList, OrderedList, Image,
  TaskList,
  Gapcursor,
  Table.configure({ resizable: true }),
  Iframe,
  // CodeBlock.configure({ languageClassPrefix: 'language-', defaultLanguage: 'plaintext', lowlight }),
  PrismCodeBlock.configure({ languageClassPrefix: 'language-', defaultLanguage: 'plaintext' }),
  CustomBlock,
  CodeView.configure({
    codemirror,
    codemirrorOptions: {
      styleActiveLine: true,
      autoCloseTags: true,
    },
  }),
]
</script>

<style scoped lang="scss">

.container {
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 5vh;
}
</style>
