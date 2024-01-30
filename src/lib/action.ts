import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

// export const action = createSafeActionClient();

export class ServerError extends Error {}

// export const authenticatedAction = createSafeActionClient({
//   handleReturnedServerError: (error) => {
//     if (error instanceof ServerError) {
//       return {
//         serverError: error.message,
//       };
//     }
//
//     return {
//       serverError: 'An unexpected error occurred',
//     };
//   },
//   middleware: async () => {
//     const session = await getAuthSession();
//
//     const user = session?.user;
//     const userId = user?.id;
//
//     if (!session) {
//       throw new ServerError('You must be logged in to perform this action');
//     }
//
//     return {
//       userId,
//       user,
//     };
//   },
// });

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
      e.message
    );
  },
  handleReturnedServerError,
});

export const authAction = createSafeActionClient({
  // You can provide a middleware function. In this case, context is used
  // for (fake) auth purposes.
  middleware: async () => {
    const session = await getAuthSession();

    const user = session?.user;
    const userId = user?.id;

    if (!session) {
      throw new ServerError("You must be logged in to perform this action");
    }

    return {
      userId,
      user,
    };
  },
  handleReturnedServerError,
});
