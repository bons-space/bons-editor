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
  Iframe, Gapcursor, TextStyle, CustomBlock,
} from '../../src/index'

const content = ref('<div class="custom-block info"><pre><code class="language-javascript">console.log(12312321)</code></pre></div><p></p><p>大萨达</p><p></p><p>das的as</p><div class="custom-block info"><p>dsadsadsad</p></div><p></p>')

const extensions = [
  Document, Text, Paragraph, Heading, Blockquote, Bold, Underline, Italic, Strike, Link, History, TextStyle,
  Color, FontFamily, FontSize, Highlight, Code, HardBreak, HorizontalRule, TextAlign, Indent,
  LineHeight, FormatClear, Fullscreen, SelectAll, BulletList, OrderedList, Image,
  TaskList,
  Gapcursor,
  Table.configure({ resizable: true }),
  Iframe,
  CodeBlock.configure({ languageClassPrefix: 'language-', defaultLanguage: 'plaintext', lowlight }),
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
