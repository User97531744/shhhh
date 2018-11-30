function Diabolohigh(theight){
	angleMode(DEGREES);
	this.theight = theight
	this.speed = speed*0.75;
	this.rx = -shuffleSize*diameter*sin(this.fCount-85);
	this.ry = shuffleSize*2.5*diameter*cos(this.fCount-90);
	this.fCount = 0;
	this.fix = 0;
	this.incol = [20];
	this.outcol = [cslider.value()];

	this.show = function(){
		colorMode(HSB, 255, 255);
		this.outcol = [cslider.value(), 255, 255];
		fill(this.outcol);
		ellipse(x + this.rx, y + this.ry, diameter);
		fill(this.incol);
		ellipse(x + this.rx, y + this.ry, diameter/4);
		colorMode(RGB, 255);
	}

	this.update = function(){
		if (this.theight == 1){
			if(this.fCount >= 90 && this.fCount <= 450){
				this.rx = -shuffleSize*diameter*sin(this.fCount-85);
				this.ry = shuffleSize*1.62*diameter*cos(this.fCount-90) + diameter*1.5;
			}
			else {
				this.rx = -shuffleSize*diameter*sin(this.fCount-85);
				this.ry = shuffleSize*2.2*diameter*cos(this.fCount-90);
			}
			this.fCount += this.speed*1.5;
			sun = this.fCount;
		}
		else if(this.fCount >= 180){
			this.rx = -shuffleSize*diameter*sin(this.fCount-85);
			this.ry = (shuffleSize*diameter*(this.theight**2.5))/(125/throwHeight)*cos(this.fCount-90);
			this.fCount += this.speed/(this.theight-1);
		}
		else {
			this.rx = -shuffleSize*diameter*sin(this.fCount-85);
			this.ry = shuffleSize*2.5*diameter*cos(this.fCount-90);
			this.fCount += this.speed;
		}
		if(this.fCount > 180 && this.fix == 0 && this.theight != 1){
			this.fCount = 180;
			this.fix = 1;
		}
	}
}
