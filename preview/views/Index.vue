<template>
  <div class="container">
    <Editor
      :content="content"
      :extensions="extensions"
    />
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {
  Editor,
  Document,
  Text,
  Paragraph,
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
  Iframe, Gapcursor,
} from '../../src/index'

// TODO codemirror升级6版本
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'; // import base style
import 'codemirror/mode/xml/xml.js'; // language
import 'codemirror/addon/selection/active-line.js'; // require active-line.js
import 'codemirror/addon/edit/closetag.js';

const content = ref(`<p># dd dsa dddd
</p>
<pre>
<code></code>
</pre>
<p>
</p>
<iframe src="https://github1s.com/Leecason/element-tiptap/blob/master/README.md" frameborder="0" allowfullscreen="true"></iframe>
<p>`)

const extensions = [
  Document, Text, Paragraph, Heading, Bold, Underline, Italic, Strike, Link, History,
  Color, FontFamily, FontSize, Highlight, Code, HardBreak, HorizontalRule, TextAlign, Indent,
  LineHeight, FormatClear, Fullscreen, SelectAll, CodeBlock, BulletList, OrderedList, Image,
  TaskList,
  Gapcursor,
  Table.configure({ resizable: true }),
  Iframe,
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
