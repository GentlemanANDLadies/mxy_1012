/* type去传递的时候  就传 子弹图片的名字
 */
var BULLETHEIGHT = 14;
function BulletModel(x,y,type,speed,w){
	 this.x = x;
	 this.y = y;
	 this.type = type;
	 this.bulletImg = new Image;
	 this.bulletImg.src = "img/"+this.type+".png";
	 this.speed = speed;
	 this.w = w; // 子弹图片的宽度
}

// 用这个类的对象去控制由BulletModel产生的子弹
function BulletController(){
	// 装载子弹的容器
	this.bulletArray = [];
	// 用来控制子弹产生的速度
	this.bulletControl = 0;
	
	// 产生子弹的方法
	this.produceBullet = function(aHero){
		this.bulletControl++;
		if (this.bulletControl == 8) {
			var aBullet = new BulletModel(aHero.x+aHero.w/2-2,aHero.y - 5,"bullet1",7,6);
		this.bulletArray.push(aBullet);
		this.bulletControl = 0;
		bulletMusic.play();
		}
		
	}
	//移动子弹
	this.moveBullet = function(){
		for (var i = 0;i < this.bulletArray.length;i++) {
			var theBullet = this.bulletArray[i];
			theBullet.y -= theBullet.speed;
			if (theBullet.y <= -BULLETHEIGHT) {
				// 移除这个子弹
			this.bulletArray.splice(i,1);
			}
		}
	}
	// 绘制子弹
	this.drawBullet = function(context){
		for (var i = 0; i < this.bulletArray.length;i++) {
			context.beginPath();
			var theBullet = this.bulletArray[i];
			context.drawImage(theBullet.bulletImg,theBullet.x,theBullet.y);
			context.save();
			
		}
	}
	
}
