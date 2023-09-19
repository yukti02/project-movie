const express = require('express')
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
};

const prisma = new PrismaClient();

const server = express()

server.use(cors(corsOptions));

server.use(express.json())
server.listen(5432, () => console.log('Server is running'))


// get all the movies
server.get('/movies', async (req, res) => {
  const moviesList = await prisma.movies.findMany();
  res.status(200).json(moviesList);
});

// Get a movie by ID
server.get('/movies/:id', async (req, res) => {
  const movieId = parseInt(req.params.id);

  try {
    const movie = await prisma.movies.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a movie by ID
// server.delete('/movies/:id', async (req, res) => {
//   const movieId = parseInt(req.params.id);

//   try {
//     const movie = await prisma.movies.findUnique({
//       where: { id: movieId },
//     });

//     if (!movie) {
//       return res.status(404).json({ error: 'Movie not found' });
//     }
//     await prisma.movies.delete({
//       where: { id: movieId },
//     });

//     res.status(204).send({ message: 'Movie removed' });
//   } catch (error) {
//     console.error('Error deleting movie by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });