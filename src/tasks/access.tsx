import { useContext } from "react";
import { AuthContext } from "../context";

export function TasksOwner(args: { children: JSX.Element }): JSX.Element {
  const { children } = args;
  const { user } = useContext(AuthContext);
  if (!user) return <></>;
  return children;
}

export function TasksGuest(args: { children: JSX.Element }): JSX.Element {
  const { children } = args;
  const { user } = useContext(AuthContext);
  if (user) return <></>;
  return children;
}
