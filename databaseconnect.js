const fs = require('fs');
const data = JSON.parse(fs.readFileSync('movies.json', 'utf8'));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
    
async function insertData() {
        const createdData = await prisma.movies.createMany({
            data: data.map((item) => ({
                name: item.name,
                releaseyear: item.releaseyear,
                rating: item.rating,
                reviewscount: item.reviewscount
            })),
        });
        console.log('Data inserted successfully:', createdData);
}

insertData();

