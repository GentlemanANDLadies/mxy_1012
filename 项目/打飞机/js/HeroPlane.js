function HeroPlane(x,y,w,context,canvas){
	this.x = x; // 飞机的坐标
	this.y = y;
	this.w = w; // 飞机的宽度
	this.context = context; // 绘制的上下文
	this.canvas = canvas;
	this.heroImg = new Image; // 飞机的图片
	this.heroImg.src = "img/herofly.png";
	this.state = 0; // 飞机的状态（主要用于获取雪碧图）
	this.maxState = 4; 
	this.direction = null;// 表示当前飞机的移动方向
	this.die = false; // false 表示未死亡
	
	//1、绘制飞机
	this.drawHero = function(){
		this.context.beginPath();
		this.state++;
		if (this.state > 1 && this.die == false) {
			this.state = 0;
		}
		if (this.state >= this.maxState) {
			clearInterval(timer);
			alert("gameover");	
		}
		this.context.drawImage(this.heroImg,this.state * this.w,0,this.w,82,this.x,this.y,this.w,82);
		this.context.save();
	}
	//2、移动飞机
	this.moveHero = function(direction,speed){
		this.direction = direction;
		switch (direction){
			case "left":
				this.x -= speed;
				if (this.x <= 0) {
					this.x = 0
				}
				break;
			case "right":
				this.x += speed;
				if (this.x >= this.canvas.width - this.w) {
					this.x = this.canvas.width - this.w;
				}
				break;
			case "top":
				this.y -= speed;
				if (this.y <= 0) {
					this.y = 0;
				}
				break;
			case "bottom":
				this.y += speed;
				if (this.y >= this.canvas.height - 82) {
					this.y = this.canvas.height - 82
				}
				break;
			default:
				break;
		}
	}
	
}
