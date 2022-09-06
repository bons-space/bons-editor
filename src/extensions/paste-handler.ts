import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Node, Slice } from 'prosemirror-model';

const LINE_HEIGHT_DEAL_LIST = [
  'paragraph',
  'heading',
  'list_item',
  'todo_item',
];

const linkPasteRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi

const PasteHandler = Extension.create({
  name: 'pasteHandler',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('PasteEventHandler'),
        props: {
          transformPasted(slice:Slice) {
            slice.content.nodesBetween(0, slice.content.size, (node: Node, start: number, parent: Node | null, index: number) => {
              const nodeType = node.type;
              if (LINE_HEIGHT_DEAL_LIST.includes(nodeType.name)) {
                const nodeJson = node.toJSON()
                if (nodeJson.attrs && nodeJson.attrs.lineHeight) {
                  nodeJson.attrs.lineHeight = null
                }
                slice.content.replaceChild(index, Node.fromJSON(nodeType.schema, nodeJson))
              }
              if (nodeType.name === 'image') {
                const nodeJson = node.toJSON()
                if (nodeJson.attrs && nodeJson.attrs.src) {
                  nodeJson.attrs.width = null
                }
                slice.content.replaceChild(index, Node.fromJSON(nodeType.schema, nodeJson))
              }
            })
            return slice
          },
        },
      }),
      new Plugin({
        key: new PluginKey('markConditionalPasteRule'),
        props: {
          handlePaste(view, event) {
            if (!view.state.selection.empty) {
              const pastedData = event.clipboardData?.getData('text') as string
              const match = pastedData.match(linkPasteRegex)
              if (!match) return false

              const tr = view.state.tr.addMark(view.state.selection.from, view.state.selection.to, view.state.schema.marks.link.create({ href: match[0] }))
              view.dispatch(tr)
              return true
            }
            return false
          },
        },
      }),
    ]
  },
})

export default PasteHandler;
