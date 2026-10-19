const gameList = document.getElementById('game-list');
const gameForm = document.getElementById('game-form');

async function loadGames() {
  const response = await fetch('/api/games');
  const games = await response.json();

  gameList.innerHTML = '';

  games.forEach(game => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${game.title}</strong><br>
      Genre: ${game.genre}<br>
      Rating: ${game.rating}/10<br>
      Completed: ${game.completed ? 'Yes' : 'No'}
      <div>
        <button class="delete-btn" data-id="${game.id}">Delete</button>
      </div>
    `;
    gameList.appendChild(li);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const id = button.getAttribute('data-id');
      const confirmed = window.confirm('Are you sure you want to delete this game?');

      if (confirmed) {
        await fetch(`/api/games/${id}`, { method: 'DELETE' });
        loadGames();
      }
    });
  });
}

gameForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const game = {
    title: document.getElementById('title').value,
    genre: document.getElementById('genre').value,
    rating: Number(document.getElementById('rating').value),
    completed: document.getElementById('completed').checked
  };

  await fetch('/api/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game)
  });

  gameForm.reset();
  loadGames();
});

loadGames();
