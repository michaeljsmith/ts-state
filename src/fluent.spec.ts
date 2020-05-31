import { expect } from "chai";
import { fluently } from "./fluent";
import { push, pop } from "./stack-state";
import { Stack, empty } from "./stack";
import { of } from "./state";

describe('fluent', function() {
  it('sequences states', function() {
    const result =
        fluently<Stack<number>, void>(push(3))
            .then(push(4))
            .then(pop())
            .withResult((arg1: number) => {
              return fluently<Stack<number>, number>(pop())
                  .withResult((arg2: number) => of(arg1 * arg2))
                  .get();
            })
            .get()
            .run(empty())
            .result;
    expect(result).equals(12);
  });
});
