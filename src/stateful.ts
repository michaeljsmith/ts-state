import { State } from "./state";

class Stateful<S> {
  state: S;

  constructor(state: S) {
    this.state = state;
  }

  run<T>(stateToRun: State<S, T>): T {
    const {newState, result} = stateToRun.run(this.state);
    this.state = newState;
    return result;
  }
}

type StateRunner<S> = <T>(state: State<S, T>) => T;

export function statefully<S, T>(fn: (runner: StateRunner<S>) => T): State<S, T> {
  return {
    run: (initialState: S) => {
      const stateful = new Stateful<S>(initialState);
      const value = fn(<U>(stateToRun: State<S, U>) => stateful.run(stateToRun));
      return {
        newState: stateful.state,
        result: value,
      }
    }
  };
}
