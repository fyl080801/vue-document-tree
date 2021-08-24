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
  <div class="relative">
    <NodeBody
      :depth="depth"
      :node="node"
      class="border border-solid border-transparent hover:border-blue-500"
    >
      <div
        class="relative leading-tight py-1"
        draggable="true"
        @dragstart="context.state.dragging = true"
        @dragend="context.state.dragging = false"
      >
        <span>{{ text }}</span>
        <span v-if="!isLeaf" @click="onToggleOpen">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
    </NodeBody>
    <NodeBody :depth="depth" class="absolute bottom-0 w-full z-1">
      <Dragzone />
    </NodeBody>

    <div v-if="isOpen" class="relative">
      <TreeNodeChildren :parent="node" :depth="depth + 1" />
    </div>
  </div>
</template>

<style scoped>
.z-1 {
  z-index: 1;
}
</style>
