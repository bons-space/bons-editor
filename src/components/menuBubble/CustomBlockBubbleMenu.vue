<template>
  <div class="custom-block-bubble-menu">
    <div
      class="custom-checkbox tips"
      :class="[node.attrs.type === 'tips' && 'checked']"
      @click="handleCheckboxClick('tips')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox info"
      :class="[node.attrs.type === 'info' && 'checked']"
      @click="handleCheckboxClick('info')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox warning"
      :class="[node.attrs.type === 'warning' && 'checked']"
      @click="handleCheckboxClick('warning')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox success"
      :class="[node.attrs.type === 'success' && 'checked']"
      @click="handleCheckboxClick('success')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox danger"
      :class="[node.attrs.type === 'danger' && 'checked']"
      @click="handleCheckboxClick('danger')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox color1"
      :class="[node.attrs.type === 'color1' && 'checked']"
      @click="handleCheckboxClick('color1')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox color2"
      :class="[node.attrs.type === 'color2' && 'checked']"
      @click="handleCheckboxClick('color2')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox color3"
      :class="[node.attrs.type === 'color3' && 'checked']"
      @click="handleCheckboxClick('color3')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox color4"
      :class="[node.attrs.type === 'color4' && 'checked']"
      @click="handleCheckboxClick('color4')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
    <div
      class="custom-checkbox color5"
      :class="[node.attrs.type === 'color5' && 'checked']"
      @click="handleCheckboxClick('color5')"
    >
      <input
        class="custom-checkbox__original"
        type="checkbox"
        aria-hidden="false"
      >
      <span class="custom-checkbox__inner" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { nodeViewProps } from '@tiptap/vue-3';

const props = defineProps({
  editor: nodeViewProps.editor,
  node: nodeViewProps.node,
  updateAttrs: nodeViewProps.updateAttributes,
})

const handleCheckboxClick = (type: string) => {
  props.updateAttrs({ type })
}
</script>
