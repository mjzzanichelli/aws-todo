import { ReactElement } from "react";
import { ChildrenType } from "./types";

export function randomString() {
  return Math.random().toString(33).replace(/\./g, "");
}

export function hasKeys(val: any) {
  if (!(val instanceof Object)) return false;
  let hasKeys = false;
  const keys = Object.keys(val);
  const values = Object.values(val);
  for (const i in keys) {
    const value = values[i];
    if (value !== undefined) {
      hasKeys = true;
      break;
    }
  }
  return hasKeys;
}

export function prettyJson(val?: unknown) {
  try {
    return JSON.stringify(val, null, 2);
  } catch (e) {
    return "";
  }
}

export function isChildrenElement(
  element: any
): element is ReactElement<{ children: ChildrenType }> {
  if (!(element instanceof Object)) return false;
  let i = Object.keys(element).indexOf("props");
  const props = Object.values(element)[i];
  if (!(props instanceof Object)) return false;
  i = Object.keys(props).indexOf("children");
  const children = Object.values(props)[i];
  return !!children;
}

export function Void() {
  return;
}

// Stryngs polyfills
export function capitalise(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function splitCapitalised(val: string) {
  return val.split(/(?=[A-Z])/);
}

export function formatLabel(val: string) {
  val = capitalise(val);
  const arr = splitCapitalised(val);
  return arr.join(" ");
}

export function truncate(val: string, max = 50) {
  val = val.trim();
  if (val.length <= max) return val;
  return `${val.slice(0, max)}...`;
}
