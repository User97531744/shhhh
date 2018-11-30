
function Diabololow(theight){
	angleMode(DEGREES);
	this.theight = theight
	this.rx = -shuffleSize*diameter*sin(this.fCount-85);
	this.ry = shuffleSize/1.5*diameter*cos(this.fCount-90);
	this.fCount = 0;
	this.fix = 0;
	this.prev = 0;
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
		if(this.theight == 1 && this.prev == 1){
			this.rx = -shuffleSize*diameter*sin(this.fCount-140)*1.15 - diameter*1.2/2;
			this.ry = shuffleSize/1.5*diameter*cos(this.fCount-130)*2.5 - diameter*shuffleSize;
			if(this.fCount < 180){
				this.fCount += speed;
			}
			else {
				this.fCount += speed*2;
				sun = this.fCount;
			}
		}
		else if (this.theight == 1 && this.fCount < 540){
			if(this.fCount < 90 || this.fCount > 450){
				this.rx = -shuffleSize*diameter*sin(this.fCount-85);
				this.ry = shuffleSize/1.5*diameter*cos(this.fCount-90);
			}
			else{
				this.rx = -shuffleSize*diameter*sin(this.fCount-100)*1.15 - diameter*1.2/2;
				this.ry = shuffleSize/1.5*diameter*cos(this.fCount-90)*2.5 - diameter*shuffleSize;
			}
			this.fCount += speed*1.5;
			sun = this.fCount;
		}

		else if(this.fCount >= 180){
			this.rx = -shuffleSize*diameter*sin(this.fCount-85);
			this.ry = (shuffleSize*diameter*(this.theight**2.1))/(175/throwHeight)*cos(this.fCount-90);
			this.fCount += speed/(this.theight-1);
		}
		else {
			this.rx = -shuffleSize*diameter*sin(this.fCount-85);
			this.ry = shuffleSize/1.5*diameter*cos(this.fCount-90);
			this.fCount += speed;
			if(this.fCount > 180 && this.fix == 0){
				this.fCount = 180;
				this.fix = 1;
			}
		}
	}
}
