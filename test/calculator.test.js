import assert from "node:assert/strict";
import { test } from "node:test";
import { applyInput, initialState } from "../src/js/calculator.js";

function press(state, ...keys) {
  return keys.reduce((current, key) => applyInput(current, key), state);
}

test("digits and operators evaluate with JavaScript precedence", () => {
  const state = press(initialState(), "1", "2", "+", "3", "*", "2");
  assert.equal(state.expression, "12+3*2");
  assert.equal(state.result, 18);
});

test("parentheses override precedence", () => {
  const state = press(initialState(), "(", "1", "2", "+", "3", ")", "*", "2");
  assert.equal(state.expression, "(12+3)*2");
  assert.equal(state.result, 30);
});

test("an unfinished expression keeps the previous result", () => {
  const state = press(initialState(), "1", "2", "+");
  assert.equal(state.expression, "12+");
  assert.equal(state.result, 12);
});

test("clear blanks the expression and the result", () => {
  const state = press(initialState(), "1", "2", "+", "3", "C");
  assert.equal(state.expression, "");
  assert.equal(state.result, undefined);
  assert.equal(state.memory, "");
});

test("M+ stores the current result and blanks the display", () => {
  const state = press(initialState(), "1", "2", "M+");
  assert.equal(state.memory, 12);
  assert.equal(state.expression, "");
  assert.equal(state.result, undefined);
});

test("MR appends the stored value, including zero and negatives", () => {
  const recalled = press(initialState(), "1", "2", "M+", "3", "+", "MR");
  assert.equal(recalled.expression, "3+12");
  assert.equal(recalled.result, 15);

  const zero = press(initialState(), "1", "-", "1", "M+", "5", "+", "MR");
  assert.equal(zero.memory, 0);
  assert.equal(zero.expression, "5+0");
  assert.equal(zero.result, 5);

  const negative = press(initialState(), "1", "-", "2", "M+", "3", "+", "MR");
  assert.equal(negative.memory, -1);
  assert.equal(negative.expression, "3+-1");
  assert.equal(negative.result, 2);
});

test("MR with empty memory leaves the expression unchanged", () => {
  const state = press(initialState(), "4", "MR");
  assert.equal(state.expression, "4");
  assert.equal(state.result, 4);
  assert.equal(state.memory, "");
});

test("division follows JavaScript, including divide by zero", () => {
  assert.equal(press(initialState(), "1", "/", "0").result, Infinity);
  assert.equal(
    Object.is(press(initialState(), "0", "/", "0").result, NaN),
    true
  );
});

test("applyInput does not mutate the previous state", () => {
  const state = initialState();
  const next = applyInput(state, "1");
  assert.notEqual(next, state);
  assert.deepEqual(state, initialState());
  assert.equal(next.expression, "1");
  assert.equal(next.result, 1);
});
