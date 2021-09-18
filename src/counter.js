let value = 0;

export function counter({ value: newValue }) {
  if (newValue) {
    value = newValue;
  } else {
    value += 1;
  }
  return value;
}
