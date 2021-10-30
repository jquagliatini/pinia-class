import Vue from "vue";
import VueComposition from "@vue/composition-api";
import { PiniaVuePlugin, createPinia } from "pinia";

import App from "./App.vue";

Vue.use(VueComposition);
Vue.use(PiniaVuePlugin);

new Vue({
  render: (h) => h(App),
  pinia: createPinia(),
}).$mount("#app");
