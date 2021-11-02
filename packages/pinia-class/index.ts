import {
  mapActions,
  mapState,
  mapStores,
  StateTree,
  StoreDefinition,
  _GettersTree,
} from "pinia";
import { createDecorator } from "vue-class-component";

function assignToOptions(
  options: Record<string, any>,
  part: "methods" | "computed",
  key: string,
  value: any
) {
  if (!options[part]) {
    options[part] = {};
  }

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
    const { [actionName]: action } = mapActions(store, [actionName]);

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
    const { [getterName]: getter } = mapState(store, [getterName]);
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
    const { [stateName]: getter } = mapState(store, [stateName]);
    assignToOptions(options, "computed", key, getter);
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
    const stores = mapStores(store) as any;
    assignToOptions(options, "computed", key, stores[store.$id + "Store"]);
  });
