import {
  capitalise,
  formatLabel,
  splitCapitalised,
  truncate,
} from "./utils/helpers";

// eslint-disable-next-line no-extend-native
String.prototype.capitalise = function (this: string) {
  return capitalise(this);
};

// eslint-disable-next-line no-extend-native
String.prototype.splitCapitalised = function (this: string) {
  return splitCapitalised(this);
};

// eslint-disable-next-line no-extend-native
String.prototype.formatLabel = function (this: string) {
  return formatLabel(this);
};

// eslint-disable-next-line no-extend-native
String.prototype.truncate = function (this: string, max?: number) {
  return truncate(this, max);
};

declare global {
  interface String {
    capitalise(): string;
    splitCapitalised(): string[];
    formatLabel(): string;
    truncate(max?: number): string;
  }
}
