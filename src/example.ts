import { z } from "zod";

// type UserProfile = {
//   firstName: string;
//   age: number;
//   hobbies: Array<string>
// }

const userProfileSchema = z.object({
  firstName: z.string(),
  age: z.number(),
  hobbies: z.array(z.string()),
});

type UserProfile = z.infer<typeof userProfileSchema>;

function logUserProfile(input: UserProfile) {
  // Imagine we log something to the database
  console.log(input.firstName.toUpperCase());
}

const userInput = "{}";

const data: unknown = JSON.parse(userInput);

const userProfile = userProfileSchema.parse(data);

logUserProfile(userProfile);
