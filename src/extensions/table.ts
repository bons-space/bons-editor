import type { Editor } from '@tiptap/core';
import { Table as TiptapTable } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TablePopover from '@/components/menuCommands/tablePopover/Index.vue';

const Table = TiptapTable.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }: { editor: Editor; t: (...args: any[]) => string }) {
        return {
          component: TablePopover,
          componentProps: {
            editor,
          },
        };
      },
    };
  },

  addExtensions() {
    return [TableRow, TableHeader, TableCell];
  },
});

export default Table;
