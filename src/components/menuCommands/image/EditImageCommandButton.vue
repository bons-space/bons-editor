<template>
  <div>
    <command-button
      :command="openEditImageDialog"
      :enable-tooltip="enableTooltip"
      :tooltip="t('editor.extensions.Image.buttons.image_options.tooltip')"
      icon="ellipsis-h"
    />

    <el-dialog
      v-model="editImageDialogVisible"
      :title="t('editor.extensions.Image.control.edit_image.title')"
      :append-to-body="true"
      width="400px"
      custom-class="el-tiptap-edit-image-dialog"
    >
      <el-form
        :model="imageAttrs"
        label-position="top"
        size="small"
      >
        <el-form-item
          :label="t('editor.extensions.Image.control.edit_image.form.src')"
        >
          <el-input
            v-model="imageAttrs.src"
            autocomplete="off"
            aria-readonly="true"
          />
        </el-form-item>

        <el-form-item
          :label="t('editor.extensions.Image.control.edit_image.form.alt')"
        >
          <el-input
            v-model="imageAttrs.alt"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-col :span="11">
            <el-form-item
              :label="
                t('editor.extensions.Image.control.edit_image.form.width')
              "
            >
              <el-input
                v-model="imageAttrs.width"
                type="number"
              />
            </el-form-item>
          </el-col>
          <el-col
            :span="11"
            :push="2"
          >
            <el-form-item
              :label="
                t('editor.extensions.Image.control.edit_image.form.height')
              "
            >
              <el-input
                v-model="imageAttrs.height"
                type="number"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button
          size="small"
          round
          @click="closeEditImageDialog"
        >
          {{ t('editor.extensions.Image.control.edit_image.cancel') }}
        </el-button>

        <el-button
          type="primary"
          size="small"
          round
          @click="updateImageAttrs"
        >
          {{ t('editor.extensions.Image.control.edit_image.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import { nodeViewProps } from '@tiptap/vue-3';
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElCol,
  ElButton,
} from 'element-plus';
import CommandButton from '../CommandButton.vue';

const props = defineProps({
  node: nodeViewProps.node,
  updateAttrs: nodeViewProps.updateAttributes,
})

const t = inject('t');
const enableTooltip = inject('enableTooltip', true);

const editImageDialogVisible = ref(false)

const imageAttrs = reactive({
  src: props.node?.attrs.src || '',
  alt: props.node?.attrs.alt || '',
  width: props.node?.attrs.width,
  height: props.node?.attrs.height,
})

const updateImageAttrs = () => {
  let { width, height } = imageAttrs;

  // input converts it to string
  width = parseInt(width as string, 10);
  height = parseInt(height as string, 10);

  props.updateAttrs?.({
    alt: imageAttrs.alt,
    width: width >= 0 ? width : null,
    height: height >= 0 ? height : null,
  });

  closeEditImageDialog();
}

const openEditImageDialog = () => {
  editImageDialogVisible.value = true;
}

const closeEditImageDialog = () => {
  editImageDialogVisible.value = false;
}
</script>
