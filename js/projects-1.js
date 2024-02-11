function mouseMove(e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  // alert(e.target);
  e.target.style.setProperty('--x', x + 'px');
  e.target.style.setProperty('--y', y + 'px');
}
const colors = ['#B48E92', '#36311F', '#63282e'];
let game = {
  currentSize:10,
  score:0,
  circles:10
};
const gameLoop = () => {
  for (let i = 0; i < game.circles; i++) {
    circle();
  }
};
const circle = () => {
  let circle = document.createElement('div');
  circle.classList.add("circle");
  let des = {
    cx:0,
    cy:0,
    x: 0,
    y: 0,
    size: Math.floor(Math.random() * 20)+30,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.floor(Math.random() * 10000) + 5000
  };
  circle.style.backgroundColor = des.color;
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      des.cy = Math.floor(Math.random() * window.innerHeight);
      des.cx = -des.size;
      des.x = window.innerWidth+des.size;
      des.y = Math.floor(Math.random() * window.innerHeight);
      break;
    case 1:
      des.cy = Math.floor(Math.random() * window.innerHeight);
      des.cx = window.innerWidth+des.size;
      des.x = -des.size;
      des.y = Math.floor(Math.random() * window.innerHeight);
      break;
    case 2:
      des.cy = -des.size;
      des.cx = Math.floor(Math.random() * window.innerWidth);
      des.x = window.innerHeight;
      des.y = Math.floor(Math.random() * window.innerWidth)+des.size;
      break;
    case 3:
      des.cy = window.innerHeight+des.size;
      des.cx = Math.floor(Math.random() * window.innerWidth);
      des.x = Math.floor(Math.random() * window.innerWidth);
      des.y = -des.size;
      break;
  }
  circle.style.width =  des.size + "px";
  circle.style.height = des.size + "px";
circle.animate([       
  { transform: `translate(${des.cx}px, ${des.cy}px)`, opacity: '0' },
  { transform: `translate(${des.x}px, ${des.y}px)`, opacity: '1' }        
], {       
  duration: des.speed,       
  iterations: 1     
}).onfinish = () => { circle.remove(); };
  document.body.appendChild(circle);
};

setInterval(gameLoop, 1000);