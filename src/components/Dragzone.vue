<script setup>
const props = defineProps({ depth: { type: Number, default: 0 } })

const onDragover = () => {}

const onDragleave = () => {}
</script>

<template>
  <div class="dragzone" @dragover="onDragover" @dragleave="onDragleave">
    <slot />
  </div>
</template>

<style>
/* .dragzone-target {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
} */

.dragzone {
  width: 100%;
  height: 20px;
  background: blue;
  opacity: 0.2;
  margin-top: -10px;
  margin-bottom: -10px;
}
</style>
