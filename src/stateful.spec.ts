import { expect } from "chai";
import { push, pop } from "./stack-state";
import { Stack, empty } from "./stack";
import { statefully } from "./stateful";

describe('stateful', function() {
  const state =
    statefully<Stack<number>, number>(
      run => {
        run(push(4));
        run(push(3));
        const arg1 = run(pop());
        const arg2 = run(pop());
        return arg1 * arg2;
      }
    );
    const result = state.run(empty());
    expect(result).equals(12);
  });
