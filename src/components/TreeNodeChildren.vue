<script setup>
import Dragzone from './Dragzone.vue'
import { useTree, useTreeNode } from './mixins'
import TreeNode from './TreeNode.vue'
import { getNodeId } from '../utils/tree'
import NodeBody from './NodeBody.vue'

const props = defineProps({
  parent: Object,
  depth: { type: Number, default: 0 },
})

const context = useTree()

const { children } = useTreeNode({ node: props.parent, context })
</script>

<template>
  <div class="flex flex-col">
    <NodeBody :depth="depth" class="absolute w-full z-1">
      <Dragzone />
    </NodeBody>
    <div class="flex flex-col">
      <TreeNode v-for="child in children" :key="getNodeId(child)" :node="child" :depth="depth" />
    </div>
  </div>
</template>

<style scoped>
.z-1 {
  z-index: 1;
}
</style>
