var FONT_STRETCH=.7;
var RunnerText=[['01','01','03','04','05','06','07','33','17','18','08','09','10','03','12','13','14'],
				['15','16','19','20','21','22','23','24','33','25','26','27','28','33','29','29','31','31']];
var _runner_sentence_index=0;
var _runner_word_index=0;

var app_runner;
var _textrunner;
function setupRunner(){
	var twid=500;
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
  _textrunner.x=0;

  for(var i in RunnerText){
	var ct_=new PIXI.Container();
	if(i!=_runner_sentence_index) ct_.visible=false;

	var x_=0;
	for(var j in RunnerText[i]){
		var text_=new Texture.from('img/textrunner/text-'+RunnerText[i][j]+'.png');
		// console.log(text_.width+' x '+text_.height);
		var key_=new PIXI.Sprite(text_);
		key_.scale.set(FONT_STRETCH,1);
		key_.x=x_;
		key_.y=0;

		x_+=key_.width+key_.width*.2;
		ct_.addChild(key_);
	}
	_textrunner.addChild(ct_);		
  }

  app_runner.stage.addChild(_textrunner);
  app_runner.ticker.add(function(delta){
    drawTextRunner(delta);
  });
  for(var i in _textrunner.children){
		_textrunner.children[i].x=twid/2-_textrunner.children[i].width/2;
   }

}

function drawTextRunner(delta){

	if(_textrunner.children.length<1) return;


	_runner_word_index+=app_runner.ticker.deltaMS/150;
	// console.log(_runner_word_index);
	

	var run_text_style = new PIXI.TextStyle({
    	fontFamily: 'SnakeFont',
    	fontSize: 36,
    	fill:0x122C9A,
    	letterSpacing:2,
    	fontWeight:'bold'
	});

	var total_=_textrunner.children[_runner_sentence_index].children.length;	
	for(var i=0;i<total_;++i){
		var now_=Math.floor(_runner_word_index);
		
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