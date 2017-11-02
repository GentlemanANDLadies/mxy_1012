function EnemyModel(x,y,w,h,type,speed,blood,maxState){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.type = type;
	this.enemyImg = new Image;
	this.enemyImg.src = "img/"+this.type+".png";
	this.speed = speed;
	this.state = 0; // 敌人的状态
	this.blood = blood; // 血量
	this.maxState = maxState;
	this.die = false; // false表示未死亡
}

function EnemyController(canvas){
	this.enemyArray = [];
	this.canvas = canvas;
	this.enemyControl = 0; // 控制敌人的数量
	// 产生敌人
	this.produceEnemy = function(){
		this.enemyControl ++;
		if (this.enemyControl == 20) {
			this.enemyControl = 0;
		var rand = parseInt(Math.random() * 100);
		var x = null;
		var aEnemy = null;
		if (rand >= 10 && rand <= 60) {
		 x = parseInt(Math.random() * (this.canvas.width - 38));
		 aEnemy = new EnemyModel(x,-34,38,34,"enemy1",3,1,4);
		 this.enemyArray.push(aEnemy);
		}else if (rand >60 && rand < 65) {
			x = parseInt(Math.random() * (this.canvas.width - 110));
			aEnemy = new EnemyModel(x,-164,110,164,"enemy2",1,5,9);
				this.enemyArray.push(aEnemy);
		}else if (rand > 70 && rand < 80) {
			x = parseInt(Math.random() * (this.canvas.width - 46));
			aEnemy = new EnemyModel(x,-64,46,64,"enemy3",2,3,5);
		this.enemyArray.push(aEnemy);
		}	
		}		
	}
	// 移动敌人
	this.moveEnemy = function(){
		var deleteArray = [];
		for (var i = 0; i < this.enemyArray.length;i++) {
			var theEnemy = this.enemyArray[i];
			theEnemy.y += theEnemy.speed;
			if (theEnemy.y >= this.canvas.height) {
				deleteArray.push(i);
			}
		}
		
		for (var i = 0; i < deleteArray.length;i++) {
	this.enemyArray.splice(deleteArray[i],1);
		}
	}
	// 绘制敌人
	this.drawEnemy = function(context){
		for (var i =0;i < this.enemyArray.length;i++) {
			var theEnemy = this.enemyArray[i];
			if (theEnemy.die) {
				theEnemy.state++;
				if (theEnemy.state > theEnemy.maxState) {
					this.enemyArray.splice(i,1);
					break;
				}
			}
			context.beginPath();	
			context.drawImage(theEnemy.enemyImg,theEnemy.state * theEnemy.w,0,theEnemy.w,theEnemy.h,theEnemy.x,theEnemy.y,theEnemy.w,theEnemy.h);
			context.save();	
		}
	}
	
}
