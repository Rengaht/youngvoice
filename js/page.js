/* ui */

var _frame_intro,_frame_game,_frame_result,_frame_start,_frame_hint;

let _sound_back,_sound_eat,_sound_dead;
var _play_sound=true;
var _show_intro=false;

window.onload=function(){

  _frame_intro=document.getElementById('intro_frame');
  _frame_hint=document.getElementById('hint_frame');
  _frame_start=document.getElementById('start_frame');
  _frame_result=document.getElementById('result_frame');
  _frame_game=document.getElementById('pixi_frame');

  setupPixi();
  
  loadMusic();

  if(_mobile) document.getElementById('hint_image').src="img/hint-mobile.png";
  else document.getElementById('hint_image').src="img/hint-pc.png";
}



function onClickStart(){
  
  _frame_start.style.display='none';
  
  if(!_show_intro){
    
    _frame_intro.style.display="block";

  }else{  
    _frame_game.style.display="block";
    _frame_hint.style.display="block";

    playBackMusic();
    resetGame();
  }
  // startGame();
}

function onClickIknow(){
  
  if(!snake_stop) pauseGame();
  else{
    if(!_show_intro){
      _show_intro=true;
      onClickStart();
    }else startGame();
  } 

  _frame_intro.style.display='none';

}
function onClickReplay(){
    _frame_result.style.display="none";
    _frame_game.style.display="block";
    resetGame();
}
function onClickShare(){
  
  uploadImage(_output_blob);
  
}
function onClickTitle(){
    _frame_game.style.display="none";
    _frame_result.style.display="none";
    _frame_intro.style.display="none";
    _frame_start.style.display="block";
    pauseGame();
    app.ticker.remove(updateSnake);
    
}
function onClickHint(){
  if(_frame_hint.style.display==='block') startGame();
}

function resetIntro(){
   _img_start.frame=new Rectangle(0,0,323,84);
}
function resetResult(){



}

function toggleIntro(){
  if(_frame_intro.style.display!='block'){
      _frame_intro.style.display='block';
      pauseGame();
  }else{
      _frame_intro.style.display='none';
      if(_frame_game.style.display!='none') startGame();
  }
}
function loadMusic(){
  _sound_back=document.getElementById('sound_back');
 
  // _sound_back.addEventListener('ended', function() {
  //   this.currentTime = 0;
  //   this.play();
  // }, false);
 
  _sound_dead=new Audio('sound/dead.wav');
  _sound_eat=new Audio('sound/eat.wav');
  _play_sound=false;
}

function  toggleMusic(){
    _play_sound=!_play_sound;
    if(!_play_sound){
      // _sound_back.pause();
      document.getElementById('music_button').src="img/ui_sound_off.png";
    }else{
      // _sound_back.play();
      document.getElementById('music_button').src="img/ui_sound.png";
    }

}

function playBackMusic(){

  // var promise=_sound_back.play();
  _sound_back.loop=true;

   _play_sound=true;
   document.getElementById('music_button').src="img/ui_sound.png";
}