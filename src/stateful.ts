export type Stateful<S, T> = {
  brand?: ["stateful", S, T];

  run: (state: S) => {
    newState: S;
    result: T;
  };
};

export function get<S>(): Stateful<S, S> {
  return {
    run: (state: S) => ({
      newState: state,
      result: state,
    }),
  };
}

export function put<S>(newState: S): Stateful<S, void> {
  return {
    run: (initialState: S) => ({
      newState,
      result: undefined,
    }),
  };
}

export function statefully<S, T>(fn: (runner: <U>(state: Stateful<S, U>) => U) => T): Stateful<S, T> {
  return {
    run: (initialState: S) => {
      let state = initialState;
      const value = fn(
          <U>(stateToRun: Stateful<S, U>) => {
            const {newState, result} = stateToRun.run(state);
            state = newState;
            return result;
          });
      return {
        newState: state,
        result: value,
      }
    }
  };
}
