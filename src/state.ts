export type State<S, T> = {
  brand?: ["state", S, T];

  run: (state: S) => {
    newState: S;
    result: T;
  };
};

export function of<S, T>(value: T): State<S, T> {
  return {
    run: (state: S) => ({
      newState: state,
      result: value,
    }),
  }
}

export function bind<S, T, U>(first: State<S, T>, secondFn: (interim: T) => State<S, U>): State<S, U> {
  return {
    run: (initialState: S) => {
      const interim = first.run(initialState);
      const secondState = secondFn(interim.result);
      return secondState.run(interim.newState);
    },
  };
}

export function get<S>(): State<S, S> {
  return {
    run: (state: S) => ({
      newState: state,
      result: state,
    }),
  };
}

export function put<S>(newState: S): State<S, void> {
  return {
    run: (initialState: S) => ({
      newState,
      result: undefined,
    }),
  };
}
