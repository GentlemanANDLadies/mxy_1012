var imgArr = [];
function loadingImg(){
	var arr = ["img/background.png","img/bomb.png","img/bullet1.png","img/bullet2.png","img/enemy1.png","img/enemy2.png","img/enemy3.png","img/herofly.png","img/loading.gif","img/prop.png"];
	
	for (var i = 0; i < arr.length;i++) {
		var aimg = new Image;
		aimg.onload = function(){
			imgArr.push(this);
			if (imgArr.length == arr.length) {
				// 所有图片加载完毕了
				var sc = document.createElement("script");
				sc.src = "js/main.js";	document.documentElement.appendChild(sc);
			}
		}
		aimg.src = arr[i];
	}
}
loadingImg();