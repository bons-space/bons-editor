import CodeBlock, { CodeBlockOptions } from '@tiptap/extension-code-block'
import {
  EditorState, Plugin, PluginKey, Transaction,
} from 'prosemirror-state'
import { Editor, findChildren } from '@tiptap/core'
import { Node as ProsemirrorNode } from 'prosemirror-model'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { refractor } from 'refractor'
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import CodeBlockView from '@/components/extensionViews/CodeBlockView.vue';
import CommandButton from '@/components/menuCommands/CommandButton.vue';

export interface CodeBlockPrismOptions extends CodeBlockOptions {
    defaultLanguage: string | null | undefined,
}

function parseNodes(nodes: any[], className: string[] = []): { text: string, classes: string[] }[] {
  return nodes
    .map((node) => {
      const classes = [
        ...className,
        ...node.properties
          ? node.properties.className
          : [],
      ]

      if (node.children) {
        return parseNodes(node.children, classes)
      }

      return {
        text: node.value,
        classes,
      }
    })
    .flat()
}

function getHighlightNodes(result: any) {
  return result.children || []
}

function getDecorations({ doc, name, defaultLanguage } : {doc: ProsemirrorNode, name: string, defaultLanguage: string | null | undefined}) {
  const decorations: Decoration[] = []
  const { highlight, listLanguages } = refractor;
  const allLanguages = listLanguages();

  findChildren(doc, (node) => node.type.name === name)
    .forEach((block) => {
      let from = block.pos + 1
      const language = block.node.attrs.language || defaultLanguage
      if (!language || !allLanguages.includes(language)) {
        console.warn('Unsupported language detected, this language has not been supported by prism: ', language);
        return;
      }
      const nodes = getHighlightNodes(highlight(block.node.textContent, language))
      parseNodes(nodes).forEach((node) => {
        const to = from + node.text.length

        if (node.classes.length) {
          const decoration = Decoration.inline(from, to, {
            class: node.classes.join(' '),
          })

          decorations.push(decoration)
        }

        from = to
      })
    })
  return DecorationSet.create(doc, decorations)
}

const PrismCodeBlock = CodeBlock.extend<CodeBlockPrismOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      languageClassPrefix: 'language-',
      defaultLanguage: 'plaintext',
      button({ editor, t }: { editor: Editor; t: (...args: any[]) => string }) {
        return {
          component: CommandButton,
          componentProps: {
            command: () => {
              editor.commands.toggleCodeBlock();
            },
            isActive: editor.isActive('codeBlock'),
            icon: 'code',
            tooltip: t('editor.extensions.CodeBlock.tooltip'),
          },
        };
      },
    }
  },
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockView)
  },
  addProseMirrorPlugins() {
    const { name, options } = this;
    return [
      ...this.parent?.() || [],
      new Plugin({
        key: new PluginKey('prismPlugin'),

        state: {
          init: (_: any, { doc }: any) => getDecorations({
            doc,
            name,
            defaultLanguage: options.defaultLanguage,
          }),
          apply(transaction: Transaction, decorationSet: DecorationSet, oldState:EditorState, newState) {
            const oldNodeName = oldState.selection.$head.parent.type.name
            const newNodeName = newState.selection.$head.parent.type.name
            const oldNodes = findChildren(oldState.doc, (node) => node.type.name === name)
            const newNodes = findChildren(newState.doc, (node) => node.type.name === name)

            if (
              transaction.docChanged
                // Apply decorations if:
                && (
              // selection includes named node,
                  [oldNodeName, newNodeName].includes(name)
                    // OR transaction adds/removes named node,
                    || newNodes.length !== oldNodes.length
                    // OR transaction has changes that completely encapsulte a node
                    // (for example, a transaction that affects the entire document).
                    // Such transactions can happen during collab syncing via y-prosemirror, for example.
                    || transaction.steps.some((step) =>
                      // @ts-ignore
                      step.from !== undefined
                          // @ts-ignore
                          && step.to !== undefined
                          && oldNodes.some((node) =>
                            // @ts-ignore
                            node.pos >= step.from
                                // @ts-ignore
                                && node.pos + node.node.nodeSize <= step.to))
                )
            ) {
              return getDecorations({
                doc: transaction.doc,
                name,
                defaultLanguage: options.defaultLanguage,
              })
            }

            return decorationSet.map(transaction.mapping, transaction.doc)
          },
        },

        props: {
          decorations(state: any) {
            // @ts-ignore
            return this.getState(state)
          },
        },
      }),
    ]
  },
})

export default PrismCodeBlock
