import { Player } from "./ts/class/player.class";
import { CanvasObject } from "./ts/interface/object.interface";
import { Cursor } from "./ts/class/cursor.class";
import { Ground } from "./ts/class/ground.class";
import { Direction } from "./ts/enum/action.enum";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
const ctx = canvas.getContext("2d");
const cursor = new Cursor();
const corner = new Player(canvas.width, canvas.height, -10, -10);
const player = new Player(
  canvas.width / 3,
  canvas.height - canvas.height / 3,
  20,
  20
);
const ground = new Ground(
  0,
  canvas.height - canvas.height / 3,
  canvas.width,
  canvas.height - canvas.height / 3
);
const ground2 = new Ground(
  canvas.width / 3,
  canvas.height - canvas.height / 2,
  canvas.width - canvas.width / 5,
  canvas.height - canvas.height / 2
);

cursor.attach(player);
ground.attach(player);
ground2.attach(player);
const objects: CanvasObject[] = [player, ground, cursor, corner, ground2];

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  cursor.setPosition(mouseX, mouseY);
  if (ctx !== null) cursor.draw(ctx);
});

window.addEventListener("resize", () => {
  console.log(window.innerWidth);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
});

window.addEventListener("keydown", (event) => {
  if (event.code === Direction.Left) player.moveLeft();
  if (event.code === Direction.Right) player.moveRight();
  if (event.code === Direction.Up) player.jump();
});

window.addEventListener("keyup", (event: KeyboardEvent) => {
  console.log(event);
  if (event.code === Direction.Left || event.code === Direction.Right)
    player.stopX();
});

function draw(objects: CanvasObject[]) {
  ctx?.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  for (const object of objects) {
    if (ctx !== null) object.draw(ctx);
  }
}

function mainLoop() {
  draw(objects);
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
