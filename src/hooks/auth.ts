import { AuthUser } from "aws-amplify/auth";
import { createContext } from "react";

export interface AuthContextType {
  user?: AuthUser;
  guestUserId?: string;
  signOut?: () => void;
}

export const AuthContext = createContext<AuthContextType>({});
