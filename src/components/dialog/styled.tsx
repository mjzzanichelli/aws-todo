import styled from "styled-components";
import { shadow, sizeMixin } from "../../utils/styles";
import { Box } from "../box/main";

export const StyledDialog = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledDialogBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(0.5rem);
  background-color: ${shadow};
`;

export const StyledDialogBox = styled(Box)`
  z-index: 100;
  max-width: ${({ theme }) => sizeMixin(theme.sizes.md)};
  margin: 1rem;
  [data-testid="box-body"] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;
