//Declareing Variables
var trex, trex_running, edges;
var groundImage;
var grounded;
var UnderGround;
var SCOREBOIZ;
var Cl;
var OOf1,OOf2,OOf3,OOf4,OOf5,OOf6,OOf7;
var GS;
var P=1;
var E=0;
var CsG;
var OeG;
var GoverImage,GrestImage,Hakugi,thakugi;
var trex_collided;
var JS,DS,CPS;
var GameO,GameOi;
var R0,R1;

//preloads Images for da sprites
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  GoverImage = loadImage("gameOver.png");
  GrestImage = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png");
  ClImage = loadImage("cloud.png");
  OOf1 = loadImage("obstacle1.png");
  OOf2 = loadImage("obstacle2.png");
  OOf3 = loadImage("obstacle3.png");
  OOf4 = loadImage("obstacle4.png");
  OOf5 = loadImage("obstacle5.png");
  OOf6 = loadImage("obstacle6.png");
  JS = loadSound("jump.mp3");
  DS = loadSound("die.mp3");
  CPS = loadSound("checkPoint.mp3");
  GameOi = loadImage("gameOver.png");
  R1 = loadImage("restart.png");
  
  
}

//Creates Sprites,Canvas and makes Warnigs
function setup() {
  GS = E;
  createCanvas(600, 200);
  SCOREBOIZ = 0;
  
  console.warn("You are editing (or viewing) copyrighted content which was orignaly made by Google LLC.Please ask Google LLC to get and change this content");
  
  GameO = createSprite(300,100,210,50);
  GameO.visible = 0;
  GameO.addImage("GameOver",GameOi);
  
  R0 = createSprite(300,150,30,30);
  R0.visible = 0;
  R0.addImage("restart",R1);
  
  
  
  
  UnderGround = createSprite(200,195,1000,10);
  UnderGround.visible = false;

  grounded = createSprite(200, 190, 1000, 20);
  grounded.addAnimation("ground", groundImage);
   
  // creating trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("LOLimDed", trex_collided);
  edges = createEdgeSprites();
  
  CsG = new Group();
  OeG = new Group();

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50;
}

function draw() { 
 //set background color 
  background("white");
  if (GS == P){
    GameO.visible = 0;
         trex.changeAnimation("running", trex_running);
        SCOREBOIZ += 0.25;
     grounded.velocityX = -(11+SCOREBOIZ/100);
    if (grounded.x < 0) {
    grounded.x = 300;
    }
    //jump when space key is pressed
  if (keyDown("space")  &&  trex.y > 159.75) {
    trex.velocityY = -10;
  }
    sC();
  //The Obsticals Function
  DinoMustDie();
    if(OeG.isTouching(trex)){
      GS = E;
      SCOREBOIZ = 0;
      DS.play();
   
    }
    if (keyWentDown("Space")){
      JS.play();
      
    }
    if (SCOREBOIZ %100 == 0 && SCOREBOIZ > 0){
      CPS.play();
  
    }
    R0.visible = 0;
  }
  else if (GS == E){
    grounded.velocityX = 0;
    if (mousePressedOver(R0)){
  
      GS = P;
      //Makes Trex Running in the 90's
 trex.changeAnimation("running", trex_running);
      CsG.destroyEach();
       OeG.destroyEach();
    }
    GameO.visible = 1;
    R0.visible = 1;
    trex.velocityY = 0;
     OeG.setVelocityXEach (0) ;
         CsG.setVelocityXEach (0) ;
    CsG.setLifetimeEach(-12);
  OeG.setLifetimeEach(-1) ; 
    trex.changeAnimation("LOLimDed",trex_collided)
  }
  text("Score:"+Math.round(SCOREBOIZ),5,10);
  //logging the y position of the trex
  
  trex.velocityY = trex.velocityY + 0.5;

  //stop trex from falling down
  trex.collide(UnderGround);
  
 
  drawSprites();
}
//Cloud Formation
function sC() {
 if (frameCount %Math.round(random(30,100)) == 0){Cl = createSprite(600,random(100,20),20,10);
 Cl.velocityX=-5;
 Cl.addImage("cloud",ClImage);
 Cl.scale = 0.25;
 Cl.depth = 2.99;
 console.log(trex.depth);
 console.log(Cl.depth); 
 Cl.lifetime = 203;
  CsG.add(Cl);  
}   
    
  }
  //The Obsticals Function  
function DinoMustDie(){
  if (frameCount %Math.round(random(60,70)) == 0)
  { OOf7 = createSprite(605,170,10,50)
   var rando = Math.round(random(1,6));
   switch(rando){
     case 1:OOf7.addImage("OOf1",OOf1) ;
      OOf7.scale = 0.05;
     break;
      case 2:OOf7.addImage("OOf2",OOf2) ;
              OOf7.scale = 0.1;
      break ;
     case 3:OOf7.addImage("OOf3",OOf3) ;
              OOf7.scale = 0.1;
     break;
      case 4:OOf7.addImage("OOf4",OOf4) ;
              OOf7.scale = 0.05;
      break ;  
     case 5:OOf7.addImage("OOf5",OOf5) ;
              OOf7.scale = 0.1;
     break;
      case 6:OOf7.addImage("OOf6",OOf6) ;
              OOf7.scale = 0.1;
      break ;   
      default:break;
   }
   //fixes olsticals memory leak
   OOf7.lifetime = 70;
   OOf7.velocityX = -(11+SCOREBOIZ/100) ; 
   OeG.add(OOf7);
  }
  
}
