import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

export class ServerError extends Error {}

const handleReturnedServerError = (e: Error) => {
  // If the error is an instance of `ServerError`, unmask the message.
  if (e instanceof ServerError) {
    return e.message;
  }

  // Otherwise return default error message.
  return DEFAULT_SERVER_ERROR;
};

export const action = createSafeActionClient({
  // You can provide a custom log Promise, otherwise the lib will use `console.error`
  // as the default logging system. If you want to disable server errors logging,
  // just pass an empty Promise.
  handleServerErrorLog: (e) => {
    console.error(
      "CUSTOM ERROR LOG FUNCTION, server error message:",
      e.message,
    );
  },
  handleReturnedServerError,
});

/**
 * Function that checks if the user is authenticated in order
 * to perform actions
 */
export const authAction = createSafeActionClient({
  middleware: async () => {
    const session = await getAuthSession();
    if (!session) {
      throw new ServerError("You must be logged in to perform this action");
    }

    const user = session.user;
    const userId = user.id;
    if (!userId) {
      throw new Error(
        "You are not connected - Please login before trying any action",
      );
    }
    return {
      userId,
      user,
    };
  },
  handleReturnedServerError,
});
