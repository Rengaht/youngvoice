
var list_sentence,list_keyword,list_connection;
var _sentence='';
var _keyword=[];

function loadData(){
	list_sentence=loader.resources['data/sentence.json'].data.start;
	list_connection=loader.resources['data/sentence.json'].data.connect;
	list_keyword=loader.resources['data/keyword.json'].data.keyword;

}

function randomSentence(){
	_sentence=list_sentence[Math.floor(Math.random()*list_sentence.length)];
	return _sentence;
}
function randomKeyword(){
	let key_=list_keyword[Math.floor(Math.random()*list_keyword.length)];
	while(key_.length<2){
		key_=list_keyword[Math.floor(Math.random()*list_keyword.length)];
	}
	return key_;
}
function randomConnection(){
	return list_connection[Math.floor(Math.random()*list_connection.length)];
}
