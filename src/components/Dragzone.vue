<script setup>
import { ref } from '@vue/reactivity'

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
    class="dragzone"
    :class="{ over: draggingOver }"
    @dragover="onDragover"
    @dragleave="onDragleave"
  >
    <slot />
  </div>
</template>

<style scope>
.dragzone {
  width: 100%;
  background: rgba(3, 101, 248, 0.144);
  height: 20px;
  margin-top: -10px;
  margin-bottom: -10px;
}

.over {
  background: rgba(3, 101, 248, 0.344);
}
</style>
