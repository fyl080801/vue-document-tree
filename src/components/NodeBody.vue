<script setup>
import { ref } from '@vue/reactivity'

defineProps({ depth: { type: Number, default: 0 }, line: Boolean })

const draggingOver = ref(false)

const onDragover = () => {
  draggingOver.value = true
}

const onDragleave = () => {
  draggingOver.value = false
}
</script>

<template>
  <div class="node-body">
    <div
      v-for="i in depth"
      :key="i"
      class="depth-line"
      :class="{ in: draggingOver && i === depth }"
      @dragover="onDragover"
      @dragleave="onDragleave"
    ></div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.node-body {
  display: flex;
  flex-direction: row;
}

.content {
  position: relative;
  flex: 1;
}

.depth-line {
  width: 30px;
}

.in {
  background-color: red;
}
</style>
