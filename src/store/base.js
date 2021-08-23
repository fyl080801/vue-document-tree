import { reactive, shallowReadonly } from '@vue/reactivity'
import { deepClone } from '../utils/helper'

export const createState = (init) => {
  return reactive(init)
}

export const store = (init, factory) => {
  const state = createState(deepClone(init))

  return () => shallowReadonly({ state, ...factory(state) })
}
