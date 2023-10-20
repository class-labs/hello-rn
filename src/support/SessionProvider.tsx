import { createContext } from "react";
import { Session } from "../types/Session";

type SessionContext = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export function SessionProvider() {
  // Task 16
  // Implement SessionProvider purely to store the current session object (or null)
  // and pass that down the render tree to any component that needs it.
  // Remember to update LoginScreen to set the session.
  // Update the HomeScreen to display the name of the user that is logged in
}

export function useSession() {
  // TODO
}
