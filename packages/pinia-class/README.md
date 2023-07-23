# Pinia Class

Porting [Vuex-Class][u:vc] to Pinia 🍍 !

## Installation

> **tl;dr;**
>
> ```
> $ npm i --save pinia-class pinia vue-facing-decorator
> ```

```
$ npm install --save pinia-class
```

Quite naturally, `pinia` and `vue-facing-decorator` are peer dependencies of this package:

```
$ npm i --save vue-facing-decorator pinia
```

And initialize your project with

```ts
// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

creatApp(App)
  .use(createPinia())
  .moun('#app');
```

**Links:**
- Pinia Getting Started: https://pinia.esm.dev/getting-started.html#installation

## Usage

> See the [`examples`][u:examples] project.

You should be able to use pinia-class, quite similarly to [vuex-class][u:vc]

```typescript
import { Component, Vue } from 'vue-facing-decorator'
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

### WritableState

`pinia-class` also introduces a new concept of `WritableState`.
Contrary to `vuex`, [`pinia` allows to write directly into the store's state][u:writable-state].
Hence, it becomes possible to directly expose the state as a reactive object.
To do that you can can use the `@WritableState` decorator:

```vue
<template>
  <ul><li v-for="fruit of fruits" :key="fruit">{{ fruit }}</li></ul>

  <!-- Here we mutate the store globally -->
  <button @click.stop="fruits = []">Clear</button>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { defineStore } from 'pinia';

const useBasket = defineStore({ state: () => ({ fruits: [] as string[] }) });

@Component
export class MyComponent extends Vue {
  // no readonly here
  @WritableState(useBasket, ['fruits'])
  fruits!: string[];
}
</script>
```

[u:examples]: https://github.com/jquagliatini/pinia-class/tree/main/packages/examples
[u:vc]: https://github.com/ktsn/vuex-class
[u:writable-state]: https://pinia.vuejs.org/core-concepts/state.html#modifiable-state
