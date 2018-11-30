function setup() {
	createCanvas(displayWidth*2 - 10, displayHeight*2 - 82);
	//createCanvas(displayWidth/window.devicePixelRatio-10, displayHeight/window.devicePixelRatio - 82);
	//rate of rotation
	speed = 8;
	//framecount to control object creation time
	increment = -1;
	//width/string length
	shuf = 26;
	shuffleSize = shuf/10;
	//throwdisplayHeight
	throwHeight = 25;
	//diabolo size. Controls zoom
	zoom = 100;
	diameter = zoom/4;
	//holds diabolo objects
	diabs = [];
	diabs2 = [];
	//navigates siteswap position
	next = 0;
	//mode. 0 for low, 1 fordisplayHeight
	mode = "LOW";
	colMode = "Diabolo";
	letters = "0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUBWXYZ";
	menu = -1;
	menu2 = -1;
	menu3 = -1;
	sun = 0;
	wel = -1;
	mes = -1;
	tapped = 0;
	inheight = 1;
	w = width;
	h = height;
	//coordinates
	x = w/2;
	y = h - shuffleSize*diameter - 40;
	siteswap = "753153455615613";

	// set options to prevent default behaviors for swipe, pinch, etc
  var options = {
    preventDefault: true
  };

  // document.body registers gestures anywhere on the page
  var hammer = new Hammer(document.body, options);
	//var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
  hammer.get('pan').set({
    direction: Hammer.DIRECTION_ALL
  });
	hammer.get('doubletap');
	//hammer.get("pinch");
	hammer.get('pinch').set({ enable: true });

	//hammer.on("pinch", scal);
	hammer.on("doubletap", dt);
	hammer.on("pinch", tt);
  hammer.on("pan", swiped);



	menuButton = createButton("_");
	//advButton = createButton("˅");
	lowbutton = createButton("Low");
	highbutton = createButton("High");
	rcasbutton = createButton("RevCas");
	casbutton = createButton("Cascade");
	mcolbutton = createButton("MinCol");
	intbutton = createButton("Integral");
	boxbutton = createButton("Box");
	flbutton = createButton("4Loop");
	allbutton = createButton("All");
	resetButton = createButton("Reset Variables")

	cslider = createSlider(0, 255, 190);
	bgslider = createSlider(0, 765, 750);
	sslider = createSlider(0, 20, speed);
	zslider = createSlider(1, 400, zoom);
	thslider = createSlider(10, 100, throwHeight);
	ssslider = createSlider(0, 100, shuf);
	colourButton = createButton("COLOUR");
	instructButton = createButton("~")
	messbutton = createButton("?")


	ss = createInput("55264263353456262625244");

	//ss = createInput("753153455615613");
	//styleButton(speedUp, 925, 305);
	//styleButton(speedDown, 745, 305);
	//styleButton(advopt, 950, 205, 25, 12);
	//styleButton(colourButton, 745, 395, 120);
	//styleButton(modeButton, 745, 350, 230, 25, "buttonface", "rgb(20)");
	styleButton(cslider, 20, h/2, w - 40);
	styleButton(bgslider, 20, h/2, w - 40);
	styleButton(sslider, 20, h/8, w - 40);
	styleButton(zslider, 20, h/3.5, w - 40);
	styleButton(thslider, 20, h*2/3, w - 40);
	styleButton(ssslider, 20, h*4/5, w - 40);

	styleButton(boxbutton, 20, h*2/3, w/3-10);
	styleButton(intbutton, w/3+10, h*2/3, w/3-10);
	styleButton(mcolbutton, 2*w/3, h*2/3, w/3-10);
	styleButton(rcasbutton, 20, h*2/3+35, w/3-10);
	styleButton(casbutton, w/3+10, h*2/3+35, w/3-10);
	styleButton(flbutton, 2*w/3, h*2/3+35, w/3-10);
	styleButton(lowbutton, 20, h*2/3+90, w/4-7.5);
	styleButton(highbutton, w/4+12.5, h*2/3+90, w/4-7.5);
	styleButton(messbutton, 2*w/4+5, h*2/3+90, w/4-7.5);
	styleButton(allbutton, 3*w/4-2.5, h*2/3+90, w/4-7.5);





	styleButton(menuButton, w - 60, 20);
	styleButton(instructButton, 40, 20);
	//styleButton(advButton, w- 60, 4*h/7);
	styleButton(ss, 50, h - 35, w - 100, 25);
	styleButton(colourButton, 20, 5*h/12-16, x - 40);
	styleButton(resetButton, 40, h/1.2, w-80);
	menuButton.mouseClicked(m);
	instructButton.mouseClicked(q);
	//advButton.mouseClicked(adv);
	colourButton.mouseClicked(colm);
	lowbutton.mouseClicked(trick1);
	highbutton.mouseClicked(trick0);
	intbutton.mouseClicked(trick2);
	mcolbutton.mouseClicked(trick3);
	rcasbutton.mouseClicked(trick4);
	casbutton.mouseClicked(trick5);
	boxbutton.mouseClicked(trick6);
	flbutton.mouseClicked(trick7);
	allbutton.mouseClicked(allt);
	resetButton.mouseClicked(reset);
	messbutton.mouseClicked(mess);


	start();
}

function reset(){
	sslider.elt.value = 8;
	zslider.elt.value = 100;
	thslider.elt.value = 25;
	ssslider.elt.value = 26;
	cslider.elt.value = 190;
	bgslider.elt.value = 750;
	ss.elt.value = "55264263353456262625244";
	mes = -1;
	mode = "LOW";
	start();
}

function m(){
	menu *= -1;
	if(bgslider.value() > 510){
	background(bgslider.value()-510);
	}
	else if(bgslider.value() > 255){
		colorMode(HSB, 255, 255);
		background((bgslider.value()-255), 255, 255);
	}
	else{
		colorMode(HSB, 255, 255);
		background(bgslider.value(), 30, 255);
	}
	start();
}

function q(){
	menu3 *= -1;
}

function mess(){
	mes *= -1;
}

function start(){
	diabs = [];
	diabs2 = [];
	increment = -1;
	next = 0;
	styleButton(ss, 50, h - 35, w - 100, 25);
	if(mode == "HIGH"){
		y = h - shuffleSize*diameter*3 - 40;
	}
	else if(mode == "ALL")
	y = h - shuffleSize*25 - 40;
	else{
		y = h - shuffleSize*diameter - 40;
	}
	x = w/2;
	if(mode == "INTEGRAL"){
		diabs2.push(new integral(x, y*0.75));
	}
	else if(mode == "BOX"){
		diabs2.push(new boxx(x, y*0.85));
	}
	else if(mode == "MCOL"){
		diabs2.push(new minicolumns(x, y*0.85));
	}
	else if(mode == "CAS"){
		diabs2.push(new cascade(x, y, -1));
	}
	else if(mode == "RCAS"){
		diabs2.push(new cascade(x, y, 1));
	}
	else if(mode == "4LOOP"){
		diabs2.push(new fourloop(x, y*0.85));
	}
	else if(mode == "ALL"){
		diabs2.push(new cascade(x/2, y/3-10, 1));
		diabs2.push(new boxx(x*1.5, y/3-10));
		diabs2.push(new integral(x*1.5-5, y*2/3-10));
		diabs2.push(new minicolumns(x/2, y*2/3-10));
		diabs2.push(new fourloop(x/2, y-10));
		diabs2.push(new cascade(x*1.5, y-10, -1));

		x = x/2;
		zslider.elt.value = 50;
		//ss.elt.value = "423";
	}


	//siteswap = "55264263353456262625244";
	//siteswap = "5551753163353455615615615613";
	siteswap = ss.elt.value.toLowerCase();
}

function draw(){
	ss.elt.value = ss.elt.value.toLowerCase();
	zoom = diameter*4;

	if(mes == -1 || menu == 1){
		if(bgslider.value() > 510){
		background(bgslider.value()-510);
		}
		else if(bgslider.value() > 255){
			colorMode(HSB, 255, 255);
			background((bgslider.value()-255), 255, 255);
		}
		else{
			colorMode(HSB, 255, 255);
			background(bgslider.value(), 30, 255);
		}
	}

	speed = sslider.value();
	zoom = zslider.value();
	throwHeight = thslider.value();
	shuf = ssslider.value();
	diameter = zoom/4
	colorMode(RGB, 255);
	cslider.hide();
	bgslider.hide();
	sslider.hide();
	zslider.hide();
	thslider.hide();
	ssslider.hide();

	lowbutton.hide();
	highbutton.hide();
	intbutton.hide();
	mcolbutton.hide();
	rcasbutton.hide();
	casbutton.hide();
	boxbutton.hide();
	flbutton.hide();
	allbutton.hide();
	messbutton.hide();

	if(colMode == "Back"){
		bgslider.show();
	}
	else{
		cslider.show();
	}
	if(colMode == "Rainbow")
		cslider.elt.value = frameCount%255;
	else {
		cslider.elt.value = cslider.value();;
	}

	//current, previous and next throws
	pt = siteswap[int((next-1)%int(siteswap.length))];
	pt = letters.indexOf(pt)%36;
	ct = siteswap[int((next)%int(siteswap.length))];
	ct = letters.indexOf(ct)%36;
	nt = siteswap[int((next+1)%int(siteswap.length))];
	nt = letters.indexOf(nt)%36;

	if (mode == "HIGH"){
		//stick/string positions
		offset = cos(speed*0.75*increment*2+180);
		sposx1 = (x-(shuffleSize*diameter)+1.5*diameter*offset);
		sposy1 =  y+(shuffleSize*diameter*offset/10)+diameter*1.5;
		sposx2 = (x+(shuffleSize*diameter*0.8)-1.8*diameter*offset);
		sposy2 =  y+(shuffleSize*diameter*offset/20)+diameter*1.8;
		if(sun > 135 && sun < 405){
			sposx1 = (x-(shuffleSize*diameter)+1.5*diameter*(offset/2+0.5));
			sposx2 = (x+(shuffleSize*diameter*0.8)-1.8*diameter*(offset/2+0.5));
		}

		//string
		sContact = 0;
		stroke(235, 235, 0);
		strokeWeight(2);
		//1 sun
		for(i = diabs.length-1; i >= 0; i--){
			if (diabs[i].theight == 1 && diabs[i].fCount > 20 && diabs[i].fCount < 530){
				line(sposx1, sposy1, diabs[i].rx+x-diameter/5, diabs[i].ry+y);
				line(diabs[i].rx+x, diabs[i].ry+y, sposx2, sposy2);
				sContact = 2;
			}
		}
		//other
		for(i = diabs.length-1; i >= 0; i--){
			if (diabs[i].ry + y > (sposy2 + sposy1)/2 && sContact != 2){
				line(sposx1, sposy1, diabs[i].rx+x-diameter/5, diabs[i].ry+y);
				line(diabs[i].rx+x, diabs[i].ry+y, sposx2, sposy2);
				sContact = 1;
			}
		}
		if (sContact == 0){
			line(sposx1, sposy1, sposx2, sposy2);
		}
		stroke(0);
		strokeWeight(1);

		//sticks
		fill(51, 124, 255);
		translate(sposx1, sposy1);
		rotate(40+20*offset);
		rect(0, 0, diameter/10, diameter*2.5);
		fill(255);
		rect(-1, diameter*1.5, diameter/7, diameter*1.3);

		rotate(-40-20*offset);
		translate(-sposx1, -sposy1);

		fill(51, 124, 255);
		translate(sposx2, sposy2);
		if(sun > 0){
			offset = cos(sun*2/3+180);
			rotate(-60-40*offset);
			rect(0, 0, diameter/10, diameter*2.5);
			fill(255);
			rect(-1, diameter*1.5, diameter/7, diameter*1.3);
			rotate(60+40*offset);
		}
		else {
			rotate(-40-20*offset);
			rect(0, 0, diameter/10, diameter*2.5);
			fill(255);
			rect(-1, diameter*1.5, diameter/7, diameter*1.3);
			rotate(40+20*offset);
		}
		translate(-sposx2, -sposy2);
		increment ++;
	}
	else if(mode == "LOW" || mode == "ALL"){
		//LOW=================
		//sticks
		offset = cos(speed*increment*2+90);
		sposx1 = (x-(shuffleSize*diameter*1.1)+diameter/2*offset);
		sposy1 =  y-(diameter*3.5)+(shuffleSize*diameter*offset/10)*ct;
		sposx2 = (x+(shuffleSize*diameter*1.1)+diameter/2*offset);
		sposy2 =  y-(diameter*3.5)-(shuffleSize*diameter*offset/20)*ct;
		if(cos(sun/2+70) < 0){
			sposx1 = (x-(shuffleSize*diameter*1.1)+diameter/2*offset-(cos(sun/2+70)*diameter*shuffleSize));
			sposx2 = (x+(shuffleSize*diameter*1.1)+diameter/2*offset+(cos(sun/2+70)*diameter*shuffleSize));
		}
		if(sun > 0){
			sposy1 =  y-(diameter*3.5)+(shuffleSize*diameter*cos(sun+90)/3);
			sposy2 =  y-(diameter*3.5)-(shuffleSize*diameter*cos(sun*2/3+90)/2);
		}
		if(sun > 180){
			sposy1 =  y-(diameter*3.5)+(shuffleSize*diameter*cos(sun/2+180));
		}

		//dont display string or sticks during "ALL" mode
		if(mode != "ALL"){
			stroke(0);
			strokeWeight(1);
			fill(51, 124, 255);
			translate(sposx1, sposy1);
			if(sun>0){
				//offset = cos(sun+90);
				rotate(40+20*offset);
				rect(0, 0, diameter/10, diameter*2.5);
				fill(255);
				rect(-1, diameter*1.5, diameter/7, diameter*1.3);
				rotate(-40-20*offset);
			}
			else{
				rotate(40+20*offset);
				rect(0, 0, diameter/10, diameter*2.5);
				fill(255);
				rect(-1, diameter*1.5, diameter/7, diameter*1.3);
				rotate(-40-20*offset);
			}
			translate(-sposx1, -sposy1);

			offset = cos(speed*increment*2+110);
			fill(51, 124, 255);
			translate(sposx2, sposy2);
			rotate(-50+20*offset);
			rect(0, 0, diameter/10, diameter*2.5);
			fill(255);
			rect(-1, diameter*1.5, diameter/7, diameter*1.3);

			rotate(50-20*offset);
			translate(-sposx2, -sposy2);
			increment ++;

			//string
			stroke(235, 235, 0);
			strokeWeight(2);
			onString = [];
			//catching a landing diabolo
			for(i =0; i < diabs.length; i++){
				if(diabs[i].fCount > 270 && (diabs[i].ry + y) > (sposy2+5))
					append(onString, diabs[i]);
			}
			for(i = diabs.length - 1; i >= 0; i--){
				if (diabs[i].ry + y > sposy1 && diabs[i].fCount <= 270 || (diabs[i].theight == 1)){
					if(i < 1){
						append(onString, diabs[i]);
					}
					else {
						if(!(diabs[i-1].theight == 1 && diabs[i].fCount < 180)){
							append(onString, diabs[i]);
						}
					}
				}
			}
		}

		if (onString.length > 0){
			//stop string collisions with 1 sun
			for(i = onString.length - 1; i >= 0; i--){
				if(onString[i].theight == 1 && onString[i].fCount > 90 && onString[i].fCount < 450){
					onString = [onString[i]];
					//stops from looping again and crashing
					break;
				}
			}
			//connecting the sticks to the diabolos
			//checking gradients of potential string
			if(onString.length > 1){
				rightsgrad = ((sposy2 - (onString[0].ry+y))/(sposx2 - (onString[0].rx+x-diameter/5)))
				rightdgrad = ((onString[1].ry + y) - (onString[0].ry  + y))/((onString[1].rx + x) - (onString[0].rx + x))
				if(rightsgrad > (rightdgrad))
					onString.splice(0, 1);
				if(onString.length > 1){
					leftsgrad= ((sposy1 - (onString[onString.length-1].ry+y))/(sposx1 - (onString[onString.length-1].rx+x-diameter/5)))
					leftdgrad = ((onString[onString.length-2].ry + y) - (onString[onString.length-1].ry  + y))/((onString[onString.length-2].rx + x) - (onString[onString.length-1].rx + x))

					if(abs(leftsgrad) < (leftdgrad))
						onString.splice((onString.length-1), 1);
				}
			}

			line(sposx2, sposy2, onString[0].rx+x-diameter/5, onString[0].ry+y);
			line(onString[onString.length-1].rx+x, onString[onString.length-1].ry+y, sposx1, sposy1);
			//connecting the diabolos to eachother
			for (i = 0; i < onString.length-1; i++)
				line(onString[i].rx + x, onString[i].ry + y, onString[i+1].rx + x, onString[i+1].ry + y);
		}
		else {
			line(sposx1, sposy1, sposx2, sposy2);
		}
		stroke(0);
		strokeWeight(1);
	}

	//  =====DIABOLOS=====
	//tracking sun progress for sticks and string
	sun = 0;
	//bottom loop
	if (((increment) % (180/speed) <1) && mode == "LOW"){
		if (ct != 0){
			diabs.push(new Diabololow(ct));
			if(ct == 1 && pt == 1){
				diabs[diabs.length-1].prev = 1;
			}
		}
		next++
	}
	if (((increment) % (180/(speed*0.75)) <1) && mode == "HIGH"){
		if(ct != 0){
			diabs.push(new Diabolohigh(ct));
		}
		next ++;
	}

	//delete old objects
	for(i = diabs.length-1; i >= 0; i--){
		if (diabs[i].fCount>540 || (diabs[i].theight != 1 && diabs[i].fCount > 360)){
			diabs.splice(i, 1);
		}
	}
	for(i = diabs.length-1; i >= 0; i--){
		if(i > 0){
			if(!(diabs[i-1].theight == 1) || diabs[i].fCount >= 180)
				diabs[i].show();
		}
		else {
			diabs[i].show();
		}
		diabs[i].update();
	}
	for(i = diabs2.length-1; i >= 0; i--){
		diabs2[i].update();
	}


		//zoom
	if (keyIsDown(UP_ARROW)) {
	  diameter+=0.25;
		if(mode == "HIGH")
			y = h - shuffleSize*diameter*3 - 40;
		else {
			y = h - shuffleSize*diameter - 40;
		}
	}
	if (keyIsDown(DOWN_ARROW)) {
		if(diameter>1)
	  	diameter-=0.25;
			if(mode == "HIGH")
				y = h - shuffleSize*diameter*3 - 40;
			else {
				y = h - shuffleSize*diameter - 40;
			}
	}
	textAlign(CENTER);
	if(menu == 1){
		fill(0, 0, 0, 50);
		rect(0, 0, w-2, h-2);
		instructButton.show();
		if(menu2 == 1){
			text('SHUFFLE SIZE', x, h*7/9);
			text('THROW HEIGHT', x, h*7/11);
			thslider.show();
			ssslider.show();
		}
		else if(menu3 == 1){
			instructButton.show();
			cslider.hide();
			bgslider.hide();
			colourButton.hide();
		}
		else {
			//Controls
			strokeWeight(0);
			fill(50);
			textSize(23);
			text('SPEED', width/2, h/12);
			text('ZOOM', width/2, h/4);
			text(colMode, 3*w/4, 5*h/12);
			colourButton.show();
			//advButton.show();
			sslider.show();
			zslider.show();
			lowbutton.show();
			highbutton.show();
			intbutton.show();
			mcolbutton.show();
			rcasbutton.show();
			casbutton.show();
			boxbutton.show();
			allbutton.show();
			flbutton.show();
			messbutton.show();
		}
		lowbutton.style("background", "buttonface");
		highbutton.style("background-color", "buttonface");
		intbutton.style("background-color", "buttonface");
		mcolbutton.style("background-color", "buttonface");
		rcasbutton.style("background-color", "buttonface");
		casbutton.style("background-color", "buttonface");
		boxbutton.style("background-color", "buttonface");
		allbutton.style("background-color", "buttonface");
		flbutton.style("background-color", "buttonface");
		messbutton.style("background-color", "buttonface");

		if(mode == "LOW"){
			lowbutton.style("background-color", "rgb(101, 205, 225)");
		}
		else if(mode == "HIGH"){
			highbutton.style("background-color", "rgb(101, 205, 225)");
		}
		else if(mode == "INTEGRAL"){
			intbutton.style("background-color", "rgb(101, 205, 225)");
		}
		else if(mode == "BOX"){
			boxbutton.style("background-color", "rgb(101, 205, 225)");
		}
		else if(mode == "MCOL"){
			mcolbutton.style("background-color", "rgb(101, 205, 225)");
		}
		else if(mode == "CAS"){
			casbutton.style("background-color", "rgb(101, 205, 225)");
		}
		else if(mode == "RCAS"){
			rcasbutton.style("background-color", "rgb(101, 205, 225)");
		}
		else if(mode == "4LOOP"){
			flbutton.style("background-color", "rgb(101, 205, 225)");
		}
		else if(mode == "ALL"){
			allbutton.style("background-color", "rgb(101, 205, 225)");
		}
		if(mes == 1){
			messbutton.style("background-color", "rgb(101, 205, 225)");
		}

		fill(0, 102, 153);
		textSize(15);
		//text("Double tap to switch between high/low", x, h - 75);
		//text("Swipe up and down to zoom in and out", x, h - 60);
	}
	else{
		cslider.hide();
		bgslider.hide();
		colourButton.hide();
		//advButton.hide();
		instructButton.hide()
	}


	strokeWeight(0);
	fill(20);
	textSize(10);
	text("SPEED", 21, h - 35);
	text("ZOOM", w - 30, h - 35);
	textSize(28);
	text(speed, 21, h - 10);
	text(zoom, w - 30, h - 10);

	if (menu3 == 1 && menu == 1){
		instruct();
	}
	else {
		resetButton.hide();
	}
}
/*
function keyTyped() {
	if (key === 'm'){
		if (mode == "LOW"){
			mode = "HIGH";
			speed = 5;
			diameter = 8;
			y = h - shuffleSize*diameter*3-60;
			siteswap = 753153455615613;
		}
		else {
			mode = "LOW";
			speed = 8;
			diameter = 30;
			y=h - shuffleSize*diameter-60;
			siteswap = 44453642;
		}
	}
	if (key === 'a'){
		shuf -= 1;
		shuffleSize = shuf/10;
	}
	if (key === 'd'){
		shuf += 1;
		shuffleSize = shuf/10;
	}
	if (key === 'w')
		throwHeight += 1;
	if (key === 's')
		throwHeight -= 1;
	start();
}
*/
function keyPressed(){
	if (keyCode == ENTER){
		start();
	}
	if (keyCode == LEFT_ARROW) {
		if (speed >= 1){
			speed-=1;
			start();
		}
	}
	if (keyCode == RIGHT_ARROW) {
		speed+=1;
		start();
	}
}

function scal(event){
	if (event.velocity > 0) {
		if(mode == "HIGH")
			y =h - shuffleSize*diameter*3-40;
		else {
			y =h - shuffleSize*diameter-40;
		}
} else{
	if(diameter>1)
		diameter-=1;
		if(mode == "HIGH")
			y =h - shuffleSize*diameter*3-40;
		else {
			y =h - shuffleSize*diameter-40;
		}
	}
}
function dt(event){
	if(menu == -1){
		if (mode == "LOW"){
			mode = "HIGH";
			//sslider.elt.value = 6;
			//diameter = 8;
			y =h - shuffleSize*diameter*3-40;
			ss.elt.value = 753153455615613;
			start();
		}
		else {
			mode = "LOW";
			sslider.elt.value = 8;
			//diameter = 30;
			y =h - shuffleSize*diameter-40;
			ss.elt.value = 44453642;
			start();
		}
	}
}
function swiped(event) {
	if (event.direction == 8) {
		if(zslider.value() < 50){
			zslider.elt.value = zslider.value()+1;
		}
		else if(zslider.value() < 150){
			zslider.elt.value = zslider.value()+2;
		}
		else {
			zslider.elt.value = zslider.value()+5;
		}
		if(mode == "HIGH")
			y =h - shuffleSize*diameter*3-40;
		else {
			y =h - shuffleSize*diameter-40;
		}
	} else if (event.direction == 4) {
		//sslider.elt.value -=1;
		//start();
	}
	else if (event.direction == 2) {
		//sslider.elt.value +=1;
		//start();
	}
	else if (event.direction == 16) {
		if(zoom>1)
			if(zslider.value() < 51){
				zslider.elt.value = zslider.value()-1;
			}
			else if(zslider.value() < 151){
				zslider.elt.value = zslider.value()-2;
			}
			else {
				zslider.elt.value = zslider.value()-5;
			}
		if(mode == "HIGH")
			y =h - shuffleSize*diameter*3-40;
		else {
			y =h - shuffleSize*diameter-40;
		}
	}
}

function styleButton(input, xx, yy, wid = 50, fntsz = 23, col = "buttontext", bgcol = "buttonface"){
	input.style("position", "relative");
	input.style("left", xx + "px");
	input.style("top", yy + "px");
	input.style("width", wid + "px");
	input.style("font-size", fntsz + "px");
	input.style("color", col);
	input.style("background-color", bgcol);
}

function colm(){
	if(colMode == "Diabolo"){
		colMode = "Back"
	}
	else 	if(colMode == "Back"){
		colMode = "Rainbow"
	}
	else{
		colMode = "Diabolo";
	}
}
function trick0(){
	mode = "HIGH";
	start();
}
function trick1(){
	mode = "LOW";
	start();
}
function trick2(){
	mode = "INTEGRAL";
	start();
}
function trick3(){
	mode = "MCOL";
	start();
}
function trick4(){
	mode = "RCAS";
	start();
}
function trick5(){
	mode = "CAS";
	start();
}
function trick6(){
	mode = "BOX";
	start();
}
function trick7(){
	mode = "4LOOP";
	start();
}
function allt(){
	mode = "ALL";
	start();
}

function adv(){
	menu2 *= -1;
}

function tt(event){
	if(inheight == 1 && tapped != 2){
		styleButton(ss, 50, h/5, w - 100, 25);
		inheight = 0;
		tapped = event.pointers.length;
	}
	else if(tapped != 2) {
		styleButton(ss, 50, h-35, w - 100, 25);
		inheight = 1;
		tapped = event.pointers.length
	}
}

function mouseReleased() {
	if(menu3 == 1 && menu == 1){
		if(mouseX > width/11 && mouseX < 10*width/11 && mouseY > h/6 + 12.3*width/15 && mouseY < h/6 + 13.7*width/15){
			window.open("https://www.instagram.com/tysondiabolo")
		}
	}
  tapped = 0;
}

function instruct(){
	resetButton.show();
	textAlign(LEFT);
	fill(60);
	tempvar = width/15;
	textSize(tempvar)
	text("Double tap to change", width/10, h/6);
	text("between low/high.", width/10, h/6 + tempvar);
	text("Swipe up and down to", width/10, h/6 + 3.5*tempvar);
	text("control zoom.", width/10, h/6 + 4.5*tempvar);
	text("Tap with 2 fingers to", width/10, h/6 + 7*tempvar);
	text("shift the input field", width/10, h/6 + 8*tempvar);
	text("(if covered by keyboard)", width/10, h/6 + 9*tempvar);
	text("Use a-z for numbers 10-35", width/10, h/6 + 11.5*tempvar);

	textSize(tempvar/1.1)
	fill(0, 0, 255);
	text("instagram.com/tysondiabolo", width/10, h/6 + 13.5*tempvar);
	fill(60);


	textAlign(CENTER);
	textSize(28);
}
