import { createContext } from "react";
import { AuthUser } from "aws-amplify/auth";
import { Size } from "./utils/types";
import { TaskDataType } from "./tasks/meta/types";
import { TaskSchema } from "./tasks/crud";
import { defaultTheme } from "./theme/main";

export const ScreenContext = createContext<{ size?: Size; isMobile?: boolean }>(
  {}
);

export interface AuthContextType {
  user?: AuthUser;
  guestUserId?: string;
  signOut?: () => void;
}

export const AuthContext = createContext<AuthContextType>({});

export const TasksContext = createContext<{
  tasks?: TaskDataType[];
  search?: string;
  makeEditable?: (task: TaskDataType) => void;
  addTask?: (task: TaskSchema) => void;
  setSearch?: (search?: string) => void;
  setTasks?: (tasks: TaskDataType[]) => void;
  reloadTasks?: () => void;
}>({});

export const ThemeContext = createContext({
  theme: defaultTheme,
  switchTheme: () => {},
});
