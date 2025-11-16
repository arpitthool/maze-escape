import MazeMap from './MazeMap.ts';
import Player from './Player.ts';
import { Direction } from './Player.ts';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

if (!ctx) {
  throw new Error('Could not get context');
}

const status = document.getElementById('status') as HTMLSpanElement;
status.textContent = 'Navigate to the red circle to escape!';

const tileSize = 32;

const mazeMap = new MazeMap(tileSize, ctx);
mazeMap.setCanvasSize();

const startPosition = mazeMap.getStartPosition();
const player = new Player(startPosition.x, startPosition.y, tileSize, ctx, mazeMap);

let gameWon = false;
let gameStarted = false;

window.addEventListener('keydown', (event) => {
  if (gameWon) return;
  
  if (!gameStarted) {
    gameStarted = true;
  }

  if (event.key === 'ArrowUp') {
    player.changeDirection(Direction.UP);
  }
  if (event.key === 'ArrowDown') {
    player.changeDirection(Direction.DOWN);
  }
  if (event.key === 'ArrowLeft') {
    player.changeDirection(Direction.LEFT);
  }
  if (event.key === 'ArrowRight') {
    player.changeDirection(Direction.RIGHT);
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mazeMap.draw();
  
  if (!gameWon) {
    player.move();
    
    if (player.checkWinCondition()) {
      gameWon = true;
      status.textContent = '🎉 You Escaped! Congratulations! 🎉';
      status.style.color = '#00ff00';
    }
  }
  
  player.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

