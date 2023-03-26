import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ datasources: {  db: { url: "postgresql://postgres:admin@localhost:5432/pizzaria?schema=public" } } })

export default prisma;