const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation");
const ghostFrames = document.getElementById("ghosts");

const createElement = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};

const createNewPacman = () => {
  return new Pacman(
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize / 5
  );
};

const fps = 30;
const oneBlockSize = 20;
const wallSpaceWidth = oneBlockSize / 1.6;
const wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
const wallInnerColor = "black";

const MAP_WALL = 1;
const MAP_PATH = 2;
const MAP_VOID = 0;

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const draw = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  createElement(0, 0, canvas.width, canvas.height, "black");
  drawWalls();
};

const drawWalls = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      const isWall = map[i][j] == MAP_WALL;

      if (isWall) {
        createElement(
          j * oneBlockSize,
          i * oneBlockSize,
          oneBlockSize,
          oneBlockSize,
          "#342DCA"
        );

        if (j > 0 && map[i][j - 1] == 1) {
          createElement(
            j * oneBlockSize,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor
          );
        }

        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
          createElement(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor
          );
        }

        if (i < map.length - 1 && map[i + 1][j] == 1) {
          createElement(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize + wallOffset,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor
          );
        }

        if (i > 0 && map[i - 1][j] == 1) {
          createElement(
            j * oneBlockSize + wallOffset,
            i * oneBlockSize,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor
          );
        }
      }
    }
  }
};

const pacman = createNewPacman();

const createGhosts = () => {
  ghosts = [];
  for (let i = 0; i < ghostCount; i++) {
    let newGhost = new Ghost(
      9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
      10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
      oneBlockSize,
      oneBlockSize,
      pacman.speed / 2,
      ghostImageLocations[i % 4].x,
      ghostImageLocations[i % 4].y,
      124,
      116,
      6 + i
    );
    ghosts.push(newGhost);
  }
};

const ghostCount = 4;
const ghostImageLocations = [
  { x: 0, y: 0 },
  { x: 176, y: 0 },
  { x: 0, y: 121 },
  { x: 176, y: 121 },
];
const randomTargetsForGhosts = [
  new Mobile(1 * oneBlockSize, 1 * oneBlockSize, oneBlockSize, oneBlockSize, 0),
  new Mobile(
    1 * oneBlockSize,
    (map.length - 2) * oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    0
  ),
  new Mobile(
    (map[0].length - 2) * oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    0
  ),
  new Mobile(
    (map[0].length - 2) * oneBlockSize,
    (map.length - 2) * oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    0
  ),
];

createGhosts();

const update = () => {
  pacman.moveProcess();
  updateGhosts();
};

const gameLoop = () => {
  update();
  draw();
  drawGhosts();
  pacman.draw();
};

const gameInterval = setInterval(gameLoop, 1000 / fps);

gameLoop();

window.addEventListener("keydown", (event) => {
  const keyPressed = event.key;
  setTimeout(() => {
    if (keyPressed == "a" || keyPressed == "ArrowLeft") {
      pacman.nextDirection = DIRECTION_LEFT;
    } else if (keyPressed == "w" || keyPressed == "ArrowUp") {
      pacman.nextDirection = DIRECTION_UP;
    } else if (keyPressed == "d" || keyPressed == "ArrowRight") {
      pacman.nextDirection = DIRECTION_RIGHT;
    } else if (keyPressed == "s" || keyPressed == "ArrowDown") {
      pacman.nextDirection = DIRECTION_BOTTOM;
    }
  }, 1);
});
