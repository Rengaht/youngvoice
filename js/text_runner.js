let FONT_STRETCH=.7;
var RunnerText=['字裡行間穿梭堆疊','上下左右  長長短短','吃吃的青春冒險','通往你內心的異世界'];
var _runner_sentence_index=0;
var _runner_word_index=0;

var app_runner;
var _textrunner;
function setupRunner(){
	let twid=50*.7*9;
  app_runner=new PIXI.Application({
  	width:twid,
  	height:100,
    autoResize:true,
    resolution: devicePixelRatio,
    antialias:true,
    transparent:true
  });

  document.getElementById('loading_text').appendChild(app_runner.view);
  app_runner.renderer.view.style.position='relative';
  app_runner.renderer.view.style.top='auto';
  app_runner.renderer.view.style.bottom='20%';

  _textrunner=new PIXI.Container();
  _textrunner.height=50;
  _textrunner.y=50;
  drawTextRunner(0);
  _textrunner.x=twid/2-_textrunner.width/2;

  app_runner.stage.addChild(_textrunner);
  app_runner.ticker.add(function(delta){
    drawTextRunner(delta);
  });

}

function drawTextRunner(delta){
	_runner_word_index+=app.ticker.deltaMS/150;
	// console.log(_runner_word_index);
	

	var run_text_style = new PIXI.TextStyle({
    	fontFamily: 'SnakeFont',
    	fontSize: 36,
    	fill:0x122C9A,
    	letterSpacing:2,
    	fontWeight:'bold'
	});

	let total_=RunnerText[_runner_sentence_index].length;
	if(_textrunner.children.length==0){

		
		for(var i in RunnerText){
			let ct_=new PIXI.Container();
			if(i!=_runner_sentence_index) ct_.visible=false;

			let x_=0;
			for(var j in RunnerText[i]){
				let key_=new PIXI.Text(RunnerText[i][j],run_text_style);
				key_.scale.set(FONT_STRETCH,1);
				key_.x=x_;
				key_.y=0;

				x_+=key_.width;
				ct_.addChild(key_);
			}
			_textrunner.addChild(ct_);
		}
		return;
	}
	
	
	for(var i=0;i<total_;++i){
		let now_=Math.floor(_runner_word_index);
		
		// if(i<now_) _textrunner.children[_runner_sentence_index].children[i].visible=true;
		// else _textrunner.children[_runner_sentence_index].children[i].visible=false;

		if(i==now_) _textrunner.children[_runner_sentence_index].children[i].y=-12;
		else if(i==now_-1 || i==now_+1) _textrunner.children[_runner_sentence_index].children[i].y=-6;
		else _textrunner.children[_runner_sentence_index].children[i].y=0;
	}


	if(_runner_word_index>=total_){
		_runner_sentence_index=(_runner_sentence_index+1)%(RunnerText.length);
		_runner_word_index=0;
		total_=RunnerText[_runner_sentence_index].length;

		for(var i in _textrunner.children){
			if(i==_runner_sentence_index) _textrunner.children[i].visible=true;
			else _textrunner.children[i].visible=false;
		}		
	}	
}