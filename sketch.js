var player, player_running;
var bananna, bananna_image, banannaGroup;
var stone, stone_image, stoneGroup;
var back, ground_image, ground;
var score = 0;

function preload() 
{
  ground_image = loadImage("jungle.jpg");

  player_running =
loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
          
  bananna_image = loadImage("Banana.png");

  stone_image = loadImage("stone.png");
}

function setup() 
{
  createCanvas(600, 300);

  back = createSprite(600, 0, 400, 10);
  back.addImage(ground_image);
  back.x = back.width/2;
  back.velocityX = -2;

  player = createSprite(100, 240, 20, 50);
  player.addAnimation("running", player_running);
  player.scale = 0.2;

  ground = createSprite(300, 250, 400, 10);
  ground.visible = false;

  banannaGroup = new Group();

  stoneGroup = new Group();
}

function draw() 
{
  background("white");
  
 if (back.x < 0) 
  {
    back.x = back.width/2;
  }

  if (keyDown("space")) 
  {
    player.velocityY = -10;
  }

  player.velocityY = player.velocityY + 0.5;

  food();
  obstacle();

  player.collide(ground);

  if (player.isTouching(banannaGroup)) 
  {
    banannaGroup.destroyEach();
    score = score + 2;
  }
  
  switch(score)
  {
    case 10: player.scale = 0.25;
    break;
    case 20: player.scale = 0.3;
    break;
    case 30: player.scale = 0.35;
    break;
    case 40: player.scale = 0.4;
    break;
    default: break;
  }
  
  if (player.isTouching(stoneGroup))
  {
    player.scale = 0.15;
  }

  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(20);
  text("Score: " + score, 500, 50);
}

function food() 
{
    
  if (frameCount % 80 === 0) 
  {
    bananna = createSprite(600, 200, 40, 10);
    bananna.y = random(120, 200);
    bananna.addImage(bananna_image);
    bananna.scale = 0.1;
    bananna.velocityX = -3;

    bananna.lifetime = 200;

    banannaGroup.add(bananna);
  }
}

function obstacle() 
{
  if (frameCount % 300 === 0) 
  {
    stone = createSprite(600, 230, 40, 10);
    stone.addImage(stone_image);
    stone.scale = 0.15;
    stone.velocityX = -3;

    stone.lifetime = 200;

    stoneGroup.add(stone);
  }
}