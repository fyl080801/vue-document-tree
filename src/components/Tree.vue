<script setup>
import Dragzone from './Dragzone.vue'
import { useTree, useTreeNode } from './mixins'
import TreeNodeChildren from './TreeNodeChildren.vue'

const props = defineProps({ data: { type: Array, default: () => [], options: Object } })

const context = useTree({
  state: {
    dragging: false,
  },
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
      <TreeNodeChildren :parent="{ children }" />
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
