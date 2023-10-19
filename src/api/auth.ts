import { Session } from "../types/Session";

export async function login(
  username: string,
  password: string,
): Promise<Session | null> {
  await sleep(1000);
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
