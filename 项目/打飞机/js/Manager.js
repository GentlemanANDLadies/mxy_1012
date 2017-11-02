function Manager(){
	
	// 判断英雄是否死亡
	this.heroDie = function(enemyVC,hero){
		for (var i = 0; i < enemyVC.enemyArray.length;i++) {
			var theEnemy = enemyVC.enemyArray[i];
			if (!(hero.x > theEnemy.x + theEnemy.w || hero.x + hero.w < theEnemy.x || hero.y > theEnemy.y + theEnemy.h || hero.y + PLANEHEIGHT < theEnemy.y)) {
				hero.die = true;
			}
		}
	}
	
	// 判断子弹是否打到敌人
	this.heroFireEnemy = function(bulletVC,enemyVC){
		for (var i =0;i < bulletVC.bulletArray.length;i++) {
			var aBullet = bulletVC.bulletArray[i];
			for (var j =0;j < enemyVC.enemyArray.length;j++) {
				var aEnemy = enemyVC.enemyArray[j];
				// 判断是否发生了碰撞
				if (!(aBullet.x > aEnemy.x+aEnemy.w || aBullet.x+aBullet.w < aEnemy.x || aBullet.y > aEnemy.y +aEnemy.h || aBullet.y + BULLETHEIGHT < aEnemy.y)) {		
					// 先移除子弹
				bulletVC.bulletArray.splice(i,1);
				// 敌人的血量减1
				aEnemy.blood --;
				if (aEnemy.blood <= 0) {
					aEnemy.die = true;
				}	
				}
			}
		}
	}
	
	
	
	this.bindKeyBord = function(hero,speed){
		document.onkeydown = function(event){
			var ev = event || window.event;
			switch (ev.keyCode){
				case 37:
				hero.moveHero("left",speed);
					break;
				case 38:
				hero.moveHero("top",speed);
					break;
				case 39:
			   hero.moveHero("right",speed);
					break;
				case 40:
			  hero.moveHero("bottom",speed);
					break;
				default:
					break;
			}
		}
		
		document.onkeyup = function(){
			hero.direction = null;
		}
		
	}
}
