import {
  mapActions,
  mapState,
  mapStores,
  StateTree,
  StoreDefinition,
  _GettersTree,
  mapWritableState,
} from "pinia";
import { createDecorator } from "vue-facing-decorator";

function assignToOptions(
  options: Record<string, any>,
  part: "methods" | "computed",
  key: string,
  value: any
) {
  if (!options[part]) {
    options[part] = {};
  }

  const { [key]: _, ...data } = options.data();
  options.data = () => data;

  options[part][key] = value;
  return options;
}

export const Action = <
  Id extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A,
  Keys extends keyof A
>(
  store: StoreDefinition<Id, S, G, A>,
  actionKey?: Keys
) =>
  createDecorator((options, key) => {
    const actionName = (actionKey ?? key) as Keys;
    const { [actionName]: action } = mapActions<Id, S, G, A>(store, [
      actionName,
    ]);

    assignToOptions(options, "methods", key, action);
  });

export const Getter = <
  Id extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A,
  Keys extends keyof G
>(
  store: StoreDefinition<Id, S, G, A>,
  getterKey?: Keys
) =>
  createDecorator((options, key) => {
    const getterName = (getterKey ?? key) as Keys;
    const { [getterName]: getter } = mapState<Id, S, G, A, Keys>(store, [
      getterName,
    ]);
    assignToOptions(options, "computed", key, getter);
  });

export const State = <
  Id extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A,
  Keys extends keyof S | keyof G
>(
  store: StoreDefinition<Id, S, G, A>,
  stateKey?: Keys
) =>
  createDecorator((options, key) => {
    const stateName = (stateKey ?? key) as Keys;
    const { [stateName]: getter } = mapState<Id, S, G, A, Keys>(store, [
      stateName,
    ]);
    assignToOptions(options, "computed", key, getter);
  });

export const WritableState = <
  Id extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A,
  Keys extends keyof S
>(
  store: StoreDefinition<Id, S, G, A>,
  stateKey: Keys
) =>
  createDecorator((options, key) => {
    const stateName = (stateKey ?? key) as Keys;
    const { [stateName]: writableState } = mapWritableState<Id, S, G, A, Keys>(store, [
      stateName,
    ]);
    assignToOptions(options, "computed", key, writableState);
  });

export const Store = <
  Id extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A
>(
  store: StoreDefinition<Id, S, G, A>
) =>
  createDecorator((options, key) => {
    const realId = `${store.$id}Store` as const;
    const stores = mapStores(store);
    assignToOptions(options, "computed", key, stores[realId]);
  });
