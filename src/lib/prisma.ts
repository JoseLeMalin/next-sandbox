// import { PrismaClient } from '@prisma/client';
//
// export const prisma: PrismaClient =
//   global.prisma ??
//   new PrismaClient({
//     log:
//       process.env.NODE_ENV === 'development'
//         ? ['query', 'error', 'warn']
//         : ['error'],
//   });
//
// if (process.env.NODE_ENV !== 'production') {
//   global.prisma = prisma;
// }

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
export { prisma };
