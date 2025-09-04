const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = { x: 50, y: 250, width: 40, height: 40, dy: 0 };
const obstacles = [];
let score = 0;
let gameOver = false;

canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  if(touch.clientY < canvas.height / 2) player.dy = -5;
  else player.dy = 5;
});

canvas.addEventListener('touchend', () => {
  player.dy = 0;
});

function createObstacle() {
  const height = Math.random() * 100 + 20;
  const y = Math.random() * (canvas.height - height);
  obstacles.push({ x: canvas.width, y: y, width: 20, height: height });
}

function update() {
  if(gameOver) return;

  player.y += player.dy;
  if(player.y < 0) player.y = 0;
  if(player.y + player.height > canvas.height) player.y = canvas.height - player.height;

  for(let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 5;

    if(obstacles[i].x + obstacles[i].width > player.x &&
       obstacles[i].x < player.x + player.width &&
       obstacles[i].y + obstacles[i].height > player.y &&
       obstacles[i].y < player.y + player.height) {
      gameOver = true;
    }
  }

  if(Math.random() < 0.02) createObstacle();

  score += 1;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = 'green';
  obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.width, obs.height));

  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);

  if(gameOver){
    ctx.fillStyle = 'black';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over', 100, 300);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();