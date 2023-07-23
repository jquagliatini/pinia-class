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

[u:examples]: https://github.com/jquagliatini/pinia-class/tree/main/packages/examples
[u:vc]: https://github.com/ktsn/vuex-class
