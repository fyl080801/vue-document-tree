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
    class="dragzone"
    :class="{ over: draggingOver }"
    @dragenter="onDragover"
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
