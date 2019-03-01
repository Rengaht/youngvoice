
let DATA_URL="https://mmlab.com.tw/project/youngvoice/";

var list_sentence,list_keyword,list_connection;
var _index_keyword=0;
var _index_connection=0;

var _sentence='';
var _keyword=[];
var _output_blob=null;

var _snake_crop=null;
var _output_container=null;

function loadData(){

	$.getJSON(DATA_URL+"data/sentence.json",function(json){
		list_sentence=json.start;
		list_connection=json.connect;
	});	
	$.getJSON(DATA_URL+"data/keyword.json",function(json){
		list_keyword=json.keyword;
	});
	// list_sentence=loader.resources['data/sentence.json'].data.start;
	// list_connection=loader.resources['data/sentence.json'].data.connect;
	// list_keyword=shuffle(loader.resources['data/keyword.json'].data.keyword);

}

function randomSentence(){
	
	_sentence=list_sentence[Math.floor(Math.random()*list_sentence.length)];
	
	return _sentence;
}

var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

function randomKeyword(){
	// let key_=list_keyword[Math.floor(Math.random()*list_keyword.length)];
	// while(key_.length<2){
	// 	key_=list_keyword[Math.floor(Math.random()*list_keyword.length)];
	// }
	let key_=list_keyword[_index_keyword];
	_index_keyword++;
	while(key_.length<2){
		key_=list_keyword[_index_keyword];
		_index_keyword++;
	}

	if(_index_keyword>=list_keyword.length){
		_index_keyword=0;
		list_keyword=shuffle(list_keyword);
	}

	return key_;
}
function randomConnection(){

	let cnn=list_connection[_index_connection];

	_index_connection++;
	if(_index_connection>=list_connection.length){
		_index_connection=0;
	}

	return cnn;
}

function renderImage(onFinish){

	// var minx=wwid,miny=whei;
	// let s_=_container_snake.children;
	// for(var k in s_){
	// 	let tx=s_[k].getChildAt(0).x;
	// 	let ty=s_[k].getChildAt(0).y;
	// 	if(tx<minx) minx=tx;
	// 	if(ty<miny) miny=ty;
	// }
	var minx=mgridx,miny=mgridy;	
	for(var k in _body){
		let tx=_body[k].x;
		let ty=_body[k].y;
		if(tx<minx) minx=tx;
		if(ty<miny) miny=ty;
	}
	minx=(minx-1)*gwid;
	miny=(miny-1)*gwid;
	// maxy=(maxy+1)*gwid;
	// maxx=(maxx+1)*gwid;

	_container_snake.x-=minx;
	_container_snake.y-=miny;
	_container_shadow.x-=minx;
	_container_shadow.y-=miny;

	_snake_crop=new PIXI.Sprite(Texture.EMPTY);
	_snake_crop.x=0;
	_snake_crop.y=0;
	_snake_crop.width=Math.max(_container_snake.width,_container_shadow.width)+2*gwid;
  	_snake_crop.height=Math.max(_container_snake.height,_container_shadow.height)+2*gwid;
  	_container_tmp.addChildAt(_snake_crop,0);
 //  	_container_tmp.mask=mask_;

	app.renderer.render(_container_tmp);
	let url_=app.renderer.extract.canvas(_container_tmp).toDataURL('image/png');
	document.getElementById('dead_snake').src=url_;

	_container_tmp.removeChild(_snake_crop);
	
}
function uploadImage(){

	_container_tmp.visible=true;

	// app.stage.removeChild(_container_game);	
	if(_output_container===null) _output_container=new Container();

	_output_container.removeChildren();

	_container_game.removeChild(_container_tmp);
	let owid=Math.max(_snake_crop.width,600);

	let mx=Math.floor(owid/gwid);
	let my=Math.floor(_snake_crop.height/gwid);
	_graphics_grid.clear();
	for(var i=0;i<=mx;++i){
	    for(var j=0;j<=my;++j){
	      if((i+j)%2==0) _graphics_grid.beginFill(0xE8D9E9,1);
	      else _graphics_grid.beginFill(0xE7D4E8,1);
	      _graphics_grid.drawRect(i*gwid,j*gwid,gwid,gwid);
	      _graphics_grid.endFill();
	    }
	}

	_output_container.addChild(_graphics_grid);
	_output_container.addChild(_container_tmp);
	_container_tmp.x=owid/2-_container_tmp.width/2;
	
	// _graphics_grid.addChild(_snake_crop);
	// _graphics_grid.mask=_snake_crop;

	
	app.renderer.extract.canvas(_output_container).toBlob(function(b){
		// output_blob=b;		

		// _container_tmp.visible=false;
		
		
		// _snake_crop.removeChild(_snake_crop);
		_output_container.removeChild(_graphics_grid);
		_output_container.removeChild(_container_tmp);		

		//app.stage.addChild(_container_game);
		_container_game.addChild(_container_tmp);
		_container_tmp.x=0;

		var formData = new FormData();
		formData.append('action', 'upload');

		var file=new File([b],'temp.png');
		formData.append('file', b);

		// formData.append('keyword','test');
		$.ajax({
	        type: 'POST',
	        url: DATA_URL+'upload/action.php',
	        data: formData,
	        processData: false,
	        contentType: false,
	        success: function(data) {
	            console.log(data);
	            shareImage(data.url);
	            $('#share_button').removeClass('pressed');
	        },
	        error: function(response) {
	            console.log(response.responseText);
	        }
	    });
	}, 'image/png');

	

}
function shareImage(url_){

	//alert('share image: '+url_);

  let surl_='https://www.facebook.com/dialog/share?'
  +'app_id=262109598012691'
  +'&hashtag='+encodeURIComponent('#青少年不簡單')
  +'&href='+encodeURIComponent(url_)
  +'&redirect_uri='+encodeURIComponent('https://mmlab.com.tw/project/youngvoice/upload/redirect.html');

  if(_mobile) window.location.href=surl_;
  else window.open(surl_,'_blank');

}

function getSample(){
	var formData = new FormData();
	formData.append('action', 'sample');

	var key_='';
	if(_keyword.length>0) 
		key_=_keyword[Math.floor(Math.random()*_keyword.length)];
	else 
		key_=randomKeyword();

	console.log('get keyword: '+key_);

	formData.append('keyword',key_);

	$.ajax({
        type: 'POST',
        url:DATA_URL+'upload/action.php',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data);
            setSampleText(data);
        },
        error: function(response) {
            console.log(response.responseText);
        }
    });

}


