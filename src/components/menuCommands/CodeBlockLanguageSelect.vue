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
    <VIcon
      name="copy"
      class="copyBtn"
      @click="handleCopyClick"
    />
    <pre class="hljs"><code :class="`language-${selectedLanguage}`"><node-view-content /></code></pre>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ElSelect, ElOption, ElMessage } from 'element-plus'
import { defineComponent, nextTick, onMounted } from 'vue';
import VIcon from '@/components/Icon/Icon.vue'
import copyToClipboard from '@/utils/copyToClipboard'

export default defineComponent({
  components: {
    NodeViewWrapper,
    NodeViewContent,
    ElSelect,
    ElOption,
    VIcon,
  },
  props: nodeViewProps,
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
        this.updateAttributes({ language })
      },
    },
  },
  created() {
    if (!this.selectedLanguage) {
      nextTick(() => {
        this.selectedLanguage = 'plaintext'
      })
    }
  },
  methods: {
    handleCopyClick() {
      if (!this.node.firstChild.text) {
        ElMessage.error('代码块内容为空')
        return
      }
      copyToClipboard(this.node.firstChild.text)
      ElMessage.success('复制成功')
    },
  },
})
</script>

<style scoped lang="scss">
.code-block {
  position: relative;

  .copyBtn{
    color: #d9ecff;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
  }

  .language-select {
    position: absolute;
    top: 0.5rem;
    right: 2rem;
    width: 80px;

    :deep(.el-input__suffix) {
      display: none;
    }
    :deep(.el-input__suffix-inner){
      display: none;
    }
  }
}
</style>
