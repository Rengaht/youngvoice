/* ui */

var _frame_intro,_frame_game,_frame_result,_frame_start,_frame_hint;
<<<<<<< HEAD


var _first_intro=false;
var _display_intro=false;



window.onload=function(){

 

 
  if(_mobile) document.getElementById('hint_image').src="img/hint-mobile.png";
  else document.getElementById('hint_image').src="img/hint-pc.png";
=======

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
>>>>>>> origin/master

}


function onClickStart(){
<<<<<<< HEAD

  playButtonSound();

  $('#start_button').addClass('pressed');
  setTimeout(function(){

    $('#start_frame').addClass('hidden');

    if(!_first_intro){

      _first_intro=true;
      $('#intro_frame').css('display','block');
      $('#iknow_button').removeClass('pressed');
      _display_intro=true;
      
      setTimeout(function(){
        $('#intro_frame').removeClass('hidden');   
      },10);

      setTimeout(function(){            
        $('#start_frame').css('display','none');            
        playBackMusic();        
      },300);

    }else{
        resetGame();
        showGame();        
    }

  },300);
}

function showGame(){
  // $('#pixi_frame').css('display','block');
  _container_game.visible=true;
  $('#hint_frame').css('display','block');
  $('#hint_frame').removeClass('hidden');
  // setTimeout(function(){
  //   // $('#pixi_frame').removeClass('hidden');
    
  // },10);
  
  setTimeout(function(){
     $('#start_frame').css('display','none'); 
  },10);
}
=======
  
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
>>>>>>> origin/master

function onClickIknow(){
  
  playButtonSound();
  $('#iknow_button').addClass('pressed');

  setTimeout(function(){
    
    $('#intro_frame').addClass('hidden');  
    
    setTimeout(function(){
      $('#intro_frame').css('display','none'); 
      _display_intro=false;

      if(_first_intro){
        resetGame();
        showGame();

        _first_intro=false;
        
      }else{
        if(_container_game.visible) startGame();
      }
    },10);

  },100);

}
function onClickReplay(){
    
    playButtonSound();
    $('#replay_button').addClass('pressed');

    setTimeout(function(){
      $('#result_frame').addClass('hidden');
      setTimeout(function(){
        $('#result_frame').css('display','none');
        resetGame();
        showGame();
      },100);
    },100);
}
function onClickShare(){

  playButtonSound();
  $('#share_button').addClass('pressed');
  setTimeout(function(){
    uploadImage();
  },50);
  
}
<<<<<<< HEAD
function onClickSignUp(){

   playButtonSound();
  $('#signup_button').addClass('pressed');
  setTimeout(function(){
      if(_mobile) window.location.href="http://www.youngvoice.tw/content/award/award_index.aspx?id=10";
      else window.open("http://www.youngvoice.tw/content/award/award_index.aspx?id=10",'_blank');
  },100);
=======
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
>>>>>>> origin/master

}

function onClickWebsite(){

  playButtonSound();
  setTimeout(function(){
      if(_mobile) window.location.href="http://www.youngvoice.tw";
      else window.open("http://www.youngvoice.tw",'_blank');
  },100);

}

function onClickTitle(){
    // _frame_game.style.display="none";
    // _frame_result.style.display="none";
    // _frame_intro.style.display="none";
    // _frame_start.style.display="block";

    if($('#start_frame').css('display')==='block') return;

    pauseGame();
    
    if($('result_frame').css('display')==='block'){
      $('#result_frame').addClass('hidden');        
    }else if($('intro_frame').css('display')==='block'){
      $('#intro_frame').addClass('hidden');        
    }

    setTimeout(function(){

      $('#result_frame').css('display','none');
      $('#intro_frame').css('display','none');

      $('#start_frame').css('display','block');
      $('#start_frame').removeClass('hidden');

      $('#start_button').removeClass('pressed');

    },300);
    
}
<<<<<<< HEAD
function onClickHint(){
  if($('#hint_frame').css('display')==='block') startGame();
}

function resetIntro(){
   _img_start.frame=new Rectangle(0,0,323,84);
}
function toggleIntro(){

  _display_intro=!_display_intro;  
  if(_display_intro){
      $('#intro_frame').css('display','block');
      $('#intro_frame').removeClass('hidden');  
      $('#iknow_button').removeClass('pressed');

      setTimeout(function(){
        pauseGame();
      },300);
  }else{
      
      $('#intro_frame').addClass('hidden');  

      setTimeout(function(){
        $('#intro_frame').css('display','none');
        if(_container_game.visible) startGame();
      },300);
  }
  
}
=======
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
>>>>>>> origin/master
