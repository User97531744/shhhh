
function boxx(xx, yy){
	angleMode(DEGREES);
	this.theight = 3;
	this.prev = 0;
  this.x = xx;
  this.y = yy;
	this.incol = [20];
	this.increment = 0;
	this.outcol = [51, 204, 255];
  this.rx = -shuffleSize*diameter;
  this.ry1 = (shuffleSize*diameter*(this.theight**2.1))/(175/throwHeight);
  this.ry2 = shuffleSize/1.5*diameter;
  this.d1 = [this.rx, 0, 0];
  this.d2 = [0, 180, diameter+this.y];
  this.d3 = [-this.rx, 224, 0];
  this.diabs = [this.d1, this.d3, this.d2];



	this.update = function(){
		stroke(0);
    strokeWeight(1);
    //stick/string positions
		this.offset = cos(speed*this.increment*2/3);
		this.sposx1 = (this.x-(shuffleSize*diameter*1.6)+diameter/2*this.offset);
		this.sposy1 =  this.y+(shuffleSize*diameter*2*this.offset/4)-diameter;
    this.offset = cos(speed*this.increment*2/3+180);
		this.sposx2 = (this.x+(shuffleSize*diameter*1.6)-diameter/2*this.offset);
		this.sposy2 =  this.y+(shuffleSize*diameter*2*this.offset/4)-diameter;

    this.offset = cos(speed*this.increment*2/3);

		//sticks
		fill(51, 124, 255);
		translate(this.sposx1, this.sposy1);
		rotate(40+20*this.offset);
		rect(0, 0, diameter/10, diameter*2.5);
		fill(255);
		rect(-1, diameter*1.5, diameter/7, diameter*1.3);

		rotate(-40-20*this.offset);
		translate(-this.sposx1, -this.sposy1);

    this.offset = cos(speed*this.increment*2/3+180);


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

    if((this.diabs[0][2]) > ((this.sposy2+this.sposy2)/2))
      append(this.onString, this.diabs[0]);
    if((this.diabs[2][2]) > ((this.sposy2+this.sposy2)/2))
      append(this.onString, this.diabs[2]);
    if((this.diabs[1][2]) > ((this.sposy2+this.sposy2)/2))
      append(this.onString, this.diabs[1]);

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
    for(o = 0; o < this.diabs.length-1; o++){

      if(this.diabs[o][1]%360 >= 180){
				colorMode(HSB, 255, 255);
				this.outcol = [cslider.value(), 255, 255];
	      fill(this.outcol);
				colorMode(RGB, 255);        ellipse(this.x + this.diabs[o][0], this.y + this.ry1*cos(this.diabs[o][1]-90), diameter);
        fill(this.incol);
        ellipse(this.x + this.diabs[o][0], this.y + this.ry1*cos(this.diabs[o][1]-90), diameter/4);
        this.diabs[o][1] += speed/(this.theight-1);
        this.diabs[o][2] = this.y + this.ry1*cos(this.diabs[o][1]-90);
      }
      else {
				colorMode(HSB, 255, 255);
				this.outcol = [cslider.value(), 255, 255];
	      fill(this.outcol);
				colorMode(RGB, 255);
				ellipse(this.x + this.diabs[o][0], this.y + this.ry2*cos(this.diabs[o][1]-90), diameter);
        fill(this.incol);
        ellipse(this.x + this.diabs[o][0], this.y + this.ry2*cos(this.diabs[o][1]-90), diameter/4);
        this.diabs[o][2] = this.y + this.ry2*cos(this.diabs[o][1]-90);
        this.diabs[o][1] += speed;
      }
      if ((this.increment+270/speed*o) % (540/speed) <1){
        this.diabs[o][1] = 0;
      }
    }

    //middle diabolo

		colorMode(HSB, 255, 255);
		this.outcol = [cslider.value(), 255, 255];
		fill(this.outcol);
		colorMode(RGB, 255);
		ellipse(this.x + this.diabs[2][0], this.diabs[2][2], diameter);
    fill(this.incol);
    ellipse(this.x + this.diabs[2][0], this.diabs[2][2], diameter/4);
    this.diabs[2][0] = this.rx*cos(this.diabs[2][1]-90);
    this.diabs[2][1] += speed*0.67;
    if ((this.increment+270/speed) % (540/speed) <1){
      this.diabs[2][1] = 0;
    }
    //

    this.rx = -shuffleSize*diameter;
    this.d1[0] = this.rx;
    this.d3[0] = -this.rx;
		this.d2[2] = diameter+this.y;
		this.ry1 = (shuffleSize*diameter*(this.theight**2.1))/(175/throwHeight);
	  this.ry2 = shuffleSize/1.5*diameter;
		this.increment ++;
	}
}
