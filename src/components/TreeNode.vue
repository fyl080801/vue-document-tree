<script setup>
import { useTree, useTreeNode } from './mixins'
import Dragzone from './Dragzone.vue'
import { getNodeId } from '../utils/tree'

const props = defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const context = useTree()

const { methods } = context

const { isLeaf, children } = useTreeNode({
  node: props.node,
  context,
})
</script>

<template>
  <div class="tree-node" draggable="true">
    <div class="tree-node-content">
      <div v-for="i in depth" class="depth"></div>
      <div class="content">{{ methods.getNodeText(node) }}</div>
    </div>
  </div>
  <template v-if="!isLeaf">
    <div class="children">
      <div v-for="i in depth" class="depth"></div>
      <Dragzone />
    </div>
    <TreeNode v-for="child in children" :key="getNodeId(child)" :node="child" :depth="depth + 1" />
  </template>
  <div style="display: flex; flex-direction: row">
    <div v-for="i in depth" class="depth"></div>
    <Dragzone />
  </div>
</template>

<style>
.tree-node,
.children {
  position: relative;
  display: flex;
  flex-direction: row;
}

.tree-node-content {
  display: flex;
  flex-direction: row;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-items: stretch;
}

.depth,
.content {
  padding: 0.5rem 0.75rem;
}

.depth > *,
.content > * {
  vertical-align: middle;
}

.content {
  flex: 1;
}
</style>
