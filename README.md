# Pinia Class

Porting [Vuex-Class][u:vc] to Pinia 🍍 !

## Usage

> See the example in the [`packages/example`](./packages/examples) folder.

You should be able to use pinia-class, quite similarly as [vuex-class][u:vc]

```typescript
import Vue from 'vue'
import Component from 'vue-class-component'
import { Action, Getter, Store, State } from 'pinia-class'
import { useStore } from './store/myStore'

@Component
export default class MyComponent extends Vue {
  @Action(useStore, 'myAction')
  myActionName // rename the action locally

  @Action(useStore)
  myAction // or directly use the name of the action / getter / state for the class attribute

  @Getter(useStore, 'myGetter')
  getter

  @Getter(useStore)
  myGetter

  @State(useStore, 'fruits')
  allTheFruits

  @State(useStore)
  fruits

  @Store(useStore)
  store // directly inject the store as attribute
}
```

## Installation

At the moment the package is not published on npm.

[u:vc]: https://github.com/ktsn/vuex-class
