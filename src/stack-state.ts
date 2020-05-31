import * as stacks from './stack'
import { State, bind, get, put, of } from './state';

export function push<T>(value: T): State<stacks.Stack<T>, void> {
  return bind(
    get(),
    (stack: stacks.Stack<T>) => put(stacks.push(stack, value)));
}

export function pop<T>(): State<stacks.Stack<T>, T> {
  return bind(
    get(),
    (stack: stacks.Stack<T>) => {
      const {value, newStack} = stacks.pop(stack);
      return bind(
        put(newStack),
        () => of(value));
    });
}
