import styled, { css } from "styled-components";
import {
  variantTextColor,
  variantBgColor,
  lightenVariantTextColor,
  darkenColor,
} from "./../../theme/variants";
import { StyledTableProps, RowProps, TableCellProps } from "./types";
import { boxShadow, shadow } from "../../utils/styles";

export const StyledTableSection = styled.section.withConfig({
  shouldForwardProp: (prop) => !["centered"].includes(prop),
})<{ centered?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  ${({ centered }) => {
    return (
      centered &&
      css`
        align-items: center;
        justify-content: center;
      `
    );
  }}
`;

export const StyledTable = styled.table.withConfig({
  shouldForwardProp: (prop) => !["variant", "outlined"].includes(prop),
})<StyledTableProps>`
  ${(props) => {
    const { theme, outlined } = props;
    const thTextColor = variantTextColor(props);
    const thBgColor = variantBgColor(props);
    const tdBgColor = lightenVariantTextColor({
      theme,
      variant: "disabled",
      value: 0.22,
    });
    return css`
      overflow-y: hidden;
      width: 100%;
      position: relative;
      border-spacing: 0;
      height: fit-content;
      & > thead {
        position: sticky;
        top: 0;
        line-height: 1.5;
        & > tr > th {
          text-align: left;
          padding: 0.5rem;
          background-color: ${darkenColor({
            theme,
            value: 0.1,
            color: outlined ? thBgColor : thTextColor,
          })};
          color: ${outlined ? thTextColor : thBgColor};
          border: 0.03rem solid ${outlined ? tdBgColor : thBgColor};
          &:first-child {
            border-top-left-radius: 0.25rem;
          }
          &:last-child {
            border-top-right-radius: 0.25rem;
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
    const bgColorHover = lightenVariantTextColor({ ...props, value: 0.5 });
    const fontColorHover = variantBgColor(props);

    const bgColor = selected
      ? variantTextColor(props)
      : hover
      ? bgColorHover
      : lightenVariantTextColor({ ...props, value: 0.75 });
    const fontColor = selected
      ? variantBgColor(props)
      : hover
      ? fontColorHover
      : variantTextColor({ theme });

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
        border-bottom: 0.03rem solid ${borderColor};
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
