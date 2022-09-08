<template>
  <node-view-wrapper
    as="span"
    :class="imageViewClass"
  >
    <div
      :class="{
        'image-view__body--focused': selected,
        'image-view__body--resizing': resizing,
        'image-view__body-editable': editor.isEditable,
      }"
      class="image-view__body"
    >
      <img
        :src="src"
        :title="node?.attrs.title"
        :alt="node?.attrs.alt"
        :width="width"
        :height="height"
        class="image-view__body__image"
        @click="selectImage"
      >
      <teleport
        to="body"
      >
        <div
          v-if="!editor.isEditable"
          ref="imgShadowRef"
          class="editor-img-bg-shadow"
          @click="onImgZoomOut"
        />
      </teleport>

      <div
        v-if="editor.isEditable"
        v-show="selected || resizing"
        class="image-resizer"
      >
        <span
          v-for="direction in resizeDirections"
          :key="direction"
          :class="`image-resizer__handler--${direction}`"
          class="image-resizer__handler"
          @mousedown="onMouseDown($event, direction)"
        />
      </div>

      <!-- when image is break text or float
      bubble menu's position is miscalculated
      use el-popover instead bubble menu -->
      <el-popover
        v-if="editor.isEditable"
        :visible="selected"
        :show-arrow="false"
        placement="top"
        popper-class="el-tiptap-image-popper"
      >
        <image-bubble-menu
          :node="node"
          :editor="editor"
          :update-attrs="updateAttributes"
        />

        <template #reference>
          <div class="image-view__body__placeholder" />
        </template>
      </el-popover>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import {
  ref, computed, onMounted, onUnmounted,
} from 'vue';
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3';
import { ElPopover } from 'element-plus';
import { ResizeObserver } from '@juggle/resize-observer';
import { resolveImg, ImageDisplay } from '@/utils/image';
import { clamp } from '@/utils/shared';
import ImageBubbleMenu from '../menuBubble/ImageBubbleMenu.vue';

const enum ResizeDirection {
  TOP_LEFT = 'tl',
  TOP_RIGHT = 'tr',
  BOTTOM_LEFT = 'bl',
  BOTTOM_RIGHT = 'br',
}

const MIN_SIZE = 20;
const MAX_SIZE = 100000;

const props = defineProps(nodeViewProps)

const maxSize = {
  width: MAX_SIZE,
  height: MAX_SIZE,
}
let originalSize = {
  width: 0,
  height: 0,
}

let resizerState = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  dir: '',
}

let resizeOb: any = null

const resizeDirections = ref([
  ResizeDirection.TOP_LEFT,
  ResizeDirection.TOP_RIGHT,
  ResizeDirection.BOTTOM_LEFT,
  ResizeDirection.BOTTOM_RIGHT,
])
const resizing = ref(false)
const imgShadowRef = ref()
const src = computed(() => props.node.attrs.src)
const width = computed(() => props.node.attrs.width)
const height = computed(() => props.node.attrs.height)
const display = computed(() => props.node.attrs.display)
const imageViewClass = computed(() => ['image-view', `image-view--${display.value}`])

const selectImage = (event: MouseEvent) => {
  props.editor?.commands.setNodeSelection(props.getPos!());
  onImageClick(event)
}
const getNodeOffset = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const win = element.ownerDocument.defaultView
  return {
    top: rect.top + win!.pageYOffset,
    left: rect.left + win!.pageXOffset,
  }
}
const onImageClick = (event: MouseEvent) => {
  if (props.editor.view.editable) {
    return
  }
  const element = event.target as HTMLImageElement
  let zoomShadow = (imgShadowRef.value as any) as HTMLElement
  if (!zoomShadow) {
    zoomShadow = document.createElement('div') as HTMLElement
    document.body.append(zoomShadow)
    zoomShadow.id = 'zoomShadowId'
    zoomShadow.className = 'editor-img-bg-shadow'
    zoomShadow.onclick = () => {
      const img = zoomShadow?.childNodes[0] as HTMLElement
      if (img != null) {
        img!.style.transform = 'scale(1) translate(0px, 0px)'
        img!.style.cursor = 'zoom-in'
        img!.style.position = 'relative'
      }
      setTimeout(() => {
        (zoomShadow as HTMLElement).style.visibility = 'hidden'
      }, 200)
    }
  }
  const offset = getNodeOffset(element)

  zoomShadow!.style.visibility = 'visible'
  zoomShadow!.innerHTML = ''
  const img = document.createElement('img')
  img.src = element.src
  img.style.position = 'fixed'
  img.style.top = `${offset.top}px`
  img.style.left = `${offset.left}px`
  img.style.width = `${element.clientWidth}px`
  img.style.height = `${element.clientHeight}px`
  img.style.cursor = 'zoom-out'
  zoomShadow!.appendChild(img)
  console.log(zoomShadow);

  setTimeout(() => {
    const width = element.clientWidth
    const height = element.clientHeight
    const nWidth = element.naturalWidth
    const nHeight = element.naturalHeight
    const wWidth = window.innerWidth
    const wHeight = window.innerHeight
    const scaleX = Math.min(nWidth, wWidth * 0.9) / width
    const scaleY = Math.min(nHeight, wHeight * 0.9) / height
    const scale = Math.min(scaleX, scaleY)
    const translateX = (-offset.left + (wWidth - width) / 2) / scale
    const translateY = (-offset.top + (wHeight - height) / 2) / scale
    img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`
    img.style.transition = 'all .2s ease-in-out'
    img.style.cursor = 'zoom-out'
    img.style.position = 'relative'
  }, 0)
}

const onImgZoomOut = () => {
  const img = ((imgShadowRef.value as any) as HTMLElement).childNodes[0] as HTMLElement
  if (img !== null) {
    img!.style.transform = 'scale(1) translate(0px, 0px)'
    img!.style.cursor = 'zoom-in'
    img!.style.position = 'relative'
  }
  setTimeout(() => {
    ((imgShadowRef.value as any) as HTMLElement).style.visibility = 'hidden'
  }, 200)
}

/* invoked when window or editor resize */
const getMaxSize = () => {
  const { width } = getComputedStyle(props.editor!.view.dom);
  maxSize.width = parseInt(width, 10);
}

/* on resizer handler mousedown
    * record the position where the event is triggered and resize direction
    * calculate the initial width and height of the image
    */
const onMouseDown = (e: MouseEvent, dir: ResizeDirection) => {
  e.preventDefault();
  e.stopPropagation();

  resizerState.x = e.clientX;
  resizerState.y = e.clientY;

  const originalWidth = originalSize.width;
  const originalHeight = originalSize.height;
  const aspectRatio = originalWidth / originalHeight;

  let {
    width,
    height,
  } = props.node!.attrs;
  const maxWidth = maxSize.width;

  if (width && !height) {
    width = width > maxWidth ? maxWidth : width;
    height = Math.round(width / aspectRatio);
  } else if (height && !width) {
    width = Math.round(height * aspectRatio);
    width = width > maxWidth ? maxWidth : width;
  } else if (!width && !height) {
    width = originalWidth > maxWidth ? maxWidth : originalWidth;
    height = Math.round(width / aspectRatio);
  } else {
    width = width > maxWidth ? maxWidth : width;
  }

  resizerState.w = width;
  resizerState.h = height;
  resizerState.dir = dir;

  resizing.value = true;

  onEvents();
}

const onEvents = (): void => {
  document.addEventListener('mousemove', onMouseMove, true);
  document.addEventListener('mouseup', onMouseUp, true);
}

const onMouseMove = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();
  if (!resizing.value) return;

  const {
    x,
    y,
    w,
    h,
    dir,
  } = resizerState;

  const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);
  const dy = (e.clientY - y) * (/t/.test(dir) ? -1 : 1);

  props.updateAttributes?.({
    width: clamp(w + dx, MIN_SIZE, maxSize.width),
    height: Math.max(h + dy, MIN_SIZE),
  });
}

const onMouseUp = (e: MouseEvent): void => {
  e.preventDefault();
  e.stopPropagation();
  if (!resizing.value) return;

  resizing.value = false;

  resizerState = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    dir: '',
  };

  offEvents();
  selectImage(e);
}

const offEvents = (): void => {
  document.removeEventListener('mousemove', onMouseMove, true);
  document.removeEventListener('mouseup', onMouseUp, true);
}

resolveImg(src.value).then((result) => {
  console.log(result);
  if (!result.complete) {
    result.width = MIN_SIZE;
    result.height = MIN_SIZE;
  }

  originalSize = {
    width: result.width,
    height: result.height,
  };
});

onMounted(() => {
  resizeOb = new ResizeObserver(() => {
    getMaxSize();
  });
  resizeOb.observe(props.editor!.view.dom);
})
onUnmounted(() => {
  resizeOb.disconnect();
})

</script>

<style lang="scss">

.editor-img-bg-shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1500;
  background: rgba(0, 0, 0, 1);
  opacity: 1;
  cursor: zoom-out;
  visibility: hidden;
}
</style>
