let cols, rows;
let w = 40;
let T;
let first = true;
let status1 = 0;
let stack1 = [];
let stack2 = [];
let goal_temp;
let goal;
let layer1;
let layer2;
let layer3;
let grid = [];
let current;
let stack = [];
let first_start = true;
let player1;
let player1_temp;
let K = true;
let timer1 = 0;
let layer4;
let timer2 = 0;
let changesize = true;
const slot_frames = [],
  NUM_FRAMES = 10,
  timer = {
    delay: 2100,
    // spd: 10,
    inc: 0,
    nextTimer: 0,
    slowDown: 10000,
  };

let currentFrame1 = Math.floor(Math.random() * NUM_FRAMES);
let food = [];
let choose1 = [];
var button1;
function makeframe(name, colorback, colorstroke, text, colortext) {
  name.background(0);
  name.textFont("PressStart2P")
  name.textAlign(CENTER);
  name.fill(colorback);
  name.stroke(colorstroke);
  name.strokeWeight(10)
  name.rect(5, 5, 390, 70);
  name.noStroke();
  name.textSize(30);
  name.fill(colortext);
  name.text(text, 200, 55);

}
let nineoff;
let eightoff;
let sevenoff;
let free;
let mapWW;
let tw = true;
function reset() {
  grid.length = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
}
function start() {
  background(111, 143, 175);
  fill(255);
  if (timer2 % 20 === 0) {
    if (changesize) {
      textSize(18);
      changesize = false;
    }
    else {
      textSize(14);
      changesize = true;
    }
  }
  timer2++;
  textAlign(CENTER);
  text('WELCOME TO MY MAZE GAME', width / 2, height / 2)
  text('click to start', width / 2, height / 2 + 20);
  if (first_start) {
    reset();
    first_start = false;
  }
}
function gamego() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
    if (!K && first) {
      if (grid[i].wall === 3 && grid[i].i > 2 * cols / 3 && grid[i].j > 2 * rows / 3) {
        append(stack1, grid[i]);
      }
    }
    if (!K && first) {
      if (grid[i].wall === 2 && grid[i].i < cols / 3 && grid[i].j < rows / 3) {
        append(stack2, grid[i]);
      }
    }
  }
  current.visited = true;
  // STEP 1
  let next = current.checkNeighbors();
  if (K) {
    current.highlight();
    if (next) {
      next.visited = true;

      // STEP 2
      stack.push(current);

      // STEP 3
      removeWalls(current, next);

      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    }
    else {
      K = false;
    }
  }
  else {
    status1 = 2;
  }
}
let timer4 = 0;
let Fontposition = 0;
function gameon() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  timer1++;
  if (first) {
    goal_temp = random(stack1);
    player1_temp = random(stack2);
    goal = new goal_point(goal_temp.i + 1 / 2, goal_temp.j + 1 / 2);
    player1 = new player(player1_temp.i + 1 / 2, player1_temp.j + 1 / 2);
    goal.show();
    player1.show();
    first = false;
  }
  else {
    goal.show();
    player1.show();
  }
  layer2.clear();
  layer3.copy(T, 0, 0, width, height,
    0, 0, layer3.width, layer3.height);
  layer4 = layer3.get();
  layer2.ellipse(player1.i * w, player1.j * w, 2 * w);
  layer4.mask(layer2);
  if (timer1 >= 30) {
    player1.start = true;
    image(layer1, 0, 0);
    image(layer4, 0, 0);
  }
}
function end() {
  background(112, 41, 99);
  fill(255);
  console.log(food[currentFrame1]);
  switch (food[currentFrame1]) {
    case 'one':
      textAlign(CENTER);
      text('you get 10%off discount coupon', width / 2, height / 2);
      break;
    case 'two':
      textAlign(CENTER);
      text('you get 20%off discount coupon', width / 2, height / 2)
      break;
    case 'three':
      textAlign(CENTER);
      text('you get 30%off discount coupon', width / 2, height / 2)
      break;
    case 'four':
      textAlign(CENTER);
      text('you get free discount coupon', width / 2, height / 2)
      break;
  }
  text('click return', width / 2, height / 2 + 50);
  noloop();
}
function bonus() {
  background(51);
  imageMode(CENTER);
  clear();
  textFont("PressStart2P");
  background("black");
  let layer4 = createGraphics(600, 200);
  layer4.background('black');
  layer4.fill('white');
  layer4.textSize(80);
  layer4.textFont("PressStart2P");
  layer4.textStyle(NORMAL);
  var fontw = layer4.textWidth("bonus");
  if (Fontposition === 600) {
    Fontposition = 0;
    console.log("!");
  }
  if (fontw + Fontposition > 600) {
    layer4.text("bonus", Fontposition - 600, 150);
    layer4.text("bonus", Fontposition, 150);
  }
  else {
    layer4.text("bonus", Fontposition, 150);
  }
  if (timer4 == 10) {
    Fontposition += 10;
    timer4 = 0;
  }
  timer4++;
  if (tw) {
    let KK = ["one", "one", "one", "one", "two", "two", "two", "three", "three", "four"];
    while (KK.length != 0) {
      var KL = int(random(0, KK.length));
      food.push(KK[KL]);
      KK.splice(KL, 1);
    }
    tw = false;
  }
  let c = color(255, 204, 0);
  let d = color(111, 78, 55);
  nineoff = createGraphics(400, 80);
  nineoff.position(width / 2, height / 2);
  makeframe(nineoff, 'rgb(155, 83, 156)', c, "10%off", "white");
  mapWW.set("one", nineoff);
  eightoff = createGraphics(400, 80);
  makeframe(eightoff, 'rgb(0,0,255)', c, "20%off", "white");
  mapWW.set("two", eightoff);
  sevenoff = createGraphics(400, 80);
  makeframe(sevenoff, d, c, "30%off", "white");
  mapWW.set("three", sevenoff);
  free = createGraphics(400, 80);
  makeframe(free, 'magenta', c, "free", "white");
  mapWW.set("four", free);
  mapWW.get(food[currentFrame1]).textFont("PressStart2P");
  image(mapWW.get(food[currentFrame1]), width * 0.5, height * 0.5);
  if (timer.delay != 2100) {
    if (millis() > timer.nextTimer) {
      timer.inc += 10;

      if (timer.inc >= timer.slowDown + 50) {
        timer.delay = 2100;
      } else if (timer.inc >= timer.slowDown + 20) {
        timer.delay += 250;
      } else if (timer.inc >= timer.slowDown) {
        timer.delay += 100;
      }

      currentFrame1++;

      if (currentFrame1 >= food.length) {
        currentFrame1 = 0;
      }
      timer.nextTimer = millis() + timer.delay;
    }

  }
  else if (timer.delay == 2100 && button1.checked == 2) {
    status1 = 3;
  }
  image(layer4, 300, 100, 600, 200);
  button1.show();
}
function setup() {
  T = createCanvas(600, 600);
  T.parent('maze');
  cols = floor(width / w);
  rows = floor(height / w);
  layer1 = createGraphics(width, height);
  layer2 = createGraphics(width, height);
  layer3 = createGraphics(width, height);
  layer1.background(51);
  textFont("PressStart2P");
  mapWW = new p5.TypedDict();
  timer.nextTimer = millis() + timer.delay;
  button1 = new button(0.5, 0.85);
}

function draw() {
  clear();
  if (status1 === 0) {
    start();
  }
  else if (status1 === 1) {
    gamego();
  }
  else if (status1 === 2) {
    gameon();
  }
  else if (status1 === 3) {
    end();
  }
  else if (status1 === 4) {
    bonus();
  }
}
function mousePressed() {
  if (status1 == 0) {
    status1 = 1
  }
  if (press(button1)) {
    if (button1.checked == 0) {
      button1.txt = 'stop';
      timer.delay = 100;
      timer.spd = 10;
      timer.inc = 0;
      timer.nextTimer = 0;
      timer.slowDown = 10000;
      button1.checked = 1;
    } else if (button1.checked == 1) {
      button1.txt = 'wait';
      timer.delay = 100;
      timer.spd = 10;
      timer.inc = 0;
      timer.nextTimer = 0;
      timer.slowDown = Math.random() * (80 - 120) + 80;
      button1.checked = 2;
    }
  }
}
function player(i, j) {
  this.i = i;
  this.j = j;
  this.start = false;
  this.show = function () {
    let x = this.i;
    let y = this.j;
    noStroke();
    fill(255, 255, 0, 100);
    circle(x * w, y * w, w / 2);
  }
}
function goal_point(i, j) {
  this.i = i;
  this.j = j;
  this.show = function () {
    let x = this.i;
    let y = this.j;
    noStroke();
    fill(34, 139, 34);
    circle(x * w, y * w, w / 2);
  }
}
function keyPressed() {
  if (player1.start) {
    if (keyCode === 37) {
      if (!grid[index(player1.i - 1 / 2, player1.j - 1 / 2)].walls[3]) {
        player1.i -= 1;
      }
    } else if (keyCode === 39) {
      if (!grid[index(player1.i - 1 / 2, player1.j - 1 / 2)].walls[1]) {
        player1.i += 1;
      }
    }
    else if (keyCode === 38) {
      if (!grid[index(player1.i - 1 / 2, player1.j - 1 / 2)].walls[0]) {

        player1.j -= 1;
      }
    }
    else if (keyCode === 40) {
      if (!grid[index(player1.i - 1 / 2, player1.j - 1 / 2)].walls[2]) {
        player1.j += 1;
      }
    }
    if (player1.i === goal.i && player1.j === goal.j) {
      status1 = 4;
    }
  }
}
function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}
function press(buttonX) {
  return (mouseX > buttonX.x - buttonX.w * 0.5) && (mouseX < buttonX.x + buttonX.w * 0.5) && (mouseY > buttonX.y - buttonX.h * 0.5) && (mouseY < buttonX.y + buttonX.h * 0.5);
}
function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
function button(i, j) {
  this.x = width * i,
    this.y = height * j,
    this.w = 80;
  this.h = 40;
  this.txt = 'start';
  this.show = function () {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
    rect(this.x, this.y, 80, 40);
    textSize(18);
    noStroke();
    fill(255, 255, 255);
    text(this.txt, this.x, this.y);
  }
  this.checked = 0;
  this.press = (mouseX > this.x - this.w * 0.5) && (mouseX < this.x + this.w * 0.5) && (mouseY > this.y - this.h * 0.5) && (mouseY < this.y + this.h * 0.5);
}
