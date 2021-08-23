<script setup>
import { useTree, useTreeNode } from './mixins'
import Dragzone from './Dragzone.vue'
import { getNodeId } from '../utils/tree'
import { reactive } from '@vue/reactivity'
import NodeBody from './NodeBody.vue'
import TreeNodeList from './TreeNodeList.vue'

const props = defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const context = useTree()

const { methods } = context

const { text, isLeaf, children, isOpen, onToggleOpen } = useTreeNode({
  node: reactive(props.node),
  context,
})
</script>

<template>
  <div class="node-layer">
    <NodeBody :depth="depth">
      <div class="text" draggable="true">
        <span>{{ text }}</span>
        <span v-if="!isLeaf" @click="onToggleOpen">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
    </NodeBody>
    <NodeBody :depth="depth" class="bottom">
      <Dragzone />
    </NodeBody>

    <div v-if="isOpen" class="node-layer">
      <TreeNodeList :node="node" :depth="depth + 1" />
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

.z-1 {
  z-index: 1;
}
.z-2 {
  z-index: 2;
}
</style>
