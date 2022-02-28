var balloon,balloonImage1,balloonImage2;
// crie as variáveis da base de dados e da posição aqui
var dataBase;
var heightRef;
var pos;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

function setup() {
  //crie o ambiente incial utilizando a função firebase.database()
  dataBase = firebase.database();
  createCanvas(windowWidth,windowHeight);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 

  //obtenha as informações da base de dados com .ref('caminho')
  heightRef = dataBase.ref("balloon/height");
  
  //crie o ouvinte com .on("value", funçãodesucesso, funçãodeerro)
  heightRef.on("value",lerPos,erro)
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escreva um código para mover o balão para a esquerda, escrevendo na base de dados
    escreverPos(-5,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escreva um código para mover o balão para a direita, escrevendo na base de dados
    escreverPos(+5,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escreva um código para mover o balão para cima, escrevendo na base de dados
    escreverPos(0,-5)
    //aumente o tamanho do balão
    balloon.scale += 0.005
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escreva um código para mover o balão para baixo, escrevendo na base de dados
    escreverPos(0,+5)
    //diminua o tamanho do balão
    balloon.scale -= 0.005
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

//não se esqueça de definir a função de sucesso do .on(), incluindo .val();
//não se esqueça de definir a função de erro do .on();
//não se esqueça de definir a função de escrever a posição do balão no banco de dados, incluindo .set()
function lerPos(data){
  pos = data.val();
  balloon.x = pos.x;
  balloon.y = pos.y;  
}
function erro(){
  console.error("Erro de leitura");
}
function escreverPos(x,y){
  heightRef.set({
    x:balloon.x + x,
    y:balloon.y + y
  })
}