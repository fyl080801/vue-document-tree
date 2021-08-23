<script setup>
import { useTree, useTreeNode } from './mixins'
import Dragzone from './Dragzone.vue'
import { getNodeId } from '../utils/tree'
import { reactive } from '@vue/reactivity'
import NodeBody from './NodeBody.vue'

const props = defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const context = useTree()

const { methods } = context

const { isLeaf, children, isOpen, onToggleOpen } = useTreeNode({
  node: reactive(props.node),
  context,
})
</script>

<template>
  <div>
    <NodeBody :depth="depth">
      <Dragzone />
    </NodeBody>
    <div>
      <NodeBody :depth="depth">
        <div class="text" draggable="true">
          <span>{{ methods.getNodeText(node) }}</span>
          <span v-if="!isLeaf" @click="onToggleOpen">[{{ isOpen ? '-' : '+' }}]</span>
        </div>
      </NodeBody>
      <NodeBody :depth="depth">
        <Dragzone />
      </NodeBody>
      <div>
        <TreeNode
          v-for="child in children"
          :key="getNodeId(child)"
          :node="child"
          :depth="depth + 1"
        />
      </div>
    </div>
  </div>
  <!-- <NodeBody :depth="depth">
    <div class="text" draggable="true">
      <span>{{ methods.getNodeText(node) }}</span>
      <span v-if="!isLeaf" @click="onToggleOpen">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
  </NodeBody>
  <div class="children">
    <NodeBody :depth="depth" :line="true" class="bottom">
      <Dragzone />
    </NodeBody>

    <template v-if="isOpen">
      <NodeBody :depth="depth + 1" :line="true">
        <Dragzone />
      </NodeBody>

      <TreeNode
        v-for="child in children"
        :key="getNodeId(child)"
        :node="child"
        :depth="depth + 1"
      />
    </template>
  </div> -->
</template>

<style scoped>
.text {
  position: relative;
  z-index: 0;
  height: 30px;
  line-height: 30px;
}

.children {
  position: relative;
}

.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.z-1 {
  z-index: 1;
}
.z-2 {
  z-index: 2;
}
</style>
