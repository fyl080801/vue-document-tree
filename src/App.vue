<script setup>
import { ref } from '@vue/reactivity'
import { DocTree } from './components'

const data = ref([
  {
    text: 'aaaa',
    children: [
      { text: 'aaa-1', isLeaf: true },
      { text: 'aaa-2', children: [{ text: 'xxxx', isLeaf: true }] },
      { text: 'aaa-3' },
      { text: 'aaa-4', isLeaf: true },
    ],
  },
  {
    text: 'bbb',
    children: [
      { text: 'bbb-1', isLeaf: true },
      { text: 'bbb-2', isLeaf: true },
    ],
  },
])
</script>

<template>
  <div style="width: 200px">
    <DocTree :data="data" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
