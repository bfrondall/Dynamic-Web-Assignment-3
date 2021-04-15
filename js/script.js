var vidcapture, ctracker, drawcanvas;
var maxDiameter; 
var theta;

var fade;
var fadeAmount = 1 
//let button;
var gif_loadImg, gif_createImg;

function preload() {
	gif_loadImg = loadImage("https://i.imgur.com/mcAdurl.gif");
	gif_createImg = createImg("https://i.imgur.com/mcAdurl.gif");
}

function setup(){

	maxDiameter = 20; 
	theta = 0; 
	fade = 0

	var cnv = createCanvas(windowWidth*4, windowHeight*4)
	cnv.parent("p5canvas");

//button for pulsating speed, didn't work 

	// button = createButton('Faster');
	// button.position(0,0);
	// button.mousePressed(SpeedUp);

	// button= createButton('Slower');
	// button.position(10,10);
	// button.mousePressed(SlowDown);
	
	vidcapture = createCapture(VIDEO);
	vidcapture.size(vidcapture.width*2,vidcapture.height*3);
	vidcapture.hide()

	//start tracker
	ctracker = new clm.tracker()
	ctracker.init();
	ctracker.start(vidcapture.elt)
	drawcanvas = document.getElementById('defaultCanvas0')
}

//tried to create a button to adjust speed of pulsating

// function SpeedUp(){
// 		theta += 0.1;
// }

// function SlowDown(){
// 	theta += 0.01;
// }

function draw(){

	//image(vidcapture, 0, 0)
	//this makes the video capture not inverted 
	//background(255,10)
	translate(vidcapture.width, 0)
	scale(-1, 1)

	image(gif_loadImg, -75, -75);

	gif_createImg.position(0, 0);
	gif_createImg.hide()
	
	var position = ctracker.getCurrentPosition()
	var diam = 100 + sin(theta) * maxDiameter ;

	print(position)


	//all of the work with positions will be made through this statement
	if (position){

		//ellipse needs an x position, y position, and diameter
		var r = map(position[62][0], 250, 300, 100, 150)
		var b = map(position[62][1], 150, 200, 100, 150)
		fill(r, 255, b, fade);

		position.forEach(function(pos){
			ellipse(pos[0], pos[1], diam/4, diam/4, 2)
				theta += 0.001;

			if (fade<50) fadeAmount = 0.01; 
 
  			if (fade>255) fadeAmount= -10; 

  			fade += fadeAmount;

		// print("x: " + position[62][0])
		// print("y: " + position[62][1])

	})
}

}


