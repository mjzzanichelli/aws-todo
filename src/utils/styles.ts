import { lighten, rgba } from "polished";
import { DefaultTheme } from "styled-components";
import { css } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { variantBgColor, variantTextColor } from "../theme/variants";
import { ThemeVariantType } from "../theme/theme.types";

export function shadow({ theme }: { theme: DefaultTheme }) {
  return rgba(variantTextColor({ theme, variant: "disabled" }), 0.33);
}
export function blur(val = "0.5rem") {
  return css`
    backdrop-filter: blur(${val});
    -webkit-backdrop-filter: blur(${val});
    background-color: ${({ theme }) => rgba(variantBgColor({ theme }), 0.25)};
  `;
}

export function boxShadow() {
  return css`
    box-shadow: 0 0 1rem 0.5rem ${shadow};
  `;
}

export function border(variant: ThemeVariantType = "off") {
  return css`
    ${({ theme }) => borderColor(variantTextColor({ theme, variant }))}
  `;
}

export function borderColor(color: string) {
  return css`
    border: 0.125rem solid ${color};
  `;
}

export function outline(variant: ThemeVariantType = "off") {
  return css`
    ${({ theme }) => outlineColor(variantTextColor({ theme, variant }))}
  `;
}

export function outlineColor(color: string) {
  return css`
    outline: 0.125rem solid ${color};
  `;
}

export function borderRadius(val = "0.33rem") {
  return css`
    border-radius: ${val};
  `;
}

export function borderRadiusRounds() {
  return borderRadius("50%");
}

export const minWidth = 660;
export const minWidthPx = `${minWidth}px`;

export function sizeMixin(px: number) {
  return `${px}px`;
}

export function backgrounMixin() {
  return css`
    background-color: ${({ theme }) =>
      lighten(0.22, variantTextColor({ theme, variant: "off" }))};
  `;
}

export const GlobalStyles = createGlobalStyle`
${({ theme }) => {
  return css`
    html,
    body {
      width: 100%;
      height: 100%;
    }
    html {
      font-size: ${sizeMixin((theme.fontSize / 3) * 4)};
      @media (min-width: ${sizeMixin(theme.sizes.md)}) {
        font-size: ${sizeMixin(theme.fontSize)};
      }
    }

    [data-amplify-authenticator] {
      margin: auto auto;
    }

    body {
      margin: 0;
      font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI",
        "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: ${variantTextColor({ theme })};
      background-color: ${variantBgColor({ theme })};
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }

    a,
    a:link,
    a:visited,
    a:active {
      text-decoration: none;
      color: ${variantTextColor({ theme, variant: "primary" })};
      &:hover {
        text-decoration: underline;
      }
    }
  `;
}}
`;
