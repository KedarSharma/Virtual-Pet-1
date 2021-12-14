{var database,foodRef,food,gameStateRef,gameState;
var petName = "";
var form,pet1,play,player1;
var dogI,dogII,dog,game1,Food1,room;
var myState = "instructions";
var mState;
var a = 1;
var tis;
var defaultfood = 10;
var nohunger,hunger;

var foodshow = [];}

function preload(){
	dogII = loadImage("images/dogImg1.png");
	dogI = loadImage("images/dogImg.png");
	room = loadImage("images/room.jpg");
	nohunger = loadImage("images/fullfood.png");
	hunger = loadImage("images/no food.png");
}

function setup() {
	createCanvas(800, 500);

	for(var a = 0;a <10;a++){
		foodshow[a] = createSprite(750-(25*a),50);
		foodshow[a].addImage(nohunger);
		foodshow[a].scale = 0.09;
	}

	database = firebase.database();

	play = new Play();

	play.start();
}

function draw(){
	background("black");
	
	tis = performance.now()/1000;


	mState = game1.getState();

	getFood();

	if(mState !== "playing"){
		database.ref("/").update({
			"Food" : defaultfood
		});
		for(var a = 0;a< 10 ; a++){
			foodshow[a].visible = false;
		}
	}

	if(mState == "playing"){
		dog.visible = true;
		background(room);

		
		fill("yellow");
		rect(190,410,400,50);

		textSize(40);
		fill("#7600ff");
		text("Press Space To Feed",200,450);

		foodReduction();

		if(keyWentDown("space") && food <=9){
			food=food+1;
			database.ref("/").update({
				"Food" : food
			});
		};

		for(var a = 0;a< 10 ; a++){
			foodshow[a].visible = true;
		}
	
		if(tis%20 > 0.482 && tis%20 < 0.518 && tis > 1 && food >=1){
			food = food - 1;
			database.ref("/").update({
				"Food" : food
			});
		}
	
		if(food < 9){
			dog.addImage(dogII);
		}
	
		if(food >=9){
			dog.addImage(dogI);
		}
		
	}

  	drawSprites();
}
