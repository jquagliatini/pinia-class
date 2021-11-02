import { createPinia, defineStore } from "pinia";
import Vue from "vue";
import Component from "vue-class-component";
import { Action, Getter, State, Store } from "../index";
import { mocked } from "ts-jest/utils";

const addFruitSpy = jest.fn(function (
  this: { fruits: string[] },
  fruit: string
) {
  this.fruits.push(fruit);
});

const addFruitsSpy = jest.fn(function (
  this: { fruits: string[] },
  fruits: string[]
) {
  this.fruits.push(...fruits);
});

const useBasket = defineStore("basket", {
  state: () => ({
    fruits: ["🍍", "🍎", "🍇", "🍋"],
  }),
  getters: {
    fruitCount: (state) => (fruit: string) =>
      state.fruits.filter((f: string) => f === fruit).length,
    count: (state) => state.fruits.length,
  },
  actions: {
    addFruit: addFruitSpy,
    addFruits: addFruitsSpy,
  },
});

function factory() {
  @Component
  class MyComponent extends Vue {
    @Getter(useBasket, "fruitCount")
    readonly myFruitCount!: (fruit: string) => number;

    @Getter(useBasket)
    readonly count!: number;

    @Action(useBasket, "addFruit")
    addFruit!: (fruit: string) => void;

    @Action(useBasket)
    addFruits!: (fruits: string[]) => void;

    @Store(useBasket)
    $store!: any;

    @State(useBasket, "fruits")
    readonly fruits!: string[];

    @State(useBasket)
    readonly fruitCount!: (fruit: string) => number;
  }

  return new MyComponent({ pinia: createPinia() });
}

afterEach(() => {
  mocked(addFruitSpy).mockClear();
  mocked(addFruitsSpy).mockClear();
});

describe("pinia-class", () => {
  describe("Getters", () => {
    it("should map to a specific key", () => {
      const component = factory();
      expect(component.myFruitCount("🍎")).toBe(1);
    });

    it("should map to the attribute name", () => {
      const component = factory();
      expect(component.count).toBe(4);
    });
  });

  describe("Actions", () => {
    it("should map to an action by key", () => {
      const component = factory();
      component.addFruit("🍎");

      expect(addFruitSpy).toHaveBeenCalledWith("🍎");
    });

    it("should map to an action by attribute name", () => {
      const component = factory();
      component.addFruits(["🍎", "🍎"]);

      expect(addFruitsSpy).toHaveBeenCalledWith(["🍎", "🍎"]);
    });
  });

  describe("Store", () => {
    it("should map the store directly in the component", () => {
      const component = factory();
      component.$store.addFruits(["🍎", "🍎"]);
      expect(addFruitsSpy).toHaveBeenCalledWith(["🍎", "🍎"]);
    });
  });

  describe("State", () => {
    it("should map state with a key", () => {
      const component = factory();
      expect(component.fruits).toStrictEqual(["🍍", "🍎", "🍇", "🍋"]);
    });

    it("should map state with attribute name", () => {
      const component = factory();
      expect(component.fruitCount("🍎")).toBe(1);
    });
  });
});
