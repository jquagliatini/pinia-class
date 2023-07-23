<template>
  <div id="main">
    <ul>
      <li v-for="fruit of availableFruits" :key="fruit">
        <span>{{ fruit }} ({{ countFruits(fruit) }})</span>
        <button @click.stop="addFruits(fruit)">+1</button>
      </li>
    </ul>

    <button @click.stop="fruits = []">Clear</button>

    <div>Count: <strong>{{ globalFruitCount }}</strong></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { Action, Getter, WritableState } from 'pinia-class';
import { useBasket } from './stores/basket/useBasket.store'

@Component
export default class App extends Vue {
  @Getter(useBasket)
  readonly countFruits!: (fruitName: string) => number;

  @Getter(useBasket, 'count')
  readonly globalFruitCount!: number;

  get availableFruits(): readonly string[] {
    return [
      '🍍',
      '🍎',
      '🍇',
      '🍋',
    ]
  };

  @Action(useBasket)
  readonly addFruits!: (fruit: string) => void;

  @WritableState(useBasket, 'fruits')
  fruits!: string[];
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
