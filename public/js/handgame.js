let canvas;
let moveb;
let getpoint = [];
let geted = [];
let point = [];
let gametimer = 20;
let gamestart = false;
let gamealready = false;
let gameend = false;
let time_game = 30;
let gamer = 0;
let score = 0;

let sketch = function (p) {
    p.setup = function () {
        canvas = p.createCanvas(400, 600);
        canvas.parent('gameframe');
        p.frameRate(30);
        for (var i = 0; i < 40; i++) {
            point.push(i);
        }
        moveb = new movebox(180, 590);
        p.colorMode(p.HSB);
    }
    p.draw = function () {
        p.clear();
        console.log("!");
        p.background('black');
        p.textAlign(p.CENTER);
        p.fill("white");
        p.textFont("PressStart2P");
        p.text('remove hands = stop', 120, 30);
        p.text('time', 280, 12);
        p.text(time_game, 280, 35);
        p.text('score', 360, 12);
        p.text(score, 360, 35);
        p.rect(0, 50, 400, 10);
        if (check1 != 2 && check2 != 2) {
            gamestart = true;
            gamealready = true;
        }
        if (check1 == 2 || check2 == 2) {
            gamestart = false;
        }
        if (!gamestart && gamealready && !gameend) {
            p.stop();
        }
        if (gamestart && !gameend) {
            p.drawgame();
        }
        if (!gamealready && !gameend) {
            p.startgame();
        }
        if (gameend) {
            p.endgame();
        }
    }
    p.drawgame = function () {
        moveb.show(p);
        if (check1 === 0 && check2 === 1) {
            if (moveb.i == 360) {
                moveb.i = moveb.i;
            }
            else {
                moveb.i += 15;
            }
        }
        if (check1 === 1 && check2 === 0) {
            if (moveb.i == 0) {
                moveb.i = moveb.i;
            }
            else {
                moveb.i -= 15;
            }
        }
        if (gametimer == 20) {
            var ran = Math.random() * point.length;
            var locatex = Math.floor(ran);
            var K = new obstacle(point[locatex] * 10, 50);
            // console.log(point[locatex] * 10);
            geted.push(point[locatex]);
            getpoint.push(K);
            gametimer = 0
            point.splice(locatex, 1);
        }
        for (var num = 0; num < getpoint.length; num++) {
            getpoint[num].show(p);
            getpoint[num].down();
            if (getpoint[num].j == 590 || getpoint[num].j == 580) {
                if (getpoint[num].i + 10 > moveb.i && getpoint[num].i < moveb.i + moveb.width) {
                    score++;
                    getpoint.shift();
                    point.push(geted.shift());
                }
            }
            if (getpoint[num].j == 600) {
                getpoint.shift();
                point.push(geted.shift());
            }
        }

        if (gamer === 20) {
            time_game--;
            gamer = 0;
        }
        if (time_game === -1) {
            gameend = true;
        }
        gamer++;
        gametimer++;
    }
    p.startgame = function () {
        p.textAlign(p.CENTER);
        p.fill("white");
        p.textFont("PressStart2P");
        p.text('Put your hands in front of', p.width / 2, p.height / 2);
        p.text('the screen and start', p.width / 2, p.height / 2 + 20);
        p.text('get 20!', p.width / 2, p.height / 2 + 40);
    }
    p.stop = function () {
        p.textAlign(p.CENTER);
        p.fill("white");
        p.textFont("PressStart2P");
        p.text('Game Stop', p.width / 2, p.height / 2);
    }
    p.endgame = function () {
        p.textAlign(p.CENTER);
        p.fill("white");
        p.textFont("PressStart2P");
        p.text('Time' + "'" + 's up', p.width / 2, p.height / 2);
        if (score >= 20) {
            p.text('you get 60%off discount coupon', p.width / 2, p.height / 2 + 20);
        }
        else {
            p.text('hard work but not achieved 20', p.width / 2, p.height / 2 + 20);
        }
        p.text('click return', p.width / 2, p.height / 2 + 60);
        p.noloop();
        camera.stop();
    }
}
let myp5 = new p5(sketch);