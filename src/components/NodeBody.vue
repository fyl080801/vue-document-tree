<script setup>
defineProps({ depth: { type: Number, default: 0 }, line: Boolean })

const onDragover = (event) => {
  event.preventDefault()
}
</script>

<template>
  <div class="node-body">
    <div v-for="i in depth" :key="i" class="depth-line" @dragover="onDragover"></div>
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
</style>
