let canvasEl: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

window.onload = () => {
  canvasEl = <HTMLCanvasElement>document.getElementById('gc');
  ctx = <CanvasRenderingContext2D>canvasEl.getContext('2d');
  document.addEventListener('keydown', keyPush);
  setInterval(game, 1000 / 15);
};

let px = 10;
let py = 10;
const gs = 20;
const tc = 20;
let ax = 15;
let ay = 15;
let xv = 0;
let yv = 0;
let tail = 5;
const trail: { x: number; y: number }[] = [];

function game() {
  px += xv;
  py += yv;
  if (px < 0) {
    px = tc - 1;
  }
  if (px > tc - 1) {
    px = 0;
  }
  if (py < 0) {
    py = tc - 1;
  }
  if (py > tc - 1) {
    py = 0;
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

  ctx.fillStyle = 'lime';

  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);

    if (trail[i].x === px && trail[i].y === py) {
      tail = 5;
    }
  }

  trail.push({ x: px, y: py });

  while (trail.length > tail) {
    trail.shift();
  }

  if (ax === px && ay === py) {
    tail++;
    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * tc);
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function keyPush(evt: KeyboardEvent) {
  switch (evt.key ?? evt.code) {
    case 'ArrowLeft':
      xv = -1;
      yv = 0;
      break;
    case 'ArrowUp':
      xv = 0;
      yv = -1;
      break;
    case 'ArrowRight':
      xv = 1;
      yv = 0;
      break;
    case 'ArrowDown':
      xv = 0;
      yv = 1;
      break;
    default:
      break;
  }
}
