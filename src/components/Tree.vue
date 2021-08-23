<script setup>
import Dragzone from './Dragzone.vue'
import { useTree, useTreeNode } from './mixins'
import TreeNode from './TreeNode.vue'
import { getNodeId } from '../utils/tree'
import { reactive } from '@vue/reactivity'

const props = defineProps({ data: { type: Array, default: () => [], options: Object } })

const context = useTree({
  methods: {
    generateId: props.options?.generateId,
    isLeaf: props.options?.isLeaf,
    getNodeText: props.options?.getNodeText,
  },
})

const { children } = useTreeNode({
  node: { children: props.data },
  context,
})
</script>

<template>
  <div class="doc-tree">
    <template v-if="children?.length > 0">
      <!-- <Dragzone /> -->
      <TreeNode v-for="node in children" :key="getNodeId(node)" :node="node" />
    </template>
    <Dragzone v-else>add node</Dragzone>
  </div>
</template>

<style>
.doc-tree {
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
