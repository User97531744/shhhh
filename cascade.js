
function cascade(xx, yy, t){
	angleMode(DEGREES);
	this.rx = 0;
	this.ry = 0;
	this.x = xx;
	this.y = yy;
	this.ss1 = [0, 0];
	this.ss2 = [0, 0];
	this.increment = increment;
	//reverse cascade 1, cascade -1
	this.t = t;
  this.speed = speed;
  this.diabs = [0, 120, 240];
	this.incol = [20];
	this.outcol = [51, 204, 255];


	this.update = function(){
		stroke(0);
    strokeWeight(1);

    this.offset = cos(this.speed*this.increment+90)*this.t;
    this.sposx1 = (this.x-(shuffleSize*diameter*1.2)+diameter/2*this.offset);
    this.sposy1 =  this.y-(diameter*3.5)+(shuffleSize*diameter*this.offset/3);
    this.sposx2 = (this.x+(shuffleSize*diameter*1.2)+diameter/2*this.offset);
    this.sposy2 =  this.y-(diameter*3.5)-(shuffleSize*diameter*this.offset/3);

		this.offset = cos(this.speed*this.increment+90)*this.t;
    stroke(0);
    strokeWeight(1);
    fill(51, 124, 255);
    translate(this.sposx1, this.sposy1);
    rotate(50+20*this.offset);
    rect(0, 0, diameter/10, diameter*2.5);
    fill(255);
    rect(-1, diameter*1.5, diameter/7, diameter*1.3);
    rotate(-50-20*this.offset);
    translate(-this.sposx1, -this.sposy1);

		this.offset = cos(this.speed*this.increment+110)*this.t;
    fill(51, 124, 255);
    translate(this.sposx2, this.sposy2);
    rotate(-50+20*this.offset);
    rect(0, 0, diameter/10, diameter*2.5);
    fill(255);
    rect(-1, diameter*1.5, diameter/7, diameter*1.3);

    rotate(50-20*this.offset);
    translate(-this.sposx2, -this.sposy2);

    //string
    stroke(235, 235, 0);
    strokeWeight(2);
    this.onString = [];
    this.min = 0;
    this.max = 0;
    this.av = 0;
    //catching a landing diabolo

    for(ii = this.diabs.length - 1; ii >= 0; ii--){
      this.rx = -shuffleSize*diameter*sin(this.diabs[ii]+this.t*60);
			this.ry = shuffleSize*diameter*cos(this.diabs[ii]*2);
      if((this.rx < 0 && this.ry+this.y-diameter*2 > this.sposy1) || (this.rx > 0 && this.ry+this.y-diameter*2 > this.sposy2)){
        append(this.onString, [this.rx, this.ry]);
      }
    }
		this.rightsgrad = ((this.sposy2 - (this.onString[0][1]+this.y-diameter*2))/(this.sposx2 - (this.onString[0][0]+this.x)))
		this.ss2 = this.onString[0];

		for(ii = 1; ii < this.onString.length; ii++){
			this.temp = ((this.sposy2 - (this.onString[ii][1]+this.y-diameter*2))/(this.sposx2 - (this.onString[ii][0]+this.x)))
			if(this.temp < this.rightsgrad){
				this.rightsgrad = this.temp;
				this.ss2 = this.onString[ii];
			}
		}
		this.leftsgrad= ((this.sposy1 - (this.onString[0][1]+this.y-diameter*2))/(this.sposx1 - (this.onString[0][0]+this.x)));
		this.ss1 = this.onString[0];

		for(ii = 1; ii < this.onString.length; ii++){
			this.temp = ((this.sposy1 - (this.onString[ii][1]+this.y-diameter*2))/(this.sposx1 - (this.onString[ii][0]+this.x)))
			if(this.temp > this.leftsgrad){
				this.leftsgrad = this.temp;
				this.ss1 = this.onString[ii];
			}
		}
    line(this.sposx2, this.sposy2, this.ss2[0]+this.x, this.ss2[1]+this.y-diameter*2);
		line(this.sposx1, this.sposy1, this.ss1[0]+this.x, this.ss1[1]+this.y-diameter*2);

    if(this.ss1 != this.ss2)
      line(this.ss1[0]+this.x, this.ss1[1]+this.y-diameter*2, this.ss2[0]+this.x, this.ss2[1]+this.y-diameter*2);

    stroke(0);
    strokeWeight(1);

		for(ii = 0; ii < this.diabs.length; ii++){

      this.rx = -shuffleSize*diameter*sin(this.diabs[ii]+this.t*60);
			this.ry = shuffleSize*diameter*cos(this.diabs[ii]*2);
			colorMode(HSB, 255, 255);
			this.outcol = [cslider.value(), 255, 255];
      fill(this.outcol);
			colorMode(RGB, 255);
  		ellipse(this.x + this.rx, this.y + this.ry-diameter*2, diameter);
  		fill(this.incol);
  		ellipse(this.x+ this.rx, this.y + this.ry-diameter*2, diameter/4);

			this.diabs[ii] += this.speed/3;
    }
		this.speed = speed;
		this.increment ++;
	}

  function Comparator(a, b)
  {
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  }
}
