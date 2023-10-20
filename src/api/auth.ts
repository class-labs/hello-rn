import { Session } from "../types/Session";

const query = `
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      id
      name
      username
    }
  }
}
`;

export async function login(
  username: string,
  password: string
): Promise<Session | null> {
  const variables = { username, password };
  const response = await fetch("https://chatter.web-api.dev/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const { data } = await response.json();
  return data.login;
}
