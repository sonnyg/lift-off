let canvasId = 'mainCanvas';

function launch() {
  console.log(`Launching ${canvasId}`);

  let canvas = getCanvas(canvasId);

  if (canvas) {
    startCountdown(canvas);
  } else {
    console.log(`uh-oh. Couldn't find canvas with id '${canvasId}'`);
  }
}

function getCanvas(canvasId) {
  return document.getElementById(canvasId);
}

function startCountdown(canvas) {
  if (canvas) {
    console.log("starting countdown");
    console.log(canvas);
    drawText(canvas, 10);
  } else {
    console.log("Could not start countdown, no canvas");
  }
}

function drawText(canvas, text) {
  var ctx = canvas.getContext("2d");
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(text, canvas.width/2, canvas.height/2);

  drawBackground(canvas);
}

function drawBackground(canvas) {
  var ctx = canvas.getContext("2d");
  // Create gradient
  // var grd=ctx.createLinearGradient(0,0,canvas.width,0);
  var grd = ctx.createLinearGradient(0,0,0, canvas.height);
  grd.addColorStop(0,"black");
  grd.addColorStop(1,"white");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}
