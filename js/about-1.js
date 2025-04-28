/* Copywrite Dominik Honzak 2023 */
const imageBox = document.getElementsByClassName("profpic")[0];
const dahonzakSimulateParticles = function() {
  document.getElementById('bg').innerHTML = '<svg id="svg" width="100vw" height="100vh" style={{overflow: "hidden"}}/>';
  const svg = document.getElementById('svg');    
  const numParticles = 50; 
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const colors = ["grey","white"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.setAttribute('cx', Math.random() * 100);
    particle.setAttribute('cy', Math.random() * 100);      
    particle.setAttribute('r', Math.random() * 5 + 10);
    particle.setAttribute('fill', color);  

    particle.animate([       
      { transform: 'translate(0, 0)', opacity: '0' },
      { transform: `translate(${Math.random() * 100}vw,${Math.random() * 100}vh)`, opacity: '1' }        
    ], {       
      duration: Math.random() * 3000 + 5000,       
      iterations: Infinity     
    });      
    svg.appendChild(particle); 
  }      
};
const showImage = function(image) {
  imageBox.style.background = "url('../dahonzak/ExtraPics/"+image+"') no-repeat center center";
  imageBox.style.backgroundSize = "cover";
};
const resetImg = function() {
  imageBox.style.background = "url('../dahonzak/ExtraPics/me.jpg') no-repeat center center";
  imageBox.style.backgroundSize = "cover";
};
dahonzakSimulateParticles();
