var FPS = 100;
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var startButton = document.getElementById("startButton");
var playing = false;

var runGame;
var startGame;

var x = canvas.width / 2;
var y = 270;

var knifeWeight = 40;
var knifeHeight = 30;

var player = loadImage("man.png");
var playerWeight = 50;
var playerHeight = 70;

var knife = loadImage("knife.png");

var score = 0;
var finalScore = 0;

var spawnY = 28;
var spawnRate = 500;
var fallingSpawnRate = 0.5;
var lastSpawn = -1;
var objects = [];

function update() {
    if (playing === false) {
        animate();
        requestAnimationFrame(animate);
        checkCollisions();
    }
    if (playing === true) {
        cancelAnimationFrame(animate);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawScore();
}

function drawPlayer() {
    ctx.drawImage(player, x, y, playerHeight, playerWeight);
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function spawnObject() {
    var t;
    var object = {
        type: t,
        x: Math.random() * (canvas.width - 30) + 15,
        y: spawnY
    };
    objects.push(object);
}

function animate() {
    var time = Date.now();
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnObject();
        score ++;
    }
    ctx.beginPath();
    ctx.moveTo(0, spawnY);
    ctx.lineTo(canvas.width, spawnY);
    ctx.stroke();
    
    var index;
    var object;

    for (index = 0; index < objects.length; index += 1) {
        object = objects[index];
        object.y += fallingSpawnRate;
        ctx.beginPath();
        ctx.drawImage(knife, object.x, object.y, knifeHeight, knifeWeight);
        ctx.closePath();
        ctx.fillStyle = object.type;
        ctx.fill();
    }
}

function checkCollisions() {
    var idx;
    for (idx = 0; idx < objects.length; idx += 1) {
        if (objects[idx].x < x + 26.8 && objects[idx].x > x + 7 &&
           objects[idx].y < y + 10 && objects[idx].y + 10 > y ) {
            finalScore = score;
            score = 0;
            playing = true;
            clearInterval(startGame);
            startGame = null;
            alert("Your final score is " + finalScore + ".\nTo play again, press SHIFT and click Start Game button after closing this message.");
        }
        else {
            continue;
        }     
    } 
}
                    
function loadImage(url) {
    var img = new Image();
    img.src = url;
    return img;
}

document.addEventListener("keydown", function(event) {
    if(event.keyCode === 37 && x > -1) {
        x -= 15;
    }
    else if(event.keyCode === 39 && x < canvas.width - 60) {
        x += 15;
    }
    else if(event.keyCode === 49 && spawnRate > 100) {
        spawnRate -= 100;
    }
    else if(event.keyCode === 50 && spawnRate > 800) {
        spawnRate += 100;
    }
    else if(event.keyCode === 51 && fallingSpawnRate > 0.25) {
        fallingSpawnRate -= 0.25;
    }
    else if(event.keyCode === 52 && fallingSpawnRate < 2.75) {
        fallingSpawnRate += 0.25;
    }
    else if(event.keyCode === 16) {
        location.reload();
    }
});

function initialize(){
    playing = false;
    startButton.style.display = "none";
    runGame = function() {
        update();
        draw();
    };
    startGame = setInterval(runGame, 100 / FPS);
}