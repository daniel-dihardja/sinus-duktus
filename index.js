/**
 * Created by danieldihardja on 03.08.19.
 */

const WIDTH = 800;
const HEIGHT = 600;

const c = document.getElementById('wcanvas');
const ctx = c.getContext('2d');

// control params

let d1 = 10;
let m1 = 100;
let d2 = 100;
let m2 = 1.2;

let o = 0;
let t = 0;
let y = 0;

const initCanvas = () => {
  c.width = WIDTH;
  c.height = HEIGHT;
  ctx.translate(0, HEIGHT / 2);
  ctx.fillStyle = "red";
};

const initArturio = () => {
  navigator.requestMIDIAccess()
    .then(e => {
      for (let i of e.inputs.values()) {
        i.onmidimessage = (msg) => {
          let data = [...msg.data];
          data[2] = data[2] / 127;
          if(data[2] <= 0) data[2] = 0.001;
          updateParams(data);
        }
      }
    }, err => console.log(err));
};

const updateParams = (data) => {
  if (data[0] !== 184) return;

  switch (data[1]) {
    case 3:
      d1 = data[2] * 10;
      break;

    case 65:
      m1 = data[2] * 200;
      break;

    case 64:
      d2 = data[2] * 200;
      break;

    case 76:
      m2 = data[2] * 10;
      break;
  }
};

const fsin = (t, d, m) => Math.sin(t / d) * m;

const render = () => {
  ctx.clearRect(0, - HEIGHT / 2, WIDTH, HEIGHT);

  t += 0.1;
  o = 0;
  y = 0;

  /*
  const _x = t;
  const _y = fsin(t, d1, m1) * fsin(t, d2, m2);
  */

  while(o < WIDTH ) {
    y = fsin(t + o, d1, m1) * fsin(t + o, d2, m2);
    ctx.fillRect(o, y, 2, 2);
    o ++;
  }
  window.requestAnimationFrame(render);
};

/**
 * entry point
 */
const init = () => {
  console.log('- sinus duktus -');
  initCanvas();
  initArturio();
  window.requestAnimationFrame(render);
};
