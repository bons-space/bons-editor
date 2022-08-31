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
  Iframe, Gapcursor, TextStyle,
} from '../../src/index'

const content = ref(` <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
      \``)

const extensions = [
  Document, Text, Paragraph, Heading, Blockquote, Bold, Underline, Italic, Strike, Link, History, TextStyle,
  Color, FontFamily, FontSize, Highlight, Code, HardBreak, HorizontalRule, TextAlign, Indent,
  LineHeight, FormatClear, Fullscreen, SelectAll, BulletList, OrderedList, Image,
  TaskList,
  Gapcursor,
  Table.configure({ resizable: true }),
  Iframe,
  CodeBlock.configure({ languageClassPrefix: 'language-', defaultLanguage: 'plaintext', lowlight }),
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
