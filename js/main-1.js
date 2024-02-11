/* Copywrite Dominik Honzak 2023 */
let svg = document.querySelector('#svg-container');
let ripple = document.querySelector('#ripple');
// let audioContext = new AudioContext();
// let audioSource, analyser;
let particles = [];
// navigator.mediaDevices.getUserMedia({audio: true})
//   .then(function(stream) {
//     audioSource = audioContext.createMediaStreamSource(stream);
//     analyser = audioContext.createAnalyser();
//     audioSource.connect(analyser);
//     loop();
//   })
//   .catch(function(err) {
//     console.error('Error getting audio input', err);
//   });
class Particle {
  constructor(x, y, size, speed, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = color;
  }
  update() {
    this.y += this.speed;
    this.size -= 0.05;
  }
  draw() {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', this.x);
    circle.setAttribute('cy', this.y);
    circle.setAttribute('r', this.size);
    circle.setAttribute('fill', this.color);
    svg.appendChild(circle);
  }
} 
function loop() {
  // let frequencyData = new Uint8Array(analyser.frequencyBinCount);
  // analyser.getByteFrequencyData(frequencyData);
  // let avg = getAverage(frequencyData);
  // ripple.setAttribute('r', avg * 2);
  if (Math.random() > 0.8) {
    let x = Math.random() * svg.clientWidth;
    let y = Math.random() * svg.clientHeight;
    let size = Math.random() * 10 + 5;
    let speed = Math.random() * 2 + 1;
    let color = `rgba(0, 128, ${Math.round(Math.random() * 255)}, ${Math.random()})`;
    let particle = new Particle(x, y, size, speed, color);
    particles.push(particle);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].size <= 0) {
      particles.splice(i, 1);
    } else {
      particles[i].draw();
    }
  }
  requestAnimationFrame(loop);
}
 loop();
// function getAverage(array) {
//   let sum = 0;
//   for (let i = 0; i < array.length; i++) {
//     sum += array[i];
//   }
//   return sum / array.length;
// }
