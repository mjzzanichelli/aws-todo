import styled, { css } from "styled-components";
import {
  variantTextColor,
  variantBgColor,
  lightenVariantTextColor,
  darkenVariantBgColor,
} from "./../../theme/variants";
import { StyledTableProps, RowProps, TableCellProps } from "./types";
import { borderRadius, boxShadow, shadow } from "../../utils/styles";

export const StyledTable = styled.table.withConfig({
  shouldForwardProp: (prop) =>
    !["variant", "outlined", "hideHeader"].includes(prop),
})<StyledTableProps>`
  ${(props) => {
    const { theme, outlined, hideHeader } = props;
    const thTextColor = variantTextColor(props);
    const thBgColor = variantBgColor(props);
    const tdBgColor = lightenVariantTextColor({
      theme,
      variant: "disabled",
      value: 0.22,
    });
    const padding = hideHeader ? "0" : "0 0.5rem";

    return css`
      overflow: hidden;
      width: 100%;
      position: relative;
      border-spacing: 0;
      height: fit-content;
      border: 0.03rem solid ${tdBgColor};
      box-sizing: border-box;
      ${borderRadius()}
      padding:${padding};
      & > thead {
        position: sticky;
        top: 0;
        line-height: 1.5;
        & > tr > th {
          text-align: left;
          padding: 0.5rem;
          background-color: ${outlined ? thBgColor : thTextColor};
          color: ${outlined ? thTextColor : thBgColor};
          border-bottom: 0.03rem solid ${tdBgColor};
          & > i {
            vertical-align: middle;
          }
        }
      }
    `;
  }}
`;

export const StyledTableRow = styled.th.withConfig({
  shouldForwardProp: (prop) =>
    !["clickable", "selected", "hover", "variant"].includes(prop),
})<RowProps>`
  ${(props) => {
    const { theme, onClick, selected, hover } = props;
    const bgColorHover = darkenVariantBgColor({ ...props, value: 0.05 });
    const fontColorHover = variantTextColor(props);

    const bgColor = selected
      ? variantTextColor(props)
      : hover
      ? bgColorHover
      : variantBgColor(props);
    const fontColor = selected
      ? variantBgColor(props)
      : hover
      ? fontColorHover
      : variantTextColor(props);

    const borderColor = shadow({ theme });

    return css`
      & {
        background-color: ${bgColor};
        color: ${fontColor};
      }
      ${!selected &&
      `&:hover {
        background-color: ${bgColorHover};
        color: ${fontColorHover};
      }`}
      ${onClick &&
      css`
        cursor: pointer;
      `}

      & > td {
        max-width: 33vh;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        // vertical-align: top;
        & p {
          margin: 0;
        }

        & > td > p {
          margin: 0.25rem 0rem;
        }
      }
      &:not(:last-child) > td {
        border-bottom: 0.03rem solid ${borderColor};
      }
    `;
  }}
`;

export const StyledTableCell = styled.th.withConfig({
  shouldForwardProp: (prop) => !["align", "width", "padding"].includes(prop),
})<TableCellProps>`
  && {
    ${(props) => {
      const { align = "left", width, padding } = props;
      return css`
        text-align: ${align};
        ${align === "center" && `vertical-align:middle;`}
        ${width &&
        `
          width:${width};
          min-width:${width};
          max-width:${width};
          `}
        ${padding && `padding:${padding};`}
      `;
    }}
  }
`;

export const StyledTableCellStyckyLeft = styled(StyledTableCell)`
  position: sticky;
  left: 0;
  background-color: inherit;
  ${boxShadow()}
`;

export const StyledTableCellStyckyRight = styled(StyledTableCell)`
  position: sticky;
  right: 0;
  background-color: inherit;
  ${boxShadow()}
`;

export const StyledNoData = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
