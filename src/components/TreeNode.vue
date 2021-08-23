<script setup>
import { useTree, useTreeNode } from './mixins'
import Dragzone from './Dragzone.vue'
import { reactive } from '@vue/reactivity'
import NodeBody from './NodeBody.vue'
import TreeNodeChildren from './TreeNodeChildren.vue'

const props = defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const context = useTree()

const { text, isLeaf, isOpen, onToggleOpen } = useTreeNode({
  node: reactive(props.node),
  context,
})
</script>

<template>
  <div class="node-layer">
    <NodeBody :depth="depth" :node="node" class="border">
      <div
        class="text"
        draggable="true"
        @dragstart="context.state.dragging = true"
        @dragend="context.state.dragging = false"
      >
        <span>{{ text }}</span>
        <span v-if="!isLeaf" @click="onToggleOpen">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
    </NodeBody>
    <NodeBody :depth="depth" class="bottom">
      <Dragzone />
    </NodeBody>

    <div v-if="isOpen" class="node-layer">
      <TreeNodeChildren :parent="node" :depth="depth + 1" />
    </div>
  </div>
</template>

<style scoped>
.node-layer {
  position: relative;
}

.text {
  position: relative;
  z-index: 0;
  height: 30px;
  line-height: 30px;
}

.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.border {
  border: 1px solid transparent;
}

.border:hover {
  border-color: blue;
}
</style>
