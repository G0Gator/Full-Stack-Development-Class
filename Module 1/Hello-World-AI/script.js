const nameInput = document.getElementById('name-input');
const greetButton = document.getElementById('greet-btn');
const greeting = document.getElementById('greeting');

function updateGreeting() {
  const name = nameInput.value.trim();

  if (!name) {
    greeting.textContent = 'Please enter your name to begin.';
    greeting.style.color = '#f8d36a';
    return;
  }

  greeting.textContent = `Hello, ${name}! Welcome to the future of AI.`;
  greeting.style.color = '#64f0ff';
}

greetButton.addEventListener('click', updateGreeting);
nameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateGreeting();
  }
});
