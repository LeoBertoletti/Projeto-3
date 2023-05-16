import { PrismaClient } from "@prisma/client"
import express from 'express'
import axios from 'axios'

const app = express()
const prisma = new PrismaClient()
const port = 3000
var contador = 0

app.get('/', async (req, res) => {
    const crewList = await prisma.crews.findMany()
    res.json(crewList)
})

app.post('/', async (req, res) => {
    const post = await prisma.crews.create({
        data: {
            ship: `teste${contador}`
            //author: { connect: { email: authorEmail } },
        },
    })
    res.json('posted')
    contador++
})

app.delete('/', async (req, res) => {

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})