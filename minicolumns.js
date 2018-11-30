
function minicolumns(xx, yy){
	angleMode(DEGREES);
	this.theight = 3
	//this.rx = -shuffleSize*diameter*sin(this[1]-85);
	//this.ry = shuffleSize/1.5*diameter*cos(this[1]-90);
	this[1] = 0;
	this.fix = 0;
	this.prev = 0;
  this.x = xx;
  this.y = yy;
	this.increment = 0;
	this.incol = [20];
  this.rx = -shuffleSize*diameter;
  this.ry1 = (shuffleSize*diameter*(this.theight**2.1))/(175/throwHeight);
  this.ry2 = shuffleSize/1.5*diameter;
  this.d1 = [this.rx, 0, 0];
  this.d2 = [0, 180, 0];
  this.d3 = [-this.rx, 269, 0];
  this.diabs = [this.d1, this.d2, this.d3];



	this.update = function(){
    //stick/string positions
		this.offset = cos(speed*this.increment*2+220);
		this.sposx1 = (this.x-(shuffleSize*diameter*1.6)+diameter*this.offset);
		this.sposy1 =  this.y+(shuffleSize*diameter*2*this.offset/10)-diameter;
		this.sposx2 = (this.x+(shuffleSize*diameter*1.6)-diameter*this.offset);
		this.sposy2 =  this.y+(shuffleSize*diameter*2*this.offset/20)-diameter;
		stroke(0);
    strokeWeight(1);
		//sticks
		fill(51, 124, 255);
		translate(this.sposx1, this.sposy1);
		rotate(40+20*this.offset);
		rect(0, 0, diameter/10, diameter*2.5);
		fill(255);
		rect(-1, diameter*1.5, diameter/7, diameter*1.3);

		rotate(-40-20*this.offset);
		translate(-this.sposx1, -this.sposy1);

		fill(51, 124, 255);
		translate(this.sposx2, this.sposy2);

		rotate(-40-20*this.offset);
		rect(0, 0, diameter/10, diameter*2.5);
		fill(255);
		rect(-1, diameter*1.5, diameter/7, diameter*1.3);
		rotate(40+20*this.offset);
		translate(-this.sposx2, -this.sposy2);


    //string
    stroke(235, 235, 0);
    strokeWeight(2);
    this.onString = [];
    //catching a landing diabolo
    for(ii = 0; ii < this.diabs.length; ii++){
      if((this.diabs[ii][2]) > (this.sposy2))
        append(this.onString, this.diabs[ii]);
    }

    //connecting the sticks to the diabolos
    //checking gradients of potential string
    if(this.onString.length > 1){
      leftsgrad = ((this.sposy1 - (this.onString[0][2]))/(this.sposx1 - (this.onString[0][0]+this.x)))
      leftdgrad = ((this.onString[1][2]) - (this.onString[0][2]))/((this.onString[1][0] + this.x) - (this.onString[0][0] + this.x))
      if(leftsgrad < (leftdgrad))
        this.onString.splice(0, 1);
      if(this.onString.length > 1){
        rightsgrad= ((this.sposy2 - (this.onString[this.onString.length-1][2]))/(this.sposx2 - (this.onString[this.onString.length-1][0]+this.x)))
        rightdgrad = ((this.onString[this.onString.length-2][2]) - (this.onString[this.onString.length-1][2]))/((this.onString[this.onString.length-2][0] + this.x) - (this.onString[this.onString.length-1][0]+this.x))

        if((rightsgrad) > (rightdgrad))
          this.onString.splice((this.onString.length-1), 1);
      }
    }
    if(this.onString.length > 0){
      line(this.sposx1, this.sposy1, this.onString[0][0]+this.x, this.onString[0][2]);
      line(this.onString[this.onString.length-1][0]+this.x, this.onString[this.onString.length-1][2], this.sposx2, this.sposy2);
    }
    //connecting the diabolos to eachother
    for (ii = 0; ii < this.onString.length-1; ii++)
      line(this.onString[ii][0] + this.x, this.onString[ii][2], this.onString[ii+1][0] + this.x, this.onString[ii+1][2]);

    /*else {
      line(this.sposx1, this.sposy1, this.sposx2, this.sposy2);
    }*/
    stroke(0);
    strokeWeight(1);

    //DIABOLOS
    for(o = 0; o < this.diabs.length; o++){

      if(this.diabs[o][1]%360 >= 180){
				colorMode(HSB, 255, 255);
				fill([cslider.value(), 255, 255]);
				colorMode(RGB, 255);
        ellipse(this.x + this.diabs[o][0], this.y + this.ry1*cos(this.diabs[o][1]-90), diameter);
        fill(this.incol);
        ellipse(this.x + this.diabs[o][0], this.y + this.ry1*cos(this.diabs[o][1]-90), diameter/4);
        this.diabs[o][1] += speed/(this.theight-1);
        this.diabs[o][2] = this.y + this.ry1*cos(this.diabs[o][1]-90);
      }
      else {
				colorMode(HSB, 255, 255);
	      fill([cslider.value(), 255, 255]);
				colorMode(RGB, 255);
        ellipse(this.x + this.diabs[o][0], this.y + this.ry2*cos(this.diabs[o][1]-90), diameter);
        fill(this.incol);
        ellipse(this.x + this.diabs[o][0], this.y + this.ry2*cos(this.diabs[o][1]-90), diameter/4);
        this.diabs[o][2] = this.y + this.ry2*cos(this.diabs[o][1]-90);
        this.diabs[o][1] += speed;
      }
      if ((this.increment+180/speed*o) % (540/speed) <1){
        this.diabs[o][1] = 0;
      }
    }
    this.rx = -shuffleSize*diameter;
    this.d1[0] = this.rx;
    this.d3[0] = -this.rx;
		this.ry1 = (shuffleSize*diameter*(this.theight**2.1))/(175/throwHeight);
		this.ry2 = shuffleSize/1.5*diameter;
		this.increment ++;

	}
}
