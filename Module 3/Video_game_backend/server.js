const express = require('express');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.static('public'));

let games = [
  { id: 1, title: 'Minecraft', genre: 'Sandbox', rating: 9, completed: true },
  { id: 2, title: 'Fortnite', genre: 'Battle Royale', rating: 8, completed: false },
  { id: 3, title: 'The Legend of Zelda', genre: 'Adventure', rating: 10, completed: true }
];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/games', (req, res) => {
  res.json(games);
});

app.get('/api/games/:id', (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));

  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  res.json(game);
});

app.post('/api/games', (req, res) => {
  const { title, genre, rating, completed } = req.body;

  if (!title || !genre || rating === undefined || completed === undefined) {
    return res.status(400).json({ message: 'Title, genre, rating, and completed are required' });
  }

  const game = {
    id: games.length ? games[games.length - 1].id + 1 : 1,
    title,
    genre,
    rating,
    completed
  };

  games.push(game);
  res.status(201).json(game);
});

app.put('/api/games/:id', (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));

  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  const { title, genre, rating, completed } = req.body;

  if (!title || !genre || rating === undefined || completed === undefined) {
    return res.status(400).json({ message: 'Title, genre, rating, and completed are required' });
  }

  game.title = title;
  game.genre = genre;
  game.rating = rating;
  game.completed = completed;

  res.json(game);
});

app.delete('/api/games/:id', (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));

  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  games = games.filter(g => g.id !== parseInt(req.params.id));
  res.json({ message: 'Game deleted', game });
});

app.listen(port, () => {
  console.log(`Video game backend listening on port ${port}...`);
});
