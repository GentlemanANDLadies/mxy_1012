var planeCanvas = document.getElementById("planeCanvas");
var context = planeCanvas.getContext("2d");
var PLANEWIDTH = 66; 
var PLANEHEIGHT = 82;
if (IsPC()) {
	planeCanvas.width = 320;
	planeCanvas.height=	568;
}else{
	planeCanvas.width = document.documentElement.clientWidth | document.body.clientWidth;
	planeCanvas.height = document.documentElement.clientHeight | document.body.clientHeight;
}
var bulletMusic = document.getElementById("bullet");

var bg = new Background(planeCanvas.height);
bg.drawBG(context,planeCanvas);

var hero = new HeroPlane((planeCanvas.width -  PLANEWIDTH) / 2,planeCanvas.height - PLANEHEIGHT,PLANEWIDTH,context,planeCanvas);
hero.drawHero();

var manager = new Manager();
manager.bindKeyBord(hero,5);

var bulletVC = new BulletController();


var enemyVC = new EnemyController(planeCanvas);


var timer = setInterval(function(){	
	// 清除画布
context.clearRect(0,0,planeCanvas.width,planeCanvas.height);
	bg.moveBG(5,context,planeCanvas);
	hero.moveHero(hero.direction,5);
	hero.drawHero();
	/*子弹*/
	bulletVC.produceBullet(hero);
	bulletVC.moveBullet();
	bulletVC.drawBullet(context);
	/*敌人*/
	enemyVC.produceEnemy();
	enemyVC.moveEnemy();
	enemyVC.drawEnemy(context);
	
	manager.heroFireEnemy(bulletVC,enemyVC);

	manager.heroDie(enemyVC,hero);
	
},30);