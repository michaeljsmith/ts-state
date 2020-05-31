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

export function push<T>(stack: Stack<T>, value: T): Stack<T> {
  return {
    value,
    rest: stack,
  };
}

export function pop<T>(stack: Stack<T>): {
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
