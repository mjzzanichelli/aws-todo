import { JsonProperties } from "./types";

export function isJsonProperties<T = never>(
  val: unknown
): val is JsonProperties<T> {
  if (!(val instanceof Object)) return false;
  let valid = true;
  const keys = Object.keys(val);
  const values = Object.values(val);
  for (const i in keys) {
    const value = values[i];
    if (
      !["string", "number", "undefined", "object", "boolean"].includes(
        typeof value
      )
    ) {
      valid = false;
    } else if (value instanceof Object) valid = isJsonProperties<T>(value);
    if (!valid) break;
  }

  return true;
}
