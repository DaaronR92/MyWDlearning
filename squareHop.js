// squareHop.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size (match the size in your CSS)
canvas.width = 1300;
canvas.height = 750;

// Rectangle (player) properties
const rectangle = {
  x: 350, // Position left of center
  y: canvas.height - 80, // Start at the bottom
  width: 40,  // Narrower width for standing
  height: 110, // Taller height for standing
  color: '#FF0000',
  velocityY: 0,  // Vertical speed
  gravity: 0.8,  // Simulate gravity
  jumpPower: -24, // Jump higher (more negative means higher jump)
  isJumping: false // To prevent double jumps
};

// Obstacle properties
const obstacles = [];
const obstacleWidth = 30;
const obstacleHeight = 30;
const obstacleSpeed = 4; // Speed at which obstacles move

// Function to create obstacles
function spawnObstacle() {
  const obstacle = {
    x: canvas.width, // Start at the right edge
    y: canvas.height - obstacleHeight, // Align with the floor
    width: obstacleWidth,
    height: obstacleHeight,
    color: '#000000'
  };
  obstacles.push(obstacle);
}

// Function to draw obstacles
function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

// Function to update obstacle positions and remove them when off-screen
function updateObstacles() {
  obstacles.forEach((obstacle, index) => {
    obstacle.x -= obstacleSpeed; // Move obstacle to the left

    // Remove the obstacle if it moves off the screen
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1); // Remove this obstacle from the array
    }
  });
}

// Function to draw the player's rectangle
function drawRectangle() {
  ctx.fillStyle = rectangle.color;
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}

// Function to update the player's rectangle
function updateRectangle() {
  // Apply gravity
  rectangle.velocityY += rectangle.gravity;
  rectangle.y += rectangle.velocityY;

  // Prevent falling through the floor
  if (rectangle.y + rectangle.height >= canvas.height) {
    rectangle.y = canvas.height - rectangle.height;
    rectangle.velocityY = 0;
    rectangle.isJumping = false; // Reset jumping
  }
}

// Main game update loop
function update() {
  // Clear the canvas for redrawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw the player's rectangle
  updateRectangle();
  drawRectangle();

  // Update and draw obstacles
  updateObstacles();
  drawObstacles();

  // Continuously update the canvas
  requestAnimationFrame(update);
}

// Jump function
function jump() {
  if (!rectangle.isJumping) {
    rectangle.velocityY = rectangle.jumpPower;
    rectangle.isJumping = true;
  }
}

// Event listener for space bar
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    jump();
  }
});

// Spawn obstacles every 2 seconds
setInterval(spawnObstacle, 2000);

// Start the game loop
update();