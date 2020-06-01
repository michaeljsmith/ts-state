import { expect } from "chai";
import { statefully, Stateful, get, put } from "./stateful";

type StackNode<T> = {
  brand?: ['stack', T];

  value: T;
  rest: StackNode<T> | null;
};

export type Stack<T> = StackNode<T> | null;

export function empty<T>(): Stack<T> {
  return null;
}

export function isEmpty<T>(stack: Stack<T>): boolean {
  return stack === null;
}

export function pushInternal<T>(stack: Stack<T>, value: T): Stack<T> {
  return {
    value,
    rest: stack,
  };
}

export function popInternal<T>(stack: Stack<T>): {
      value: T,
      newStack: Stack<T>,
    } {
  if (stack === null) {
    throw new Error("empty stack");
  }

  return {
    value: stack.value,
    newStack: stack.rest,
  };
}

export function push<T>(value: T): Stateful<Stack<T>, void> {
  return statefully(
    run => {
      const stack = run(get());
      run(put(pushInternal(stack, value)));
    });
}

export function pop<T>(): Stateful<Stack<T>, T> {
  return statefully(
    run => {
      const stack = run(get());
      const {value, newStack} = popInternal(stack);
      run(put(newStack));
      return value;
    });
}

function runStateful<T>(stateful: Stateful<Stack<number>, T>): T {
  return stateful.run(empty()).result;
}

describe('stateful', function() {
  const result =
    runStateful(
      statefully(
        run => {
          run(push(4));
          run(push(3));
          const arg1 = run(pop());
          const arg2 = run(pop());
          return arg1 * arg2;
        }));
  expect(result).equals(12);
});
