import { PrismaClient } from "@prisma/client";


export const db = globalThis.prima || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prima = db;
}
