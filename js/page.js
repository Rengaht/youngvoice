/* ui */

var _frame_intro,_frame_game,_frame_result,_frame_start,_frame_hint;

let _sound_back,_sound_eat,_sound_dead;
var _play_sound=true;
var _first_intro=false;
var _display_intro=false;

window.onload=function(){

  _frame_intro=document.getElementById('intro_frame');
  _frame_hint=document.getElementById('hint_frame');
  _frame_start=document.getElementById('start_frame');
  _frame_result=document.getElementById('result_frame');
  _frame_game=document.getElementById('pixi_frame');


  setupPixi();
  

  loadFont();  
  loadMusic();

  if(_mobile) document.getElementById('hint_image').src="img/hint-mobile.png";
  else document.getElementById('hint_image').src="img/hint-pc.png";
}



function onClickStart(){
 
  $('#start_button').addClass('pressed');
  setTimeout(function(){

    $('#start_frame').addClass('hidden');

    if(!_first_intro){

      _first_intro=true;
      $('#intro_frame').css('display','block');
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
  setTimeout(function(){
    // $('#pixi_frame').removeClass('hidden');
    $('#hint_frame').removeClass('hidden');
  },10);
  
  setTimeout(function(){
     $('#start_frame').css('display','none'); 
  },300);
}

function onClickIknow(){
  
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
    },300);

  },300);

}
function onClickReplay(){
    
    $('#replay_button').addClass('pressed');

    setTimeout(function(){
      $('#result_frame').addClass('hidden');
      setTimeout(function(){
        $('#result_frame').css('display','none');
        resetGame();
        showGame();
      },300);
    },200);
}
function onClickShare(){
  $('#share_button').addClass('pressed');
  setTimeout(function(){
    uploadImage();
  },200);
  
}
function onClickSignUp(){
  $('#signup_button').addClass('pressed');
  setTimeout(function(){
       window.open("http://www.youngvoice.tw/content/award/award_index.aspx?id=10",'_blank');
  },200);

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
function onClickHint(){
  if(_frame_hint.style.display==='block') startGame();
}

function resetIntro(){
   _img_start.frame=new Rectangle(0,0,323,84);
}
function toggleIntro(){

  _display_intro=!_display_intro;  
  if(_display_intro){
      $('#intro_frame').css('display','block');
      $('#intro_frame').removeClass('hidden');  
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
function loadMusic(){  
  _sound_back=new Howl({
    src:['sound/back.wav','sound/back.ogg'],
    loop:true,
    onend: function() {
      // console.log('Finished!');
    },
    onplayerror: function() {
      _sound_back.once('unlock', function() {
        _sound_back.play();
      });
    }
  });

  _sound_eat=new Howl({
    src:['sound/eat.wav','sound/eat.ogg']
  });
  _sound_dead=new Howl({
    src:['sound/dead.wav','sound/dead.ogg']
  });
  _play_sound=false;
}

function  toggleMusic(){
    _play_sound=!_play_sound;
    if(!_play_sound){
      _sound_back.pause();
     
      $('#music_button_on').addClass('hidden');
      $('#music_button_off').removeClass('hidden');
    }else{
      _sound_back.play();
      $('#music_button_off').addClass('hidden');
      $('#music_button_on').removeClass('hidden');
    }

}

function playBackMusic(){
  console.log('play bgm!!');
  _play_sound=true;
  _sound_back.play();   
  
 // document.getElementById('music_button').src="img/ui_sound.png";
  $('#music_button_off').addClass('hidden');
  $('#music_button_on').removeClass('hidden');
}
function playEatSound(){
  _sound_eat.play();
}
function playDeadSound(){
  _sound_dead.play();

}