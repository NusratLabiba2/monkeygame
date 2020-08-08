//Global Variables
var bananaimg, obstacleimg, bananagroup, obstaclegroup
var monkey_running, monkey
var backimg, groundimg, Background, ground, invisibleground
var gamestate, PLAY, END
var gameOverimg, restartimg, gameOver, restart

var score = 0

function preload(){
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaimg = loadImage("banana.png");
  obstacleimg = loadImage("stone.png");
  
  backimg = loadImage("jungle.jpg");
  groundimg = loadImage("ground.jpg");
  
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  
}


function setup() {
  createCanvas(600,300);
  
  Background = createSprite(200, 200, 400, 400);
  Background.addImage("background", backimg);
  
  ground = createSprite(200, 380, 50, 400);
  ground.addImage("ground", groundimg);
  ground.velocityX = -5
    if (ground.x < 0) {
      ground.x = ground.width/2;
    }
  invisibleground = createSprite(200, 385, 10, 400);
  invisibleground.visible = false;
  
  monkey = createSprite(100,375,20,50);
  monkey.addAnimation(monkey_running);
  monkey = 0.2;
  
  bananagroup = new Group();
  obstaclegroup = new Group();
  
  PLAY = 1;
  END = 2;
  gamestate = 1;
  
  gameOver = createSprite(300, 200);
  gameOver.addImage("gameOver", gameOverimg);
  gameOver.scale = 0.5;
  
  restart = createSprite(300, 300);
  restart.addImage("restart", restartimg);
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
}


function draw(){
 background(255); 
  
  monkey.collide(invisibleground);
  
  if (gamestate === PLAY) {
    if (ground.x < 0) {
      ground.x = ground.width/2;
     }
  
    if (bananagroup.isTouching(monkey)) {
      score = score + 2
      bananagroup.destroyEach();
    }
    
    if (keyDown("space")) {
      monkey.velocityY = -12;
    }
    
    monkey. velocityY = monkey.velocityY + 0.8;
        
    if (score % 10 === 0) {
      switch(score) {
        case 10: monkey.scale = 0.25;
          break;
        case 20: monkey.scale = 0.3;
          break;
        case 30: monkey.scale = 0.35;
          break;
        case 40: monkey.scale = 0.4;
          break;
        case 50: monkey.scale = 0.45;
          break;
        case 60: monkey.scale = 0.5;
          break;
        case 70: monkey.scale = 0.55;
          break;
        case 80: monkey.scale = 0.6;
          break;
        case 90: monkey.scale = 0.65;
          break;
        case 100: monkey.scale = 0.7
          break;
      }
    }
  
    if (obstaclegroup.isTouching(monkey)) {
      monkey.scale = 0.2
    }
  
    if (obstaclegroup.isTouching(monkey) && monkey.scale <= 0.2) {
      gamestate = 2;
    }
  } else if (gamestate ===END) {
    monkey.velocityY = 0;
    ground.velocityx = 0;
    bananagroup.velocityX = 0;
    obstaclegroup.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;
  }
  
  if (mousePressedOver(restart) && gamestate === END){
    score = 0
    gameOver.visible = false;
    restart.visible= false;
    gamestate = PLAY;
    obstaclegroup.destroyEach();
    bananaGroup.destroyEach();
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var rock = createSprite(400,365,10,40);
    rock.velocityX = -5;

    rock.addImage("Stone", obstacleimg);

    rock.scale = 0.15;
    rock.lifetime = 100;
    //add each obstacle to the group
    obstaclegroup.add(rock);
  }
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var bananas = createSprite(400,320,40,10);
    bananas.y = Math.round(random(120,200));
    bananas.addImage("Banana", bananaimg);
    bananas.scale = 0.05;
    
    bananas.velocityX = -5;
    bananas.lifetime = 100;
    
    bananagroup.add(bananas);
  }
  
}
    
    
    