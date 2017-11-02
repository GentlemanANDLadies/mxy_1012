function Background(maxHeight){
	// 背景图片移动的最大值
	this.maxHeight = maxHeight;
	this.y = 0;
	this.bgImg = new Image;
	this.bgImg.src = "img/background.png";
	this.drawBG = function(context,canvas){
		context.beginPath();
		context.drawImage(this.bgImg,0,this.y-maxHeight,canvas.width,canvas.height);
		context.drawImage(this.bgImg,0,this.y,canvas.width,canvas.height);
	}
	// 移动背景
	this.moveBG = function(speed,context,canvas){
		this.y += speed;
		if (this.y >= this.maxHeight) {
			this.y = 0;
		}
		this.drawBG(context,canvas);
	}
}
