import { Prisma, PrismaClient } from "@prisma/client"
import express from 'express'

const app = express()
const prisma = new PrismaClient()
const port = 3000

//Create
//ship: String containing the NAME of the ship to create
//characters: String containing the name of the characters (separated by commas) to include in the crew
app.get('/create/:ship/:characters', async (req, res) => {
    try {
        const checkShip = await prisma.starships.findFirst({
            where: { name: req.params.ship }
        })
        var characterList = req.params.characters.split(',')
        const post = await prisma.crews.create({
            data: {
                starship: checkShip,
                members: characterList
            },
        })
        res.send('posted')
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                console.log('Unique constraint violation')
            }
        }
        res.send("Ship or crewmember already assigned")
    }
})

//Read All
//collection: String containing the collection to search (starships, characters, crews)
app.get('/read/:collection/', async (req, res) => {
    try {
        switch (req.params.collection.toLowerCase()) {
            case "starships":
                const shipList = await prisma.starships.findMany()
                res.json(shipList)
                break;
            case "characters":
                const characterList = await prisma.characters.findMany()
                res.json(characterList)
                break;
            case "crews":
                const crewList = await prisma.crews.findMany()
                res.json(crewList)
                break;
            default:
                res.send("Invalid Collection")
                break;
        }
    } catch (error) {
        res.send(error)
    }
})

//Read by ID
//collection: String containing the collection to search (starships, characters, crews)
//id: String containing the id of the object to read
app.get('/read/:collection/:id', async (req, res) => {
    switch (req.params.collection.toLowerCase()) {
        case "starships":
            const shipList = await prisma.starships.findFirst({
                where: { id: req.params.id }
            })
            res.json(shipList)
            break;
        case "characters":
            const characterList = await prisma.characters.findFirst({
                where: { id: req.params.id }
            })
            res.json(characterList)
            break;
        case "crews":
            const crewList = await prisma.crews.findFirst({
                where: { id: req.params.id }
            })
            res.json(crewList)
            break;
        default:
            res.send("Invalid Collection or ID")
            break;
    }
})

//Update
//id: String containing the id of the object that you wish to update
//field: String containing that you wish to update (starship or members)
//newValue: String containing the new value for the field
app.get('/update/:id/:field/:newValue', async (req, res) => {
    var update
    switch (req.params.field.toLowerCase()) {
        case "starship":
            try {
                const checkShip = await prisma.starships.findFirst({
                    where: { name: req.params.newValue }
                })
                update = await prisma.crews.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        starship: checkShip
                    }
                })
                res.json(update);
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        console.log('Unique constraint violation')
                    }
                }
                res.send("This ship is already owned by another crew")
            }
            break;
        case "members":
            try {
                var characterList = req.params.newValue.split(',')
                update = await prisma.crews.update({
                    where: {
                        id: req.params.id
                    },
                    data: {
                        members: characterList
                    }
                })
                res.json(update);
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        console.log('Unique constraint violation')
                    }
                }
                res.send("At least one of those members is already in another crew")
            }
            break;
        default:
            res.send("Invalid Field")
            break;
    }

})

//Delete
//id: String containing the id of the object that you wish to delete
app.get('/delete/:id', async (req, res) => {
    try {
        const deleteId = await prisma.crews.delete({
            where: { id: req.params.id },
        })
        res.send("id " + req.params.id + " deleted");
    } catch (error) {
        res.send("id " + req.params.id + " not found");
    }
})

app.listen(port, () => {
    console.log(`Express listening on port ${port}`)
})