// p5.js Background Animation - Above the fold only
let shapes = [];
let particles = [];
let scrollOpacity = 1;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('background-animation');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1');
  canvas.style('pointer-events', 'none');
  
  // Create platonic solids
  for (let i = 0; i < 5; i++) {
    shapes.push(new PlatonicSolid(
      random(-width/3, width/3),
      random(-height/3, height/3),
      random(20, 60),
      random(['tetrahedron', 'cube', 'octahedron'])
    ));
  }
  
  // Create floating particles
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle(
      random(-width/2, width/2),
      random(-height/2, height/2),
      random(2, 6)
    ));
  }
}

function draw() {
  // Calculate scroll-based opacity
  const scrollY = window.scrollY || window.pageYOffset;
  const fadeStart = 100; // Start fading after 100px scroll
  const fadeEnd = 500;   // Completely faded out after 500px scroll
  
  if (scrollY <= fadeStart) {
    scrollOpacity = 1;
  } else if (scrollY >= fadeEnd) {
    scrollOpacity = 0;
  } else {
    scrollOpacity = map(scrollY, fadeStart, fadeEnd, 1, 0);
  }
  
  // Don't draw if completely faded out
  if (scrollOpacity <= 0) {
    clear();
    return;
  }
  
  background(255, 0); // Transparent background
  stroke(255, 20, 147, 30 * scrollOpacity); // Deep pink with scroll-based opacity
  strokeWeight(1);
  noFill();
  
  // Rotate the entire scene
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.003);
  
  // Draw shapes
  for (let shape of shapes) {
    shape.update();
    shape.display(scrollOpacity);
  }
  
  // Draw particles
  for (let particle of particles) {
    particle.update();
    particle.display(scrollOpacity);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class PlatonicSolid {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.z = random(-200, 200);
    this.size = size;
    this.type = type;
    this.rotationX = random(TWO_PI);
    this.rotationY = random(TWO_PI);
    this.rotationZ = random(TWO_PI);
    this.rotationSpeedX = random(-0.02, 0.02);
    this.rotationSpeedY = random(-0.02, 0.02);
    this.rotationSpeedZ = random(-0.02, 0.02);
    this.floatOffset = random(TWO_PI);
  }
  
  update() {
    this.rotationX += this.rotationSpeedX;
    this.rotationY += this.rotationSpeedY;
    this.rotationZ += this.rotationSpeedZ;
    this.z += sin(frameCount * 0.01 + this.floatOffset) * 0.5;
  }
  
  display(opacity = 1) {
    push();
    translate(this.x, this.y, this.z);
    rotateX(this.rotationX);
    rotateY(this.rotationY);
    rotateZ(this.rotationZ);
    
    if (this.type === 'tetrahedron') {
      this.drawTetrahedron(opacity);
    } else if (this.type === 'cube') {
      this.drawCube(opacity);
    } else if (this.type === 'octahedron') {
      this.drawOctahedron(opacity);
    }
    
    pop();
  }
  
  drawTetrahedron(opacity) {
    const s = this.size / 2;
    stroke(255, 20, 147, 30 * opacity);
    
    beginShape();
    vertex(s, s, s);
    vertex(-s, -s, s);
    vertex(-s, s, -s);
    endShape(CLOSE);
    
    beginShape();
    vertex(s, s, s);
    vertex(-s, s, -s);
    vertex(s, -s, -s);
    endShape(CLOSE);
    
    beginShape();
    vertex(s, s, s);
    vertex(s, -s, -s);
    vertex(-s, -s, s);
    endShape(CLOSE);
    
    beginShape();
    vertex(-s, -s, s);
    vertex(s, -s, -s);
    vertex(-s, s, -s);
    endShape(CLOSE);
  }
  
  drawCube(opacity) {
    const s = this.size / 2;
    stroke(255, 20, 147, 30 * opacity);
    
    // Front face
    beginShape();
    vertex(-s, -s, s);
    vertex(s, -s, s);
    vertex(s, s, s);
    vertex(-s, s, s);
    endShape(CLOSE);
    
    // Back face
    beginShape();
    vertex(-s, -s, -s);
    vertex(s, -s, -s);
    vertex(s, s, -s);
    vertex(-s, s, -s);
    endShape(CLOSE);
    
    // Connecting edges
    line(-s, -s, s, -s, -s, -s);
    line(s, -s, s, s, -s, -s);
    line(s, s, s, s, s, -s);
    line(-s, s, s, -s, s, -s);
  }
  
  drawOctahedron(opacity) {
    const s = this.size / 2;
    stroke(255, 20, 147, 30 * opacity);
    
    // Top pyramid
    beginShape();
    vertex(0, -s, 0);
    vertex(s, 0, 0);
    vertex(0, 0, s);
    endShape(CLOSE);
    
    beginShape();
    vertex(0, -s, 0);
    vertex(0, 0, s);
    vertex(-s, 0, 0);
    endShape(CLOSE);
    
    beginShape();
    vertex(0, -s, 0);
    vertex(-s, 0, 0);
    vertex(0, 0, -s);
    endShape(CLOSE);
    
    beginShape();
    vertex(0, -s, 0);
    vertex(0, 0, -s);
    vertex(s, 0, 0);
    endShape(CLOSE);
    
    // Bottom pyramid
    beginShape();
    vertex(0, s, 0);
    vertex(s, 0, 0);
    vertex(0, 0, s);
    endShape(CLOSE);
    
    beginShape();
    vertex(0, s, 0);
    vertex(0, 0, s);
    vertex(-s, 0, 0);
    endShape(CLOSE);
    
    beginShape();
    vertex(0, s, 0);
    vertex(-s, 0, 0);
    vertex(0, 0, -s);
    endShape(CLOSE);
    
    beginShape();
    vertex(0, s, 0);
    vertex(0, 0, -s);
    vertex(s, 0, 0);
    endShape(CLOSE);
  }
}

class Particle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.z = random(-100, 100);
    this.size = size;
    this.speedX = random(-0.5, 0.5);
    this.speedY = random(-0.5, 0.5);
    this.speedZ = random(-0.5, 0.5);
    this.floatOffset = random(TWO_PI);
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.z += this.speedZ;
    
    // Wrap around edges
    if (this.x > width/2) this.x = -width/2;
    if (this.x < -width/2) this.x = width/2;
    if (this.y > height/2) this.y = -height/2;
    if (this.y < -height/2) this.y = height/2;
    if (this.z > 100) this.z = -100;
    if (this.z < -100) this.z = 100;
    
    // Add floating motion
    this.y += sin(frameCount * 0.02 + this.floatOffset) * 0.3;
  }
  
  display(opacity = 1) {
    push();
    translate(this.x, this.y, this.z);
    const baseOpacity = map(this.z, -100, 100, 10, 40);
    stroke(255, 20, 147, baseOpacity * opacity);
    strokeWeight(this.size);
    point(0, 0);
    pop();
  }
} 