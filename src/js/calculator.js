// Button input is evaluated with JavaScript so the keypad keeps the original
// precedence and memory behavior. Callers should only pass keypad tokens and
// values previously produced by this function.
export function initialState() {
  return { expression: "", result: "", memory: "" };
}

export function applyInput(state, input) {
  const next = {
    expression: state.expression,
    result: state.result,
    memory: state.memory,
  };

  if (input === "C") {
    next.expression = "";
  } else if (input === "M+") {
    next.memory = state.result;
    next.expression = "";
  } else if (input === "MR") {
    next.expression = state.expression + state.memory;
  } else {
    next.expression = state.expression + input;
  }

  try {
    // Empty input evaluates to undefined, which is how Clear and M+ blank the result.
    next.result = eval(next.expression);
  } catch {
    // An unfinished expression such as "12+" is not an error to surface.
  }

  return next;
}
