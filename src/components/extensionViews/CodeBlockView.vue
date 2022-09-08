<template>
  <node-view-wrapper
    class="code-block line-numbers-mode"
    :class="`language-${selectedLanguage}`"
  >
    <el-select
      v-if="editor.isEditable"
      v-model="selectedLanguage"
      placeholder="Select"
      class="lang-select"
      contenteditable="false"
      filterable
      size="small"
      @change="updateAttributes({language: selectedLanguage})"
    >
      <el-option
        v-for="(language, index) in languages"
        :key="index"
        :value="language"
        :label="language"
      />
    </el-select>
    <button
      v-if="!editor.isEditable"
      class="copy"
      @click="handleCopyClick"
    />
    <span
      v-if="!editor.isEditable"
      class="lang"
    >{{ selectedLanguage }}</span>
    <pre><node-view-content
          as="code"
          style="white-space: inherit"
    /></pre>
    <div
      class="line-numbers-wrapper"
      v-html="lineNumbersWrapper"
    />
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ElMessage, ElOption, ElSelect } from 'element-plus'
import {
  computed, defineProps, ref,
} from 'vue';
import { refractor } from 'refractor'
import VIcon from '@/components/Icon/Icon.vue'
import copyToClipboard from '@/utils/copyToClipboard'

const props = defineProps(nodeViewProps)
const { listLanguages } = refractor;
const languages = ref(listLanguages() || [])

const selectedLanguage = ref(props.node?.attrs.language || 'plaintext')

const lineNumbersWrapper = computed(() => {
  if (!props.node?.firstChild?.text) {
    return '<span class="line-number">1</span>'
  }
  const lines = props.node.firstChild.text.split('\n')
  console.log(lines);
  return [...Array(lines.length)]
    .map((line, index) => `<span class="line-number">${index + 1}</span><br>`)
    .join('')
})

const handleCopyClick = () => {
  if (!props.node?.firstChild?.text) {
    ElMessage.error('代码块内容为空')
    return
  }
  copyToClipboard(props.node.firstChild.text)
  ElMessage.success('复制成功')
}
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
    z-index: 9;
  }

  .lang-select {
    position: absolute;
    top: 0.5rem;
    right: 2rem;
    width: 80px;
    z-index: 9;

    :deep(.el-input__suffix) {
      display: none;
    }
    :deep(.el-input__suffix-inner){
      display: none;
    }
  }
}
</style>
