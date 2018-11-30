
function twothree(xx, yy){
	angleMode(DEGREES);
	this.rx = 0;
	this.ry = 0;
	this.x = xx;
	this.y = yy;
  this.speed = speed*0.75;
  this.diabs = [0, 840, 1680];
	this.incol = [20];
	this.outcol = [51, 204, 255];


	this.update = function(){



		    //stick/string positions
		    this.offset = cos(speed*increment*19/20+70);
		    this.sposx1 = (this.x-(shuffleSize*diameter)*this.offset/1.2-diameter);
		    this.offset = cos(speed*increment*19/20+150);
		    this.sposy1 =  this.y+(shuffleSize*diameter*this.offset/1.5)-diameter/2;
		    this.offset = cos(speed*increment*19/20+90);
		    this.sposx2 = (this.x+(shuffleSize*diameter/2)-diameter/2*this.offset);
		    this.sposy2 =  this.y+(shuffleSize*diameter*2*this.offset/4)-diameter;

		    this.offset = cos(speed*increment*19/20-90);

		    //sticks
		    fill(51, 124, 255);
		    translate(this.sposx1, this.sposy1);
		    rotate(40+20*this.offset);
		    rect(0, 0, diameter/10, diameter*2.5);
		    fill(255);
		    rect(-1, diameter*1.5, diameter/7, diameter*1.3);

		    rotate(-40-20*this.offset);
		    translate(-this.sposx1, -this.sposy1);

		    this.offset = cos(speed*increment*19/20+90);


		    fill(51, 124, 255);
		    translate(this.sposx2, this.sposy2);

		    rotate(-40-20*this.offset);
		    rect(0, 0, diameter/10, diameter*2.5);
		    fill(255);
		    rect(-1, diameter*1.5, diameter/7, diameter*1.3);
		    rotate(40+20*this.offset);
		    translate(-this.sposx2, -this.sposy2);








    for(ii = 0; ii < this.diabs.length; ii++){
  		fill(this.outcol);
  		ellipse(this.x + this.rx, this.y + this.ry, diameter);
  		fill(this.incol);
  		ellipse(this.x+ this.rx, this.y + this.ry, diameter/4);

  		if(this.diabs[ii] >= 0 && this.diabs[ii]%2160 >= 1980){
        this.rx = -shuffleSize*diameter*sin(this.diabs[ii]-85);
  			this.ry = (shuffleSize*diameter*(4**2.1))/(175/throwHeight)*cos(this.diabs[ii]-90);
  			this.diabs[ii] += this.speed/2;
  		}
  		else {
        this.rx = -shuffleSize*diameter*sin(this.diabs[ii]-85);
  			this.ry = shuffleSize*diameter*cos(this.diabs[ii]-90);
  			this.diabs[ii] += this.speed*1.5;
  		}
    }
	}
}
