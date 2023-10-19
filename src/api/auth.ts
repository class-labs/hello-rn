import { Session } from "../types/Session";

export async function login(
  username: string,
  password: string,
): Promise<Session | null> {
  if (username === "bob" && password === "123") {
    return {
      token: Math.floor(Math.random() * 1000000).toString(36),
      user: {
        id: "1",
        username: "bob",
        name: "Bob Jones",
      },
    };
  }
  return null;
}
