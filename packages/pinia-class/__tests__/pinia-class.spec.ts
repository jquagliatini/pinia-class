import { describe, it, vi, afterEach, beforeEach, expect } from "vitest";
import { compile, defineComponent, getCurrentInstance } from "vue";
import { createPinia, defineStore, setActivePinia } from "pinia";
import { Component, Vue } from "vue-facing-decorator";
import { Action, Getter, State, Store } from "../index";

const addFruitSpy = vi.fn(function (this: { fruits: string[] }, fruit: string) {
  this.fruits.push(fruit);
});

const addFruitsSpy = vi.fn(function (
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

  type Method = (...args: any) => any;
  return MyComponent as unknown as {
    methods: {
      [K in keyof MyComponent as (MyComponent[K] extends Method ? K : never)]:
        MyComponent[K]
    };
    computed: { [K in keyof MyComponent]: () => MyComponent[K] };
  };
}

beforeEach(() => {
  setActivePinia(createPinia());
});

afterEach(() => {
  vi.mocked(addFruitSpy).mockClear();
  vi.mocked(addFruitsSpy).mockClear();
});

describe("pinia-class", () => {
  describe("Getters", () => {
    it("should map to a specific key", () => {
      const component = factory();
      const got = component.computed.myFruitCount()("🍎")
      console.log(got);
      expect(got).toBe(1);
    });

    it("should map to the attribute name", () => {
      const component = factory();
      expect(component.computed.count()).toBe(4);
    });
  });

  describe("Actions", () => {
    it("should map to an action by key", () => {
      const component = factory();
      component.methods.addFruit("🍎");

      expect(addFruitSpy).toHaveBeenCalledWith("🍎");
    });

    it("should map to an action by attribute name", () => {
      const component = factory();
      component.methods.addFruits(["🍎", "🍎"]);

      expect(addFruitsSpy).toHaveBeenCalledWith(["🍎", "🍎"]);
    });
  });

  describe("Store", () => {
    it("should map the store directly in the component", () => {
      const component = factory();
      component.computed.$store().addFruits(["🍎", "🍎"]);
      expect(addFruitsSpy).toHaveBeenCalledWith(["🍎", "🍎"]);
    });
  });

  describe("State", () => {
    it("should map state with a key", () => {
      const component = factory();
      expect(component.computed.fruits()).toStrictEqual(["🍍", "🍎", "🍇", "🍋"]);
    });

    it("should map state with attribute name", () => {
      const component = factory();
      expect(component.computed.fruitCount()("🍎")).toBe(1);
    });
  });
});
