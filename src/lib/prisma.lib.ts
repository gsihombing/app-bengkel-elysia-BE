// Prisma Connection
import { PrismaClient } from "../prisma/generated/prisma";

const prisma = new PrismaClient({
    errorFormat: 'minimal',
})

export default prisma;