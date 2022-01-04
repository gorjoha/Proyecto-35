var balloon,balloonImage1,balloonImage2;
// crea aquí la base de datos y la variable de posición 
var database;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readPosition,showError);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
    balloon.x=balloon.x-3;
    updatePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
    balloon.x=balloon.x+3;
    updatePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.001;
    //escribe el código para mover el globo aerostático en dirección ascendente
    balloon.y=balloon.y-3;
    updatePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección descendente
    balloon.y=balloon.y+3;
    balloon.scale=balloon.scale +0.001;
    updatePosition(0,+1);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}

function readPosition(data){
  height= data.val();
  // console.log(height.x);
  // console.log(height.y);
  balloon.x=height.x;
  balloon.y=height.y
}

function showError(){
  console.log("ErrorBaseDatos");
}

function updatePosition(x,y){
  database.ref('balloon/height').set({
      'x':height.x+x,
      'y':height.y+y
  })
}