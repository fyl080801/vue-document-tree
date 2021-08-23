import { computed, inject, provide, reactive } from 'vue'
import { cleanObject } from '../utils/helper'
import { toTreeNodeProxy, getNodeId } from '../utils/tree'

const treeToken = Symbol('treeToken')
const treeNodeToken = Symbol('treeNodeToken')

let treeCounter = 0

const defaults = {
  methods: {
    generateId: () => {
      return ++treeCounter
    },
    isLeaf: (node) => {
      return node.isLeaf === true
    },
    getNodeText: (node) => {
      return node.text
    },
    isOpen: (node) => {
      return node.isOpen === true
    },
    toggleOpen: (node) => {
      node.isOpen = !node.isOpen
    },
  },
}

export const useTree = (params) => {
  if (params) {
    const { props = {}, methods = {} } = params

    const context = {
      props: reactive(props),
      methods: { ...defaults.methods, ...cleanObject(methods) },
    }

    provide(treeToken, context)

    return context
  } else {
    return inject(treeToken, { props: reactive({}), ...defaults })
  }
}

export const useTreeNode = (params) => {
  if (params) {
    const { node, context } = params
    const { methods } = context

    const children = computed(() => {
      return (node.children || []).map((child) => {
        return toTreeNodeProxy(child)(methods.generateId(node), getNodeId(node))
      })
    })

    const isLeaf = computed(() => {
      return methods.isLeaf(node)
    })

    const isOpen = computed(() => {
      return methods.isOpen(node)
    })

    const onToggleOpen = () => {
      methods.toggleOpen(node)
    }

    const nodeContext = {
      children,
      isLeaf,
      isOpen,
      onToggleOpen,
    }

    provide(treeNodeToken, nodeContext)

    return nodeContext
  } else {
    return inject(treeNodeToken)
  }
}
