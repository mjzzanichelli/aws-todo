import { BoxProps } from "../dialog/types";
import { SpinnerLoading } from "../loading/spinner";
import {
  StyledBox,
  StyledBoxBody,
  StyledBoxHeader,
  StyledBoxTitle,
  StyledBoxTools,
} from "./styled";

export function Box(args: BoxProps) {
  const { variant = "primary", loading, children, ...props } = args;

  const { title, tools, ...elementProps } = props;

  return (
    <StyledBox variant={variant} data-testid="box" {...elementProps}>
      <StyledBoxHeader variant={variant} data-testid="box-header">
        <StyledBoxTitle variant={variant} data-testid="box-title">
          {title}
        </StyledBoxTitle>
        {!loading && tools && (
          <StyledBoxTools variant={variant} data-testid="box-tools">
            {tools}
          </StyledBoxTools>
        )}
      </StyledBoxHeader>
      <StyledBoxBody variant={variant} data-testid="box-body">
        {loading ? <SpinnerLoading /> : children}
      </StyledBoxBody>
    </StyledBox>
  );
}
