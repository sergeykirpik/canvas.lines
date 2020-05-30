var width = window.innerHeight;
var height = window.innerHeight;

var deltaX = Math.max(window.innerHeight - window.innerWidth, 0);
var deltaY = Math.max(window.innerWidth - window.innerHeight, 0);


var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

ctx.translate(-deltaX/2, -deltaY/2);

ctx.lineWidth = 5;

var frame = 0;
var maxFrame = 0;
var step = 50;

var LINES_COUNT = 1;

var abs = Math.abs;

function randomState() {
    var state = [];
    for (var i = 0; i < LINES_COUNT; i++) {
        state.push({
            x1: getRandomInt(width),
            y1: getRandomInt(height),
            x2: getRandomInt(width),
            y2: getRandomInt(height),        
        })
    }
    return state;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawLines(x1, y1, x2, y2, color) {
    
    ctx.strokeStyle = color;    
    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.moveTo(-x1 + width, y1);
    ctx.lineTo(-x2 + width, y2);
    
    ctx.moveTo(x1, -y1 + height);
    ctx.lineTo(x2, -y2 + height);

    ctx.moveTo(-x1 + width, -y1 + height);
    ctx.lineTo(-x2 + width, -y2 + height);

    ctx.closePath();
    ctx.stroke();    
}

var destState = randomState();
var currState = randomState();

function clearScreen() {
    ctx.clearRect(0, 0, width, height * 2);
}

function animateLines(curr, dest) {

    if (curr.x1 < dest.x1) {
        curr.x1 += step;
    }
    if (curr.x1 > dest.x1) {
        curr.x1 -= step;
    }
    if (curr.y1 < dest.y1) {
        curr.y1 += step;
    }
    if (curr.y1 > dest.y1) {
        curr.y1 -= step;
    }
    
    if (curr.x2 < dest.x2) {
        curr.x2 += step;
    }
    if (curr.x2 > dest.x2) {
        curr.x2 -= step;
    }
    if (curr.y2 < dest.y2) {
        curr.y2 += step;
    }
    if (curr.y2 > dest.y2) {
        curr.y2 -= step;
    }

    drawLines(curr.x1, curr.y1, curr.x2, curr.y2, 'orange');
    drawLines(curr.y1, curr.x1, curr.y2, curr.x2, 'orange');

}

function animate() {
    clearScreen();

    var needUpdate = true;
    for (var line = 0; line < LINES_COUNT; line++) {
        var curr = currState[line];
        var dest = destState[line];
        needUpdate = needUpdate &&
            (abs(curr.x1 - dest.x1) < step
              && abs(curr.y1 - dest.y1) < step
              && abs(curr.x2 - dest.x2) < step
              && abs(curr.y2 - dest.y2) < step
            ); 
        animateLines(curr, dest);
    }
    if (needUpdate) {
        destState = randomState();
    }

    window.requestAnimationFrame(animate);
}

animate();
