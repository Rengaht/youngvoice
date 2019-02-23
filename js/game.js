
var snake_scale;
var _vel='right';
var _last_vel='right';

var _body=[];
var snake_stop=true;
var _angle={'left':0,'right':180,'up':90,'down':270};
var _last_ms;
var _snake_text_style;

var _img_body=[];
var _img_food=[];
var _img_head=[];

var _food=[];
var _container_food,_container_snake;
var _food_scale;

var _food_pattern=[[{x:0,y:0},{x:0,y:1}],
				[{x:0,y:0},{x:0,y:1},{x:1,y:1}],
				[{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}],
				[{x:1,y:0},{x:2,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1}]];

//var _eat_food=false;
var _word_eaten='';

function updateSnake(delta){

	if(snake_stop) return;
	
	_last_ms+=delta;
	if(_last_ms>=25) _last_ms=0;
	else return;

	var pos={x:0,y:0};

	for(var i=0;i<_body.length;++i){
		if(i==0){
			pos.x=_body[0].x;
			pos.y=_body[0].y;
			
			if(_vel==='left') _body[i].x-=1;
			else if(_vel==='up') _body[i].y-=1;
			else if(_vel==='right') _body[i].x+=1;
			else if(_vel==='down') _body[i].y+=1;

			ang=_angle[_vel];

			
			_last_vel=_vel;

			if(checkSnakePos()){
				_body[i].x=pos.x;
				_body[i].y=pos.y;
				break;
			}

		}else{
			let newpos={x:_body[i].x,y:_body[i].y};
			_body[i].x=pos.x;
			_body[i].y=pos.y;
			
			pos.x=newpos.x;
			pos.y=newpos.y;

		}
	}
	
	for(var i=0;i<_body.length;++i){
		if(i==0) setSnakeHead(_container_snake.children[0],_body[0],ang);
		else if(i!=_body.length-1) setSnakeBody(_container_snake.children[i],_body[i],calBodyDirection(i));
		else setSnakeTail(_container_snake.children[i],_body[i],calTailDirection());
	}	


	// if(_eat_food) resetFood();	
}

function initSnake(){

	_container_food=new Container();
	_container_game.addChild(_container_food);
	
	_container_snake=new Container();
	_container_game.addChild(_container_snake);
		
  _img_head.push(new Texture.from('img/snake/head-normal.png'));
  _img_head.push(new Texture.from('img/snake/head-eat.png'));
  _img_head.push(new Texture.from('img/snake/head-dead.png'));

  

  _img_body.push(new Texture.from('img/snake/body-horizontal.png'));
  _img_body.push(new Texture.from('img/snake/body-vertical.png'));
  _img_body.push(new Texture.from('img/snake/body-left-top.png'));
  _img_body.push(new Texture.from('img/snake/body-left-bottom.png'));
  _img_body.push(new Texture.from('img/snake/body-right-top.png'));
  _img_body.push(new Texture.from('img/snake/body-right-bottom.png'));
  


  // resetSnake();


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

	

	for(var i=2;i<6;++i){
		_img_food.push(new Texture.from('img/food/'+i+'.png'));
	}
	_food_scale=gwid*(68/60)/(74);
	

	_snake_text_style = new PIXI.TextStyle({
    	// fontFamily: 'jackeyfont',
    	fontSize: gwid/60*36,
    	fill:0x122C9A,
    	letterSpacing:2,
    	fontWeight:'bold'
	});
	
	for(var i=0;i<3;++i){
		let ff=new Sprite(_img_food[0]);
		ff.scale.set(_food_scale);
  		_container_food.addChild(ff);

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
	
  let head_container=new Container();
  let head=new Sprite(_img_head[0]);

  snake_scale=gwid/(head.width/115*60);
  
  head.pivot.set(head.width,head.height/2);
  head.scale.set(snake_scale,snake_scale);
  head._zIndex=10;
  
  head_container.addChild(head);
  setSnakeHead(head_container,_body[0],180);
  
  _container_snake.addChild(head_container);
  
  
  let len=_body.length;

  for(var i=0;i<len-2;++i){
  	let container_=new Container();

  	let b_=new Sprite(_img_body[0]);
  	b_.scale.set(snake_scale,snake_scale);
  	b_._zIndex=0;
  	
  	let tt=(i<sentence_.length)?sentence_[i]:'...';
  	let text_=new PIXI.Text(tt,_snake_text_style);
  	container_.addChild(b_);
  	container_.addChild(text_);
  	setSnakeBody(container_,_body[i+1],calBodyDirection(i+1));


  	_container_snake.addChild(container_);
  }

  let tail_container=new Container();

  let tail=new Sprite(resources['img/snake/tail.png'].texture);
  tail.pivot.set(tail.width,tail.height/2);
  tail.scale.set(snake_scale,snake_scale);
  tail._zIndex=0;
  
  tail_container.addChild(tail);
  setSnakeTail(tail_container,_body[len-1],0);
  
  _container_snake.addChild(tail_container);

}
function resetGame(){
	
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
function setSnakeHead(container_,pt,angle){

  let sprite_=container_.children[0];
  sprite_.angle=angle;
  
  sprite_.x=gwid*(pt.x+.5)+(gwid/2)*Math.cos(sprite_.rotation);
  sprite_.y=gwid*(pt.y+.5)+(gwid/2)*Math.sin(sprite_.rotation);
  
}
function setSnakeBody(container_,pt,direction){
	let sprite_=container_.children[0];
	switch(direction){
		case 'horiz': 
			sprite_.texture=_img_body[0];
			break;
		case 'vert': 
			sprite_.texture=_img_body[1];
			break;
		case 'left-top': 
			sprite_.texture=_img_body[2];
			break;
		case 'left-bottom': 
			sprite_.texture=_img_body[3];
			break;
		case 'right-top': 
			sprite_.texture=_img_body[4];
			break;
		case 'right-bottom': 
			sprite_.texture=_img_body[5];
			break;
	}

	sprite_.x=gwid*pt.x;
	sprite_.y=gwid*pt.y;

	let text_=container_.children[1];
  	text_.x=sprite_.x+sprite_.width/2-text_.width/2;
  	text_.y=sprite_.y+sprite_.height/2-text_.height/2;
}
function setSnakeTail(container_,pt,angle){
  let sprite_=container_.children[0];
	
  sprite_.angle=angle;
  
  sprite_.x=gwid*(pt.x+.5)+(gwid/2)*Math.cos(sprite_.rotation);
  sprite_.y=gwid*(pt.y+.5)+(gwid/2)*Math.sin(sprite_.rotation);
  

}

function checkSnakePos(){
	let pos_={x:_body[0].x,y:_body[0].y};
	
	/* check boundary */
	if(pos_.x<0 || pos_.y<0 ||pos_.x>=mgridx ||pos_.y>=mgridy){
		killSnake();
		return true;	
	} 
	
	/* check tail */
	for(var i=1;i<_body.length;++i){
		if(pos_.x==_body[i].x && pos_.y==_body[i].y){
			killSnake();
			return true;
		}
	}
	/* check food*/
	for(var i in _food){
		
		let mf=_food[i].word.length;
		// console.log(mf);

		for(var j in _food_pattern[mf-2]){
			let ppx=_food[i].x+_food_pattern[mf-2][j].x;
		    let ppy=_food[i].y+_food_pattern[mf-2][j].y;
		    
		    if(ppx===pos_.x && ppy===pos_.y){

		    	_word_eaten=_food[i].word;
				_sentence+=_word_eaten;
		    	console.log('eat '+_word_eaten);

		    	let word_add=_word_eaten+randomConnection();
		    	mf=word_add.length;

		    	//append tail
		    	let end_=_body.length-1;
		    	let tpos=_body[end_-1];

		    	let dir_={x:_body[end_-1].x-_body[end_-2].x,y:_body[end_-1].y-_body[end_-2].y};
		    	_body.splice(end_,1);
				_body.splice(end_-1,1);

		    	let tx=_body[_body.length-1].x+dir_.x;
		    	let ty=_body[_body.length-1].y+dir_.y;
		    		
		    	for(var k=0;k<=mf+1;++k){
		    		_body.push({x:tx,y:ty});
		    		tx+=dir_.x;
		    		tx+=dir_.y;
		    	}
		    	
		    	let tail_=_container_snake.removeChildAt(end_);
		    	let dot_=_container_snake.removeChildAt(end_-1);
		    	for(var k=0;k<mf;++k){
		    		let container_=new Container();
			    	let b_=new Sprite(_img_body[0]);
				  	b_.scale.set(snake_scale,snake_scale);
				  	b_._zIndex=0;

				  	let text_=new PIXI.Text(word_add[k],_snake_text_style);
				  	container_.addChild(b_);
				  	container_.addChild(text_);

				  	setSnakeBody(container_,_body[k+end_],calBodyDirection(k+end_));
				  	_container_snake.addChild(container_);
				}
				_container_snake.addChild(dot_);
  				setSnakeBody(dot_,_body[_body.length-2],calBodyDirection(_body.length-2));
				
				_container_snake.addChild(tail_);
				setSnakeTail(tail_,_body[_body.length-1],calTailDirection());
				
		    	resetFood();
		    	return false;
		    }
		}
	}


}
function killSnake(){
	snake_stop=true;
	_container_snake.getChildAt(0).children[0].texture=_img_head[2];
	app.renderer.render(_container_snake);
	//goToResult();
	app.ticker.remove(updateSnake);

}
function goToResult(){

	// _container_snake.scale.set(.5,.5);
	// _container_result.addChild(_container_snake);
	_img_replay.frame=new Rectangle(0,0,127,84);
  
	_container_game.visible=false;
	_container_result.visible=true;
}

function calBodyDirection(index_){

	let x1=_body[index_+1].x-_body[index_-1].x;
	let y1=_body[index_+1].y-_body[index_-1].y;
	
	let x2=_body[index_+1].x-_body[index_].x;
	let y2=_body[index_+1].y-_body[index_].y;


	let ang=Math.floor(Math.atan2(y1,x1)*180/Math.PI);
	switch(ang){
		case 0:
		case 180:
			return 'horiz';
		case 90:
		case -90:
			return 'vert';
		case 45:
			if(x2>0) return 'left-bottom';
			else return 'right-top';
		case 135:
			if(y2>0) return 'left-top';
			else return 'right-bottom';
		case -135:
			if(x2<0) return 'right-top';
			else return 'left-bottom';
		case -45:
			if(y2<0) return 'right-bottom';
			else return 'left-top';
	}
}
function calTailDirection(){
	let i=_body.length-1;
	return Math.atan2(_body[i-1].y-_body[i].y,_body[i-1].x-_body[i].x)*180/Math.PI;
}

function resetFood(){
	
	//_container_food.removeChildren();
	_food=[];
	_word_eaten='';

	for(var i=0;i<3;++i){

		var key_=randomKeyword();
		var f=generateFood(key_.length);

		f.word=key_;

		let ff=_container_food.getChildAt(i*2);

		ff.texture=_img_food[f.mword-2];
  		ff.scale.set(_food_scale,_food_scale);
  		ff.x=gwid*f.x;
  		ff.y=gwid*f.y;

  		let text_=_container_food.getChildAt(i*2+1);
		text_.removeChildren();
		console.log('food of '+key_);


	  	let mf=key_.length;
		for(var k=0;k<mf;++k){
	  		let t_=new PIXI.Text(key_[k],_snake_text_style);
	  		t_.x=ff.x+_food_pattern[mf-2][k].x*gwid+gwid/2-t_.width/2;
	  		t_.y=ff.y+_food_pattern[mf-2][k].y*gwid+gwid/2-t_.height/2;
	  		text_.addChild(t_);
  		}
		// _container_food.addChild(ff);

		_food.push(f);
	}
}
function generateFood(mword){

	var x=null;
    var y=null;
    //var mword=null;
    generatePos();

    while(checkPos()){
        generatePos();
    }

    function checkPos(){
    	
    	for(var k in _food_pattern[mword-2]){
    		let px=x+_food_pattern[mword-2][k].x;
    		let py=y+_food_pattern[mword-2][k].y;
    		//console.log('new food '+px+' , '+py);
		    // check boundary
		    if(px<0 || px>=mgridx || py<0 || py>=mgridy) 
		    	return true;

		    // check overlap
		    for(var z in _food){
		    	let mf=_food[z].mword;
		    	for(var q in _food_pattern[mf-2]){
		    		let ppx=_food[z].x+_food_pattern[mf-2][q].x;
		    		let ppy=_food[z].y+_food_pattern[mf-2][q].y;
		    		// console.log('old food '+ppx+' , '+ppy);
		    		if(ppx===px && ppy===py) 
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


