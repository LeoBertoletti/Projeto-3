import { PrismaClient } from "@prisma/client"
import express from 'express'

const app = express()
const prisma = new PrismaClient()
const port = 3000

//Create
app.get('/create/', async (req, res) => {
    const post = await prisma.crews.create({
        data: {
            ship: `teste`
            //author: { connect: { email: authorEmail } },
        },
    })
    res.send('posted')
})


//Read
app.get('/read/', async (req, res) => {
    const crewList = await prisma.crews.findMany()
    res.json(crewList)
})

//Update
//app.patch('/update/:id/:field/:newValue', async (req, res) => {
//    const teste = req.params.field
//    const update = await prisma.crews.update({
//        where: {
//            id: req.params.id
//        },
//        data: {
//            req.params.field: String(req.params.newValue)
//},
//    })
//})

//Delete
app.get('/delete/:id', async (req, res) => {
    const deleteId = await prisma.crews.delete({
        where: { id: req.params.id },
    })
    res.send("id " + req.params.id + " deleted");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})