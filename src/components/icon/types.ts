import codepoints from "./customicons/codepoints.json";

export type IconName = keyof typeof codepoints;

export const Icons: {
  [key in IconName]: string;
} = codepoints;

export const IconKeys: string[] = Object.keys(Icons).sort((a, b) =>
  a > b ? 1 : -1
);

export type IconRotation = "top" | "right" | "bottom" | "left";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name: IconName;
  rotate?: IconRotation;
  title?: string;
}
