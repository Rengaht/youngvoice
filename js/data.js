
var list_sentence,list_keyword,list_connection;
var _index_keyword=0;
var _index_connection=0;

var _sentence='';
var _keyword=[];
var _output_blob=null;

function loadData(){
	list_sentence=loader.resources['data/sentence.json'].data.start;
	list_connection=loader.resources['data/sentence.json'].data.connect;
	list_keyword=shuffle(loader.resources['data/keyword.json'].data.keyword);

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
	//
	for(var k in _body){
		let tx=_body[k].x;
		let ty=_body[k].y;
		if(tx<minx) minx=tx;
		if(ty<miny) miny=ty;
	}
	minx*=gwid;
	miny*=gwid;

	
	let s_=_container_snake.children;
	for(var k in s_){
		s_[k].x-=minx;
		s_[k].y-=miny;
	}
	let ss_=_container_shadow.children;
	for(var k in ss_){
		ss_[k].x-=minx;
		ss_[k].y-=miny;
	}

// let tmp_=new Sprite(resources['img/logo.png'].texture);
// tmp_.y=100;
// _container_tmp.addChild(tmp_);
	app.renderer.render(_container_tmp);
	let url_=app.renderer.extract.canvas(_container_tmp).toDataURL('image/png');
	document.getElementById('dead_snake').src=url_;

	// _container_tmp.removeChild(tmp_);

	// document.getElementById('result_top').appendChild(url_);
	app.renderer.extract.canvas(_container_game).toBlob(function(b){
		// var a = document.createElement('a');
		// document.body.append(a);
		// a.download = 'tmp.png';
		// a.href = URL.createObjectURL(b);
		// a.click();
		// a.remove();

		_output_blob=b;
		onFinish();


	}, 'image/png');
}
function uploadImage(blob_){
	
	var formData = new FormData();
	formData.append('action', 'upload');

	var file=new File([blob_],'temp.png');
	formData.append('file', blob_);

	// formData.append('keyword','test');
	$.ajax({
        type: 'POST',
        url: 'upload/action.php',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data);
            shareImage(data.url);
        },
        error: function(response) {
            console.log(response.responseText);
        }
    });

}
function shareImage(url_){

	//alert('share image: '+url_);

  let surl_='https://www.facebook.com/dialog/feed?'
  +'app_id=262109598012691'
  +'&display=popup'
  +'&link='+url_
  +'&redirect_uri=https://mmab.com.tw';

  window.open(surl_,'_blank');

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
        url: 'upload/action.php',
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

