<template>
  <component
    :is="icon"
    width="16"
    height="16"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, computed, defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

// @ts-ignore
const icon = computed(() => defineAsyncComponent(() => import(`../../icons/${props.name}.svg`)))

</script>
