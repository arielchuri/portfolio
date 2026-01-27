// p5.js Background Animation - Above the fold only
let shapes = [];
let particles = [];
let scrollOpacity = 1;
let webglAvailable = true;

// Color variation settings
const baseHue = 328; // Deep pink/magenta
const colorStep = 30; // 360/12 = 30 degrees per step
let startingHueOffset;
let hueDirection;

// Helper function to convert HSL to RGB
function hslToRgb(h, s, l) {
  s = s / 100;
  l = l / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

function setup() {
  try {
    const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('background-animation');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    canvas.style('pointer-events', 'none');
  } catch (error) {
    console.warn('WebGL not available, disabling background animation:', error);
    webglAvailable = false;
    noLoop(); // Stop p5.js from running
    return;
  }

  // Set color variation: start at +/- 3 steps, then move in opposite direction
  startingHueOffset = random() > 0.5 ? 3 * colorStep : -3 * colorStep;
  hueDirection = startingHueOffset > 0 ? -1 : 1; // Move opposite to starting offset

  // Create platonic solids and other shapes
  for (let i = 0; i < 5; i++) {
    shapes.push(new PlatonicSolid(
      random(-width/3, width/3),
      random(-height/3, height/3),
      random(20, 60),
      random(['tetrahedron', 'cube', 'octahedron', 'torus', 'cone', 'cylinder']),
      i // Pass index for color
    ));
  }
  
  // Create floating particles
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle(
      random(-width/2, width/2),
      random(-height/2, height/2),
      random(2, 6),
      i + 5 // Offset color index after shapes
    ));
  }
}

function draw() {
  // Don't draw if WebGL isn't available
  if (!webglAvailable) return;

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
  if (!webglAvailable) return;
  resizeCanvas(windowWidth, windowHeight);
}

class PlatonicSolid {
  constructor(x, y, size, type, colorIndex) {
    this.x = x;
    this.y = y;
    this.z = random(-200, 200);
    this.size = size;
    this.type = type;
    this.colorIndex = colorIndex;
    this.rotationX = random(TWO_PI);
    this.rotationY = random(TWO_PI);
    this.rotationZ = random(TWO_PI);
    this.rotationSpeedX = random(-0.02, 0.02);
    this.rotationSpeedY = random(-0.02, 0.02);
    this.rotationSpeedZ = random(-0.02, 0.02);
    this.floatOffset = random(TWO_PI);
  }

  getColor(opacity = 1) {
    // Calculate hue for this shape
    let hue = baseHue + startingHueOffset + (this.colorIndex * hueDirection * colorStep);
    // Wrap hue to 0-360 range
    hue = (hue + 360) % 360;
    // Convert HSL to RGB (maintaining luminance at 54%)
    const [r, g, b] = hslToRgb(hue, 100, 54);
    return [r, g, b, 80 * opacity];
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
    } else if (this.type === 'torus') {
      this.drawTorus(opacity);
    } else if (this.type === 'cone') {
      this.drawCone(opacity);
    } else if (this.type === 'cylinder') {
      this.drawCylinder(opacity);
    }
    
    pop();
  }
  
  drawTetrahedron(opacity) {
    const s = this.size / 2;
    const [r, g, b, a] = this.getColor(opacity);
    stroke(r, g, b, a);
    
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
    const [r, g, b, a] = this.getColor(opacity);
    stroke(r, g, b, a);
    
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
    const [r, g, b, a] = this.getColor(opacity);
    stroke(r, g, b, a);
    
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

  drawTorus(opacity) {
    const [r, g, b, a] = this.getColor(opacity);
    stroke(r, g, b, a);

    const tubeRadius = this.size / 6;
    const radius = this.size / 2;
    const segments = 16;

    // Draw circular rings around the torus
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * TWO_PI;
      const nextTheta = ((i + 1) / segments) * TWO_PI;

      beginShape();
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * TWO_PI;
        const x = (radius + tubeRadius * cos(phi)) * cos(theta);
        const y = (radius + tubeRadius * cos(phi)) * sin(theta);
        const z = tubeRadius * sin(phi);
        vertex(x, y, z);
      }
      endShape();
    }

    // Draw cross-sectional circles
    for (let i = 0; i < 8; i++) {
      const theta = (i / 8) * TWO_PI;
      beginShape();
      for (let j = 0; j <= segments; j++) {
        const phi = (j / segments) * TWO_PI;
        const x = (radius + tubeRadius * cos(phi)) * cos(theta);
        const y = (radius + tubeRadius * cos(phi)) * sin(theta);
        const z = tubeRadius * sin(phi);
        vertex(x, y, z);
      }
      endShape(CLOSE);
    }
  }

  drawCone(opacity) {
    const [r, g, b, a] = this.getColor(opacity);
    stroke(r, g, b, a);

    const radius = this.size / 2;
    const height = this.size;
    const segments = 16;

    // Draw lines from apex to base
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * TWO_PI;
      const x = radius * cos(angle);
      const z = radius * sin(angle);

      line(0, -height / 2, 0, x, height / 2, z);
    }

    // Draw base circle
    beginShape();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * TWO_PI;
      const x = radius * cos(angle);
      const z = radius * sin(angle);
      vertex(x, height / 2, z);
    }
    endShape(CLOSE);

    // Draw a middle circle for depth
    const midRadius = radius / 2;
    beginShape();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * TWO_PI;
      const x = midRadius * cos(angle);
      const z = midRadius * sin(angle);
      vertex(x, 0, z);
    }
    endShape(CLOSE);
  }

  drawCylinder(opacity) {
    const [r, g, b, a] = this.getColor(opacity);
    stroke(r, g, b, a);

    const radius = this.size / 2;
    const height = this.size;
    const segments = 16;

    // Draw top circle
    beginShape();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * TWO_PI;
      const x = radius * cos(angle);
      const z = radius * sin(angle);
      vertex(x, -height / 2, z);
    }
    endShape(CLOSE);

    // Draw bottom circle
    beginShape();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * TWO_PI;
      const x = radius * cos(angle);
      const z = radius * sin(angle);
      vertex(x, height / 2, z);
    }
    endShape(CLOSE);

    // Draw vertical lines connecting top and bottom
    for (let i = 0; i < segments; i += 2) {
      const angle = (i / segments) * TWO_PI;
      const x = radius * cos(angle);
      const z = radius * sin(angle);

      line(x, -height / 2, z, x, height / 2, z);
    }
  }
}

class Particle {
  constructor(x, y, size, colorIndex) {
    this.x = x;
    this.y = y;
    this.z = random(-100, 100);
    this.size = size;
    this.colorIndex = colorIndex;
    this.speedX = random(-0.5, 0.5);
    this.speedY = random(-0.5, 0.5);
    this.speedZ = random(-0.5, 0.5);
    this.floatOffset = random(TWO_PI);
  }

  getColor(opacity = 1) {
    // Calculate hue for this particle
    let hue = baseHue + startingHueOffset + (this.colorIndex * hueDirection * colorStep);
    // Wrap hue to 0-360 range
    hue = (hue + 360) % 360;
    // Convert HSL to RGB (maintaining luminance at 54%)
    const [r, g, b] = hslToRgb(hue, 100, 54);
    // Base opacity varies with z position
    const baseOpacity = map(this.z, -100, 100, 30, 100);
    return [r, g, b, baseOpacity * opacity];
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
    const [r, g, b, a] = this.getColor(opacity);
    stroke(r, g, b, a);
    strokeWeight(this.size);
    point(0, 0);
    pop();
  }
} 