/**
 * Created by danieldihardja on 03.08.19.
 */

const WIDTH = 800;
const HEIGHT = 600;

const c = document.getElementById('wcanvas');
const ctx = c.getContext('2d');

// control params

let o = 0;
let d1 = 10;
let m1 = 100;
let d2 = 100;
let m2 = 1.2;

const initCanvas = () => {
  c.width = WIDTH;
  c.height = HEIGHT;
  ctx.translate(0, HEIGHT / 2);
};

const initArturio = () => {
  navigator.requestMIDIAccess()
    .then(e => {
      for (let i of e.inputs.values()) {
        i.onmidimessage = (msg) => {
          let data = [...msg.data];
          data[2] = data[2] / 127;
          updateParams(data);
          console.log(data);
        }
      }
    }, err => console.log(err));
};

const updateParams = (data) => {
  if (data[0] !== 184) return;

  switch (data[1]) {
    case 3:
      d1 = data[2] * 30;
      break;

    case 65:
      m1 = data[2] * 200;
      break;

    case 64:
      d2 = data[2] * 10;
      break;

    case 76:
      m2 = data[2] * 10;
      break;
  }
};

const fsin = (t, d, m) => Math.sin(t / d) * m;

const render = () => {
  ctx.clearRect(0, - HEIGHT / 2, WIDTH, HEIGHT);
  ctx.fillStyle = "red";
  o += 0.2;
  let t = 0;

  while(t < WIDTH ) {
    const x = t;
    const y = fsin(t+o, d1, m1) * fsin(t+o, d2, m2);
    ctx.fillRect(x, y,2,2);
    t ++;
  }
  window.requestAnimationFrame(render);
};

const init = () => {
  console.log('- sinus duktus -');
  initCanvas();
  initArturio();
  window.requestAnimationFrame(render);
};
