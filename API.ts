import axios from 'axios'
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

(() => {
    axios.get('https://swapi.dev/api/people/?page=5&format=json')
        .then((response) => {
            // aqui acessamos o corpo da resposta:
            response.data.results.forEach(async (element: any) => {
                await prisma.characters.create({
                    data: element
                })
            })
        })
        .catch(function (error) {
            // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
            console.log(error);
        })
})()