window.onload = function() {
  var canvas = document.getElementById('mycanvas');
  var ctx = canvas.getContext('2d'); // reutrn CanvasRenderingContext2D对象

  ctx.beginPath();
  // ctx.moveTo(0, 0);
  // ctx.lineTo(100, 100);
  // ctx.lineTo(0, 100);

  ctx.moveTo(100, 100);
  ctx.lineTo(200, 200);
  ctx.lineTo(100, 200);

  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.setLineDash([1, 10]);

  // ctx.fill();
  ctx.strokeStyle = '#009244';
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = 'pink';
  ctx.fillRect(20, 20, 100, 100);
  ctx.clearRect(30, 30, 80, 80);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  ctx.arc(10, 15, 10, 0, 2 * Math.PI, true);
  ctx.setLineDash([]);
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillText('Hello world', 150, 50);
  ctx.strokeText('Hello world', 160, 60);

  var gradient = ctx.createLinearGradient(0, 0, 200, 0);
  gradient.addColorStop(0, 'green');
  gradient.addColorStop(1, 'white');
  ctx.fillStyle = gradient;
  ctx.fillRect(10, 70, 150, 30);

  var posX = 20;
  var posY = 100;

  setInterval(function() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    posX += 1;
    posY += 0.25;

    ctx.beginPath();
    ctx.fillStyle = 'white';

    ctx.arc(posX, posY, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }, 30);
};
