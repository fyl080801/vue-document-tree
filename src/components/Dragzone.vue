<script setup>
import { ref } from '@vue/reactivity'
import { useTree } from './mixins'

const { state } = useTree()

const draggingOver = ref(false)

const onDragover = () => {
  draggingOver.value = true
}

const onDragleave = () => {
  draggingOver.value = false
}
</script>

<template>
  <div
    v-if="state.dragging"
    class="w-full h-4 -my-2 bg-blue-900 bg-opacity-10"
    :class="{ over: draggingOver }"
    @dragenter="onDragover"
    @dragleave="onDragleave"
  >
    <slot />
  </div>
</template>

<style scope>
.over {
  background: rgba(3, 101, 248, 0.344) !important;
}
</style>
