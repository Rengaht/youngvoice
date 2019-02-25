/* ui */

var _frame_intro,_frame_game,_frame_result,_frame_start;

let _sound_back,_sound_eat,_sound_dead;
var _play_sound=true;

window.onload=function(){

  _frame_intro=document.getElementById('intro_frame');
  _frame_start=document.getElementById('start_frame');
  _frame_result=document.getElementById('result_frame');
  _frame_game=document.getElementById('pixi_frame');

  setupPixi();
  setupRunner();
  loadMusic();
}



function onClickStart(){
  
  _frame_start.style.display='none';
  _frame_game.style.display="block";

  resetGame();
  // startGame();
}

function onClickIknow(){
  // _img_iknow.frame=new Rectangle(0,84,323,84);
  // _container_intro.visible=false;

  // if(_container_intro.visible) pauseGame();
  // else{
  //     if(_container_game.visible) startGame();
  // }
  if(!snake_stop) pauseGame();
  else startGame();

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
  // _sound_back=document.getElementById('sound_back');
  // _sound_back.addEventListener('ended', function() {
  //   this.currentTime = 0;
  //   this.play();
  // }, false);
  // var promise=_sound_back.play();
  // if (playPromise !== undefined) {
  //   playPromise.then(_ => {
  //     // Automatic playback started!
  //     // Show playing UI.
  //   })
  //   .catch(error => {
  //     // Auto-play was prevented
  //     // Show paused UI.
  // });

  // _sound_dead=new Audio('sound/dead.wav');
  // _sound_eat=new Audio('sound/eat.wav');
}

function  toggleMusic(){
    _play_sound=!_play_sound;
    if(!_play_sound){
      _sound_back.stop();
    }else{
      _sound_back.play();
    }

}