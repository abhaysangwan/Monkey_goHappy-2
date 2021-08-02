var ground, groundImage;
var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var stone, stoneImage, stoneGroup;
var score = 0;
var survivalTime = 0;
var PLAY=1;
var END=2;
var gameState=PLAY;


function preload() {

  monkey_running = loadAnimation("Monkey_01.png"," Monkey_02.png"," Monkey_03.png"," Monkey_04.png"," Monkey_05.png"," Monkey_06.png"," Monkey_07.png", "Monkey_08.png", "Monkey_09.png"," Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
}

function setup() {

    createCanvas(windowWidth,windowHeight);
  
    monkey = createSprite(80, 315, 20, 20);
    monkey.addAnimation("moving", monkey_running);
    monkey.scale = 0.1;
  
    ground = createSprite(400, 350, 900, 10);
    ground.velocityX = -4;
    ground.x = ground.width / 2;
    console.log(ground.x);
  
    bananaGroup = createGroup();
    stoneGroup = createGroup();
  }
  
  function draw() {
    background('lightgreen');
    if(gameState===PLAY) {
      handleJump();
      resetGround();
      createFood();
      createStone();
      
    
      if (monkey.isTouching(bananaGroup)) {
        score=score+1;
        bananaGroup.destroyEach();
       
      }
      
    
      if(monkey.isTouching(stoneGroup)) {
        gameState=END;
      }
    }
    
    if (gameState == PLAY) {
      
      survivalTime = Math.ceil(frameCount / frameRate());
      
    } else if(gameState==END) {
      
      stroke("red");
      textSize(30);
      fill("red");
      text("GAME OVER", 300,300);
      monkey.velocityX=0;
      bananaGroup.setVelocityXEach(0);
      stoneGroup.setVelocityXEach(0);    
      ground.velocityX=0;
  
   
      if (keyDown("space")) {
        score=0;
        survivalTime=0;
        frameCount = 0;
        gameState = PLAY;
      }
    }
    
    drawSprites();
  
    monkey.collide(ground);
    
    stroke("white");
    textSize(20);
    fill("white");
    text("score: " + score, 400, 50);
  
    stroke("black");
    textSize(20);
    fill("black");
    text("survivalTime: " + survivalTime, 100, 50);
    }
  
  function handleJump() {
    

    if (keyDown("space")) {
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
  }
  
  function resetGround() {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
  }
  
  function createFood() {
    if ((World.frameCount % 80) === 0) {
      var randY = Math.round(random(120, 210));
      banana = createSprite(450, randY, 20, 20);
      banana.addImage(bananaImage);
      banana.lifetime = 140;
      banana.velocityX = -4;
      banana.scale = 0.1;
      bananaGroup.add(banana);
    }
  }
  
  function createsyStone() {
    if ((World.frameCount % 300) === 0) {
      
      stone = createSprite(600, 327, 20, 20);
      stone.addImage(stoneImage);
      stone.lifetime = 140;
     stone.velocityX = -4;
      stone.scale = 0.1;
      stoneGroup.add(stone);
    }
  }
  