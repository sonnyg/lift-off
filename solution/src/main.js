let canvasId = 'mainCanvas';


function timerTest() {
  const start = new Date();
  let i = 0;
  const intervalId = setInterval(function() {
    let now = new Date();
    if (now.getMinutes() !== start.getMinutes() || ++i>10) {
      console.log("clearing interval");
      return clearInterval(intervalId);
    }
    console.log(`${i}: ${now}`);
  }, 5*1000);
}






function launch() {
  console.log(`Launching ${canvasId}`);

  let canvas = getCanvas(canvasId);

  if (canvas) {
    startCountdown(canvas, 10);
  } else {
    console.log(`uh-oh. Couldn't find canvas with id '${canvasId}'`);
  }
}


function getCanvas(canvasId) {
  return document.getElementById(canvasId);
}

function startCountdown(canvas, count) {
  if (canvas) {
    console.log("starting countdown");
    console.log(canvas);

    let currentCount = count;

    // set the interval to every 10 ms to keep it smooth
    const intervalId = setInterval(function() {

        // console.log(`currentCount: ${currentCount}`);
        // need to clear out the old scene
        drawBackground(canvas);

        if (currentCount > 0) {
          drawText(canvas, currentCount--);
        } else {
          drawText(canvas, "Lift Off!");

          console.log("countdown done");
          return clearInterval(intervalId);
        }
    }, 1000);
  } else {
    console.log("Could not start countdown, no canvas");
  }
}

function drawText(canvas, text) {
  var ctx = canvas.getContext("2d");
  // ctx.font = "30px Comic Sans MS";
  // ctx.fillStyle = "red";
  ctx.font = "30px serif";
  ctx.fillStyle = "rgba(255,165,0,1)";
  ctx.textAlign = "center";

  ctx.fillText(text, canvas.width/2, canvas.height/2);
}

function drawBackground(canvas) {
  var ctx = canvas.getContext("2d");
  // Create gradient
  // var grd=ctx.createLinearGradient(0,0,canvas.width,0);
  var grd = ctx.createLinearGradient(0,0,0, canvas.height);
  grd.addColorStop(0,"black");
  // grd.addColorStop(.5,"navy"); //"white");
  grd.addColorStop(1,"gray"); //"white");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}
