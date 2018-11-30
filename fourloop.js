
function fourloop(xx, yy){
	angleMode(DEGREES);
	this.theight = 3
	//this.rx = -shuffleSize*diameter*sin(this[1]-85);
	//this.ry = shuffleSize/1.5*diameter*cos(this[1]-90);
	this[1] = 0;
	this.fix = 0;
	this.prev = 0;
  this.x = xx;
	if(mode == "ALL")
  	this.y = yy-15;
	else {
		this.y = yy-diameter/2;
	}
	this.incol = [20];
  this.rx = -shuffleSize*diameter;
  this.ry1 = (shuffleSize*diameter*(this.theight**2.1))/(175/throwHeight);
  this.ry2 = shuffleSize/1.5*diameter;
  this.d1 = [this.rx, 0, this.y + this.ry2*cos(speed*increment*2/3+220)/2];
  this.d2 = [0, 180, 0];
  this.d3 = [-this.rx, 0, this.y + this.ry2*cos(speed*increment*2/3+220)/2];
  this.diabs = [this.d1, this.d2, this.d3];



	this.update = function(){
    //stick/string positions
		if(increment > 0){
		this.offset = cos(speed*increment*4/3);
		this.sposx1 = (this.x-(shuffleSize*diameter*1.2)-diameter*this.offset);
		this.sposy1 =  this.y+(shuffleSize*diameter*2*this.offset/10)-2*diameter;
		this.sposx2 = (this.x+(shuffleSize*diameter*1.2)+diameter*this.offset);
		this.sposy2 =  this.y+(shuffleSize*diameter*2*this.offset/20)-2*diameter;
		stroke(0);
    strokeWeight(1);
		//sticks
		fill(51, 124, 255);
		translate(this.sposx1, this.sposy1);
		rotate(60+10*this.offset);
		rect(0, 0, diameter/10, diameter*2.5);
		fill(255);
		rect(-1, diameter*1.5, diameter/7, diameter*1.3);

		rotate(-60-10*this.offset);
		translate(-this.sposx1, -this.sposy1);

		fill(51, 124, 255);
		translate(this.sposx2, this.sposy2);

		rotate(-60-10*this.offset);
		rect(0, 0, diameter/10, diameter*2.5);
		fill(255);
		rect(-1, diameter*1.5, diameter/7, diameter*1.3);
		rotate(60+10*this.offset);
		translate(-this.sposx2, -this.sposy2);


    //string
    stroke(235, 235, 0);
    strokeWeight(2);
    this.onString = [];

		//add in order left to righ
		if((this.diabs[0][0]) < 0){
			append(this.onString, this.diabs[0]);
			//if middle diabolo is lower than average of others
			if(this.diabs[1][2] > (this.diabs[0][2] + this.diabs[2][2])/2)
				append(this.onString, this.diabs[1]);
			append(this.onString, this.diabs[2]);
		}
		else {
			append(this.onString, this.diabs[2]);
			if(this.diabs[1][2] > (this.diabs[0][2] + this.diabs[2][2])/2)
				append(this.onString, this.diabs[1]);
			append(this.onString, this.diabs[0]);
		}

    //connecting the sticks to the diabolos
    //checking gradients of potential string
    if(this.onString.length > 1){
      leftsgrad = ((this.sposy1 - (this.onString[0][2]))/(this.sposx1 - (this.onString[0][0]+this.x)))
      leftdgrad = ((this.onString[1][2]) - (this.onString[0][2]))/((this.onString[1][0] + this.x) - (this.onString[0][0] + this.x))
      if((leftsgrad < leftdgrad) && (this.onString[0][0] + this.x) > this.sposx1)
        this.onString.splice(0, 1);
      if(this.onString.length > 1){
        rightsgrad= ((this.sposy2 - (this.onString[this.onString.length-1][2]))/(this.sposx2 - (this.onString[this.onString.length-1][0]+this.x)))
        rightdgrad = ((this.onString[this.onString.length-2][2]) - (this.onString[this.onString.length-1][2]))/((this.onString[this.onString.length-2][0] + this.x) - (this.onString[this.onString.length-1][0]+this.x))

				tempright = this.onString.length;
        if((rightsgrad > rightdgrad) && (this.onString[tempright - 1][0] + this.x) < this.sposx2)
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

    stroke(0);
    strokeWeight(1);

    //DIABOLOS

    if(this.diabs[1][1]%360 >= 180){
			colorMode(HSB, 255, 255);
			fill([cslider.value(), 255, 255]);
			colorMode(RGB, 255);
      ellipse(this.x + this.diabs[1][0], this.y + diameter/4 + this.ry1*cos(this.diabs[1][1]-90), diameter);
      fill(this.incol);
      ellipse(this.x + this.diabs[1][0], this.y + diameter/4 + this.ry1*cos(this.diabs[1][1]-90), diameter/4);
      this.diabs[1][1] += speed/(this.theight-1);
      this.diabs[1][2] = this.y + this.ry1*cos(this.diabs[1][1]-90);
    }
    else {
			colorMode(HSB, 255, 255);
			fill([cslider.value(), 255, 255]);
			colorMode(RGB, 255);
      ellipse(this.x + this.diabs[1][0], this.y + diameter/4 + this.ry2*cos(this.diabs[1][1]-90)*1.4, diameter);
      fill(this.incol);
      ellipse(this.x + this.diabs[1][0], this.y + diameter/4 + this.ry2*cos(this.diabs[1][1]-90)*1.4, diameter/4);
      this.diabs[1][2] = this.y + this.ry2*cos(this.diabs[1][1]-90)*1.4;
      this.diabs[1][1] += speed;
    }
    if ((increment+180/speed) % (540/speed) <1){
      this.diabs[0][1] = 0;
			this.diabs[1][1] = 0;
			this.diabs[2][1] = 0;
    }
		//y variables for circling diabs
		this.diabs[0][2] = this.y + this.ry2*cos(speed*increment*2/3+220)/2;
		this.diabs[2][2] = this.y + this.ry2*cos(speed*increment*2/3+40)/2;
    //diab1
		colorMode(HSB, 255, 255);
		fill([cslider.value(), 255, 255]);
		colorMode(RGB, 255);
    ellipse(this.x + this.diabs[0][0], this.diabs[0][2], diameter);
    //diab2
    ellipse(this.x + this.diabs[2][0], this.diabs[2][2], diameter);
    fill(this.incol);
    ellipse(this.x + this.diabs[0][0], this.diabs[0][2], diameter/4);
    ellipse(this.x + this.diabs[2][0], this.diabs[2][2], diameter/4);
		}
    //this.diabs[1][2] = this.y + this.ry2*cos(this.diabs[1][1]-90);
    //this.diabs[1][1] += speed;

		if(mode == "ALL")
			this.y = yy-25;
		else {
			this.y = yy-diameter/2;
		}
    this.rx = -shuffleSize*diameter;
    this.diabs[0][0] = this.rx*cos(speed*increment*2/3+130)*1.2;
    this.diabs[2][0] = this.rx*cos(speed*increment*2/3+310)*1.2;
		this.ry1 = (shuffleSize*diameter*(this.theight**2.1))/(175/throwHeight);
		this.ry2 = shuffleSize/1.5*diameter;
		increment++;

	}
}
