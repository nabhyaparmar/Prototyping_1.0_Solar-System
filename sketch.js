//Declare Fonts
let font1;

//Move
let increment = true;
let counter;
let counterNew;

//Declare Planet Names
let planetCode = [0, 1, 2, 3, 4, 5, 6, 7];

let names = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

let gStrength = ["3.70m/s^2", "8.36m/s^2", "9.80m/s^2", "3.72m/s^2", "24.79m/s^2", "10.44m/s^2", "8.87m/s^2", "11.15m/s^2",];

let orbitTime = ["88 Days", "225 Days", "365 Days", "687 Days", "4,380 Days", "10,585 Days", "30,660 Days", "60,225 Days"]

let orbitDistance = ["35M Miles", "67M Miles", "92M Miles", "141M Miles", "483M Miles", "886M Miles", "1783M Miles", "2795M Miles"];

let distEarth = ["28M Miles", "62M Miles", "0 Miles", "33.9M Miles", "365M Miles", "746M Miles", "1600M Miles", "2700M Miles"];

//Declare Background Image
let bg;

// Declare Planet Variables
let visibility;
let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturn;
let uranus;
let neptune;

//Declare Mid Points
let middleX;
let middleY;

//Declare Planet Speeds
let mercurySpeed = 300;
let venusSpeed = 200;
let earthSpeed = 1500;
let marsSpeed = 1800;
let jupiterSpeed = 0;
let saturnSpeed = 10;
let uranusSpeed = 200;
let neptuneSpeed = 800;
let plutoSpeed = 1900;

function preload() {
  font1 = loadFont("SpaceGrotesk-Medium.ttf");
  bg = loadImage('Background Image.png');
}

function setup() {
  createCanvas(800, 800);
  extraCanvas = createGraphics(800,800);
  extraCanvas.clear();
    
  //Create planets as objects
  mercury = new Planets(64, 32, 5, "#CADCC1", names[0], planetCode[0]);
  venus = new Planets(90, 45, 8, "#FCEEC3", names[1], planetCode[1]);
  earth = new Planets(120, 60, 12, "#5C9BE4", names[2], planetCode[2]);
  mars = new Planets(146, 73, 10, "#DC6855", names[3], planetCode[3]);
  jupiter = new Planets(280, 140, 25, "#EBB98E", names[4], planetCode[4]);
  saturn = new Planets(400, 200, 20, "#C4135D", names[5], planetCode[5]);
  uranus = new Planets(520, 260, 16, "#74BAC5", names[6], planetCode[6]);
  neptune = new Planets(600, 300, 14, "#3C5684", names[7], planetCode[7]);
}

function draw() {
  middleX = width / 2;
  middleY = height / 2;
  image(bg, 0, 0);
  
  // background(0);

  //Sun
  fill(255, 214, 0);
  noStroke();
  circle(middleX, middleY, 50);
  
  //Mercury
  mercury.make(mercurySpeed);
  
  //Venus
  venus.make(venusSpeed);

  //Earth
  earth.make(earthSpeed);
  
  //Mars
  mars.make(marsSpeed);

  //Jupiter
  jupiter.make(jupiterSpeed);
  
  //Saturn
  saturn.make(saturnSpeed);
  push();
  fill("#C4135D")
  ellipse(sin(saturnSpeed) * 200 + middleX, cos(saturnSpeed) * 200 + middleY, 27, 14)
  pop();
  
  //Uranus
  uranus.make(uranusSpeed);
  
  //Neptune
  neptune.make(neptuneSpeed);

  //Orbital Speeds
  if (counter != millis()) {
    mercurySpeed += 0.01;
    venusSpeed -= 0.0075;
    earthSpeed += 0.006;
    marsSpeed += 0.005;
    jupiterSpeed += 0.003;
    saturnSpeed += 0.0025;
    uranusSpeed += 0.0015;
    neptuneSpeed += 0.0012;
  } else {
    mercurySpeed += 0;
    venusSpeed -= 0;
    earthSpeed += 0;
    marsSpeed += 0;
    jupiterSpeed += 0;
    saturnSpeed += 0;
    uranusSpeed += 0;
    neptuneSpeed += 0;
  }
  image(extraCanvas, 0, 0);
  
}



function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mouseClicked() {
  extraCanvas.clear();
  counter = millis() + 2000;
  
  if (mercury.clicked() == true) {
    mercury.display();
  } else if (venus.clicked() == true) {
    venus.display();
  } else if (earth.clicked() == true) {
    earth.display();
  } else if (mars.clicked() == true) {
    mars.display();
  } else if (jupiter.clicked() == true) {
    jupiter.display();
  } else if (saturn.clicked() == true) {
    saturn.display();
  } else if (uranus.clicked() == true) {
    uranus.display();
  } else if (neptune.clicked() == true) {
    neptune.display();
  } else {
    console.log("This is not a planet");
  }
  
}

class Planets {
  constructor(orbit, radius, size, color, name, code) {
    this.orbit = orbit;
    this.radius = radius;
    this.size = size;
    this.color = color;
    this.name = name;
    this.code = code;
  }

  //Make Function
  make(speed) {
    this.speed = speed;

    push();
    setLineDash([3, 3]);
    noFill();
    stroke(255, 50);
    circle(middleX, middleY, this.orbit);
    pop();

    fill(this.color);
    noStroke();
    circle(
      (sin(this.speed) * this.radius + middleX), (cos(this.speed) * this.radius + middleY), this.size);
  }
  
  //Display Function
  display() {
    extraCanvas.clear();
    let info = "Name: " + names[this.code] + "\n" + "Gravitational Strength: " + gStrength[this.code] + "\n" + "Orbit Time: " + orbitTime[this.code] + "\n" + "Orbit Circumference: " + orbitDistance[this.code] + "\n" + "Distance from Earth: " + distEarth[this.code];
    console.log("This is " + this.name);
    //Box
    push();
    extraCanvas.stroke(69, 19, 19);
    extraCanvas.strokeWeight(1);
    extraCanvas.fill(255, 216, 218, 200);
    extraCanvas.rect(mouseX-10,mouseY-20, 224, 92, 5);
    pop();
    
    //Text
    push();
    extraCanvas.noStroke();
    extraCanvas.fill(69, 19, 19);
    extraCanvas.textFont(font1);
    extraCanvas.text(info, mouseX, mouseY);
    pop();
    
  }
  
  
  //Clicked Function 
  clicked() {
    increment = false;
    console.log(counter, counterNew);
    var d = dist(
      sin(this.speed) * this.radius + middleX, cos(this.speed) * this.radius + middleY, mouseX, mouseY);
    if (d < this.size) {
      return true;
    } else { 
      return false;
    }
  }
}
