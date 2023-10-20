import { ReactNode, createContext, useContext, useState } from "react";
import { Session } from "../types/Session";

type SessionContext = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

const Context = createContext<SessionContext | null>(null);

export function SessionProvider(props: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const context = { session, setSession };
  return <Context.Provider value={context}>{props.children}</Context.Provider>;
}

export function useSession() {
  const sessionContext = useContext(Context);
  if (sessionContext === null) {
    throw Error("useSession must be within a SessionProvider");
  }
  return sessionContext;
}
