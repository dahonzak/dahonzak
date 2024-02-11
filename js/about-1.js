/* Copywrite Dominik Honzak 2023 */
function dahonzakSimulateParticles() {
  document.getElementById('bg').innerHTML = '<svg id="svg" width="100vw" height="100vh" style={{overflow: "hidden"}}/>';
  const svg = document.getElementById('svg');    
  const numParticles = 50; 
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const colors = ["grey","white"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.setAttribute('cx', Math.random() * 100);
    particle.setAttribute('cy', Math.random() * 100);      
    particle.setAttribute('r', Math.random() * 5 + 2);
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
  
  
}
dahonzakSimulateParticles();