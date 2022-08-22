<template>
  <node-view-wrapper class="code-block">
    <el-select
      v-model="selectedLanguage"
      placeholder="Select"
      class="language-select"
      contenteditable="false"
      filterable
      size="small"
    >
      <el-option
        v-for="(language, index) in languages"
        :key="index"
        :value="language"
        :label="language"
      />
    </el-select>
    <pre class="hljs"><code :class="`language-${selectedLanguage}`"><node-view-content ref="nodeViewContentRef" /></code></pre>
  </node-view-wrapper>
</template>

<script>
import {NodeViewContent, nodeViewProps, NodeViewWrapper} from '@tiptap/vue-3'
import {ElSelect, ElOption} from 'element-plus'
import {defineComponent, nextTick, onMounted} from "vue";

export default defineComponent({
  components: {
    NodeViewWrapper,
    NodeViewContent,
    ElSelect,
    ElOption
  },
  props: nodeViewProps,
  setup() {

  },
  data() {
    return {
      languages: this.extension.options.lowlight.listLanguages(),
    }
  },
  computed: {
    selectedLanguage: {
      get() {
        return this.node.attrs.language
      },
      set(language) {
        this.updateAttributes({language})
      },
    },
  },
  created() {
    if (!this.selectedLanguage) {
      nextTick(() => {
        this.selectedLanguage = 'plaintext'
      })
    }
  }
})
</script>

<style lang="scss">
.code-block {
  position: relative;

  .language-select {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 80px;

    :deep(.el-input__suffix) {
      display: none;
    }
  }
}
</style>
