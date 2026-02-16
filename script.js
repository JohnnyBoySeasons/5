const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameActive = false;
let score = 0;
let keys = {};

// Player Data
let qb = { x: 100, y: 200, w: 20, h: 25 };
let receiver = { x: 120, y: 150, vx: 0, vy: 0, route: 'straight' };
let ball = { x: 100, y: 200, active: false, targetX: 0, targetY: 0 };

window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

function setPlay(type) {
    gameActive = true;
    if(type === 'hailMary') { receiver.vx = 4; receiver.vy = 0; }
    if(type === 'slant') { receiver.vx = 3; receiver.vy = 2; }
}

function update() {
    if (!gameActive) return;

    // Movement WASD
    if (keys["KeyW"]) qb.y -= 3;
    if (keys["KeyS"]) qb.y += 3;
    if (keys["KeyA"]) qb.x -= 3;
    if (keys["KeyD"]) qb.x += 3;

    // Receiver Movement
    receiver.x += receiver.vx;
    receiver.y += receiver.vy;

    // Throwing (Space)
    if (keys["Space"] && !ball.active) {
        ball.active = true;
        ball.x = qb.x;
        ball.y = qb.y;
        
        // CATCH LOGIC (75% CHANCE)
        setTimeout(() => {
            if (Math.random() < 0.75) {
                score++;
                document.getElementById('score').innerText = score;
                alert("CAUGHT BY JOHNNY BOI #12!");
            } else {
                alert("DROPPED! Too high or too low.");
            }
            resetPlay();
        }, 1000);
    }
}

function resetPlay() {
    gameActive = false;
    ball.active = false;
    qb.x = 100; qb.y = 200;
    receiver.x = 120; receiver.y = 150;
}

function draw() {
    ctx.clearRect(0,0,800,400);
    // Draw Grass Lines
    ctx.fillStyle = "white";
    for(let i=0; i<800; i+=80) ctx.fillRect(i, 0, 2, 400);

    // Draw QB
    ctx.fillStyle = "blue";
    ctx.fillRect(qb.x, qb.y, qb.w, qb.h);

    // Draw Receiver
    ctx.fillStyle = "red";
    ctx.fillRect(receiver.x, receiver.y, 20, 25);
    
    update();
    requestAnimationFrame(draw);
}
draw();