import { LoadingProps } from "./types";


export function ErrorLoading(args: LoadingProps) {
  const { color = "#f7ce84", ...props } = args;
  return (
    <svg
      data-testid="loading-error"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 14H11V9H13V14ZM13 18H11V16H13V18ZM1 21H23L12 2L1 21Z"
        fill={color}
      />
    </svg>
  );
}
