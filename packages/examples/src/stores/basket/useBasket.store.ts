import { defineStore } from "pinia";
export const useBasket = defineStore("basket", {
  state: () => {
    return {
      fruits: [] as string[],
    };
  },
  getters: {
    count: (state) => state.fruits.length,
    countFruits: (state) => (fruit: string) =>
      state.fruits.filter((f) => f === fruit).length,
  },
  actions: {
    addFruits(fruit: string, qty: number = 1) {
      Array.from({ length: qty }).forEach(() => {
        this.fruits.push(fruit);
      });
    },
  },
});
