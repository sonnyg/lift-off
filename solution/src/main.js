'use strict';

let canvasId = 'mainCanvas',
startTime = null,
rocket
// = {
//   x: 0,
//   y: 0,
//   width: 40,
//   height: 40,
//   distance: null,
//   currentDistance: 0,
//   isDone: function isDone() {
//     return this.currentDistance >= this.distance;
//   }
// }
//
function createRocket() {
  return {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    distance: null,
    currentDistance: 0,
    isDone: function isDone() {
      return this.currentDistance >= this.distance;
    }
  };
}

function launch() {
  log(`Launching ${canvasId}`);

  rocket = createRocket();

  window.requestAnimationFrame(draw);
  //
  // let canvas = document.getElementById(canvasId);
  // log(canvas);
  //
  // if (canvas) {
  //   countdown(canvas, launchCount, launchRocket);
  //   log("starting heartbeat");
  //   heartbeat.start(100);
  //   setTimeout(function() {
  //     log("stopping heartbeat");
  //     heartbeat.stop();
  //   }, 5000);
  // } else {
  //   log(`uh-oh. Couldn't find canvas with id '${canvasId}'`);
  // }
}

// generic logger
function log(message) {
  console.log(message);//`${Date.now()}: ${message}`);
}

function drawRocket(context) {

  context.save();

  // 60 x 120 - "view box"
  context.strokeRect(0, 0, 60, 120);

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
  context.arc(30, 49, 2, 0, Math.PI * 2, true);
  context.fill();

  context.arc(30, 49, 5, 0, Math.PI * 2, true);
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

  context.restore();
}

function draw(timestamp) {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext('2d');
  var isDone = false;

  const size = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
  };

  startTime = startTime || timestamp;
  rocket.distance = rocket.distance || size.height - 40;

  log(`drawing: ${startTime} - ${timestamp}`);
  log(`canvas size: ${size.width}, ${size.height}`);
  log(`current distance: ${rocket.currentDistance}`);

  // clear canvas to start fresh
  context.clearRect(0,0,size.width,size.height);

  // preserve current state of the canvas
  context.save();

  drawRocket(context);

  // move origin to center, offset by currentDistance
  context.translate(size.width/2 - 20, size.height - 40 - rocket.currentDistance);

  // draw the "rocket"
  context.fillStyle = "rgba(255,165,0,1)";
  context.beginPath();
  context.moveTo(75,50);
  context.lineTo(100,75);
  context.lineTo(100,25);
  context.fill();

  const flamePath = new Path2D("M91 215.39a41.71 41.71 0 0 1-14.62-2.49 37.75 37.75 0 0 1-11.43-6.5 82 82 0 0 1-8.94-8.91q-4.21-4.87-7.87-9.75t-7.31-8.89a31.09 31.09 0 0 0-8.28-6.5 20.37 20.37 0 0 0-9.8-2.49q-9.75 0-22.75 6.8l.1-.41-.1.1a163.15 163.15 0 0 1 8.43-16.25 107.11 107.11 0 0 1 10.16-14.07 65.6 65.6 0 0 1 12.44-11.53 56.72 56.72 0 0 1 15.29-7.36 61 61 0 0 1 18.69-2.79 41.71 41.71 0 0 1 14.63 2.49 37.75 37.75 0 0 1 11.43 6.5 82 82 0 0 1 8.94 8.89q4.21 4.88 7.87 9.75t7.31 8.89a31.09 31.09 0 0 0 8.28 6.5 20.37 20.37 0 0 0 9.8 2.49q9.55 0 22.75-6.7l-.1.3.1-.1a163.15 163.15 0 0 1-8.43 16.25 107.11 107.11 0 0 1-10.16 14.07 65.6 65.6 0 0 1-12.44 11.53 56.72 56.72 0 0 1-15.29 7.36 61 61 0 0 1-18.7 2.82z");
  var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
  context.stroke(p);
  context.fill(flamePath);
  const rocketShadePath = new Path2D("M192.11 169v56.7l-72.85 38.54a9.08 9.08 0 0 0-4.84 8.07v25.83a10.24 10.24 0 0 0 2.83 6.46 9 9 0 0 0 4 2.42l122.72 32.29a10.42 10.42 0 0 0 8.48-2l80.51-72.44q42.38 3.63 74.86 3.83 72-.2 123.9-21.59t102.1-71.63a8.55 8.55 0 0 0 2.52-6.46H192.11z");
  const rocketHighlightPath = new Path2D("M192.11 170v-56.7l-72.85-38.54a8.66 8.66 0 0 1-2-1.61 8.89 8.89 0 0 1-2.83-6.46V41.35q.4-7.26 6.86-8.88L243.97.18a10.42 10.42 0 0 1 8.48 2l80.51 72.44q42.38-3.63 74.86-3.83 75.67.2 124.3 20.18t101.3 72.64a9.59 9.59 0 0 1 2.93 6.76v.1H192.11z");
  const windowShadePath = new Path2D("M538.57 169a27.56 27.56 0 1 0-8.07 19.37 26.42 26.42 0 0 0 8.07-19.37z");
  const windowHightlightPath = new Path2D("M483.69 170a27.445 27.445 0 0 1 54.89 0h-54.89z");
  context.stroke(rocketShadePath);
  context.stroke(rocketHighlightPath);
  context.fillRect(rocket.x, rocket.y, rocket.width, rocket.height);

  // restore the original state of the canvas
  context.restore();

  rocket.currentDistance += 2;

  if (!rocket.isDone()) {
    window.requestAnimationFrame(draw);
  // } else {
  //   rocket.currentDistance = 0;
  }



}

// <defs xmlns="http://www.w3.org/2000/svg"><style>.cls-1 { fill: #ee2d64; }</style></defs>
// <path xmlns="http://www.w3.org/2000/svg" class="cls-1" d="M563.94 256.75a27.28 27.28 0 1 0-8 19.41 26.42 26.42 0 0 0 8-19.41zm63.92-82.19q0 71.06-21.55 122.85T534 400.29q-23.12 22.83-55.65 50.23l-5.71 108.16a10.42 10.42 0 0 1-4.57 7.42L358.47 630a9 9 0 0 1-4.57 1.14 10.24 10.24 0 0 1-6.56-2.57l-18.26-18.26a9.08 9.08 0 0 1-2.28-9.13l24.2-78.75-80.19-80.19-78.71 24.25a8.66 8.66 0 0 1-2.57.29 8.89 8.89 0 0 1-6.56-2.57l-18.27-18.26q-4.85-5.42-1.43-11.13l63.93-109.58a10.42 10.42 0 0 1 7.42-4.57L342.77 315q27.4-32.53 50.23-55.65 53.65-53.35 102.16-73.66t123-20.26a9.59 9.59 0 0 1 6.85 2.71 8.57 8.57 0 0 1 2.85 6.42z"/>
// <path xmlns="http://www.w3.org/2000/svg" class="cls-1" d="M271.21 585.58a41.71 41.71 0 0 1-12.1 8.58 37.75 37.75 0 0 1-12.68 3.48 82 82 0 0 1-12.6 0q-6.43-.47-12.46-1.33t-11.45-1.11a31.09 31.09 0 0 0-10.45 1.26 20.37 20.37 0 0 0-8.69 5.17q-6.89 6.89-11.28 20.9l-.22-.36v.14a163.15 163.15 0 0 1-5.53-17.45 107.11 107.11 0 0 1-2.75-17.09 65.6 65.6 0 0 1 .65-16.95 56.72 56.72 0 0 1 5.6-16 61 61 0 0 1 11.24-15.19 41.71 41.71 0 0 1 12.1-8.58 37.75 37.75 0 0 1 12.68-3.48 82 82 0 0 1 12.6 0q6.43.47 12.46 1.33t11.45 1.1a31.09 31.09 0 0 0 10.45-1.26 20.37 20.37 0 0 0 8.69-5.17q6.75-6.75 11.35-20.83l.14.29v-.14a163.15 163.15 0 0 1 5.53 17.45 107.11 107.11 0 0 1 2.76 17.13 65.6 65.6 0 0 1-.65 16.95 56.72 56.72 0 0 1-5.6 16 61 61 0 0 1-11.24 15.16z"/>


/*





let canvasId = 'mainCanvas';
let launchCount = 3;


function timerTest() {
  const start = new Date();
  let i = 0;
  const intervalId = setInterval(function() {
    let now = new Date();
    if (now.getMinutes() !== start.getMinutes() || ++i>10) {
      log("clearing interval");
      return clearInterval(intervalId);
    }
    log(`${i}: ${now}`);
  }, 5*1000);
}





function launch() {
  log(`Launching ${canvasId}`);

  let canvas = document.getElementById(canvasId);
  log(canvas);

  if (canvas) {
    countdown(canvas, launchCount, launchRocket);
    log("starting heartbeat");
    heartbeat.start(100);
    setTimeout(function() {
      log("stopping heartbeat");
      heartbeat.stop();
    }, 5000);
  } else {
    log(`uh-oh. Couldn't find canvas with id '${canvasId}'`);
  }
}

const heartbeat = {
  delay: 0,
  intervalId: 0,

  start: function start(delay) {
    let currentCount = 0;

    this.delay = delay || 10;
    this.intervalId = setInterval(function() {
      currentCount += 1;
      log(`heartbeat: ${currentCount}`);
    }, delay);
  },

  stop: function stop() {
      clearInterval(this.intervalId);
  }
}

// function hearbeat(delay) {
//   let currentCount = 0;
//
//   // set the interval to every 10 ms to keep it smooth
//   const intervalId = setInterval(function() {
//       log(`hearbeat: ${currentCount}`);
//
//       // need to clear out the old scene
//       drawBackground(canvas);
//
//       if (currentCount > 0) {
//         drawText(canvas, currentCount--);
//       } else {
//         clearInterval(intervalId);
//         return action(canvas);
//       }
//   }, 10);
// }

function launchRocket(canvas) {
  log("countdown done");

  drawText(canvas, "Lift Off!");
  drawRocket(canvas);
  // drawSVG(canvas);
}

function drawRocket(canvas) {

}

function countdown(canvas, count, action) {
  if (canvas) {
    log("starting countdown");


    let currentCount = count;

    // set the interval to every 10 ms to keep it smooth
    const intervalId = setInterval(function() {

        log(`countdown: ${currentCount}`);

        // need to clear out the old scene
        drawBackground(canvas);

        if (currentCount > 0) {
          drawText(canvas, currentCount--);
        } else {
          clearInterval(intervalId);
          return action(canvas);
        }
    }, 1000);
  } else {
    log("Could not start countdown, no canvas");
  }
}

function drawText(canvas, text) {
  var context = canvas.getContext("2d");
  // ctx.font = "30px Comic Sans MS";
  // ctx.fillStyle = "red";
  ctx.font = "30px serif";
  ctx.fillStyle = "rgba(255,165,0,1)";
  ctx.textAlign = "center";

  ctx.fillText(text, canvas.width/2, canvas.height/2);
}

function drawBackground(canvas) {
  let ctx = canvas.getContext("2d");
  // Create gradient
  // var grd=ctx.createLinearGradient(0,0,canvas.width,0);
  let grd = ctx.createLinearGradient(0,0,0, canvas.height);
  grd.addColorStop(0,"black");
  // grd.addColorStop(.5,"navy"); //"white");
  grd.addColorStop(1,"gray"); //"white");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}


function drawSVG(canvas) {
  let ctx = canvas.getContext('2d');

  // My SVG file as s string.
  // let data = document.getElementById('cat');
  let data = '<svg id="cat" width="140" height="170" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="70" cy="95" r="50" style="stroke: black; fill: none;"/><circle cx="55" cy="80" r="5" stroke="black" fill="#339933"/> <circle cx="85" cy="80" r="5" stroke="black" fill="#339933"/><g id="whiskers"><line x1="75" y1="95" x2="135" y2="85" style="stroke: black;"/><line x1="75" y1="95" x2="135" y2="105" style="stroke: black;"/></g><use xlink:href="#whiskers" transform="scale(-1 1) translate(-140 0)"/><polyline points="108 62, 90 10, 70 45, 50, 10, 32, 62" style="stroke: black; fill: none;" /><polyline points="35 110, 45 120, 95 120, 105, 110" style="stroke: black; fill: none;" /></svg>';

  log(data);

  // Load up our image.
  var source = new Image();
  // source.width = 140;
  // source.height = 170;
  // source.src = mySrc;

  // Create a Data URI.
  source.src = 'data:image/svg+xml;base64,' + window.btoa(data);
// ctx.drawImage(source, 0, 0);

  source.addEventListener("load", function() {
    ctx.drawImage(source, 0, 0);
  });

  // var DOMURL = window.URL || window.webkitURL || window;
  //
  // var img = new Image();
  // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
  // var url = DOMURL.createObjectURL(svg);
  //
  // img.onload = function () {
  //   ctx.drawImage(img, 0, 0);
  //   DOMURL.revokeObjectURL(url);
  // }
  //
  // img.src = url;
}
*/
