var RunnerText=['字裡行間穿梭堆疊 上下左右  長長短短','吃吃的青春冒險 通往你內心的異世界'];
var _runner_sentence_index=0;
var _runner_word_index=0;

function drawTextRunner(delta){
	_runner_word_index+=app.ticker.deltaMS/150;
	// console.log(_runner_word_index);
	

	var run_text_style = new PIXI.TextStyle({
    	fontFamily: 'jackeyfont',
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
				key_.scale.set(.6,1);
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
		_runner_sentence_index=(_runner_sentence_index+1)%2;
		_runner_word_index=0;
		total_=RunnerText[_runner_sentence_index].length;

		for(var i in _textrunner.children){
			if(i==_runner_sentence_index) _textrunner.children[i].visible=true;
			else _textrunner.children[i].visible=false;
		}		
	}	
}