function integral(xx, yy){
	angleMode(DEGREES);
  this.fCount = 0;
	this.rx = -shuffleSize*diameter*sin(this.fCount-85);
	this.ry = shuffleSize/1.5*diameter*cos(this.fCount-90);
	this.fCount = 90;
  this.sCount = 0;
	this.x = xx;
	this.y = yy;
  this.dy = 0;
  this.slen = diameter*10
	this.incol = [20];
	this.outcol = [51, 204, 255];


	this.update = function(){

    if(this.sCount%1080 >= 900){
      stroke(235, 235, 0);
      strokeWeight(2);
      line(this.x, this.y+this.dy, this.x, this.y+this.dy-this.slen/5);
      stroke(0);
      strokeWeight(1);

      translate(this.x, this.y+this.dy-this.slen/5);
      rotate(-this.sCount);
      this.stick(this.slen/2);
      rotate(this.sCount);
      translate(-this.x, -this.y-this.dy+this.slen/5);

      translate(this.x, this.y+this.dy);
      rotate(-this.sCount+180);
      this.stick(this.slen*0.3);
      rotate(this.sCount-180);
      translate(-this.x, -this.y-this.dy);

      this.sCount += speed*1.5;
      this.fCount += speed*3/4;

    }

    else if(this.sCount%1080 >= 720){
      inc1 = this.sCount%1080 - 720;
      inc2 = inc1*0.4/180;

      translate(this.x, this.y+this.dy);
      rotate(-this.sCount+180);
      this.stick(this.slen*(0.7-inc2));
      rotate(this.sCount-180);
      translate(-this.x, -this.y-this.dy);

      translate(this.x, this.y+this.dy);
      rotate(-this.sCount);
      this.stick(this.slen*(0.3+inc2));
      rotate(this.sCount);
      translate(-this.x, -this.y-this.dy);

      this.sCount += speed;
      this.fCount += speed;

    }

    else if(this.sCount%1080 >= 540){
      stroke(235, 235, 0);
      strokeWeight(2);
      line(this.x, this.y+this.dy, this.x, this.y+this.dy-this.slen/5);
      stroke(0);
      strokeWeight(1);

      translate(this.x, this.y+this.dy-this.slen/5);
      rotate(-this.sCount+180);
      this.stick(this.slen/2);
      rotate(this.sCount-180);
      translate(-this.x, -this.y-this.dy+this.slen/5);

      translate(this.x, this.y+this.dy);
      rotate(-this.sCount);
      this.stick(this.slen*0.3);
      rotate(this.sCount);
      translate(-this.x, -this.y-this.dy);

      this.sCount += speed*1.5;
      this.fCount += speed*3/4;

    }

    else if(this.sCount%1080 >= 360){
      stroke(235, 235, 0);
      strokeWeight(2);
      line(this.x, this.y+this.dy, this.x, this.y+this.dy-this.slen/5);
      stroke(0);
      strokeWeight(1);

      translate(this.x, this.y+this.dy-this.slen/5);
      rotate(-this.sCount+180);
      this.stick(this.slen/2);
      rotate(this.sCount-180);
      translate(-this.x, -this.y-this.dy+this.slen/5);

      translate(this.x, this.y+this.dy);
      rotate(-this.sCount);
      this.stick(this.slen*0.3);
      rotate(this.sCount);
      translate(-this.x, -this.y-this.dy);


      this.sCount += speed*1.5;
      this.fCount += speed*3/4;

    }

    else if(this.sCount%1080 > 180){

      translate(this.x, this.y+this.dy-this.slen/5);
      rotate(-this.sCount);
      this.stick(this.slen/2);
      rotate(this.sCount);
      translate(-this.x, -this.y-this.dy+this.slen/5);

      translate(this.x, this.y+this.dy-this.slen/5);
      rotate(-this.sCount+180);
      this.stick(this.slen/2);
      rotate(this.sCount-180);
      translate(-this.x, -this.y-this.dy+this.slen/5);


      this.sCount += speed;
      this.fCount += speed;
    }

    else{
      stroke(235, 235, 0);
      strokeWeight(2);
      line(this.x, this.y+this.dy, this.x, this.y+this.dy-this.slen/5);
      stroke(0);
      strokeWeight(1);

      translate(this.x, this.y+this.dy-this.slen/5);
      rotate(-this.sCount);
      this.stick(this.slen/2);
      rotate(this.sCount);
      translate(-this.x, -this.y-this.dy+this.slen/5);

      translate(this.x, this.y+this.dy);
      rotate(-this.sCount+180);
      this.stick(this.slen*0.3);
      rotate(this.sCount-180);
      translate(-this.x, -this.y-this.dy);


      this.sCount += speed*1.5;
      this.fCount += speed*3/4;
    }
    this.dy = sin(this.fCount)*diameter;
    this.slen = diameter*10

		colorMode(HSB, 255, 255);
		this.outcol = [cslider.value(), 255, 255];
		fill(this.outcol);
		colorMode(RGB, 255);
    ellipse(this.x, this.y + this.dy, diameter);
    fill(this.incol);
    ellipse(this.x, this.y + this.dy, diameter/4);
  }

  this.stick = function(length){
    stroke(235, 235, 0);
    strokeWeight(2);
    line(0, 0, 0, length);
    stroke(0);
    strokeWeight(1);

    fill(51, 124, 255);
    rect(-diameter/20, length, diameter/10, diameter*2.5);
    fill(255);
    rect(-diameter/20-1, length+diameter*1.5, diameter/7, diameter*1.3);
  }
}
