
<h1 align="center">Bons Editor</h1>

 A WYSIWYG rich-text editor using tiptap and Element Plus for Vue3

一个 Vue3 的基于 tiptap 的 「所见即所得」 富文本编辑器

### ✨ 特色
- 💅 许多开箱即用的 [extension](https://github.com/bons-space/bons-editor#extensions) (欢迎提交 issue 为新的 feature 留下建议 👏)
- 🔖 支持 markdown 语法
- 📘TypeScript 支持
- 🍀 高度自定义, 你可以自定义 extension 和它对应的菜单按钮视图


### 扩展 extensions

类型: `Array`

你可以只使用需要的 extension，对应的菜单按钮将会按照你声明的顺序被添加。

所有可用的 extensions:

- `Text`（必填）

#### Node扩展

- `Paragraph`（必填）
- `Document`（必填）
- `Heading`
- `Blockquote`
- `CodeBlock`（tiptap默认高亮使用highlight.js的主题，详细用法见 https://tiptap.dev/api/nodes/code-block-lowlight ）
- `PrismCodeBlock` （prism.js 扩展高亮主题）
- `OrderedList`
- `Image`
- `Table` (内置 `TableHeader`, `TableCell`, `TableRow` 扩展)
- `ListItem`
- `TaskList`（需搭配`ListItem`扩展一起用）
- `BulletList`（需搭配`ListItem`扩展一起用）
- `Iframe`
- `CustomBlock`（高亮块扩展）

#### Marks扩展

- `Code`
- `Bold`
- `TextStyle`
- `Underline`
- `Italic`
- `Strike`
- `Link`
- `Color`
- `Highlight`
- `FontFamily`
- `FontSize`

#### Extensions扩展

- `HardBreak`
- `Gapcursor`
- `HorizontalRule`
- `History`
- `TextAlign`
- `Indent`
- `LineHeight`
- `FormatClear`
- `Fullscreen`
- `SelectAll`
- `CodeView`
- `PasteHandler`（自定义扩展，重置粘贴内容自带`line-hight`）

