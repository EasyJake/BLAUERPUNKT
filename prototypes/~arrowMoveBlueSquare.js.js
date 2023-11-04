// Set up the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  color: 'blue',
  speed: 5
};

const opponent = {
  x: 0,
  y: 50,
  width: 50,
  height: 50,
  color: 'red',
  speed: 3,
  dx: 3 // change in position along x-axis
};

// Key press variables
const keys = {
  right: false,
  left: false,
  up: false,
  down: false
};

// Event listeners for keydown and keyup
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowRight') keys.right = true;
  if (event.key === 'ArrowLeft') keys.left = true;
  if (event.key === 'ArrowUp') keys.up = true;
  if (event.key === 'ArrowDown') keys.down = true;
});

document.addEventListener('keyup', function(event) {
  if (event.key === 'ArrowRight') keys.right = false;
  if (event.key === 'ArrowLeft') keys.left = false;
  if (event.key === 'ArrowUp') keys.up = false;
  if (event.key === 'ArrowDown') keys.down = false;
});

// Function to update game objects
function update() {
  // Move player
  if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;
  if (keys.left && player.x > 0) player.x -= player.speed;
  if (keys.up && player.y > 0) player.y -= player.speed;
  if (keys.down && player.y < canvas.height - player.height) player.y += player.speed;

  // Move opponent
  opponent.x += opponent.dx;
  if (opponent.x + opponent.width > canvas.width || opponent.x < 0) {
    opponent.dx *= -1; // Change direction
  }
}

// Function to draw game objects
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw opponent
  ctx.fillStyle = opponent.color;
  ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
}

// Main game loop
function loop() {
  update();
  draw();
  
  requestAnimationFrame(loop);
}

// Start the game loop
requestAnimationFrame(loop);
