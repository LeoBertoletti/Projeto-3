import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function teste() {
    await prisma.crews.create({
        data: {
            ship: 'teste'
        }
    })
}

teste()