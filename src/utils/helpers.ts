import { ReactElement } from "react";
import { ChildrenType } from "./types";
import moment from "moment";

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

// Date Formatter

moment.locale(navigator.language.toLowerCase());
export function formatDate(date: string) {
  return moment(date).calendar(null, {
    lastDay: "[Yesterday]",
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    lastWeek: "[last] dddd",
    nextWeek: "dddd",
    sameElse: "MMM D YYYY",
  });
}

export function formatDateTime(date: string) {
  return moment(date).calendar();
}

// Bytes Formatter

export function formatByteSize(bytes: number): string {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(3) + " KiB";
  else if (bytes < 1024 * 1024 * 1024)
    return (bytes / 1024 / 1024).toFixed(3) + " MiB";
  else return (bytes / 1024 / 1024 / 1024).toFixed(3) + " GiB";
}
