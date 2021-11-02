# Pinia Class

Porting [Vuex-Class][u:vc] to Pinia 🍍 !

## Installation

> **tl;dr;**
>
> ```
> $ npm i --save pinia-class pinia vue-class-component @vue/composition-api
> ```

```
$ npm install --save pinia-class
```

Quite naturally, `pinia` and `vue-class-component` are peer dependencies of this package:

```
$ npm i --save vue-class-component pinia
```

As described in [pinia][u:pinia-installation]'s documentation,
you also need the composition-api, so in order to use pinia, and therefore
`pinia-class`, you need to install `@vue/composition-api`

```
$ npm i --save @vue/composition-api
```

And initialize your project with

```ts
// main.ts
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { PiniaVuePlugin, createPinia } from 'pinia';

import App from './App.vue';

Vue.use(VueCompositionApi)
Vue.use(PiniaVuePlugin);

new Vue({
  render: h => h(App),
  pinia: createPinia()
}).$mount('#app');
```

[u:pinia-installation]: https://pinia.esm.dev/getting-started.html#installation

## Usage

> See the example in the [`examples`](.../packages/examples) folder.

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

[u:vc]: https://github.com/ktsn/vuex-class
