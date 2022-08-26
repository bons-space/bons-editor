<template>
  <div class="link-bubble-menu">
    <slot name="prepend" />

    <open-link-command-button :url="linkAttrs.href" />
    <edit-link-command-button
      :editor="editor"
      :init-link-attrs="linkAttrs"
    />
    <unlink-command-button :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3';
import { computed, defineProps } from 'vue';
import OpenLinkCommandButton from '@/components/menuCommands/link/OpenLinkCommandButton.vue';
import EditLinkCommandButton from '@/components/menuCommands/link/EditLinkCommandButton.vue';
import UnlinkCommandButton from '@/components/menuCommands/link/UnlinkCommandButton.vue';

const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
})

const linkAttrs = computed(() => props.editor.getAttributes('link'))

</script>

<style lang="scss">
.link-bubble-menu {
  display: flex;
}
</style>
