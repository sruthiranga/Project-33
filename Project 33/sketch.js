const Engine = Matter.Engine;
const World = Matter.World;
const  Events = Matter.Events;
const  Bodies = Matter.Bodies;

var ground;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;

var score = 0;

var particle;

var turn = 0;

var gameState = "start";

var bucketline;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  World.add(world, Engine);

  ground = new Ground(400,780,800,20);


  bucketline = createSprite(400, 450, 800, 10);
  bucketline.shapeColor = "yellow";


   for (var k = 0; k <= innerWidth; k = k + 80) {
     divisions.push(new Division(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    
}
 


function draw() {
  background(0, 0, 0);
  textSize(20)
  text("Score : "+score,20,30);

  text("1", 35, 550);
  
  text("1", 115, 550);
 
  text("1", 195, 550);
 
  text("1", 275, 550);
  
  text("1", 355, 550);

  text("1", 435, 550);

  text("1", 515, 550);

  text("1", 595, 550);

  text("1", 675, 550);

  text("1", 755, 550);

  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-10, width/2+10), 10,10));
     score++;
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   if(particle!=null){
     particle.display();

     if(particle.body.position.y>760){
          if(particle.body.position.x<300){
            score = score + 500;
            particle = null;
            if(count>=5) gameState = "end";
          }
          if(particle.body.position.x>301 && particle.position.x<600){
            score = score + 100;
            particle = null;
            if(count>=5) gameState = "end";
          }
          if(particle.body.position.x>601 && particle.body.position.x<900){
            score = score + 200;
            particle = null;
            if(count>=5) gameState = "end";
          }
    }

    if(gameState === "end"){
      turn = turn++;
    }

    if(turn === 5){
      gameState = "end";
      textSize(35);
      text("Game Over", 400, 400);
    }
   }
   ground.display();
   //bucketline.display();

   drawSprites();
}

function mousePressed(){
  if(gameState == "end"){
    count++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}