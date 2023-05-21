const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bgColor = "rgb(253, 253, 150)";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.left = "0";
canvas.style.top = "0";

let camera = {
    x: 0,
    y: 0
};

let cube = new Cube(0, 0, 30, 30, "rgb(0, 255, 0)", { x: 2, y: 1.5 });

let cubes = []



let started = false
let note = "c"

document.onkeydown = ev => {
    note = ev.key
}

canvas.onmousedown = ev => {
    if(ev.button == 2) {
        started = true
    }

    if(ev.button == 1) {
        let newCube = new Cube(ev.clientX - camera.x - 15, ev.clientY - camera.y - 15, 30, 30, "rgb(255, 0, 0)", { x: 0, y: 0 }, "./src/sounds/" + note + ".wav")
        cubes.push(newCube)
    }
}

function update() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    cube.update(ctx, -camera.x, -camera.y, started);
    cubes.forEach(c => {
        c.update(ctx, -camera.x, -camera.y, started)
        if(checkCollision(cube, c)) playAudio(c.note)
    })


    requestAnimationFrame(update);
}


// IMPLEMENTACION DE LA CAMARA

var startX, startY, prevX, prevY;

canvas.addEventListener("mousedown", function(event) {
    startX = event.clientX;
    startY = event.clientY;
    prevX = startX;
    prevY = startY;

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
});

function handleMouseMove(event) {
    var currentX = event.clientX;
    var currentY = event.clientY;

    var distanceX = currentX - prevX;
    var distanceY = currentY - prevY;

    camera.x += distanceX;
    camera.y += distanceY;

    prevX = currentX;
    prevY = currentY;
}

function handleMouseUp() {
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
}

// INICIAR

update();

// OTRAS FUNCIONES

function playAudio(src) {
    let audio = new Audio()
    audio.src = src
    audio.play()
}

function checkCollision(c1, c2) {
    const rect1 = {
      left: c1.x,
      top: c1.y,
      right: c1.x + c1.w,
      bottom: c1.y + c1.h
    };
    const rect2 = {
      left: c2.x,
      top: c2.y,
      right: c2.x + c2.w,
      bottom: c2.y + c2.h
    };
  
    if (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    ) {
      const dx = (rect1.left + rect1.right) / 2 - (rect2.left + rect2.right) / 2;
      const dy = (rect1.top + rect1.bottom) / 2 - (rect2.top + rect2.bottom) / 2;
      const angle = Math.atan2(dy, dx);
      const speed1 = Math.sqrt(c1.v.x * c1.v.x + c1.v.y * c1.v.y);
      const speed2 = Math.sqrt(c2.v.x * c2.v.x + c2.v.y * c2.v.y);
      const direction1 = Math.atan2(c1.v.y, c1.v.x);
      const direction2 = Math.atan2(c2.v.y, c2.v.x);
      const newDirection1 = direction1 + angle;
      const newDirection2 = direction2 + angle;
  
      const newVelocity1 = {
        x: Math.cos(newDirection1) * speed1,
        y: Math.sin(newDirection1) * speed1
      };
      const newVelocity2 = {
        x: Math.cos(newDirection2) * speed2,
        y: Math.sin(newDirection2) * speed2
      };
  
      c1.v.x = newVelocity1.x;
      c1.v.y = newVelocity1.y;
      c2.v.x = newVelocity2.x;
      c2.v.y = newVelocity2.y;
  
      return true; // Hay colisión
    } else {
      return false; // No hay colisión
    }
  }
  
document.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Evitar que aparezca el menú contextual por defecto
});
  