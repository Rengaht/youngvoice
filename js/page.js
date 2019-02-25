/* ui */

var _frame_intro,_frame_game,_frame_result,_frame_start;

window.onload=function(){

  _frame_intro=document.getElementById('intro_frame');
  _frame_start=document.getElementById('start_frame');
  _frame_result=document.getElementById('result_frame');
  _frame_game=document.getElementById('pixi_frame');

  setupPixi();
  setupRunner();
}



function onClickStart(){
  
  _frame_start.style.display='none';
  _frame_game.style.display="block";

  resetGame();
  startGame();
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
    _frame_start.style.display="block";
  
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
  }else{
      _frame_intro.style.display='none';
  }
}
function  toggleMusic(){
  
}