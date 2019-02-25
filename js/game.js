let SNAKE_VEL=15;
let TRANSITION_TIME=1500;
let GG_TRANSITION_TIME=3000;
let SNAKE_FONT_SIZE=55;
let SHADOW_OFFSET=5;

var snake_scale;
var _vel='right';
var _last_vel='right';


var _body=[];
var snake_stop=true;
var _angle={'left':0,'right':180,'up':90,'down':270};
var _last_ms;
var _snake_text_style;

var _img_body=[],_shadow_body=[];
// var _img_food=[];
var _img_head=[],_shadow_head=[];

var _food=[];
var _container_food,_container_snake,_container_shadow;
var _food_scale;

var _food_pattern=[];
var _food_data=[];

//var _eat_food=false;
var _word_eaten='';


function resetGame(){

	shuffle(list_keyword);
	_index_keyword=0;

	resetSnake(randomSentence());
	resetFood();
	app.ticker.add(updateSnake);
}
function startGame(){


	_last_ms=0;
	snake_stop=false;
	
}
function pauseGame(){
	snake_stop=true;
}


function updateSnake(delta){

	if(snake_stop) return;
	
	_last_ms+=delta;
	if(_last_ms>=SNAKE_VEL) _last_ms=0;
	else return;

	var pos={x:0,y:0};
	let len=_body.length;
	
	pos.x=_body[len-1].x;
	pos.y=_body[len-1].y;
			
	if(_vel==='left') _body[len-1].x-=1;
	else if(_vel==='up') _body[len-1].y-=1;
	else if(_vel==='right') _body[len-1].x+=1;
	else if(_vel==='down') _body[len-1].y+=1;

	ang=_angle[_vel];
	_last_vel=_vel;

	if(checkSnakePos()){
		_body[len-1].x=pos.x;
		_body[len-1].y=pos.y;
		
	}else{
		//len=_body.length;
		for(var i=_body.length-2;i>=0;--i){
			let newpos={x:_body[i].x,y:_body[i].y};
			_body[i].x=pos.x;
			_body[i].y=pos.y;
			
			pos.x=newpos.x;
			pos.y=newpos.y;
		}
	}
	// len=_body.length;
	for(var i=0;i<_body.length;++i){
		if(i==_body.length-1){
			setSnakeHead(_container_snake.children[i],_body[i],ang);
			setSnakeHead(_container_shadow.children[i],_body[i],ang,true);		
		}else if(i!=0){
			setSnakeBody(_container_snake.children[i],_body[i],calBodyDirection(i));
			setSnakeBody(_container_shadow.children[i],_body[i],calBodyDirection(i),true);
		}else{
			setSnakeTail(_container_snake.children[i],_body[i],calTailDirection());
			setSnakeTail(_container_shadow.children[i],_body[i],calTailDirection(),true);		
		} 
	}	
 

	// if(_eat_food) resetFood();	
}

function setupSnake(){

	
	_container_food=new Container();
	_container_game.addChild(_container_food);

	_container_shadow=new Container();
	_container_game.addChild(_container_shadow);

	_container_snake=new Container();
	_container_game.addChild(_container_snake);
		
	_img_head.push(new Texture.from('img/snake/head-normal.png'));
	_img_head.push(new Texture.from('img/snake/head-eat.png'));
	_img_head.push(new Texture.from('img/snake/head-dead.png'));

	_shadow_head.push(new Texture.from('img/snake/shadow-normal.png'));
	_shadow_head.push(new Texture.from('img/snake/shadow-eat.png'));
	_shadow_head.push(new Texture.from('img/snake/shadow-dead.png'));
	  

	_img_body.push(new Texture.from('img/snake/body-horizontal.png'));
	_img_body.push(new Texture.from('img/snake/body-vertical.png'));
	_img_body.push(new Texture.from('img/snake/body-left-top.png'));
	_img_body.push(new Texture.from('img/snake/body-left-bottom.png'));
	_img_body.push(new Texture.from('img/snake/body-right-top.png'));
	_img_body.push(new Texture.from('img/snake/body-right-bottom.png'));

	_shadow_body.push(new Texture.from('img/snake/shadow-horizontal.png'));
	_shadow_body.push(new Texture.from('img/snake/shadow-vertical.png'));
	_shadow_body.push(new Texture.from('img/snake/shadow-left-top.png'));
	_shadow_body.push(new Texture.from('img/snake/shadow-left-bottom.png'));
	_shadow_body.push(new Texture.from('img/snake/shadow-right-top.png'));
	_shadow_body.push(new Texture.from('img/snake/shadow-right-bottom.png'));


	document.addEventListener('keydown', function(event) {
		if(event.which===37 && _last_vel!=='right'){
            _vel='left';
        }else if(event.which===38 && _last_vel!=='down'){
            _vel='up';
        }else if(event.which===39 && _last_vel!=='left'){
            _vel='right';
        }else if(event.which===40 && _last_vel!=='up'){
            _vel='down';
        }
	});

	let canvas_=document.getElementById('pixi_frame');
	let hammer=new Hammer.Manager(canvas_);
	let swipe_=new Hammer.Swipe();
	hammer.add(swipe_);

	hammer.on("swipeleft",function(ev){
		if(_last_vel!=='right') _vel='left';        
	});
	hammer.on("swiperight",function(ev){
		if(_last_vel!=='left') _vel='right';        
	});
	hammer.on("swipeup",function(ev){
		if(_last_vel!=='down') _vel='up';        
	});
	hammer.on("swipedown",function(ev){
		if(_last_vel!=='up') _vel='down';        
	});
	

	_food_data=loader.resources['data/food_pattern.json'].data.patterns;
	let flen=_food_data.length;
	for(var i=0;i<flen;++i){
		//_img_food.push(new Texture.from('img/'+_food_data[i].img));
		_food_data[i]['texture']=new Texture.from('img/'+_food_data[i].img);
	}
	_food_scale=gwid*(68/60)/(74);
	

	_snake_text_style = new PIXI.TextStyle({
    	fontFamily: 'SnakeFont',
    	fontSize: gwid/60*SNAKE_FONT_SIZE,
    	fill:0x122C9A,
    	// letterSpacing:2,
    	// fontWeight:'bold'
	});

	
	for(var i=0;i<3;++i){
		
		let fd=getFoodOf(2);
		let ff=new Sprite(fd.texture);
		ff.scale.set(_food_scale);
  		_container_food.addChild(ff);


  		_food_pattern.push(fd);

  		let text_=new Container();
  		_container_food.addChild(text_);
	}

	// resetFood();

	// _container_game.interactive=true;
	// _container_game.on("pointerdown",function(){
	// 	resetFood();
	// });

}
function resetBodyPos(len){
  _vel='right';
  _last_vel='right';

  _body=[];
  // let len=9;
  len+=3;
  let startx=len-1;
  let starty=Math.floor(mgridy/2);

  for(var i=0;i<len;++i)
  	_body.push({x:startx-i,y:starty});

 
}
function resetSnake(sentence_){
  
  resetBodyPos(sentence_.length);
  _container_snake.removeChildren();
  _container_shadow.removeChildren();


  let head_container=new Container();
  let shead_container=new Container();
  let shead=new Sprite(_shadow_head[0]);
  let head=new Sprite(_img_head[0]);

  snake_scale=gwid/(head.width/115*60);
  //gwid/60*5;
  
  head.pivot.set(head.width,head.height/2);
  head.scale.set(snake_scale,snake_scale);
  head._zIndex=10;
  
  shead.pivot.set(shead.width,shead.height/2);
  shead.scale.set(snake_scale,snake_scale);
  shead._zIndex=10;
  
  shead_container.addChild(shead);
  head_container.addChild(head);

  setSnakeHead(head_container,_body[0],180);
  setSnakeHead(shead_container,_body[0],180,true);
  
  _container_snake.addChild(head_container);
  _container_shadow.addChild(shead_container);
  
  
  let len=_body.length;

  for(var i=0;i<len-2;++i){
  	//let container_=new Container();
  	let container_=new Container();
  	let scontainer_=new Container();
  	
  	let b_=new Sprite(_img_body[0]);
  	b_.scale.set(snake_scale,snake_scale);
  	b_._zIndex=0;
  	
  	let s_=new Sprite(_shadow_body[0]);
  	s_.scale.set(snake_scale,snake_scale);
  	s_._zIndex=-10;
  	
  	let tt=(i<sentence_.length)?sentence_[i]:'...';
  	let text_=new PIXI.Text(tt,_snake_text_style);
  	text_.scale.set(FONT_STRETCH,1);
  	text_._zIndex=10;


  	scontainer_.addChild(s_);
  	container_.addChild(b_);
  	container_.addChild(text_);
  	setSnakeBody(container_,_body[i+1],calBodyDirection(i+1));
  	setSnakeBody(scontainer_,_body[i+1],calBodyDirection(i+1),true);


  	_container_snake.addChild(container_);
  	_container_shadow.addChild(scontainer_);
  }

  let tail_container=new Container();
  let stail_container=new Container();

  let tail=new Sprite(resources['img/snake/tail.png'].texture);
  tail.pivot.set(tail.width,tail.height/2);
  tail.scale.set(snake_scale,snake_scale);
  tail._zIndex=0;
  
  let stail=new Sprite(resources['img/snake/shadow-tail.png'].texture);
  stail.pivot.set(stail.width,stail.height/2);
  stail.scale.set(snake_scale,snake_scale);
  stail._zIndex=0;
  
  
  stail_container.addChild(stail);
  tail_container.addChild(tail);
  setSnakeTail(tail_container,_body[len-1],0);
  setSnakeTail(stail_container,_body[len-1],0,true);
  
  _container_snake.addChild(tail_container);
  _container_shadow.addChild(stail_container);

  _container_snake.children.reverse();
  _container_shadow.children.reverse();
 _body.reverse();

}

function setSnakeHead(container_,pt,angle,isshadow=false){
  // for(var i in container_.children){
	  let sprite_=container_.children[0];
	  sprite_.angle=angle;
	  
	  sprite_.x=gwid*(pt.x+.5)+(gwid/2)*Math.cos(sprite_.rotation)+(isshadow?SHADOW_OFFSET:0);
	  sprite_.y=gwid*(pt.y+.5)+(gwid/2)*Math.sin(sprite_.rotation)+(isshadow?SHADOW_OFFSET:0);
  // }
}
function setSnakeBody(container_,pt,direction,isshadow=false){

	try{
	let sprite_=container_.children[0];

	
	switch(direction[0]){
		case 'horiz': 
			sprite_.texture=!isshadow?_img_body[0]:_shadow_body[0];
			break;
		case 'vert': 
			sprite_.texture=!isshadow?_img_body[1]:_shadow_body[1];
			break;
		case 'left-top': 
			sprite_.texture=!isshadow?_img_body[2]:_shadow_body[2];
			break;
		case 'left-bottom': 
			sprite_.texture=!isshadow?_img_body[3]:_shadow_body[3];
			break;
		case 'right-top': 
			sprite_.texture=!isshadow?_img_body[4]:_shadow_body[4];
			break;
		case 'right-bottom': 
			sprite_.texture=!isshadow?_img_body[5]:_shadow_body[5];
			break;
	}

	sprite_.x=gwid*pt.x+(isshadow?SHADOW_OFFSET:0);
	sprite_.y=gwid*pt.y+(isshadow?SHADOW_OFFSET:0);

	if(container_.children.length>1){
		let text_=container_.children[1];
	  	text_.x=sprite_.x+SHADOW_OFFSET*2+(sprite_.width-SHADOW_OFFSET*2)/2-text_.width/2;
	  	text_.y=sprite_.y+SHADOW_OFFSET*2+(sprite_.height-SHADOW_OFFSET*2)/2-text_.height/2;
	  	// text_.angle=direction[1];
  	}
  }catch(err){
  	console.log(err);
  }
}
function setSnakeTail(container_,pt,angle,isshadow=false){
  // for(var i in container_.children){
	  let sprite_=container_.children[0];
	  	
	  sprite_.angle=angle;
	  
	  sprite_.x=gwid*(pt.x+.5)+(gwid/2)*Math.cos(sprite_.rotation)+(isshadow?SHADOW_OFFSET:0);
	  sprite_.y=gwid*(pt.y+.5)+(gwid/2)*Math.sin(sprite_.rotation)+(isshadow?SHADOW_OFFSET:0);
  // }

}

function checkSnakePos(){
	let pos_={x:_body[_body.length-1].x,y:_body[_body.length-1].y};
	
	/* check boundary */
	if(pos_.x<0 || pos_.y<0 ||pos_.x>=mgridx ||pos_.y>=mgridy){
		killSnake();
		return true;	
	} 
	
	/* check tail */
	for(var i=0;i<_body.length-1;++i){
		if(pos_.x==_body[i].x && pos_.y==_body[i].y){
			killSnake();
			return true;
		}
	}
	/* check food*/
	for(var i in _food){
		
		let mf=_food[i].word.length;
		// console.log(mf);

		for(var j in _food_pattern[i].pattern){

			let ppx=_food[i].x+_food_pattern[i].pattern[j].x;
		    let ppy=_food[i].y+_food_pattern[i].pattern[j].y;
		    
		    if(ppx===pos_.x && ppy===pos_.y){

		    	_word_eaten=_food[i].word;
				console.log('eat '+_word_eaten);
				_keyword.push(_word_eaten);

		    	let word_add=_word_eaten+randomConnection();
		    	_sentence+=word_add;
		    	mf=word_add.length;

		    	//append tail
		    	let dir_={x:_body[0].x-_body[1].x,y:_body[0].y-_body[1].y};
		    	_body.splice(0,1);
				_body.splice(0,1);

		    	let tx=_body[0].x+dir_.x;
		    	let ty=_body[0].y+dir_.y;
		    		
		    	for(var k=0;k<=mf+1;++k){
		    		_body.unshift({x:tx,y:ty});
		    		tx+=dir_.x;
		    		tx+=dir_.y;
		    	}
		    	
		    	let tail_=_container_snake.removeChildAt(0);
		    	let dot_=_container_snake.removeChildAt(0);

		    	let stail_=_container_shadow.removeChildAt(0);
		    	let sdot_=_container_shadow.removeChildAt(0);


		    	for(var k=0;k<mf;++k){
		    		let container_=new Container();
			    	let scontainer_=new Container();
			    	let b_=new Sprite(_img_body[0]);
				  	b_.scale.set(snake_scale,snake_scale);
				  	b_._zIndex=0;

					let s_=new Sprite(_shadow_body[0]);
  					s_.scale.set(snake_scale,snake_scale);
  					s_._zIndex=0;
  
				  	let text_=new PIXI.Text(word_add[k],_snake_text_style);
				  	text_.scale.set(FONT_STRETCH,1);

				  	scontainer_.addChild(s_);
				  	container_.addChild(b_);
				  	container_.addChild(text_);
				  	_container_snake.addChildAt(container_,0);
				  	_container_shadow.addChildAt(scontainer_,0);
				}
				_container_snake.addChildAt(dot_,0);
  				_container_shadow.addChildAt(sdot_,0);
				
				_container_snake.addChildAt(tail_,0);
				_container_shadow.addChildAt(stail_,0);
				
				clearFood();

		    	setTimeout(function(){
		    		if(!snake_stop) resetFood();
		    	},TRANSITION_TIME);
		    	return false;
		    }
		}
	}


}
function killSnake(){
	snake_stop=true;
	let len=_container_snake.children.length;
	_container_snake.getChildAt(len-1).children[0].texture=_img_head[2];
	_container_shadow.getChildAt(len-1).children[0].texture=_shadow_head[2];
	app.renderer.render(_container_snake);
	app.ticker.remove(updateSnake);

	setTimeout(function(){
		goToResult()
	},GG_TRANSITION_TIME);
}
function goToResult(){

	renderImage(function(){
		resetResult();
		getSample();

  		_frame_game.style.display='none';
		_frame_result.style.display='block';
	});	
	
}

function calBodyDirection(index_){

	try{
	let x1=_body[index_+1].x-_body[index_-1].x;
	let y1=_body[index_+1].y-_body[index_-1].y;
	
	let x2=_body[index_+1].x-_body[index_].x;
	let y2=_body[index_+1].y-_body[index_].y;


	let ang=Math.floor(Math.atan2(y1,x1)*180/Math.PI);
	switch(ang){
		case 0:
		case 180:
			return ['horiz',ang];
		case 90:
		case -90:
			return ['vert',ang];
		case 45:
			if(x2>0) return ['left-bottom',ang];
			else return ['right-top',ang];
		case 135:
			if(y2>0) return ['left-top',ang];
			else return ['right-bottom',ang];
		case -135:
			if(x2<0) return ['right-top',ang];
			else return ['left-bottom',ang];
		case -45:
			if(y2<0) return ['right-bottom',ang];
			else return ['left-top',ang];
		default:
			console.log('error!!'+index_+'-'+x1+','+y1);
			return ['horiz',ang];
			break;
	}
	}catch(err){
		console.log(err);
	}
}
function calTailDirection(){
	// let i=0;
	return Math.atan2(_body[1].y-_body[0].y,_body[1].x-_body[0].x)*180/Math.PI;
}
function getFoodOf(count_){
	let result=_food_data.filter(function(item){
		return item.mword===count_;
	});
	return result[Math.floor(Math.random()*result.length)];
}

function clearFood(){
	_food=[];
	_food_pattern=[];
	_word_eaten='';
	_container_food.visible=false;

	app.renderer.render(_container_food);

}
function resetFood(){
	
	//_container_food.removeChildren();
	
	_keyword=[];
	_food=[];
	_food_pattern=[];
	_word_eaten='';

	for(var i=0;i<3;++i){

		var key_=randomKeyword();
		var fp=getFoodOf(key_.length);
		var f=generateFood(fp);

		f.word=key_;

		let ff=_container_food.getChildAt(i*2);

		ff.texture=fp.texture;
  		ff.scale.set(_food_scale,_food_scale);
  		ff.x=gwid*f.x;
  		ff.y=gwid*f.y;

  		let text_=_container_food.getChildAt(i*2+1);
		text_.removeChildren();
		console.log('food of '+key_);


	  	let mf=key_.length;
		for(var k=0;k<mf;++k){
	  		let t_=new PIXI.Text(key_[k],_snake_text_style);
	  		t_.scale.set(FONT_STRETCH,1);
	  		t_.x=ff.x+fp.pattern[k].x*gwid+gwid/2-t_.width/2;
	  		t_.y=ff.y+fp.pattern[k].y*gwid+gwid/2-t_.height/2;
	  		text_.addChild(t_);
  		}
		// _container_food.addChild(ff);

		_food.push(f);
		_food_pattern.push(fp);
	}
	_container_food.visible=true;
}
function generateFood(food_data){

	let mword=food_data.mword;

	var x=null;
    var y=null;
    //var mword=null;
    generatePos();

    while(checkPos()){
        generatePos();
    }

    function checkPos(){
    	
    	for(var k in food_data.pattern){

    		let px=x+food_data.pattern[k].x;
    		let py=y+food_data.pattern[k].y;
    		//console.log('new food '+px+' , '+py);
		    // check boundary
		    if(px<0 || px>=mgridx || py<0 || py>=mgridy) 
		    	return true;

		    // check overlap
		    for(var z in _food){
		    	// let mf=_food[z].mword;
		    	for(var q in _food_pattern[z].pattern){
		    		
		    		let ppx=_food[z].x+_food_pattern[z].pattern[q].x;
		    		let ppy=_food[z].y+_food_pattern[z].pattern[q].y;
		    		// console.log('old food '+ppx+' , '+ppy);
		    		
		    		//if(ppx===px && ppy===py) 
		    		if(Math.sqrt(Math.pow(ppx-px,2)+Math.pow(ppy-py,2))<3)
		    			return true;
		    	}
		    }

    		// check snake
		    for(var z=0;z<_body.length;z++){
		        var p=_body[z];
		        if(p.x===px && p.y===py){
		            return true;
		        }
		    }

    	}
        return false;
    }


    function generatePos() {
        x=Math.round(Math.random()*mgridx);
        y=Math.round(Math.random()*mgridy);
        // mword=Math.round(Math.random()*3)+2;
    }

    return {
        'x': x,
        'y': y,
        'mword':mword
    };
}


