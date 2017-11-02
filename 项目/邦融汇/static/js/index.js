var wid = $(window).width(); 
var hei = $(window).height(); 
$("#stage").attr("width",wid);
$("#stage").attr("height",hei);
var ImgArr=["static/img/1.png","static/img/2.png","static/img/3.png","static/img/4.png","static/img/5.png","static/img/6.png"];

var music=document.querySelector("audio");
music.pause();
function Ship(ctx){
	gameMonitor.im.loadImage(['static/img/player.png']);//聚财宝图片
	this.width = 100;
	this.height = 150;
	this.left = gameMonitor.w/2 - this.width/2;
	this.top = gameMonitor.h - 2*this.height;
	this.player = gameMonitor.im.createImage('static/img/player.png');//聚财宝图片

	this.paint = function(){
		ctx.drawImage(this.player, this.left, this.top, this.width, this.height);
	}

	this.setPosition = function(event){
		if(gameMonitor.isMobile()){
			var tarL = event.changedTouches[0].clientX;
			var tarT = event.changedTouches[0].clientY;
		}
		else{
			var tarL = event.offsetX;
			var tarT = event.offsetY;
		}
		this.left = tarL - this.width/2;
		this.top = tarT - this.height/2;
		if(this.left<0){
			this.left = 0;
		}
		if(this.left>wid-this.width){
			this.left = wid-this.width;
		}
		if(this.top<0){
			this.top = 0;
		}
		if(this.top>gameMonitor.h - this.height){
			this.top = gameMonitor.h - this.height;
		}
		this.paint();
	}

	this.controll = function(){
		var _this = this;
		var stage = $('#gamepanel');
		var currentX = this.left,
			currentY = this.top,
			move = false;
		stage.on(gameMonitor.eventType.start, function(event){
			_this.setPosition(event);
			move = true;
		}).on(gameMonitor.eventType.end, function(){
			move = false;
		}).on(gameMonitor.eventType.move, function(event){
			event.preventDefault();
			if(move){
				_this.setPosition(event);	
			}
			
		});
	}

	this.eat = function(foodlist){
		for(var i=foodlist.length-1; i>=0; i--){
			var f = foodlist[i];
			if(f){
				var l1 = this.top+this.height/2 - (f.top+f.height/2);
				var l2 = this.left+this.width/2 - (f.left+f.width/2);
				var l3 = Math.sqrt(l1*l1 + l2*l2);
				if(l3<=this.height/2 + f.height/2){
					foodlist[f.id] = null;
					var priceOne=100;     //-----纸币
					var priceTwo=200;     //-----金币
					var priceThree=500;     //-----元宝
					var priceFour=1000;     //-----车子
					var priceFive=1500;     //-----房贷
					if(f.type==0){
						$('#score').text(gameMonitor.score+=priceTwo);//--------------------------吃到金币
					}else if(f.type==1){
						$('#score').text(gameMonitor.score+=priceOne);//--------------------------吃到吃到纸币
					}else if(f.type==2){
						$('#score').text(gameMonitor.score+=priceOne);//--------------------------吃到吃到纸币
					}else if(f.type==3){
						$('#score').text(gameMonitor.score+=priceThree);//--------------------------吃到元宝
					}
					else if(f.type==4){
						if(gameMonitor.score-priceFour<=0){
							$('#score').text(gameMonitor.score=0);
						}else{
							$('#score').text(gameMonitor.score-=priceFour);//-----------------------------吃到车子
						}
					}else{
						if(gameMonitor.score-priceFive<=0){			
							$('#score').text(gameMonitor.score=0);
						}else{
							$('#score').text(gameMonitor.score-=priceFive);//---------------------吃到房贷
						}        
					}
					if(gameMonitor.score>=10000){//------------------------------------------------------判断分数是否达到10000
						window.location.href="ClickSuccess.html";
					}
//					$('.heart').removeClass('hearthot').addClass('hearthot');
//					setTimeout(function() {
//						$('.heart').removeClass('hearthot');
//					}, 200);//-----------------------------------------吃到食物分数闪动
				}
			}
			
		}
	}
}

function Food(type, left, id){
	this.speedUpTime = 300;
	this.id = id;
	this.type = type;
	this.width = 50;
	this.height = 50;
	this.left = left;
	this.top = -50;
	this.speed = 0.04 * Math.pow(1.2, Math.floor(gameMonitor.time/this.speedUpTime));
	this.loop = 0;
	var p=0;//-----------------------金币图片
	if(type==0){
		p=ImgArr[0];
	}else if(type==1){
		p=ImgArr[1];
	}else if(type==2){
		p=ImgArr[2];
	}else if(type==3){
		p=ImgArr[3];
	}else if(type==4){
		p=ImgArr[4];
	}else if(type==5){
		p=ImgArr[5];
	}
	this.pic = gameMonitor.im.createImage(p);
}
Food.prototype.paint = function(ctx){
	ctx.drawImage(this.pic, this.left, this.top, this.width, this.height);
}
Food.prototype.move = function(ctx){
	if(gameMonitor.time % this.speedUpTime == 0){
		this.speed *= 1.2;
	}
	this.top += ++this.loop * this.speed;
	if(this.top>gameMonitor.h){
	 	gameMonitor.foodList[this.id] = null;
	}
	else{
		this.paint(ctx);
	}
}

function ImageMonitor(){
	var imgArray = [];
	return {
		createImage : function(src){
			return typeof imgArray[src] != 'undefined' ? imgArray[src] : (imgArray[src] = new Image(), imgArray[src].src = src, imgArray[src])
		},
		loadImage : function(arr, callback){
			for(var i=0,l=arr.length; i<l; i++){
				var img = arr[i];
				imgArray[img] = new Image();
				imgArray[img].onload = function(){
					if(i==l-1 && typeof callback=='function'){
						callback();
					}
				}
				imgArray[img].src = img
			}
		}
	}
}
function TimeOut(){//--------------------------------------------时间到--游戏结束
	setTimeout(function(){
		gameMonitor.stop();
		$('#gameoverPanel').show();
//		setTimeout(function(){//-----------------------------------------------跳出再来一次页面
			$('#gameoverPanel').hide();
			$('#resultPanel').show();
			gameMonitor.getScore();
//		}, 2000);
		music.pause();
		music.currentTime = 0;
	},60000);
}
var gameMonitor = {
	w : wid,
	h : hei,
	bgWidth : wid,
	bgHeight : hei,
	time : 0,
	timmer : null,
	bgSpeed : 2,
	bgloop : 0,
	score : 0,  //-------------------------------总分数
	timeData:60,//-------------------------------------------------------------倒计时
	timeDataOff:"",
	im : new ImageMonitor(),
	foodList : [],
	bgDistance : 0,//背景位置
	eventType : {
		start : 'touchstart',
		move : 'touchmove',
		end : 'touchend'
	},
	init : function(){
		var _this = this;
		var canvas = document.getElementById('stage');
		var ctx = canvas.getContext('2d');
		//绘制背景
		var bg = new Image();
		_this.bg = bg;
		bg.onload = function(){
			console.log(_this.bgWidth);
			if( _this.bgWidth>=640){
				_this.bgWidth=640;
				ctx.drawImage(bg, 0, 0, _this.bgWidth, _this.bgHeight);  
			}else{
				console.log(2);
				ctx.drawImage(bg, 0, 0, _this.bgWidth, _this.bgHeight);          
			}
		}
		bg.src = 'static/img/bg.png';
		_this.initListener(ctx);
	},
	initListener : function(ctx){
		var _this = this;
		var body = $(document.body);
		$(document).on(gameMonitor.eventType.move, function(event){
			event.preventDefault();
		});
		body.on(gameMonitor.eventType.start, '.replay, .playagain', function(){
			$('#resultPanel').hide();
			var canvas = document.getElementById('stage');
			var ctx = canvas.getContext('2d');
			_this.ship = new Ship(ctx);
      		_this.ship.controll();
      		_this.reset();
			_this.run(ctx);
			TimeOut();
			_this.timeDataOff=setInterval(function(){
				_this.timeData-=1;
				$("#time").text(_this.timeData);
			},1000);
			setTimeout(function(){
				clearInterval(_this.timeDataOff);
			},60000);
			music.play();
		});

		body.on(gameMonitor.eventType.start, '#frontpage', function(){
			$('#frontpage').css('left', '-100%');
		});

		body.on(gameMonitor.eventType.start, '#guidePanel', function(){
			$(this).hide();
			_this.ship = new Ship(ctx);
			_this.ship.paint();
      		_this.ship.controll();
			gameMonitor.run(ctx);
			TimeOut();
			_this.timeDataOff=setInterval(function(){
				_this.timeData-=1;
				$("#time").text(_this.timeData);
			},1000);
			setTimeout(function(){
				clearInterval(_this.timeDataOff);
			},60000);
			music.play();
		});
		/*
			body.on(gameMonitor.eventType.start, '.share', function(){
				$('.weixin-share').show().on(gameMonitor.eventType.start, function(){
					$(this).hide();
				});
			});
		*/
		WeixinApi.ready(function(Api) {   
            // 微信分享的数据
            //分享给好友的数据
            var wxData = {
                "appId": "", 
                "imgUrl" : "static/img/icon.png",
                "link" : "http:XXXXXXXXXXXXXXX",
                "desc" : "进击的玉兔",
                "title" : "“玩玉兔 抢月饼”"
            };

            //朋友圈数据
            var wxDataPyq ={
            	"appId": "",
                "imgUrl" : "static/img/icon.png",
                "link" : "http:XXXXXXXXXXXXXXXX",
                "desc" : "“玩玉兔 抢月饼”",
                "title" : "进击的玉兔"
            }

            // 分享的回调
            var wxCallbacks = {
                // 分享操作开始之前
                ready : function() {},
                cancel : function(resp) {},
                fail : function(resp) {},
                confirm : function(resp) {},
                all : function(resp) {
                    //location.href=location.href
                }
            };

            // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
            Api.shareToFriend(wxData, wxCallbacks);
            // 点击分享到朋友圈，会执行下面这个代码
            Api.shareToTimeline(wxDataPyq, wxCallbacks);
            // 点击分享到腾讯微博，会执行下面这个代码
            Api.shareToWeibo(wxData, wxCallbacks);
        });

	},
	rollBg : function(ctx){
		if(this.bgDistance>=this.bgHeight){
			this.bgloop = 0;
		}
		//this.bgDistance = ++this.bgloop * this.bgSpeed;//背景滚动
		ctx.drawImage(this.bg, 0, this.bgDistance-this.bgHeight, this.bgWidth, this.bgHeight);
		ctx.drawImage(this.bg, 0, this.bgDistance, this.bgWidth, this.bgHeight);
	},
	run : function(ctx){
		var _this = gameMonitor;
		ctx.clearRect(0, 0, _this.bgWidth, _this.bgHeight);
		_this.rollBg(ctx);

		//绘制飞船
		_this.ship.paint();
		_this.ship.eat(_this.foodList);


		//产生月饼
		_this.genorateFood();

		//绘制月饼
		for(i=_this.foodList.length-1; i>=0; i--){
			var f = _this.foodList[i];
			if(f){
				f.paint(ctx);
				f.move(ctx);
			}
			
		}
		_this.timmer = setTimeout(function(){
			gameMonitor.run(ctx);
		}, Math.round(1000/60));
		_this.time++;
	},
	stop : function(){
		var _this = this
		$('#stage').off(gameMonitor.eventType.start + ' ' +gameMonitor.eventType.move);
		setTimeout(function(){
			clearTimeout(_this.timmer);
		}, 0);
		
	},
	genorateFood : function(){
		var genRate = 30; //产生财宝的频率
		var random = Math.random();
		if(random*genRate>genRate-1){
			var left = Math.random()*(this.w - 50);
			var type;
			if(Math.floor(left)%6 == 1){
				type=0;
			}else if(Math.floor(left)%6 == 2){
				type=1;
			}else if(Math.floor(left)%6 == 3){
				type=2;
			}else if(Math.floor(left)%6 == 4){
				type=3;
			}else if(Math.floor(left)%10 > 7){
				type=4;
			}else if(Math.floor(left)%10 < 3){
				type=5;
			}else{
				type=1;
			}
			var id = this.foodList.length;
			var f = new Food(type, left, id);
			this.foodList.push(f);
		}
	},
	reset : function(){
		this.foodList = [];
		this.bgloop = 0;
		this.score = 0;
		this.timmer = null;
		this.time = 0;
		this.timeData = 60;
		$('#score').text(this.score);
		$("#time").text(this.timeData);
	},
	getScore : function(){
		var time = Math.floor(this.time/60);
		var score = this.score;
		var user = 1;
		if(score==0){
			$('#scorecontent').html('真遗憾，您竟然<span class="lighttext">一个</span>月饼都没有抢到！');
			$('.btn1').text('大侠请重新来过').removeClass('share').addClass('playagain');
			$('#fenghao').removeClass('geili yinhen').addClass('yinhen');
			return;
		}
		else if(score<10){
			user = 2;
		}
		else if(score>10 && score<=20){
			user = 10;
		}
		else if(score>20 && score<=40){
			user = 40;
		}
		else if(score>40 && score<=60){
			user = 80;
		}
		else if(score>60 && score<=80){
			user = 92;
		}
		else if(score>80){
			user = 99;
		}
		$('#fenghao').removeClass('geili yinhen').addClass('geili');
		$('#scorecontent').html('您抢到了<span id="sscore" class="lighttext">21341</span>个月饼<br>超过了<span id="suser" class="lighttext">31%</span>的用户！可以兑换<span id="num" class="lighttext"></span>个嗖嗖金币哦！');
		$('#sscore').text(score);
		$('#num').text(score*10);
		$('#suser').text(user%100+'%');
		$('.btn1').text('去兑换').removeClass('playagain');//分享弹层 .addClass('share');
	},
	isMobile : function(){
		var sUserAgent= navigator.userAgent.toLowerCase(),
		bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
		bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
		bIsMidp= sUserAgent.match(/midp/i) == "midp",
		bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
		bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
		bIsAndroid= sUserAgent.match(/android/i) == "android",
		bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
		bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
		bIsWebview = sUserAgent.match(/webview/i) == "webview";
		return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
     }
}
if(!gameMonitor.isMobile()){
	gameMonitor.eventType.start = 'mousedown';
	gameMonitor.eventType.move = 'mousemove';
	gameMonitor.eventType.end = 'mouseup';
}

gameMonitor.init();



//-------------------fontSize
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);