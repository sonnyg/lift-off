'use strict';

let canvasId = 'mainCanvas',
buttonId = 'launch-button',
startTime = null,
rocket;

window.onload = onLoad; //function () {
  // document.body.onload = onload;
// }

function onLoad() {
    log(`page loaded`);

    rocket = createRocket();

    drawScene();
    // var canvas = document.getElementById(canvasId);
    // var context = canvas.getContext('2d');

    // context.translate(context.width/2 - 30, context.height - 120);
    // drawRocket(context);
}

function createRocket() {
  return {
    x: 0,
    y: 0,
    width: 60,
    height: 120,
    distance: null,
    currentDistance: 0,
    isDone: function isDone() {
      return this.currentDistance >= this.distance;
    },
    reset: function reset() {
      this.currentDistance = 0;
    }
  };
}

function launch() {
  log(`Launching ${canvasId}`);

  let launchButton = document.getElementById(buttonId);
  launchButton.disabled = true;

  rocket.reset();

  window.requestAnimationFrame(animateRocket);
}

// generic logger
function log(message) {
  console.log(message);
}

function drawRocket(context) {

  context.save();

  // 60 x 120 - "view box"
  // context.strokeRect(0, 0, 60, 120);

  // fuselage
  context.strokeRect(20, 30, 20, 66);

  // door
  // context.fillRect(27, 74, 6, 18);
  // context.strokeRect(25, 72, 10, 20);
  // context.fillRect(25, 72, 10, 20);
  // context.clearRect(27, 74, 6, 16);
  context.strokeRect(25, 72, 10, 20);
  context.fillRect(28, 76, 4, 8);

  // window
  context.beginPath();
  context.arc(30, 49, 3, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();

  // window frame
  context.beginPath();
  context.arc(30, 49, 5, 0, Math.PI * 2, true);
  context.closePath();
  context.stroke();

  // draw rocket parts
  context.beginPath();

  // nose cone
  context.moveTo(20, 29);
  context.lineTo(30, 4);
  context.lineTo(40, 29);

  // left fin
  context.moveTo(19, 66);
  context.lineTo(8, 86);
  context.lineTo(8, 116);
  context.lineTo(19, 96);

  // right fin
  context.moveTo(41, 66);
  context.lineTo(52, 86);
  context.lineTo(52, 116);
  context.lineTo(41, 96);

  context.closePath();
  context.fill();

  // moves flame relative to rocket
  context.translate(60/2 - 16, 120 - 24);
  drawFlame(context);

  context.restore();
}

function getRandomNumber(min, max, floor) {
  let floorFunction = floor ? Math.floor : function decoy (value) { return value; };

  return floorFunction(Math.random() * (max - min)) + min;
}

function getFlameColor() {
  let r = 255;
  let g = getRandomNumber(125, 165, true); //165;
  let b = 0;
  let a = 1;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function drawFlame(context) {
    context.save();

    // increase flame length randomly between the 'min' and 'max' range
    let scale = getRandomNumber(.9, 1.1);
    context.scale(1, scale);

    context.fillStyle = getFlameColor();

    // 32 x 32 - "view box"
    // context.strokeRect(0, 0, 32, 32);

    context.beginPath();

    context.moveTo(16, 2);
    // context.bezierCurveTo(0, 6, 20, 16, 10, 18);
    context.quadraticCurveTo(0, 4, 16, 28);
    context.quadraticCurveTo(32, 4, 16, 2);

    context.closePath();
    context.fill();

    context.restore();
}

function drawScene() {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');

  const size = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
  };

  rocket.distance = rocket.distance || size.height - rocket.height;

  // log(`canvas size: ${size.width}, ${size.height}`);
  log(`current distance: ${rocket.currentDistance}`);

  // clear canvas to start fresh
  context.clearRect(0, 0, size.width, size.height);

  // preserve current state of the canvas
  context.save();
  context.translate(size.width/2 - rocket.width/2, size.height - rocket.height - rocket.currentDistance);

  // context.scale(2, 2);
  drawRocket(context);

  // restore the original state of the canvas
  context.restore();
}

function animateRocket(timestamp) {
  startTime = startTime || timestamp;
  log(`drawing: ${startTime} - ${timestamp}`);

  drawScene();

  rocket.currentDistance += 2;

  if (!rocket.isDone()) {
    window.requestAnimationFrame(animateRocket);
   } else {
     let button = document.getElementById(buttonId);
     button.disabled = false;
  }
}
