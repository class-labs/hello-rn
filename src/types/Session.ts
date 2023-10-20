import { User } from "./User";

export type Session = {
  token: string;
  user: User;
};
