import { State, bind } from "./state";

class Fluent<S, T> {
  readonly target: State<S, T>;

  constructor(target: State<S, T>) {
    this.target = target;
  }

  then<U>(next: State<S, U>): Fluent<S, U> {
    return fluently(
        bind(
            this.target,
            (ignoredResult: T) => next));
  }

  withResult<U>(fn: (interim: T) => State<S, U>): Fluent<S, U> {
    return fluently(bind(this.target, fn));
  }

  get(): State<S, T> {
    return this.target;
  }
}

export function fluently<S, T>(target: State<S, T>) {
  return new Fluent(target);
}
